import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RegisterAttendeeUsecase } from '../../application/register-attendee/register-attendee-usecase';
import { RegisterAttendeeRequest } from '../../application/register-attendee/register-attendee-request';
import { RegisterAttendeeResponse } from '../../application/register-attendee/register-attendee-response';
import { ApplicationError } from '../../share/domain/error/application-error';

/**
 * 出席者コントローラクラス
 * 出席者に関するAPIエンドポイントを提供する
 */
@Controller('attendees')
export class AttendeeController {
  constructor(
    private readonly registerAttendeeUsecase: RegisterAttendeeUsecase,
  ) {}

  /**
   * 出席者を登録する
   * @param requestBody 出席者登録リクエストボディ
   * @returns 出席者登録レスポンス
   */
  @Post()
  async registerAttendee(
    @Body() requestBody: { name: string; emailAddress: string },
  ): Promise<RegisterAttendeeResponse> {
    const request = new RegisterAttendeeRequest(
      requestBody.name,
      requestBody.emailAddress,
    );
    const response = await this.registerAttendeeUsecase.execute(request);
    if (response instanceof ApplicationError) {
      throw new BadRequestException(response.message);
    }
    return response;
  }
}
