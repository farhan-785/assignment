import { IsString, IsInt, IsNotEmpty, ValidateIf, IsInstance } from 'class-validator';
import { Recipe } from './../recipe/recipe.entity';

export class IngredientDto {
    @ValidateIf(o => !!o.id === true)
    @IsInt()
    id: number;

    @IsInt()
    quantity: number

    @IsString()
    name: string

    @IsInt()
    price: number

    recipe: Recipe;
}