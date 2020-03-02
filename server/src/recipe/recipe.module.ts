import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { RecipeItemModule } from './../recipe.item/recipe.item.module';

@Module({
    imports: [RecipeItemModule, TypeOrmModule.forFeature([Recipe])],
    providers: [RecipeService],
    exports: [RecipeService],
})
export class RecipeModule {
}