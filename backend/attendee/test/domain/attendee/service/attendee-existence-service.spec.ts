import { Test, TestingModule } from '@nestjs/testing';
import { AttendeeExistenceService } from '../../../../src/domain/attendee/service/attendee-existence-service';
import { AttendeeRepository } from '../../../../src/domain/attendee/service/attendee-repository';
import { AttendeeFixture } from '../../../fixture/attendee.fixture';

describe('AttendeeExistenceService', () => {
  let service: AttendeeExistenceService;
  let repository: AttendeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendeeExistenceService,
        {
          provide: 'AttendeeRepository',
          useValue: {
            getByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AttendeeExistenceService>(AttendeeExistenceService);
    repository = module.get<AttendeeRepository>('AttendeeRepository');
  });

  describe('exists', () => {
    it('should return true if attendee exists', async () => {
      const attendee = AttendeeFixture.createAttendee(
        AttendeeFixture.createAttendeeId('01F8MECHZX3TBDSZ7XRADM79XE'),
        AttendeeFixture.createName('John Doe'),
        AttendeeFixture.createEmailAddress('john.doe@example.com'),
      );
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(attendee);

      const result = await service.exists(attendee);

      expect(result).toBe(true);
    });

    it('should return false if attendee does not exist', async () => {
      const attendee = AttendeeFixture.createAttendee(
        AttendeeFixture.createAttendeeId('01F8MECHZX3TBDSZ7XRADM79XE'),
        AttendeeFixture.createName('John Doe'),
        AttendeeFixture.createEmailAddress('john.doe@example.com'),
      );
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(null);

      const result = await service.exists(attendee);

      expect(result).toBe(false);
    });

    it('should handle repository errors', async () => {
      const attendee = AttendeeFixture.createAttendee(
        AttendeeFixture.createAttendeeId('01F8MECHZX3TBDSZ7XRADM79XE'),
        AttendeeFixture.createName('John Doe'),
        AttendeeFixture.createEmailAddress('john.doe@example.com'),
      );
      jest
        .spyOn(repository, 'getByEmail')
        .mockRejectedValue(new Error('Repository error'));

      await expect(service.exists(attendee)).rejects.toThrow(
        'Repository error',
      );
    });
  });
});
