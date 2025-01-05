import { Injectable } from '@nestjs/common';
import { ApplicationError } from '../../share/domain/error/application-error';
import { CancelAttendeeRequest } from './cancel-attendee-request';
import { CancelAttendeeResponse } from './cancel-attendee-response';
import { CancelAttendeeUsecase } from './cancel-attendee-usecase';
import { AttendeeRepository } from '../../domain/attendee/service/attendee-repository';
import { AttendeeId } from '../../domain/attendee/model/attendee-id';

/**
 * 出席者解約ユースケースインタラクタークラス
 * 出席者解約のユースケースを実行する
 */
@Injectable()
export class CancelAttendeeInteractor implements CancelAttendeeUsecase {
  constructor(private readonly attendeeRepository: AttendeeRepository) {}

  /**
   * 出席者解約ユースケースを実行する
   * @param request 出席者解約リクエスト
   * @returns 出席者解約レスポンスまたはアプリケーションエラーのプロミス
   */
  async execute(
    request: CancelAttendeeRequest,
  ): Promise<CancelAttendeeResponse | ApplicationError> {
    try {
      // 1. 解約する出席者のIDを持つリクエストクラスを受け取ります。
      const { attendeeId } = request;

      // 2. 出席者IDの値オブジェクトを生成します。
      const attendeeIdValueObject = AttendeeId.create(attendeeId);

      // 3. 出席者IDで出席者を取得します。
      const attendee = await this.attendeeRepository.getById(
        attendeeIdValueObject,
      );

      // 4. 出席者が存在しない場合は出席者が存在しないことを示すアプリケーションエラーを返します。
      if (!attendee) {
        return new ApplicationError('Attendee not found');
      }

      // 5. 出席者の有効フラグをOFFにします。
      attendee.changeActive(false);

      // 6. 出席者を出席者リポジトリに保存します。
      await this.attendeeRepository.save(attendee);

      // 7. 出席者IDを値とする出席者解約レスポンスを返します。
      return new CancelAttendeeResponse(attendeeId);
    } catch (error) {
      return new ApplicationError('Failed to cancel attendee', error);
    }
  }
}
