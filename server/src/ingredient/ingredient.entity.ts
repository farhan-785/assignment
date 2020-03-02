import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    unit: string

    @Column({ length: 50 })
    name: string

    @OneToOne(type => Recipe, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
    @JoinColumn()
    recipe: Recipe;
}