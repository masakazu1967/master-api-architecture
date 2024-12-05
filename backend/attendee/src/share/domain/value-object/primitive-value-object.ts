import { AbstractValueObject } from './abstract-value-object';

export abstract class PrimitiveValueObject<T> extends AbstractValueObject<T> {
  get value(): T {
    return this._value;
  }
}
