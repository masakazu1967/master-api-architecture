import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import {
  SqlQueryBuilderComparator,
  SqlQueryBuilderEqualComparator,
} from '@/share/infrastructure/sql';
import {
  NeutralQueryBuilder,
  NeutralQueryBuilderEqualComparator,
} from '@/share/domain';

export class SqlQueryBuilder<T extends ObjectLiteral> {
  private _filters: SqlQueryBuilderComparator[] = [];
  private _pageNumber: number;
  private _pageSize: number;

  constructor(
    neutralQb: NeutralQueryBuilder,
    private selectQb: SelectQueryBuilder<T>,
  ) {
    this._pageNumber = neutralQb.pageNumber;
    this._pageSize = neutralQb.pageSize;
    this._filters = neutralQb.filters.map((filter, index) => {
      if (filter instanceof NeutralQueryBuilderEqualComparator) {
        return new SqlQueryBuilderEqualComparator(filter, `param${index}`);
      } else {
        throw new Error('Comparator not Implemented');
      }
    });
  }

  get filters(): SqlQueryBuilderComparator[] {
    return this._filters;
  }

  build(): SelectQueryBuilder<T> {
    const skip = this._pageNumber * this._pageSize;
    this.selectQb.skip(skip);
    const take = this._pageSize;
    this.selectQb.take(take);
    return this._filters.reduce((prev, curr, index) => {
      const { statement, value } = curr.compare();
      return index === 0
        ? prev.where(statement, value)
        : prev.andWhere(statement, value);
    }, this.selectQb);
  }
}
