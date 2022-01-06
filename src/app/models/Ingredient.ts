export class Ingredient {
    id?: string;
    name: string;
    isAllergen: boolean;
    category: string;
    price: string;
    unit: string;
    stock : number;
    allergenCategory: string | null;
    
    public constructor(name: string, isAllergern: boolean, category: string, price: string, unit: string, stock : number, allergenCategory?:string, id?: string) {
        if (id) this.id = id;
        this.name = name;
        this.isAllergen = isAllergern;
        this.category = category;
        this.price = price;
        this.unit = unit;
        this.stock = stock;
        if (allergenCategory) this.allergenCategory = allergenCategory;
    }
}
