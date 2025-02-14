import { Module } from '@nestjs/common';
import { PainelService } from './painel.service';
import { HttpService } from '../http/http.service';
import { PrismaService } from '../prisma/prisma.service';
import { PainelController } from './painel.controller';

@Module({
  imports: [],
  providers: [PainelService, HttpService, PrismaService],
  controllers: [PainelController]
})
export class PainelModule { }
