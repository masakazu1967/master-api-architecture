import { Attendee } from '../../../src/domain/attendee/model/attendee';
import { AttendeeId } from '../../../src/domain/attendee/model/attendee-id';
import { Name } from '../../../src/domain/attendee/model/name';
import { EmailAddress } from '../../../src/domain/attendee/model/email-address';
import { Version } from '../../../src/share/domain/version/version';

describe('Attendee', () => {
  describe('create', () => {
    it('should create an attendee with active flag set to false', () => {
      const id = AttendeeId.create('01F8MECHZX3TBDSZ7XRADM79XE');
      const name = Name.create('John Doe');
      const emailAddress = EmailAddress.create('john.doe@example.com');
      const attendee = Attendee.create(id, { name, emailAddress });

      expect(attendee.id).toEqual(id);
      expect(attendee.name).toEqual(name);
      expect(attendee.emailAddress).toEqual(emailAddress);
      expect(attendee.active).toBe(false);
    });
  });

  describe('restore', () => {
    it('should restore an attendee with given properties', () => {
      const id = AttendeeId.create('01F8MECHZX3TBDSZ7XRADM79XE');
      const name = Name.create('John Doe');
      const emailAddress = EmailAddress.create('john.doe@example.com');
      const version = Version.restore(1);
      const attendee = Attendee.restore(id, { name, emailAddress, active: true }, version);

      expect(attendee.id).toEqual(id);
      expect(attendee.name).toEqual(name);
      expect(attendee.emailAddress).toEqual(emailAddress);
      expect(attendee.active).toBe(true);
      expect(attendee.version).toEqual(version);
    });
  });

  describe('changeActive', () => {
    it('should change the active flag of an attendee', () => {
      const id = AttendeeId.create('01F8MECHZX3TBDSZ7XRADM79XE');
      const name = Name.create('John Doe');
      const emailAddress = EmailAddress.create('john.doe@example.com');
      const attendee = Attendee.create(id, { name, emailAddress });

      attendee.changeActive(true);

      expect(attendee.active).toBe(true);
    });
  });
});
