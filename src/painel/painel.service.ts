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
        await this.findBookingsDbById();
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
}
