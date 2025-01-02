import { PrimitiveValueObject } from '../value-object/primitive-value-object';
import { Version } from '../version/version';

export class AbstractEntity<ID extends PrimitiveValueObject<string>, PROPS> {
  protected readonly _id: ID;
  protected props: PROPS;
  protected readonly _version?: Version;

  protected constructor(id: ID, props: PROPS, version?: Version) {
    this._id = id;
    this.props = props;
    this._version = version;
  }

  get id(): ID {
    return this._id;
  }

  get version(): Version | undefined {
    return this._version;
  }

  equals(entity?: AbstractEntity<ID, PROPS>): boolean {
    if (entity == null) {
      return false;
    }
    return this.id.equals(entity.id);
  }
}
