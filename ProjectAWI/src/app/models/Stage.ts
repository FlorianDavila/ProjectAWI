import { Meal } from "./Meal";

export class Stage {
    id: string | null;
    name: string | null;
    ingredients: {};
    description: string | null;
    duration: number | null;
    meal: Meal | null;

    public constructor(id:string, name?: string, ingredients?: {}, description?: string, duration?: number, meal?: Meal) {
        this.id = id ? id : null;
        if (name) this.name = name;
        if (ingredients) this.ingredients = ingredients;
        if (description) this.description = description;
        if (duration) this.duration = duration;
        if (meal) this.meal = meal;
    } 
}

