import { IsString, IsInt, IsNotEmpty, ValidateIf, IsInstance } from 'class-validator';
import { Recipe } from './../recipe/recipe.entity';

export class IngredientDto {
    @ValidateIf(o => !!o.id === true)
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    unit: string

    @IsString()
    name: string

    recipe: Recipe;
}

