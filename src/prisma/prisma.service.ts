import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  public async findBookingAndAccomodation() {
    const result = await this.$queryRaw`
    select 
	    b.id_booking as id,
	    b.portal_reference as codigo_portal,
	    b.sale_channel as nome_portal,
	    b.check_in_data as checkin,
	    b.check_out_data as checkout,
	    a.nome_acomodacao
    from bookings b left join accommodation a on b.accommodation_code = a.id_acc;
    `;
      return result;
  }
}
