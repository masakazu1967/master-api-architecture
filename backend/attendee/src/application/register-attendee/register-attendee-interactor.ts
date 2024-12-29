import { Injectable } from '@nestjs/common';
import { ApplicationError } from '../../share/domain/error/application-error';
import { RegisterAttendeeRequest } from './register-attendee-request';
import { RegisterAttendeeResponse } from './register-attendee-response';
import { RegisterAttendeeUsecase } from './register-attendee-usecase';
import { AttendeeRepository } from '../../domain/attendee/service/attendee-repository';
import { AttendeeIdGenerator } from '../../domain/attendee/service/attendee-id-generator';
import { AttendeeExistenceService } from '../../domain/attendee/service/attendee-existence-service';
import { Attendee } from '../../domain/attendee/model/attendee';
import { Name } from '../../domain/attendee/model/name';
import { EmailAddress } from '../../domain/attendee/model/email-address';

/**
 * 出席者登録ユースケースインタラクタークラス
 * 出席者登録のユースケースを実行する
 */
@Injectable()
export class RegisterAttendeeInteractor implements RegisterAttendeeUsecase {
  constructor(
    private readonly attendeeRepository: AttendeeRepository,
    private readonly attendeeIdGenerator: AttendeeIdGenerator,
    private readonly attendeeExistenceService: AttendeeExistenceService,
  ) {}

  /**
   * 出席者登録ユースケースを実行する
   * @param request 出席者登録リクエスト
   * @returns 出席者登録レスポンスまたはアプリケーションエラーのプロミス
   */
  async execute(
    request: RegisterAttendeeRequest,
  ): Promise<RegisterAttendeeResponse | ApplicationError> {
    try {
      // 1. 登録する出席者の名前とメールアドレスを持つリクエストクラスを受け取ります。
      const { name, emailAddress } = request;

      // 2. 名前とメールアドレスの値オブジェクトを生成します。
      const nameValueObject = Name.create(name);
      const emailValueObject = EmailAddress.create(emailAddress);

      // 3. 出席者IDを生成します。
      const attendeeId = this.attendeeIdGenerator.generate();

      // 4. 出席者エンティティを生成します。
      const attendeeProps = {
        name: nameValueObject,
        emailAddress: emailValueObject,
      };
      const attendee = Attendee.create(attendeeId, attendeeProps);

      // 5. 出席者存在サービスより出席者が存在しているか検証します。
      const exists = await this.attendeeExistenceService.exists(attendee);

      // 6. 出席者が存在している場合は出席者が存在していることを示すアプリケーションエラーを返します。
      if (exists) {
        return new ApplicationError('Attendee already exists');
      }

      // 7. 出席者が存在しない場合は出席者を出席者リポジトリに保存します。
      await this.attendeeRepository.save(attendee);

      // 8. 出席者IDを値とする出席者登録レスポンスを返します。
      return new RegisterAttendeeResponse(attendeeId.value);
    } catch (error) {
      return new ApplicationError('Failed to register attendee', error);
    }
  }
}
