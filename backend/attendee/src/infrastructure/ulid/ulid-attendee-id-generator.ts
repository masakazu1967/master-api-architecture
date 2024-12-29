import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { AttendeeIdGenerator } from '../../domain/attendee/service/attendee-id-generator';
import { AttendeeId } from '../../domain/attendee/model/attendee-id';

/**
 * ULID出席者ID生成クラス
 * ユニークな出席者ID値オブジェクトを生成する
 */
@Injectable()
export class UlidAttendeeIdGenerator implements AttendeeIdGenerator {
  /**
   * ユニークな出席者ID値オブジェクトを生成する
   * @returns 出席者ID値オブジェクト
   */
  generate(): AttendeeId {
    const id = ulid();
    return AttendeeId.create(id);
  }
}
