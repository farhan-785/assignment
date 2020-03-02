import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { MenuController } from './menu.controller';
import { RecipeModule } from './../recipe/recipe.module'
import { CostService } from './../cost/cost.service';
import { Ingredient } from './../ingredient/ingredient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Menu, Ingredient])],
    controllers: [MenuController],
    providers: [MenuService, CostService],
    exports: [TypeOrmModule, MenuService]
})

export class MenuModule {
}