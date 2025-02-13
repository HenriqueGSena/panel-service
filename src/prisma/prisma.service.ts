import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('Conectando ao banco de dados...');
    await this.$connect();
    console.log('Conexão estabelecida com sucesso.');
    // await this.findBookingAndAccomodation();
  }

  // public async findBookingAndAccommodation() {
  //   const prisma = new PrismaClient();

  //   const today = new Date().toISOString().split('T')[0];

  //   const reservas = await prisma.bookings.findMany({
  //     where: {
  //       check_in_data: today,
  //       status: {
  //         in: ['CONFIRMED', 'UNPAID'],
  //       },
  //     },
  //     select: {
  //       id_booking: true,
  //       portal_reference: true,
  //       sale_channel: true,
  //       check_in_data: true,
  //       check_out_data: true,
  //       accommodation: {
  //         select: {
  //           nome_acomodacao: true,
  //         },
  //       },
  //     },
  //   });

  //   console.log('Reservas encontradas:', reservas);
  // }


  public async findBookingAndAccomodation() {
    const result = await this.$queryRaw`
    select 
	    b.id_booking as id,
	    b.portal_reference as codPortal,
	    b.sale_channel as nomePortal,
	    b.check_in_data as checkin,
	    b.check_out_data as checkout,
	    a.nome_acomodacao as nomeAcomodacao
    from bookings b left join accommodation a on b.accommodation_code = a.id_acc
    where TO_DATE(b.check_in_data, 'YYYY-MM-DD') = CURRENT_DATE 
      and b.status in ('CONFIRMED', 'UNPAID')`;
    
    return result;
  }
}
