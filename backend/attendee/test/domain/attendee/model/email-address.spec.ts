import { EmailAddress } from '../../../../src/domain/attendee/model/email-address';
import { DomainError } from '../../../../src/share/domain/error/domain-error';

describe('EmailAddress', () => {
  describe('create', () => {
    it('should create an EmailAddress value object when the value is valid', () => {
      const emailAddress = EmailAddress.create('test@example.com');
      expect(emailAddress.value).toBe('test@example.com');
    });

    it('should throw a DomainError when the value is not a valid email address', () => {
      const invalidEmail = 'invalid-email';
      expect(() => EmailAddress.create(invalidEmail)).toThrow(DomainError);
      expect(() => EmailAddress.create(invalidEmail)).toThrow(
        'Invalid email address format',
      );
    });

    it('should throw a DomainError when the value exceeds the maximum length', () => {
      const longEmail = 'a'.repeat(255) + '@example.com';
      expect(() => EmailAddress.create(longEmail)).toThrow(DomainError);
      expect(() => EmailAddress.create(longEmail)).toThrow(
        'Invalid email address format',
      );
    });

    it('should throw a DomainError when the value is empty', () => {
      expect(() => EmailAddress.create('')).toThrow(DomainError);
      expect(() => EmailAddress.create('')).toThrow(
        'Invalid email address format',
      );
    });
  });
});
