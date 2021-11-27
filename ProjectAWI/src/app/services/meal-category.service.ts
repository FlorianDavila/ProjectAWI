import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { MealCategory } from '../models/MealCategory';

@Injectable({
  providedIn: 'root'
})
export class MealCategoryService {

  mealCategories: Observable<MealCategory[]> = new Observable<MealCategory[]>(); 
  private path = '/Meal_Category/';
  private projetawiStore: AngularFirestore;
  private mealCategoriesCollection: AngularFirestoreCollection<MealCategory>; 

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.mealCategoriesCollection = db.collection(this.path); 
  } 

  getMealCategories(): Observable<MealCategory[]> {
    return this.mealCategoriesCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToMealCategory(doc))) 
    ); 
  }

  jsonToMealCategory(json: any) : MealCategory {   
    return new MealCategory( 
      json.id,
      json.name
    )
  }
}
