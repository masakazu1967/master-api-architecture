import { z } from 'zod';
import { PrimitiveValueObject } from '@/share/domain/value-object/primitive-value-object';
import { DomainError } from '@/share/domain/error/domain-error';

/**
 * メールアドレス値オブジェクトクラス
 */
export class EmailAddress extends PrimitiveValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  /**
   * メールアドレス値オブジェクトを生成するファクトリメソッド
   * @param value メールアドレス
   * @returns メールアドレス値オブジェクト
   * @throws {DomainError} バリデーションエラーが発生した場合
   */
  public static create(value: string): EmailAddress {
    const schema = z.string().email().max(254);

    const result = schema.safeParse(value);

    if (!result.success) {
      throw new DomainError('Invalid email address format', result.error);
    }

    return new EmailAddress(value);
  }
}
