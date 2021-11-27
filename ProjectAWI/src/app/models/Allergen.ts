import { AllergenCategory } from "./AllergenCategory";

export class Allergen {
    id: string;
    name: string;
    category: AllergenCategory;

    public constructor(id: string, name: string, category: AllergenCategory) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}

