/**
 * 出席者登録レスポンスクラス
 * 出席者登録のレスポンスデータを表す
 */
export class RegisterAttendeeResponse {
  /**
   * 出席者ID
   */
  readonly attendeeId: string;

  /**
   * コンストラクタ
   * @param attendeeId 出席者ID
   */
  constructor(attendeeId: string) {
    this.attendeeId = attendeeId;
  }
}
