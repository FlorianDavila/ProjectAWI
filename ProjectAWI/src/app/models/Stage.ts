import { Ingredient } from "./Ingredient";
import { Meal } from "./Meal";

export class Stage {
    id?: string;
    name: string | null;
    ingredients: [Ingredient, string][];
    description: string | null;
    duration: number | null;
    meal: Meal | null;

    public constructor(id:string, name?: string, ingredients?: [Ingredient, string][], description?: string, duration?: number, meal?: Meal) {
        this.id = id;
        if (name) this.name = name;
        if (ingredients) this.ingredients = ingredients;
        if (description) this.description = description;
        if (duration) this.duration = duration;
        if (meal) this.meal = meal;
    } 
}

