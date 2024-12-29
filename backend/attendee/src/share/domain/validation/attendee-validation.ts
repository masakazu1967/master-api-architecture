import { z } from 'zod';

/**
 * 出席者IDのZodバリデーションスキーマ
 */
export const attendeeIdSchema = z.string().ulid();

/**
 * 名前のZodバリデーションスキーマ
 */
export const nameSchema = z.string().max(40);

/**
 * メールアドレスのZodバリデーションスキーマ
 */
export const emailAddressSchema = z.string().email().max(254);
