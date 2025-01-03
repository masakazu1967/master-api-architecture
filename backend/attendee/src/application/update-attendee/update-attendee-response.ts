/**
 * 出席者更新レスポンスクラス
 * 出席者更新のレスポンスデータを表す
 */
export class UpdateAttendeeResponse {
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
