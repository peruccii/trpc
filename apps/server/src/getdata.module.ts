import { Module } from '@nestjs/common';
import { GetDataService } from './application/usecases/getdata.service';

@Module({
  providers: [GetDataService],
  exports: [GetDataService],
})
export class GetDataModule {}
