import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendeeRepository } from '../../domain/attendee/service/attendee-repository';
import { Attendee } from '../../domain/attendee/model/attendee';
import { AttendeeId } from '../../domain/attendee/model/attendee-id';
import { EmailAddress } from '../../domain/attendee/model/email-address';
import { AttendeeRecord } from './entity/attendee-record';
import { Name } from '../../domain/attendee/model/name';
import { Version } from '../../share/domain/version/version';

/**
 * SQL出席者リポジトリクラス
 * 出席者のデータベース操作を実装する
 */
@Injectable()
export class SqlAttendeeRepository implements AttendeeRepository {
  constructor(
    @InjectRepository(AttendeeRecord)
    private readonly repository: Repository<AttendeeRecord>,
  ) {}

  /**
   * 出席者IDで出席者を取得する
   * @param id 出席者ID
   * @returns 出席者のプロミス
   */
  async getById(id: AttendeeId): Promise<Attendee> {
    const record = await this.repository.findOne({ where: { id: id.value } });
    return this.toDomainEntity(record);
  }

  /**
   * メールアドレスで出席者を取得する
   * @param email メールアドレス
   * @returns 出席者のプロミス
   */
  async getByEmail(email: EmailAddress): Promise<Attendee> {
    const record = await this.repository.findOne({
      where: { emailAddress: email.value },
    });
    return this.toDomainEntity(record);
  }

  /**
   * 出席者を保存する
   * @param attendee 出席者
   * @returns voidのプロミス
   */
  async save(attendee: Attendee): Promise<void> {
    const record = this.toRecordEntity(attendee);
    await this.repository.save(record);
  }

  /**
   * レコードエンティティをドメインエンティティに変換する
   * @param record レコードエンティティ
   * @returns ドメインエンティティ
   */
  private toDomainEntity(record: AttendeeRecord): Attendee {
    const id = AttendeeId.create(record.id);
    const name = Name.create(record.name);
    const emailAddress = EmailAddress.create(record.emailAddress);
    const version = Version.restore(record.version);
    const props = {
      name,
      emailAddress,
    };
    return Attendee.restore(id, props, version);
  }

  /**
   * ドメインエンティティをレコードエンティティに変換する
   * @param attendee ドメインエンティティ
   * @returns レコードエンティティ
   */
  private toRecordEntity(attendee: Attendee): AttendeeRecord {
    const record = new AttendeeRecord();
    record.id = attendee.id.value;
    record.name = attendee.name.value;
    record.emailAddress = attendee.emailAddress.value;
    record.version = attendee.version?.value ?? 1;
    return record;
  }
}
