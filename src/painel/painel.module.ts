import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PainelService } from './painel.service';
import { HttpService } from '../http/http.service';
import { PrismaService } from '../prisma/prisma.service';
import { PainelController } from './painel.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [PainelService, HttpService, PrismaService],
  controllers: [PainelController]
})
export class PainelModule { }
