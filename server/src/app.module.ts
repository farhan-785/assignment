import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './menu/menu.module';
import { RecipeModule } from './recipe/recipe.module';
import { InventoryModule } from './inventory/inventory.module';
import { IngredientModule } from './ingredient/ingredient.module';


@Module({
    imports: [
        MenuModule,
        RecipeModule,
        InventoryModule,
        IngredientModule,
        TypeOrmModule.forRoot()
    ]
})
export class AppModule {
}
