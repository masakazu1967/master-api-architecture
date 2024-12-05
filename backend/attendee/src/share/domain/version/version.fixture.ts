import { Version } from './version';

export class VersionFixture {
  private _value?: number;

  private constructor() {}

  static get(): VersionFixture {
    return new VersionFixture();
  }

  setValue(value: number): VersionFixture {
    this._value = value;
    return this;
  }

  build(): Version | undefined {
    if (this._value == null) {
      return;
    }
    return Version.restore(this._value);
  }
}
