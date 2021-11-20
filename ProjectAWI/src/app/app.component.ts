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
  ingredients: Observable<Ingredient[]> = new Observable<Ingredient[]>();
  constructor(public ingrdientsService: IngredientService) {}

  ngOnInit(): void {
    this.ingredients = this.ingrdientsService.getIngredients();
  }
}
