import { IsString, IsInt, IsNotEmpty, Min, Max, ValidateIf } from 'class-validator';
import { Column } from "typeorm";

export class InventoryDto {
    @ValidateIf(o => !!o.id === true)
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string

    @IsInt()
    @Min(1)
    @Max(9999)
    price: number;

    @IsString()
    @IsNotEmpty()
    unit: string;
}