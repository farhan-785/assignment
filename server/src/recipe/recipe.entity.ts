import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { RecipeItem } from '../recipe.item/recipe.item.entity';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => RecipeItem, recipeItem => recipeItem.recipe, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE'
    })
    recipeItems: RecipeItem[];
}