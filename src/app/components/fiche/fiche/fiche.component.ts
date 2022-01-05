import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms'; 
import { Stage } from 'src/app/models/Stage';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component'; 
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'; 
import { MatDialog } from '@angular/material/dialog';
import { StageDeleteComponent } from '../../../dialogs/stage-delete/stage-delete.component';  
import { IngredientService } from 'src/app/services/ingredient.service';
import { Meal } from 'src/app/models/Meal';
import { MealService } from 'src/app/services/meal.service';  
import { Router } from '@angular/router';
import { ConfirmMealComponent } from 'src/app/dialogs/confirm-meal/confirm-meal.component';

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
  listIngredientsForm = new Array<ComponentRef<IngredientFormComponent>>();  
  listStages:  Array<Stage>;   
  stageForm: FormGroup; 
  infoForm: FormGroup;
  selectedExistingMeal: Meal;
  firstStepOK = false;  
  exMealGroup: FormGroup;
  meal: Meal;

  @ViewChild('parent', { read: ViewContainerRef })
  target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  @ViewChild('fdStageForm', { read: FormGroupDirective })
  fdStageForm!: FormGroupDirective;

  @ViewChild('fdExMealGroup', { read: FormGroupDirective })
  fdExMealGroup!: FormGroupDirective; 

  constructor(private formBuilder: FormBuilder, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, public dialog: MatDialog, public ingredientService: IngredientService, public mealService: MealService) {
    this.stageForm = this.formBuilder.group({
      stageName: '',
      stageBody: '',
      stageDuration: ''
    }); 
    this.infoForm = this.formBuilder.group({
      name: '',
      nbGuests: '',
      manager: '',
      category: 'Entrée',
      matS: '',
      matD: '',
      coefVenteHT: '',
      coefVenteTTC: '',
      coutHFluide: '',
      coutHMoyen: ''
    }); 
    this.exMealGroup = this.formBuilder.group({
      mealSelectedGroup: new FormControl(),
      mealNbGuests: ''
    })
    this.exMealGroup.controls['mealNbGuests'].disable();
    this.listStages = new Array<Stage>()
  } 

  onNext() {
    const formValue = this.infoForm.value;
    const name = formValue['name'];
    const nbGuests = formValue['nbGuests'];
    const manager = formValue['manager'];
    const category = formValue['category'];  
    const matS = formValue['matS']; 
    const matD = formValue['matD']; 
    const coefVenteHT = formValue['coefVenteHT']; 
    const coefVenteTTC = formValue['coefVenteTTC']; 
    const coutHFluide = formValue['coutHFluide']; 
    const coutHMoyen = formValue['coutHMoyen']; 
  
    if (!name ||!nbGuests || !manager || !category) return;

    this.meal = new Meal(null, name, manager, category, nbGuests, [], matS, matD, coefVenteHT, coefVenteTTC, coutHFluide, coutHMoyen);
    this.firstStepOK = true; 
  } 

  onSubmitForm(): void {   
    const dialogRef = this.dialog.open(ConfirmMealComponent); 
    dialogRef.afterClosed().subscribe(result => {
      var userResponse = result ? JSON.parse(result) : false;
      if (userResponse) {  

        var stages: any[] = [];
        this.listStages.forEach(s => { 
          var toPush = { name: s.name, ingredients: s.ingredients, description: s.description, duration: s.duration ? s.duration : " " }
          stages.push(toPush);
        }); 

        this.meal.stageList = stages;
        this.mealService.addUpdateMeal(this.meal); 
    

        this.infoForm.reset();
        this.exMealGroup.reset();
        this.resetInputs()
        this.listStages = []

        this.router.navigate(['../accueil/download'], { queryParams: { meal: JSON.stringify(this.meal) } });
      }
    });  
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
    this.listIngredientsForm.forEach((element, index) => { 
      if (element.instance.quantityInput != undefined && element.instance.quantityInput != "" && element.instance.selectedIng.name != "Ingrédients...") {
        var i = {
          name: element.instance.selectedIng.name,
          unit: element.instance.selectedIng.unit,
          quantity: element.instance.quantityInput
        };
        ingredients.push(i);
      }  
      else {
        if (index == this.listIngredientsForm.length - 1 && element.instance.selectedIng.name == "Ingrédients..." && (element.instance.quantityInput == undefined || element.instance.quantityInput == "")) return;
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
    var n = this.selectedExistingMeal.nbGuests;
    this.selectedExistingMeal.stageList.forEach(element => {
      element.ingredients.forEach((ing: any) => {
        ing.quantity = ing.quantity * this.exMealGroup.value['mealNbGuests'] / n;
      });
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

    this.fdStageForm.resetForm(); 
    this.stageForm.reset(); 

    this.fdExMealGroup.resetForm(); 
    this.exMealGroup.reset();   
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

  onChange(value: any) {
    if (value) {
      this.exMealGroup.controls['mealNbGuests'].enable();
      this.exMealGroup.controls['mealNbGuests'].setValue(+value.nbGuests);
    }
  } 
} 