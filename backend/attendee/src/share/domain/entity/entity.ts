import { AbstractEntity } from './abstract-entity';
import { PrimitiveValueObject } from '../value-object/primitive-value-object';

interface Props {
  [index: string]: any;
}

export abstract class Entity<
  ID extends PrimitiveValueObject<number>,
  PROPS extends Props,
> extends AbstractEntity<ID, PROPS> {}
