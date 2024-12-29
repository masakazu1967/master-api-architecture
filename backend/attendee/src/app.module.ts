import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendeeModule } from './infrastructure/module/attendee.module';

@Module({
  imports: [AttendeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
