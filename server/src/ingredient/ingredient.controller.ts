import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
    BadRequestException, UsePipes
} from '@nestjs/common';
import { IngredientService } from './../ingredient/ingredient.service';
import { Ingredient } from './../ingredient/ingredient.entity';
import { IngredientDto } from './../ingredient/ingredient.dto';
import { ValidationPipe } from "./../validation/validation.pipe";

@Controller('ingredients')
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {
    }

    @Get()
    getIngredientList(): Promise<Ingredient[]> {
        return this.ingredientService.findAll();
    }

    @Get(':id')
    async getIngredient(@Param('id') id: number): Promise<Ingredient> {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        const ingredient: Ingredient = await this.ingredientService.find(id);
        if (!ingredient)
            throw new NotFoundException();
        return ingredient;
    }

    @Get(':id/cost')
    async getMenuCost(@Param('id') id: number): Promise<any> {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        const cost = await this.ingredientService.calculateCost(id);
        return { cost };
    }

    @Post()
    @Post()
    @UsePipes(ValidationPipe)
    addIngredient(@Body() ingredient: IngredientDto): Promise<Ingredient> {
        return this.ingredientService.addIngredient(ingredient);
    }

    @Put(':id')
    async updateIngredient(@Body() ingredient: Ingredient, @Param('id') id: number): Promise<Ingredient> {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        return this.ingredientService.updateIngredient(id, ingredient);
    }

    @Delete(':id')
    async removeIngredient(@Param('id') id: number): Promise<any> {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        await this.ingredientService.removeIngredient(id);
    }


}