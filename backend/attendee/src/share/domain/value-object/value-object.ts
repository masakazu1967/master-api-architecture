import { AbstractValueObject } from './abstract-value-object';

interface Props {
  [index: string]: any;
}

export abstract class ValueObject<
  T extends Props,
> extends AbstractValueObject<T> {}
