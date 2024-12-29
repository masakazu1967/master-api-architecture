import { Attendee } from '../model/attendee';
import { AttendeeId } from '../model/attendee-id';
import { EmailAddress } from '../model/email-address';

/**
 * 出席者リポジトリインタフェース
 * 出席者のデータストレージ操作を定義する
 */
export interface AttendeeRepository {
  /**
   * 出席者IDで出席者を取得する
   * @param id 出席者ID
   * @returns 出席者のプロミス
   */
  getById(id: AttendeeId): Promise<Attendee>;

  /**
   * メールアドレスで出席者を取得する
   * @param email メールアドレス
   * @returns 出席者のプロミス
   */
  getByEmail(email: EmailAddress): Promise<Attendee>;

  /**
   * 出席者を保存する
   * @param attendee 出席者
   * @returns voidのプロミス
   */
  save(attendee: Attendee): Promise<void>;
}
