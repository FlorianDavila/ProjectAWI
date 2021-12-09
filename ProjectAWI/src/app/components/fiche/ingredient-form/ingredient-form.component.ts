import { Component, OnInit } from '@angular/core'; 
import { map } from '@firebase/util';
import { Observable, tap } from 'rxjs';
import { Ingredient } from 'src/app/models/Ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
 
@Component({
  selector: 'ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css'],
})
export class IngredientFormComponent implements OnInit {   
  quantityInput: string; 
  defaultOption: Ingredient = { id: 'ing', name: 'Ingrédients...',  unit: 'u.',isAllergern: false, category: "ic", price: 0, allergenCategory: null }
  //ingredients: Ingredient[] = [this.defaultOption];
  ingredients: Observable<Ingredient[]>;
  selectedIng = this.defaultOption; 

  public constructor (public ingredientService: IngredientService) {}

  ngOnInit() {
    this.initIngredients();
  }

  onKey(event: any) { // without type info
    this.quantityInput = event.target.value;
  }

  initIngredients() {
    // this.ingredients.push(
    //   { id: 'steak-0', name: 'Steak', unit: 'L', isAllergern: false, category: "ic", price: 0, allergenCategory: null },
    //   { id: 'pizza-1', name: 'Pizza', unit: 'kg', isAllergern: false, category: "ic", price: 0, allergenCategory: null },
    //   { id: 'tacos-2', name: 'Tacos', unit: 'L', isAllergern: false, category: "ic", price: 0, allergenCategory: null },
    // );
    this.ingredients = this.ingredientService.ingredients;
    this.ingredients.pipe(tap(ings => {
      ings.unshift(this.defaultOption);
    }));  
  }

  onChange(val: Ingredient) {  
    this.selectedIng = val;
  }
} 