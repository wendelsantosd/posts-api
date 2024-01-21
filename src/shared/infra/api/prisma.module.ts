import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
