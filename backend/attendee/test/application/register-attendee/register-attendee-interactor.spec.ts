import { ApplicationError } from '../../../src/share/domain/error/application-error';
import { RegisterAttendeeInteractor } from '../../../src/application/register-attendee/register-attendee-interactor';
import { RegisterAttendeeRequest } from '../../../src/application/register-attendee/register-attendee-request';
import { RegisterAttendeeResponse } from '../../../src/application/register-attendee/register-attendee-response';
import { AttendeeRepository } from '../../../src/domain/attendee/service/attendee-repository';
import { AttendeeIdGenerator } from '../../../src/domain/attendee/service/attendee-id-generator';
import { AttendeeExistenceService } from '../../../src/domain/attendee/service/attendee-existence-service';
import { Name } from '../../../src/domain/attendee/model/name';
import { EmailAddress } from '../../../src/domain/attendee/model/email-address';
import { AttendeeFixture } from '../../fixture/attendee.fixture';
import { mock } from 'jest-mock-extended';

describe('RegisterAttendeeInteractor', () => {
  let interactor: RegisterAttendeeInteractor;
  let attendeeRepository: AttendeeRepository;
  let attendeeIdGenerator: AttendeeIdGenerator;
  let attendeeExistenceService: AttendeeExistenceService;

  beforeEach(async () => {
    attendeeRepository = mock();
    attendeeIdGenerator = mock();
    attendeeExistenceService = mock();
    interactor = new RegisterAttendeeInteractor(
      attendeeRepository,
      attendeeIdGenerator,
      attendeeExistenceService,
    );
  });

  describe('execute', () => {
    it('should successfully register an attendee', async () => {
      const request = new RegisterAttendeeRequest(
        'John Doe',
        'john.doe@example.com',
      );
      const attendeeId = AttendeeFixture.createAttendeeId(
        '01F8MECHZX3TBDSZ7XRADM79XE',
      );
      const name = Name.create('John Doe');
      const emailAddress = EmailAddress.create('john.doe@example.com');
      const attendee = AttendeeFixture.createAttendee(
        attendeeId,
        name,
        emailAddress,
      );

      jest.spyOn(attendeeIdGenerator, 'generate').mockReturnValue(attendeeId);
      jest.spyOn(attendeeExistenceService, 'exists').mockResolvedValue(false);
      jest.spyOn(attendeeRepository, 'save').mockResolvedValue();

      const result = await interactor.execute(request);

      expect(result).toEqual(new RegisterAttendeeResponse(attendeeId.value));
      expect(attendeeIdGenerator.generate).toHaveBeenCalled();
      expect(attendeeExistenceService.exists).toHaveBeenCalledWith(attendee);
      expect(attendeeRepository.save).toHaveBeenCalledWith(attendee);
    });

    it('should return an error if the name is invalid', async () => {
      const request = new RegisterAttendeeRequest('', 'john.doe@example.com');

      try {
        await interactor.execute(request);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationError);
        expect(error.message).toBe('Invalid name');
      }
    });

    it('should return an error if the email address is invalid', async () => {
      const request = new RegisterAttendeeRequest('John Doe', 'invalid-email');

      try {
        await interactor.execute(request);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationError);
        expect(error.message).toBe('Invalid email address');
      }
    });

    it('should return an error if the attendee already exists', async () => {
      const request = new RegisterAttendeeRequest(
        'John Doe',
        'john.doe@example.com',
      );
      const attendeeId = AttendeeFixture.createAttendeeId(
        '01F8MECHZX3TBDSZ7XRADM79XE',
      );
      const name = Name.create('John Doe');
      const emailAddress = EmailAddress.create('john.doe@example.com');
      const attendee = AttendeeFixture.createAttendee(
        attendeeId,
        name,
        emailAddress,
      );

      jest.spyOn(attendeeIdGenerator, 'generate').mockReturnValue(attendeeId);
      jest.spyOn(attendeeExistenceService, 'exists').mockResolvedValue(true);

      try {
        await interactor.execute(request);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationError);
        expect(error.message).toBe('Attendee already exists');
        expect(attendeeIdGenerator.generate).toHaveBeenCalled();
        expect(attendeeExistenceService.exists).toHaveBeenCalledWith(attendee);
        expect(attendeeRepository.save).not.toHaveBeenCalled();
      }
    });
  });
});
