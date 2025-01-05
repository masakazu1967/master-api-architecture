/**
 * 出席者解約リクエストクラス
 * 出席者解約のリクエストデータを表す
 */
export class CancelAttendeeRequest {
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
