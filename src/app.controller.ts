import { Controller, Get, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { AppSession } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() session: AppSession): string {
    session.userId = 123;
    return this.appService.getHello();
  }

  @Get('/foo')
  clearSession(
    @Session() session: AppSession,
    @Res({ passthrough: true }) response: Response,
  ): string {
    session.destroy((err) => {
      console.log(err);
    });
    response.clearCookie('qid');
    return 'hi';
  }

  @Get('/bar')
  getUser(@Session() session: AppSession) {
    return session.userId;
  }
}
