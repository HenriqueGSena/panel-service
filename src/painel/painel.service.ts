import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '../http/http.service';

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
        // await this.findBookingsDbById();
        await this.getApiDataForBookings(['21442821', '11483041']);
    }

    public async findBookingsDbById() {
        try {
            const db = await this.prismaService.findBookingAndAccomodation();
            console.log('Retorno dos bookings vindos do banco de dados:', db);
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
            console.log('Dados da API externa:', apiResponses);
            return apiResponses;
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
            throw error;
        }
    }


    // public async getApiByBookingData() {
    //     try {
    //         const bookings = await this.findBookingsDbById() || [];

    //         if (!Array.isArray(bookings) || bookings.length === 0) {
    //             console.log('Nenhuma reserva encontrada.');
    //             return [];
    //         }

    //         const ids = bookings.map((booking) => booking.id);
    //         if (!Array.isArray(ids) || ids.length === 0) {
    //             console.log('Nenhum ID válido encontrado.');
    //             return [];
    //         }

    //         const apiDataList = await this.getApiDataForBookings(ids) || [];

    //         if (!Array.isArray(apiDataList)) {
    //             console.error('Os dados da API não foram retornados corretamente.');
    //             return [];
    //         }

    //         const combinedData = bookings.map((booking) => {
    //             const apiData = apiDataList.find((data) => data.id === booking.id)?.apiData || null;
    //             return { ...booking, apiData };
    //         });

    //         console.log('Dados combinados:', combinedData);
    //         return combinedData;
    //     } catch (error) {
    //         console.error('Erro ao combinar dados:', error);
    //         throw error;
    //     }
    // }

}
