import { Meal } from "./Meal";

export class Stage {
    id: string;
    name: string | null;
    ingredientDict: {};
    description: string | null;
    duration: number | null;
    meal: Meal | null;

    public constructor(id:string, name?: string, ingredientDict?: {}, description?: string, duration?: number, meal?: Meal) {
        this.id = id;
        if (name) this.name = name;
        if (ingredientDict) this.ingredientDict = ingredientDict;
        if (description) this.description = description;
        if (duration) this.duration = duration;
        if (meal) this.meal = meal;
    } 
}

