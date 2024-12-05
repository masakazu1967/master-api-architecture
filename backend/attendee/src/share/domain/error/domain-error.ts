/**
 * ドメインエラー
 * ドメインで発生したエラー
 */
export class DomainError extends Error {
  /**
   * コンストラクタ
   * @param message エラーメッセージ
   * @param _cause エラー原因
   */
  constructor(
    message?: string,
    protected _cause?: Error,
  ) {
    super(message);
  }
}
