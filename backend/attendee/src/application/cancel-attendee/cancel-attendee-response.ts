/**
 * 出席者解約レスポンスクラス
 * 出席者解約のレスポンスデータを表す
 */
export class CancelAttendeeResponse {
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
