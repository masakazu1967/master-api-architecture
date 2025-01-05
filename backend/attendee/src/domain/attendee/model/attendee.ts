import { z } from 'zod';
import { Entity } from '../../../share/domain/entity/entity';
import { DomainError } from '../../../share/domain/error/domain-error';
import { AttendeeId } from './attendee-id';
import { Name } from './name';
import { EmailAddress } from './email-address';
import { Version } from '../../../share/domain/version/version';

/**
 * 出席者エンティティクラス
 */
export class Attendee extends Entity<AttendeeId, AttendeeProps> {
  private constructor(id: AttendeeId, props: AttendeeProps, version?: Version) {
    super(id, props, version);
  }

  /**
   * 出席者エンティティを生成するファクトリメソッド
   * @param id 出席者ID
   * @param props 出席者のプロパティ
   * @returns 出席者エンティティ
   * @throws {DomainError} バリデーションエラーが発生した場合
   */
  public static create(id: AttendeeId, props: AttendeeCreateProps): Attendee {
    const schema = z.object({
      name: z.string().max(40),
      emailAddress: z.string().email().max(254),
    });

    try {
      schema.parse({
        name: props.name.value,
        emailAddress: props.emailAddress.value,
      });
      return new Attendee(id, { ...props, active: false });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new DomainError('Invalid attendee properties');
      }
      throw new DomainError('Unexpected error', error);
    }
  }

  /**
   * 出席者エンティティを復元するメソッド
   * @param id 出席者ID
   * @param props 出席者のプロパティ
   * @param version バージョン
   * @returns 出席者エンティティ
   */
  public static restore(
    id: AttendeeId,
    props: AttendeeProps,
    version: Version,
  ): Attendee {
    return new Attendee(id, props, version);
  }

  /**
   * 出席者の名前を取得する
   * @returns 出席者の名前
   */
  get name(): Name {
    return this.props.name;
  }

  /**
   * 出席者のメールアドレスを取得する
   * @returns 出席者のメールアドレス
   */
  get emailAddress(): EmailAddress {
    return this.props.emailAddress;
  }

  /**
   * 出席者の有効フラグを取得する
   * @returns 出席者の有効フラグ
   */
  get active(): boolean {
    return this.props.active;
  }

  /**
   * 出席者の名前を変更する
   * @param newName 新しい名前
   */
  public changeName(newName: Name): void {
    this.props.name = newName;
  }

  /**
   * 出席者の有効フラグを変更する
   * @param active 新しい有効フラグ
   */
  public changeActive(active: boolean): void {
    this.props.active = active;
  }
}

/**
 * 出席者のプロパティインターフェイス
 */
export interface AttendeeProps {
  name: Name;
  emailAddress: EmailAddress;
  active: boolean;
}

/**
 * 出席者の作成プロパティインターフェイス
 */
export interface AttendeeCreateProps {
  name: Name;
  emailAddress: EmailAddress;
}
