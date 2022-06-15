import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserInput} from '../user/dto/create-user.input';
import {UserNode} from '../user/entities/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {MailService} from '../shared/services/mail.service';
import {v4} from 'uuid';
import {LoginUserInput} from './dto/login-user.input';
import {compare} from 'bcrypt';
import {LoginUserResponse} from './dto/login-user.response';
import {TokenService} from './services/token.service';

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(UserNode) private readonly userRepository: Repository<UserNode>,
      private readonly mailService: MailService,
      private readonly tokenService: TokenService,
  ) {
  }

  async register(createUserInput: CreateUserInput): Promise<UserNode> {
    const candidate = await this.userRepository.findOne({email: createUserInput.email});

    if (candidate) {
      throw new HttpException(`Пользователь с почтовым адресом ${createUserInput.email} уже зарегистрирован`, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const activationLink: string = v4();

    const newUser = new UserNode();
    newUser.activationLink = activationLink;
    Object.assign(newUser, createUserInput);

    await this.mailService.sendActivationMail(newUser.email, `${process.env.API_HOST}${process.env.API_PORT}/auth/activate/${activationLink}`);
    return await this.userRepository.save(newUser);
  }

  async activate(activationLink: string) {
    const user = await this.userRepository.findOne({activationLink});

    if (!user) {
      throw new HttpException(`Неккоректная ссылка активации`, HttpStatus.BAD_REQUEST);
    }

    user.isActivated = true;
    await this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserInput): Promise<UserNode> {
    const user = await this.userRepository.findOne({email: loginUserDto.email}, {
      select: ['id', 'idNumber', 'email', 'firstName', 'lastName', 'image', 'password', 'isActivated', 'createdAt', 'updatedAt', 'role']
    });

    if (!user) {
      throw new HttpException('Пользователь с таким email не найден', HttpStatus.BAD_REQUEST);
    }

    const isPassEquals = await compare(loginUserDto.password, user.password);

    if (!isPassEquals) {
      throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
    }

    if (!user.isActivated) {
      throw new HttpException('Аккаунт не активирован. Перейдите по ссылке для активации, чтобы активировать аккаунт', HttpStatus.BAD_REQUEST);
    }

    delete user.password;
    return user;
  }

  async getCurrentUser(id: number): Promise<UserNode> {
    const currentUser = await this.userRepository.findOne(id);

    if (!currentUser) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return currentUser;
  }

  buildUserResponseForLogin(user: UserNode): LoginUserResponse {
    return {
      tokens: this.tokenService.generateTokens(user),
      user: user,
    };
  }
}
