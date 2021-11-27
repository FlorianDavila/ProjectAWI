import { IngredientCategory } from "./IngredientCategory";

export class Ingredient {
    id: string;
    name: string;
    isAllergern: boolean;
    category: IngredientCategory;
    price: number;
    unit: string;
    
    public constructor(id: string, name: string, isAllergern: boolean, category: IngredientCategory, price: number, unit: string) {
        this.id = id;
        this.name = name;
        this.isAllergern = isAllergern;
        this.category = category;
        this.price = price;
        this.unit = unit;
    }
}
