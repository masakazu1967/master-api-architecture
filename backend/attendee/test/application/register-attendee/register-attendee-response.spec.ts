import { RegisterAttendeeResponse } from '../../../src/application/register-attendee/register-attendee-response';

describe('RegisterAttendeeResponse', () => {
  it('should create a RegisterAttendeeResponse instance successfully', () => {
    const attendeeId = '01F8MECHZX3TBDSZ7XRADM79XE';
    const response = new RegisterAttendeeResponse(attendeeId);

    expect(response).toBeInstanceOf(RegisterAttendeeResponse);
    expect(response.attendeeId).toBe(attendeeId);
  });

  it('should handle validation errors', () => {
    const invalidAttendeeId = '';
    expect(() => new RegisterAttendeeResponse(invalidAttendeeId)).toThrow();
  });
});
