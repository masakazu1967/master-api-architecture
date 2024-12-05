import { NeutralQueryBuilderEqualComparator } from '@/share/domain';
import { SqlQueryBuilderComparator } from '@/share/infrastructure/sql';

interface Value {
  [key: string]: any;
}

/**
 * SQLクエリビルダーの等価比較クラス
 */
export class SqlQueryBuilderEqualComparator<T>
  implements SqlQueryBuilderComparator
{
  /**
   * コンストラクタ
   * @param _comparator ナチュラルクエリビルダー等価比較クラス
   * @param _param パラメータ名
   */
  constructor(
    private readonly _comparator: NeutralQueryBuilderEqualComparator<T>,
    private readonly _param: string,
  ) {}

  /**
   * SQL文のWHERE句の一部を返す
   * - ナチュラルクエリビルダー等価比較クラスの値がnullではない場合、等号のWHERE句を返す
   * - ナチュラルクエリビルダー等価比較クラスの値がnullの場合、`IS`のWHERE句を返す
   * @returns SQL文のWHERE句の一部
   */
  compare(): { statement: string; value: { [key: string]: any } } {
    const value: Value = {};
    value[this.param] = this.value;
    if (this.value === null) {
      return {
        statement: `${this.field} IS NULL`,
        value,
      };
    }
    return {
      statement: `${this.field} = :${this.param}`,
      value,
    };
  }

  get field(): string {
    return this._comparator.field;
  }

  get param(): string {
    return this._param;
  }

  get value(): T {
    return this._comparator.value;
  }
}
