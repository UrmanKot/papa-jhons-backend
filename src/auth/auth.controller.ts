import {Controller, Get, Param, Redirect, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
  ) {
  }

  @Get('activate/:link')
  @UsePipes(new ValidationPipe())
  @Redirect('https://yandex.ru', 302)
  async activate(@Param('link') activationLink: string): Promise<{ message: string }> {
    await this.authService.activate(activationLink);
    return {message: 'Вы успешно подтвердили адрес электронной почты'};
  }
}
