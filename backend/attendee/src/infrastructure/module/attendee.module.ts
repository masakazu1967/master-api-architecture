import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeeController } from '../controller/attendee.controller';
import { SqlAttendeeRepository } from '../sql/sql-attendee-repository';
import { AttendeeExistenceService } from '../../domain/attendee/service/attendee-existence-service';
import { RegisterAttendeeInteractor } from '../../application/register-attendee/register-attendee-interactor';
import { UlidAttendeeIdGenerator } from '../ulid/ulid-attendee-id-generator';
import { AttendeeRecord } from '../sql/entity/attendee-record';
import { UpdateAttendeeInteractor } from '../../application/update-attendee/update-attendee-interactor';

/**
 * 出席者モジュールクラス
 * 出席者に関する依存関係を定義する
 */
@Module({
  imports: [TypeOrmModule.forFeature([AttendeeRecord])],
  controllers: [AttendeeController],
  providers: [
    {
      provide: 'AttendeeRepository',
      useClass: SqlAttendeeRepository,
    },
    {
      provide: 'AttendeeIdGenerator',
      useClass: UlidAttendeeIdGenerator,
    },
    {
      provide: 'RegisterAttendeeUseCase',
      useClass: RegisterAttendeeInteractor,
    },
    {
      provide: 'UpdateAttendeeUseCase',
      useClass: UpdateAttendeeInteractor,
    },
    AttendeeExistenceService,
  ],
})
export class AttendeeModule {}
