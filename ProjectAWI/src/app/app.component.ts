import { Component } from '@angular/core'; 
import { Observable } from 'rxjs';
import { Ingredient } from './models/Ingredient'; 
import { IngredientService } from './services/ingredient.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent {
  constructor(public ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.ingredientService.ingredients = this.ingredientService.getIngredients();
  }
}
