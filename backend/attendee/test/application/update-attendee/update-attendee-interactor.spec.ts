import { UpdateAttendeeInteractor } from '@/application/update-attendee/update-attendee-interactor';
import { UpdateAttendeeRequest } from '@/application/update-attendee/update-attendee-request';
import { UpdateAttendeeResponse } from '@/application/update-attendee/update-attendee-response';
import { Attendee } from '@/domain/attendee/model/attendee';
import { AttendeeId } from '@/domain/attendee/model/attendee-id';
import { EmailAddress } from '@/domain/attendee/model/email-address';
import { Name } from '@/domain/attendee/model/name';
import { AttendeeExistenceService } from '@/domain/attendee/service/attendee-existence-service';
import { AttendeeRepository } from '@/domain/attendee/service/attendee-repository';
import { ApplicationError } from '@/share/domain/error/application-error';
import { mock } from 'jest-mock-extended';

describe('UpdateAttendeeInteractor', () => {
  let interactor: UpdateAttendeeInteractor;
  let attendeeRepository: AttendeeRepository;
  let attendeeExistenceService: AttendeeExistenceService;

  beforeEach(async () => {
    attendeeRepository = mock();
    attendeeExistenceService = mock();
    interactor = new UpdateAttendeeInteractor(
      attendeeRepository,
      attendeeExistenceService,
    );
  });

  it('should update attendee name successfully', async () => {
    const attendeeId = '01F8MECHZX3TBDSZ7XRADM79XE';
    const newName = 'New Name';
    const request = new UpdateAttendeeRequest(attendeeId, newName);

    const attendee = Attendee.create(AttendeeId.create(attendeeId), {
      name: Name.create('Old Name'),
      emailAddress: EmailAddress.create('test@example.com'),
    });

    jest.spyOn(attendeeRepository, 'getById').mockResolvedValue(attendee);
    jest.spyOn(attendeeRepository, 'save').mockResolvedValue(undefined);

    const response = await interactor.execute(request);

    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(UpdateAttendeeResponse);
    if (!(response instanceof UpdateAttendeeResponse))
      fail('response is not UpdateAttendeeResponse');
    expect(response.attendeeId).toBe(attendeeId);
    expect(attendee.name.value).toBe(newName);
  });

  it('should return error if attendee not found', async () => {
    const attendeeId = '01F8MECHZX3TBDSZ7XRADM79XE';
    const newName = 'New Name';
    const request = new UpdateAttendeeRequest(attendeeId, newName);

    jest.spyOn(attendeeRepository, 'getById').mockResolvedValue(null);

    const response = await interactor.execute(request);

    expect(response).toBeInstanceOf(ApplicationError);
    expect((response as ApplicationError).message).toBe('Attendee not found');
  });

  it('should return error if failed to update attendee', async () => {
    const attendeeId = '01F8MECHZX3TBDSZ7XRADM79XE';
    const newName = 'New Name';
    const request = new UpdateAttendeeRequest(attendeeId, newName);

    const attendee = Attendee.create(AttendeeId.create(attendeeId), {
      name: Name.create('Old Name'),
      emailAddress: EmailAddress.create('test@example.com'),
    });

    jest.spyOn(attendeeRepository, 'getById').mockResolvedValue(attendee);
    jest
      .spyOn(attendeeRepository, 'save')
      .mockRejectedValue(new Error('Failed to save'));

    const response = await interactor.execute(request);

    expect(response).toBeInstanceOf(ApplicationError);
    expect((response as ApplicationError).message).toBe(
      'Failed to update attendee',
    );
  });
});
