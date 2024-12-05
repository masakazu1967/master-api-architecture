/**
 * SQLのクエリビルダー比較インターフェイス
 */
export interface SqlQueryBuilderComparator {
  /**
   * 比較をする
   */
  compare(): { statement: string; value: { [key: string]: any } };
}
