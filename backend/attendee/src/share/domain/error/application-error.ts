/**
 * アプリケーションエラークラス
 * アプリケーションで発生したエラーを表す
 */
export class ApplicationError extends Error {
  /**
   * コンストラクタ
   * @param message エラーメッセージ
   * @param cause エラー原因
   */
  constructor(message?: string, public readonly cause?: Error) {
    super(message);
  }
}
