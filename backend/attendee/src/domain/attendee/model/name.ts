import { z } from 'zod';
import { PrimitiveValueObject } from '@/share/domain/value-object/primitive-value-object';
import { DomainError } from '@/share/domain/error/domain-error';

/**
 * 名前クラス
 * 出席者の名前を表す値オブジェクト
 */
export class Name extends PrimitiveValueObject<string> {
  private static readonly MAX_LENGTH = 40;

  /**
   * プライベートコンストラクタ
   * @param value 名前の値
   */
  private constructor(value: string) {
    super(value);
  }

  /**
   * 名前を生成するファクトリメソッド
   * @param value 名前の値
   * @returns 名前の値オブジェクト
   * @throws {DomainError} バリデーションエラーが発生した場合
   */
  public static create(value: string): Name {
    const schema = z.string().max(Name.MAX_LENGTH);
    const parseResult = schema.safeParse(value);

    if (!parseResult.success) {
      throw new DomainError('名前は40文字以下で入力してください。');
    }

    return new Name(value);
  }
}
