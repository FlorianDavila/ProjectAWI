import { Component, Input } from '@angular/core'; 
import { Ingredient } from 'src/app/models/Ingredient';
 
@Component({
  selector: 'ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css'],
})
export class IngredientFormComponent {   
  quantityInput: string; 
  foods: Ingredient[] = [
    { id: 'ing', name: 'Ingrédients...',  unit: 'u.',isAllergern: false, category: "ic", price: 0, allergenCategory: null },
    { id: 'steak-0', name: 'Steak', unit: 'L', isAllergern: false, category: "ic", price: 0, allergenCategory: null },
    { id: 'pizza-1', name: 'Pizza', unit: 'kg', isAllergern: false, category: "ic", price: 0, allergenCategory: null },
    { id: 'tacos-2', name: 'Tacos', unit: 'L', isAllergern: false, category: "ic", price: 0, allergenCategory: null },
  ];
  selectedFood = this.foods[0];

  onKey(event: any) { // without type info
    this.quantityInput = event.target.value;
  }

  onChange(val: Ingredient) {  
    this.selectedFood = val;
  }
} 