import { Module } from '@nestjs/common';
import { PainelService } from './painel.service';
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [PainelService]
})
export class PainelModule {}
