import { Module } from '@nestjs/common';
import { PainelModule } from './painel/painel.module';

@Module({
  imports: [PainelModule]
})
export class AppModule {}
