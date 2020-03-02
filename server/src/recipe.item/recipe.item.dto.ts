import { IsString, IsInt, IsNotEmpty, ValidateIf, IsInstance, IsArray, ValidateNested } from 'class-validator';
import { Inventory } from '../inventory/inventory.entity';
import { Ingredient } from '../ingredient/ingredient.entity';

export class RecipeItemDto {
    @ValidateIf(o => !!o.id === true)
    @IsInt()
    id: number;

    @IsInt()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    unit: string;

    @IsArray()
    @ValidateNested()
    inventoryItem: Inventory[];

    @IsArray()
    @ValidateNested()
    ingredient: Ingredient[];
}