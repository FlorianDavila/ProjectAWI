import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AllergenCategory } from '../models/AllergenCategory';

@Injectable({
  providedIn: 'root'
})
export class AllergenCategoryService {

  allergenCategories: Observable<AllergenCategory[]> = new Observable<AllergenCategory[]>(); 
  private path = '/Allergen_Categories/';
  private projetawiStore: AngularFirestore;
  private allergenCategoriesCollection: AngularFirestoreCollection<AllergenCategory>; 

  constructor(private db: AngularFirestore) {
    this.projetawiStore = db;
    this.allergenCategoriesCollection = db.collection(this.path); 
  } 

  getAllergenCategories(): Observable<AllergenCategory[]> {
    return this.allergenCategoriesCollection
    .valueChanges({ idField: "id" }).pipe(
    map(data => data.map(doc => this.jsonToAllergenCategory(doc))) 
    ); 
  }

  jsonToAllergenCategory(json: any) : AllergenCategory {   
    return new AllergenCategory( 
      json.id,
      json.name
    )
  }
}