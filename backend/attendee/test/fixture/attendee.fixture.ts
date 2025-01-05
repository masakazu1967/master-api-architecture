import { AttendeeId } from '../../src/domain/attendee/model/attendee-id';
import { Name } from '../../src/domain/attendee/model/name';
import { EmailAddress } from '../../src/domain/attendee/model/email-address';
import {
  Attendee,
  AttendeeProps,
} from '../../src/domain/attendee/model/attendee';
import { Version } from '../../src/share/domain/version/version';

/**
 * 出席者のテストデータを生成するFixtureクラス
 */
export class AttendeeFixture {
  /**
   * 出席者IDのテストデータを生成する
   * @param value 出席者IDの値
   * @returns 出席者ID
   */
  static createAttendeeId(value: string): AttendeeId {
    return AttendeeId.create(value);
  }

  /**
   * 名前のテストデータを生成する
   * @param value 名前の値
   * @returns 名前
   */
  static createName(value: string): Name {
    return Name.create(value);
  }

  /**
   * メールアドレスのテストデータを生成する
   * @param value メールアドレスの値
   * @returns メールアドレス
   */
  static createEmailAddress(value: string): EmailAddress {
    return EmailAddress.create(value);
  }

  /**
   * 出席者エンティティのテストデータを生成する
   * @param id 出席者ID
   * @param name 名前
   * @param emailAddress メールアドレス
   * @param version バージョン
   * @returns 出席者エンティティ
   */
  static createAttendee(
    id: AttendeeId,
    name: Name,
    emailAddress: EmailAddress,
    active: boolean = true,
    version?: Version,
  ): Attendee {
    const props: AttendeeProps = { name, emailAddress, active };
    return Attendee.restore(id, props, version);
  }
}
