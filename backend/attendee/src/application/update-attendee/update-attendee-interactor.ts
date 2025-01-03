import { Injectable } from '@nestjs/common';
import { ApplicationError } from '../../share/domain/error/application-error';
import { UpdateAttendeeRequest } from './update-attendee-request';
import { UpdateAttendeeResponse } from './update-attendee-response';
import { UpdateAttendeeUsecase } from './update-attendee-usecase';
import { AttendeeRepository } from '../../domain/attendee/service/attendee-repository';
import { AttendeeExistenceService } from '../../domain/attendee/service/attendee-existence-service';
import { AttendeeId } from '../../domain/attendee/model/attendee-id';
import { Name } from '../../domain/attendee/model/name';

/**
 * 出席者更新ユースケースインタラクタークラス
 * 出席者更新のユースケースを実行する
 */
@Injectable()
export class UpdateAttendeeInteractor implements UpdateAttendeeUsecase {
  constructor(
    private readonly attendeeRepository: AttendeeRepository,
    private readonly attendeeExistenceService: AttendeeExistenceService,
  ) {}

  /**
   * 出席者更新ユースケースを実行する
   * @param request 出席者更新リクエスト
   * @returns 出席者更新レスポンスまたはアプリケーションエラーのプロミス
   */
  async execute(
    request: UpdateAttendeeRequest,
  ): Promise<UpdateAttendeeResponse | ApplicationError> {
    try {
      // 1. 更新する出席者のIDと新しい名前を持つリクエストクラスを受け取ります。
      const { attendeeId, name } = request;

      // 2. 出席者IDと名前の値オブジェクトを生成します。
      const attendeeIdValueObject = AttendeeId.create(attendeeId);
      const nameValueObject = Name.create(name);

      // 3. 出席者IDで出席者を取得します。
      const attendee = await this.attendeeRepository.getById(
        attendeeIdValueObject,
      );

      // 4. 出席者が存在しない場合は出席者が存在しないことを示すアプリケーションエラーを返します。
      if (!attendee) {
        return new ApplicationError('Attendee not found');
      }

      // 5. 出席者の名前を変更します。
      attendee.changeName(nameValueObject);

      // 6. 出席者を出席者リポジトリに保存します。
      await this.attendeeRepository.save(attendee);

      // 7. 出席者IDを値とする出席者更新レスポンスを返します。
      return new UpdateAttendeeResponse(attendeeId);
    } catch (error) {
      return new ApplicationError('Failed to update attendee', error);
    }
  }
}
