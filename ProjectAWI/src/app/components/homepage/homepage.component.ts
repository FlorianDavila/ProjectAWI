import { Component, OnInit } from '@angular/core'; 
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit { 
  constructor(public ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.ingredientService.ingredients = this.ingredientService.getIngredients();
  } 
}
