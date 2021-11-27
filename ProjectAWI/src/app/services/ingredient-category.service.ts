import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  
import { IngredientCategory } from '../models/IngredientCategory';

@Injectable({
  providedIn: 'root'
})
export class IngredientCategoryService { 

  ingredientCategories: Observable<IngredientCategory[]> = new Observable<IngredientCategory[]>(); 
  private path = '/Ingredient_Categories/';
  private projetawiStore: AngularFirestore;
  private ingredientCategoriesCollection: AngularFirestoreCollection<IngredientCategory>;

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.ingredientCategoriesCollection = db.collection(this.path);
  } 
 
  getIngredientCategory(path: any): Observable<IngredientCategory> { 
    var itemDoc = this.projetawiStore.doc<IngredientCategory>(path);
    // return itemDoc.valueChanges()
    // .pipe(
    // map( ing => this.jsonToIngredientCategory(ing) )
    // );
    return itemDoc.get().pipe(
      map( ing => this.jsonToIngredientCategory(ing) )
      );
  }

  jsonToIngredientCategory(json: any) : IngredientCategory {
    return new IngredientCategory(
      json.id,
      json.name
    )
  }
}
