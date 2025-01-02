import { ApplicationError } from '../../share/domain/error/application-error';
import { RegisterAttendeeRequest } from './register-attendee-request';
import { RegisterAttendeeResponse } from './register-attendee-response';

/**
 * 出席者登録ユースケースインタフェース
 * 出席者登録のユースケースを定義する
 */
export interface RegisterAttendeeUsecase {
  /**
   * 出席者登録ユースケースを実行する
   * @param request 出席者登録リクエスト
   * @returns 出席者登録レスポンスまたはアプリケーションエラーのプロミス
   */
  execute(
    request: RegisterAttendeeRequest,
  ): Promise<RegisterAttendeeResponse | ApplicationError>;
}
