import { Module } from '@nestjs/common';
import { PainelService } from './painel.service';
import { HttpService } from '../http/http.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  providers: [PainelService, HttpService, PrismaService]
})
export class PainelModule {}
