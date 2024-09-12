
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../user/user.schema';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom est requis' })
  @Length(1, 255, { message: 'Le nom doit contenir entre 1 et 255 caractères' })
  nom: string;

  @IsNotEmpty({ message: 'Le prénom est requis' })
  @Length(1, 255, { message: 'Le prénom doit contenir entre 1 et 255 caractères' })
  prenom: string;

  @IsNotEmpty({ message: 'L\'email est requis' })
  @IsEmail({}, { message: 'L\'email doit être valide le q' })
  email: string;

  @IsNotEmpty({ message: 'Le numéro de téléphone est requis' })
  @Matches(/^(\+237)\s?(6[5789][0-9]{7})$/, {
    message: 'Le numéro de téléphone doit être valide (donc un numero orange ) et commencer par +237 (esempio: +237 694940296 ) ',
  })
  numero_de_telephone: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @Length(6, 255, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  mot_de_passe: string;

  @IsEnum(UserRole, { message: 'Le rôle doit être valide (admin, user, ou moderator)' })
  role: UserRole;
}
