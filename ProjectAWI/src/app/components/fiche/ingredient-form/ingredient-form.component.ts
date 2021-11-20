import { Component, Input } from '@angular/core'; 

interface Food {
  value: string;
  viewValue: string;
  unit: string;
}

@Component({
  selector: 'ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css'],
})
export class IngredientFormComponent {   
  quantityInput: string;
  ingredientInput: Food;
  foods: Food[] = [
    { value: 'ing', viewValue: 'Ingrédients...', unit: 'u.' },
    { value: 'steak-0', viewValue: 'Steak', unit: 'L' },
    { value: 'pizza-1', viewValue: 'Pizza', unit: 'kg' },
    { value: 'tacos-2', viewValue: 'Tacos', unit: 'L' },
  ];
  selectedFood = this.foods[0];

  onKey(event: any) { // without type info
    this.quantityInput = event.target.value;
  }

  onChange(val: Food) {
    this.ingredientInput = val; 
  }
} 