import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '../http/http.service';
import { Bookings } from './interfaces/bookings';

@Injectable()
export class PainelService implements OnModuleInit {
    private readonly http;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly httpService: HttpService,
    ) { 
        this.http = this.httpService.getApiClient();
    }

    public async onModuleInit() {
        console.log('Iniciando PainelService...');
        const dbBookings = await this.findBookingsDbById();
        const bookingIds = dbBookings.map((booking) => booking.id);
        if (bookingIds.length > 0) {
            await this.getApiDataForBookings(bookingIds);
        } else {
            console.log('Nenhum ID de reserva encontrado no banco de dados.');
        }
        const mergedBookings = await this.getMergedBookingsData();
        console.log('Bookings unidos:', mergedBookings);
    }


    public async findBookingsDbById(): Promise<Bookings[]> {
        try {
            const db = await this.prismaService.findBookingAndAccomodation() as Bookings[];
            // console.log('Retorno dos bookings vindos do banco de dados:', db);
            return db;
        } catch (e) {
            console.error('Erro ao buscar bookings:', e);
            throw e;
        }
    }

    public async getApiDataForBookings(ids: string[]) {
        try {
            const apiResponses = await Promise.all(
                ids.map(async (id) => {
                    try {
                        const response = await this.http.get(`/bookings/${id}`);
                        const arrivalHours = '15:00';

                        const occupant = response.data.data.occupant?.name;
                        const surname = response.data.data.occupant?.surnames;
                        const fullName = surname ? `${occupant} ${surname}` : occupant;
                        const checkin = response.data.data.checkIn?.done;
                        const arrivalInfo = response.data.data.arrivalInfo?.checkInTime ?? `${arrivalHours}`;

                        return {
                            fullName,
                            checkin,
                            arrivalInfo,
                        };
                    } catch (error) {
                        console.error(`Erro ao buscar dados da API para o ID ${id}:`, error);
                        return;
                    }
                })
            );
            // console.log('Dados da API externa:', apiResponses);
            return apiResponses;
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
            throw error;
        }
    }

    public async getMergedBookingsData() {
        try {
            const dbBookings = (await this.findBookingsDbById());
            const bookingIds = dbBookings.map((booking) => booking.id);
            const apiBookings = await this.getApiDataForBookings(bookingIds);
            const mergedBookings = dbBookings.map((booking, index) => ({
                ...booking,
                ...(apiBookings[index] || {}),
            }));
            // console.log('Bookings unidos:', mergedBookings);
            return mergedBookings;
        } catch (err) {
            console.error('Erro ao mesclar os dados dos bookings:', err);
            throw err;
        }
    }

}
