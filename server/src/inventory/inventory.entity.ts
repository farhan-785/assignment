import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeItem } from './../recipe.item/recipe.item.entity';
import { Ingredient } from "../ingredient/ingredient.entity";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string

    @Column('int')
    price: number;

    @Column({ length: '10' })
    unit: string;
}