import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

/**
 * 出席者レコードクラス
 * 出席者のデータベースエンティティを表す
 */
@Entity('attendees')
export class AttendeeRecord {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name', length: 40 })
  name: string;

  @Column({ name: 'email_address', length: 254, unique: true })
  emailAddress: string;

  @Column({ name: 'active', default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
