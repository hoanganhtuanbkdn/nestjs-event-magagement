import { ApiProperty } from '@nestjs/swagger';

import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Validate,
} from 'class-validator';
// import { IsUserAlreadyExist } from '../../user/is-user-already-exist.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  // @Validate(IsUserAlreadyExist)
  readonly email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
