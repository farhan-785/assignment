import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Recipe } from './../recipe/recipe.entity';

@Entity()
export class RecipeItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    quantity: number;

    @Column({ length: 10 })
    unit: string;

    @ManyToMany(type => Inventory, { cascade: false, onDelete: 'CASCADE' })
    @JoinTable()
    inventoryItem: Inventory[];

    @ManyToMany(type => Ingredient, { cascade: false, onDelete: 'CASCADE' })
    @JoinTable()
    ingredient: Ingredient[];

    @ManyToOne(type => Recipe, recipe => recipe.recipeItems, { cascade: false, onDelete: 'CASCADE' })
    recipe: Recipe;
}