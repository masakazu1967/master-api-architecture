import deepEqual from 'deep-equal';

export abstract class AbstractValueObject<T> {
  protected readonly _value: T;

  protected constructor(value: T) {
    this._value = Object.freeze(value);
  }

  /**
   * 値オブジェクトを比較する\
   * この値オブジェクトと他の値オブジェクトが等しいかどうかを示します。
   * @param vo 比較対象の値オブジェクト
   * @returns このオブジェクトが`vo`引数と同じである場合はtrue、それ以外の場合はfalse。
   */
  equals(vo?: AbstractValueObject<T>): boolean {
    if (vo == null) {
      return false;
    }
    return deepEqual(this._value, vo._value);
  }
}
