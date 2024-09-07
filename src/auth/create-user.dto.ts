
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../user/user.schema';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  nom: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  prenom: string;

  @IsEmail()
  email: string;

  @Matches(/^(\+237)?(6[579][0-9]{7})$/)
  numero_de_telephone: string;

  @IsString()  // Ajout du validateur de type
  @IsNotEmpty()
  @MinLength(8)
  mot_de_passe: string;

  @IsEnum(UserRole)
  role: UserRole;
}
