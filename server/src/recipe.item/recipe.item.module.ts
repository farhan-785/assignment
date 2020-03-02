import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeItemService } from './recipe.item.service';
import { RecipeItem } from './recipe.item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RecipeItem])],
    providers: [RecipeItemService,],
    exports: [RecipeItemService]
})
export class RecipeItemModule {
}