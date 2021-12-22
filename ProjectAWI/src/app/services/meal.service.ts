import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Meal } from '../models/Meal'; 
import { Stage } from '../models/Stage'; 

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals: Observable<Meal[]> = new Observable<Meal[]>(); 
  private path = '/Meals/';
  private projetawiStore: AngularFirestore;
  private mealsCollection: AngularFirestoreCollection<Meal>; 

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.mealsCollection = db.collection(this.path); 
    this.meals = this.getMeals();
  } 

  getMeals(): Observable<Meal[]> {
    return this.mealsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToMeal(doc))) 
    );  
  }

  addUpdateMeal(meal: Meal) {
    if (meal.id == null) { 
      meal.id = this.projetawiStore.createId() 
    }
    this.mealsCollection.doc(meal.id).set(Object.assign({}, meal));
  }

  jsonToMeal(json: any) : Meal { 
    var m = new Meal( 
      json.id,
      json.name,
      json.manager,
      json.category,
      json.nbGuests,
      json.stageList ? json.stageList : [],
      json.matS,
      json.matD
    ) 
    return m;
  }
}
