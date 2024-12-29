import { AttendeeId } from '../model/attendee-id';

/**
 * 出席者ID生成インタフェース
 * ユニークな出席者ID値オブジェクトを生成するメソッドを定義する
 */
export interface AttendeeIdGenerator {
  /**
   * ユニークな出席者ID値オブジェクトを生成する
   * @returns 出席者ID値オブジェクト
   */
  generate(): AttendeeId;
}
