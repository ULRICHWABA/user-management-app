import { IsNotEmpty, IsString, IsDateString, IsMilitaryTime } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  heure: string;
}
