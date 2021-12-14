import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Meal } from '../models/Meal'; 
import { Stage } from '../models/Stage';
import { StageService } from './stage.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals: Observable<Meal[]> = new Observable<Meal[]>(); 
  private path = '/Meals/';
  private projetawiStore: AngularFirestore;
  private mealsCollection: AngularFirestoreCollection<Meal>;
  private stageService: StageService; 

  constructor(private db: AngularFirestore, stageService: StageService) {
    this.projetawiStore = db;
    this.mealsCollection = db.collection(this.path);
    this.stageService = stageService; 
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
    var stages: Stage[] = []  
    json.stageList =
    new Ingredient(
      json.id,
      json.name,
      json.isAllergern,
      json.category,
      json.price,
      json.unit
    );
    
    var stages: Stage[] = []  
    json.stageList.forEach((element: { id: string; name: string | undefined; ingredientDict: {} | undefined; description: string | undefined; duration: number | undefined; meal: Meal | undefined; }) => {
      var stage = new Stage( 
        element.id,
        element.name,
        element.ingredientDict,
        element.description,
        element.duration,
        element.meal
      );
      stages.push(stage)
    }); 
    return new Meal( 
      json.id,
      json.name,
      json.manager,
      json.category,
      json.nbGuests,
      stages
    )
  }
}
