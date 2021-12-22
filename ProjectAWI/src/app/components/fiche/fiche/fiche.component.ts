import { Component, ComponentFactoryResolver, ComponentRef, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'; 
import { Stage } from 'src/app/models/Stage';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component'; 
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Ingredient } from 'src/app/models/Ingredient';
import { MatDialog } from '@angular/material/dialog';
import { StageDeleteComponent } from '../../../dialogs/stage-delete.component'; 

import { IngredientService } from 'src/app/services/ingredient.service';
import { Meal } from 'src/app/models/Meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent { 
  displayStageList = false;
  displayErrorMessageI = false;
  displayErrorMessageTA = false;
  displayErrorMessageNoName = false;
  infoForm: FormGroup;
  listIngredientsForm = new Array<ComponentRef<IngredientFormComponent>>();  
  listStages:  Array<Stage>;   
  stageForm: FormGroup; 
  selectedExistingMeal: Meal;
  mealSelectedGroup: FormControl = new FormControl();

  @ViewChild('parent', { read: ViewContainerRef })
  target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private formBuilder: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver, public dialog: MatDialog, public ingredientService: IngredientService, public mealService: MealService) {
    this.infoForm = this.formBuilder.group({
      name: '',
      nbGuests: '',
      manager: '',
      category: 'Entrée',
      matS: '',
      matD: ''
    });
    this.stageForm = this.formBuilder.group({
      stageName: '',
      stageBody: '',
      stageDuration: ''
    }); 
    this.listStages = new Array<Stage>()
  }
  
  ngOnInit(): void {  
  } 

  onSubmitForm(): void {  
    const formValue = this.infoForm.value;
    const name = formValue['name'];
    const nbGuests = formValue['nbGuests'];
    const manager = formValue['manager'];
    const category = formValue['category']; 
    const matS = formValue['matS']; 
    const matD = formValue['matD']; 
  
    if (!name ||!nbGuests || !manager || !category) return;

    var stages: any[] = [];
    this.listStages.forEach(s => { 
      var toPush = { name: s.name, ingredients: s.ingredients, description: s.description, duration: s.duration }
      stages.push(toPush);
    });

    var meal = new Meal(null, name, manager, category, nbGuests, stages, matS, matD);  
    this.mealService.addUpdateMeal(meal); 

    this.infoForm.reset();
    this.resetInputs()
    this.listStages = []
  }

  addIngredientForm(): void {  
    if (this.listIngredientsForm.length == 0)
      this.add();
    else {
      const ing = this.listIngredientsForm[this.listIngredientsForm.length - 1].instance;
      if (ing.selectedIng.name == "Ingrédients..." || ing.quantityInput == undefined || ing.quantityInput == null) { 
        this.displayErrorMessageI = true;
      } 
      else { 
        this.add();
        this.displayErrorMessageI = false;
      }
    } 
  } 

  private add(): void { 
    const childComponent = this.componentFactoryResolver.resolveComponentFactory(IngredientFormComponent); 
    this.componentRef = this.target.createComponent(childComponent); 
    this.listIngredientsForm.push(this.componentRef);  
  }

  onValidateStage() {     
    if (!this.displayStageList) this.displayStageList = true;
    this.displayErrorMessageTA = false;
    this.displayErrorMessageI = false;
    this.displayErrorMessageNoName = false; 

    const formValue = this.stageForm.value;
    var name = formValue['stageName'];
    var body = formValue['stageBody'];
    var duration = formValue['stageDuration'];
    if (!this.checkFields(name, body)) return;

    var ret = false;
    var ingredients : {name: string, unit: string, quantity: string}[] = [];  
    this.listIngredientsForm.forEach(element => { 
      if (element.instance.quantityInput != undefined && element.instance.quantityInput != "" && element.instance.selectedIng.name != "Ingrédients...") {
        var i = {
          name: element.instance.selectedIng.name,
          unit: element.instance.selectedIng.unit,
          quantity: element.instance.quantityInput
        };
        ingredients.push(i);
      }  
      else {
        this.displayErrorMessageI = true;
        ret = true;
      }
    });   

    if (ret) return;

    var stage = new Stage(null, name, ingredients, body, duration);
    this.listStages.push(stage); 

    this.resetInputs(); 
  }

  onValidateExistingStage() {
    if (!this.displayStageList) this.displayStageList = true;
    this.selectedExistingMeal.stageList.forEach(element => {
      var stage = new Stage(
        null, 
        element.name ? element.name : "", 
        element.ingredients ? element.ingredients : {}, 
        element.description ? element.description : "",
        element.duration ? element.duration : null
      );
      this.listStages.push(stage);   
    }); 
    this.resetInputs(); 
  }

  resetInputs() { 
    this.target.clear(); 
    this.listIngredientsForm = [];  
    this.stageForm.reset();   
    this.stageForm.markAsUntouched();

    this.mealSelectedGroup.reset();
  }

  checkFields(name: string, body: string) : boolean{
    if (name == "" || name == null || name == undefined) {
      this.displayErrorMessageNoName = true;
      return false;
    }
    if (body == "" || body == null || body == undefined) { 
      this.displayErrorMessageTA = true;
      return false;
    } 
    return true;
  } 

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listStages, event.previousIndex, event.currentIndex);
  }

  deleteStage(stage: Stage) {
    const dialogRef = this.dialog.open(StageDeleteComponent); 
    dialogRef.afterClosed().subscribe(result => {
      var userResponse = result ? JSON.parse(result) : false;
      if (userResponse) {
        this.listStages.forEach((element,index)=>{
          if(element == stage) this.listStages.splice(index,1);
        }); 
      }
    });  
  }

  getValueByKey(dic: any, key: string) : any {
    if (key == "name" || key == "unit" || key == "quantity") {
      try {
        var obj = { name : dic.name, unit: dic.unit, quantity: dic.quantity }; 
        return obj[key];
      } catch (error) { }
    }
    else return "";
  }
} 