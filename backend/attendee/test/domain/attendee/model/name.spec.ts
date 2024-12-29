import { Name } from '../../../../src/domain/attendee/model/name';
import { DomainError } from '../../../../src/share/domain/error/domain-error';

describe('Name', () => {
  describe('create', () => {
    it('should create a Name value object when the value is valid', () => {
      const name = Name.create('John Doe');
      expect(name.value).toBe('John Doe');
    });

    it('should throw a DomainError when the value exceeds the maximum length', () => {
      const longName = 'a'.repeat(41);
      expect(() => Name.create(longName)).toThrow(DomainError);
      expect(() => Name.create(longName)).toThrow(
        '名前は40文字以下で入力してください。',
      );
    });

    it('should throw a DomainError when the value is empty', () => {
      expect(() => Name.create('')).toThrow(DomainError);
      expect(() => Name.create('')).toThrow('名前は40文字以下で入力してください。');
    });
  });
});
