import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Allergen } from '../models/Allergen';
import { AllergenCategoryService } from './allergen-category.service';

@Injectable({
  providedIn: 'root'
})
export class AllergenService {

  allergens: Observable<Allergen[]> = new Observable<Allergen[]>(); 
  private path = '/Stage/';
  private projetawiStore: AngularFirestore;
  private allergensCollection: AngularFirestoreCollection<Allergen>;
  private allergenCategoryService: AllergenCategoryService;

  constructor(private db: AngularFirestore, allergenCategoryService: AllergenCategoryService) {
    this.projetawiStore = db;
    this.allergensCollection = db.collection(this.path);
    this.allergenCategoryService = allergenCategoryService;
  } 

  getAllergens(): Observable<Allergen[]> {
    return this.allergensCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToAllergen(doc))) 
    ); 
  }

  jsonToAllergen(json: any) : Allergen {   
    return new Allergen( 
      json.id,
      json.name,
      json.category
    )
  }
}