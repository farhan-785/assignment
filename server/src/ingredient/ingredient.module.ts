import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './ingredient.entity';
import { IngredientController } from './ingredient.controller';
import { RecipeItem } from './../recipe.item/recipe.item.entity';
import { CostService } from './../cost/cost.service';

@Module({
    imports: [TypeOrmModule.forFeature([Ingredient, RecipeItem])],
    controllers: [IngredientController],
    providers: [IngredientService, CostService],
    exports: [TypeOrmModule, IngredientService]
})

export class IngredientModule {
}