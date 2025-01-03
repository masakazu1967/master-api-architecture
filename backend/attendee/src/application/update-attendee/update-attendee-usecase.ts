import { ApplicationError } from '../../share/domain/error/application-error';
import { UpdateAttendeeRequest } from './update-attendee-request';
import { UpdateAttendeeResponse } from './update-attendee-response';

/**
 * 出席者更新ユースケースインタフェース
 * 出席者更新のユースケースを定義する
 */
export interface UpdateAttendeeUsecase {
  /**
   * 出席者更新ユースケースを実行する
   * @param request 出席者更新リクエスト
   * @returns 出席者更新レスポンスまたはアプリケーションエラーのプロミス
   */
  execute(
    request: UpdateAttendeeRequest,
  ): Promise<UpdateAttendeeResponse | ApplicationError>;
}
