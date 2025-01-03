/**
 * 出席者更新リクエストクラス
 * 出席者更新のリクエストデータを表す
 */
export class UpdateAttendeeRequest {
  /**
   * 出席者ID
   */
  readonly attendeeId: string;

  /**
   * 出席者の名前
   */
  readonly name: string;

  /**
   * コンストラクタ
   * @param attendeeId 出席者ID
   * @param name 出席者の名前
   */
  constructor(attendeeId: string, name: string) {
    this.attendeeId = attendeeId;
    this.name = name;
  }
}
