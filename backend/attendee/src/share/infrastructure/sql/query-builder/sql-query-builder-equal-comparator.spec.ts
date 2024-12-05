import { NeutralQueryBuilderEqualComparator } from '@/share/domain';
import { SqlQueryBuilderEqualComparator } from '@/share/infrastructure/sql';

describe('SqlQueryBuilderEqualComparator', () => {
  describe('compare', () => {
    it('ナチュラルクエリビルダー等価比較クラスの値がnullではない場合等号のWHERE句を返す', () => {
      // Arrange
      const field = 'field';
      const value = 'value';
      const neutralComparator = new NeutralQueryBuilderEqualComparator(
        field,
        value,
      );
      const param = 'param0';
      const comparator = new SqlQueryBuilderEqualComparator(
        neutralComparator,
        param,
      );

      // Act
      const actual = comparator.compare();

      // Assert
      expect(actual.statement).toBe(`${field} = :${param}`);
      expect(actual.value).toEqual({ [param]: value });
    });

    it('ナチュラルクエリビルダー等価比較クラスの値がnullの場合`IS`のWHERE句を返す', () => {
      // Arrange
      const field = 'field';
      const value = null;
      const neutralComparator = new NeutralQueryBuilderEqualComparator(
        field,
        value,
      );
      const param = 'param0';
      const comparator = new SqlQueryBuilderEqualComparator(
        neutralComparator,
        param,
      );

      // Act
      const actual = comparator.compare();

      // Assert
      expect(actual.statement).toBe(`${field} IS NULL`);
      expect(actual.value).toEqual({ [param]: value });
    });
  });
});
