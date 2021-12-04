export class Ingredient {
    id?: string;
    name: string;
    isAllergern: boolean;
    category: string;
    price: number;
    unit: string;
    allergenCategory: string | null;
    
    public constructor(id: string, name: string, isAllergern: boolean, category: string, price: number, unit: string, allergenCategory?:string) {
        this.id = id;
        this.name = name;
        this.isAllergern = isAllergern;
        this.category = category;
        this.price = price;
        this.unit = unit;
        if (allergenCategory) this.allergenCategory = allergenCategory;
    }
}
