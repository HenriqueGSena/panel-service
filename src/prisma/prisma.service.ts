import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // console.log('Conectando ao banco de dados...');
    await this.$connect();
    // console.log('Conexão estabelecida com sucesso.');
  }

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
