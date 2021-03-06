import { Component, OnInit } from '@angular/core'; 
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
  defaultOption: Ingredient = { name: 'Ingrédients...', isAllergen: false, category: "ic", price: "0",  unit: 'u.', stock: 0, allergenCategory: null, id: 'ing' } 
  ingredients: Observable<Ingredient[]>;
  selectedIng = this.defaultOption;  

  public constructor (public ingredientService: IngredientService) {}

  ngOnInit() {
    this.initIngredients();
  }

  onKey(event: any) {
    this.quantityInput = event.target.value;
  }

  initIngredients() { 
    this.ingredients = this.ingredientService.ingredients;
    this.ingredients.pipe(tap(ings => {
      ings.unshift(this.defaultOption);
    }));  
  } 
} 