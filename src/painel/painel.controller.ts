import { Controller, Get } from '@nestjs/common';
import { PainelService } from './painel.service';

@Controller('painel')
export class PainelController {
    constructor(private readonly painelService: PainelService) { }
    
    @Get('bookings')
    public async getBookings() { 
        try {
            const painelBookingsDetails = await this.painelService.getMergedBookingsData();
            return painelBookingsDetails;
        } catch (error) {
            console.error('Error no retorno dos dados', error);
            throw error;
        }
    }

}
