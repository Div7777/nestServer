import { IsEnum, MinLength } from 'class-validator';
export class CreateNinjaDto {
  @MinLength(4)
  name: string;

  @IsEnum(['bullet', 'panzor', 'shotgun'])
  weapon: string;
}
