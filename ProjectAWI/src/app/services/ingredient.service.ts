import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  
import { Ingredient } from '../models/Ingredient';
import { IngredientCategoryService } from './ingredient-category.service';
import { IngredientCategory } from '../models/IngredientCategory';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredients: Observable<Ingredient[]> = new Observable<Ingredient[]>(); 
  private path = '/Ingredients/';
  private projetawiStore: AngularFirestore;
  private ingredientsCollection: AngularFirestoreCollection<Ingredient>;
  private ingredientCategoryService: IngredientCategoryService;

  constructor(private db: AngularFirestore, ingredientCategoryService: IngredientCategoryService) {
    this.projetawiStore = db;
    this.ingredientsCollection = db.collection(this.path);
    this.ingredientCategoryService = ingredientCategoryService;
  } 
 
  getIngredients(): Observable<Ingredient[]> {
    return this.ingredientsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToIngredient(doc))) 
    ); 
  }

  jsonToIngredient(json: any) : Ingredient { 
    var ic!: IngredientCategory; 
    

    if (json.ingredient_category) { 
      var itemDoc = this.projetawiStore.doc<IngredientCategory>(json.ingredient_category);
      //itemDoc.get().then(res => {}); //path to ingredient category  
    }

    console.log(ic);
    return new Ingredient(
      json.id,
      json.name,
      json.isAllergern,
      ic,
      json.price,
      json.unit
    )
  }
}
