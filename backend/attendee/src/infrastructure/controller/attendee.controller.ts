import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Patch,
  Param,
  Inject,
} from '@nestjs/common';
import { RegisterAttendeeUsecase } from '../../application/register-attendee/register-attendee-usecase';
import { RegisterAttendeeRequest } from '../../application/register-attendee/register-attendee-request';
import { RegisterAttendeeResponse } from '../../application/register-attendee/register-attendee-response';
import { UpdateAttendeeUsecase } from '../../application/update-attendee/update-attendee-usecase';
import { UpdateAttendeeRequest } from '../../application/update-attendee/update-attendee-request';
import { UpdateAttendeeResponse } from '../../application/update-attendee/update-attendee-response';
import { ApplicationError } from '../../share/domain/error/application-error';

/**
 * 出席者コントローラクラス
 * 出席者に関するAPIエンドポイントを提供する
 */
@Controller('attendees')
export class AttendeeController {
  constructor(
    @Inject('RegisterAttendeeUsecase')
    private readonly registerAttendeeUsecase: RegisterAttendeeUsecase,
    @Inject('UpdateAttendeeUsecase')
    private readonly updateAttendeeUsecase: UpdateAttendeeUsecase,
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

  /**
   * 出席者の名前を更新する
   * @param id 出席者ID
   * @param requestBody 出席者更新リクエストボディ
   * @returns 出席者更新レスポンス
   */
  @Patch(':id')
  async updateAttendee(
    @Param('id') id: string,
    @Body() requestBody: { name: string },
  ): Promise<UpdateAttendeeResponse> {
    const request = new UpdateAttendeeRequest(id, requestBody.name);
    const response = await this.updateAttendeeUsecase.execute(request);
    if (response instanceof ApplicationError) {
      throw new BadRequestException(response.message);
    }
    return response;
  }
}
