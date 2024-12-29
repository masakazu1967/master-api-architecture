import { Injectable } from '@nestjs/common';
import { AttendeeRepository } from './attendee-repository';
import { Attendee } from '../model/attendee';

/**
 * 出席者存在サービスクラス
 * 出席者がすでに登録されているかどうかを検査する
 */
@Injectable()
export class AttendeeExistenceService {
  constructor(private readonly attendeeRepository: AttendeeRepository) {}

  /**
   * 出席者がすでに登録されているかどうかを検査するメソッド
   * @param attendee 出席者インスタンス
   * @returns 出席者のメールアドレスがすでに登録されている場合はtrue、そうでなければfalse
   */
  async exists(attendee: Attendee): Promise<boolean> {
    const existingAttendee = await this.attendeeRepository.getByEmail(
      attendee.emailAddress,
    );
    return existingAttendee !== null;
  }
}
