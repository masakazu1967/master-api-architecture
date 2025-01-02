import { Attendee } from '../../../../src/domain/attendee/model/attendee';
import { AttendeeId } from '../../../../src/domain/attendee/model/attendee-id';
import { Name } from '../../../../src/domain/attendee/model/name';
import { EmailAddress } from '../../../../src/domain/attendee/model/email-address';
import { Version } from '../../../../src/share/domain/version/version';
import { DomainError } from '../../../../src/share/domain/error/domain-error';

describe('Attendee', () => {
  describe('create', () => {
    it('should create an attendee entity successfully', () => {
      const id = AttendeeId.create('01F8MECHZX3TBDSZ7XRADM79XE');
      const name = Name.create('John Doe');
      const emailAddress = EmailAddress.create('john.doe@example.com');

      const attendee = Attendee.create(id, {
        name,
        emailAddress,
      });

      expect(attendee).toBeInstanceOf(Attendee);
    });

    it('should throw a domain error if name is invalid', () => {
      const id = AttendeeId.create('01F8MECHZX3TBDSZ7XRADM79XE');
      const name = 'A'.repeat(41); // Invalid name
      const emailAddress = EmailAddress.create('john.doe@example.com');

      expect(() => {
        Attendee.create(id, {
          name: Name.create(name),
          emailAddress,
        });
      }).toThrow(DomainError);
    });

    it('should throw a domain error if email address is invalid', () => {
      const id = AttendeeId.create('01F8MECHZX3TBDSZ7XRADM79XE');
      const name = Name.create('John Doe');
      const emailAddress = 'invalid-email'; // Invalid email

      expect(() => {
        Attendee.create(id, {
          name,
          emailAddress: EmailAddress.create(emailAddress),
        });
      }).toThrow(DomainError);
    });
  });

  describe('restore', () => {
    it('should restore an attendee entity successfully', () => {
      const id = AttendeeId.create('01F8MECHZX3TBDSZ7XRADM79XE');
      const name = Name.create('John Doe');
      const emailAddress = EmailAddress.create('john.doe@example.com');
      const version = Version.create();

      const attendee = Attendee.restore(
        id,
        {
          name,
          emailAddress,
        },
        version,
      );

      expect(attendee).toBeInstanceOf(Attendee);
    });
  });
});
