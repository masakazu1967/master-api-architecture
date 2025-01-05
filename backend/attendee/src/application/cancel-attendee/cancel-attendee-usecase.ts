import { ApplicationError } from '../../share/domain/error/application-error';
import { CancelAttendeeRequest } from './cancel-attendee-request';
import { CancelAttendeeResponse } from './cancel-attendee-response';

/**
 * 出席者解約ユースケースインタフェース
 * 出席者解約のユースケースを定義する
 */
export interface CancelAttendeeUsecase {
  /**
   * 出席者解約ユースケースを実行する
   * @param request 出席者解約リクエスト
   * @returns 出席者解約レスポンスまたはアプリケーションエラーのプロミス
   */
  execute(
    request: CancelAttendeeRequest,
  ): Promise<CancelAttendeeResponse | ApplicationError>;
}
