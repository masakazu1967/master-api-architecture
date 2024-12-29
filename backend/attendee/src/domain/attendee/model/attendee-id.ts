import { z } from 'zod';
import { PrimitiveValueObject } from '../../../share/domain/value-object/primitive-value-object';
import { DomainError } from '../../../share/domain/error/domain-error';

/**
 * 出席者IDクラス
 * 出席者IDを表す値オブジェクト
 */
export class AttendeeId extends PrimitiveValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  /**
   * 出席者IDを生成するファクトリメソッド
   * @param value 出席者IDの値
   * @returns 出席者ID
   * @throws {DomainError} バリデーションエラーが発生した場合
   */
  static create(value: string): AttendeeId {
    const schema = z.string().ulid();
    const result = schema.safeParse(value);

    if (!result.success) {
      throw new DomainError('Invalid AttendeeId', result.error);
    }

    return new AttendeeId(value);
  }
}
