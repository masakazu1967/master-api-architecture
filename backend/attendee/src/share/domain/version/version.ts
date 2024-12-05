import { PrimitiveValueObject } from '../value-object/primitive-value-object';

export class Version extends PrimitiveValueObject<number> {
  static create(): Version {
    return new Version(1);
  }

  static restore(value: number): Version {
    return new Version(value);
  }
}
