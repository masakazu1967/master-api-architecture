/**
 * 出席者登録リクエストクラス
 * 出席者登録のリクエストデータを表す
 */
export class RegisterAttendeeRequest {
  /**
   * 出席者の名前
   */
  readonly name: string;

  /**
   * 出席者のメールアドレス
   */
  readonly emailAddress: string;

  /**
   * コンストラクタ
   * @param name 出席者の名前
   * @param emailAddress 出席者のメールアドレス
   */
  constructor(name: string, emailAddress: string) {
    this.name = name;
    this.emailAddress = emailAddress;
  }
}
