import { IsString, IsInt, IsNotEmpty, ValidateIf, IsInstance, IsArray, ValidateNested } from 'class-validator';
import { RecipeItem } from "../recipe.item/recipe.item.entity";

export class RecipeDto {
    @ValidateIf(o => !!o.id === true)
    @IsInt()
    id: number;

    @IsArray()
    recipeItems: RecipeItem[];
}