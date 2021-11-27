import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Stage } from '../models/Stage';
import { MealService } from './meal.service';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  stages: Observable<Stage[]> = new Observable<Stage[]>(); 
  private path = '/Stage/';
  private projetawiStore: AngularFirestore;
  private mealsCollection: AngularFirestoreCollection<Stage>;
  private mealService: MealService;

  constructor(private db: AngularFirestore, mealService: MealService) {
    this.projetawiStore = db;
    this.mealsCollection = db.collection(this.path);
    this.mealService = mealService;
  } 

  getStages(): Observable<Stage[]> {
    return this.mealsCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToStage(doc))) 
    ); 
  }

  jsonToStage(json: any) : Stage {   
    return new Stage( 
      json.id,
      json.name,
      json.ingredientDict,
      json.description,
      json.duration,
      json.meal
    )
  }
}