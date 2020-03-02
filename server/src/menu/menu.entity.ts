import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Recipe } from './../recipe/recipe.entity';

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string

    @Column('int')
    price: number;

    @Column('int')
    quantity: number;

    @OneToOne(type => Recipe, { cascade: ['insert', 'update'] , onDelete: 'CASCADE'})
    @JoinColumn()
    recipe: Recipe;
}