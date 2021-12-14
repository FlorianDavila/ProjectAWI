import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'; 
import { Stage } from 'src/app/models/Stage';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component'; 
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Ingredient } from 'src/app/models/Ingredient';
import { MatDialog } from '@angular/material/dialog';
import { StageDeleteComponent } from '../../../dialogs/stage-delete.component'; 
import { StageService } from 'src/app/services/stage.service';
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
  selectedExistingStage: Stage;
  stageSelectedGroup: FormControl = new FormControl();

  @ViewChild('parent', { read: ViewContainerRef })
  target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private formBuilder: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver, public dialog: MatDialog, public stageService: StageService, public ingredientService: IngredientService, public mealService: MealService) {
    this.infoForm = this.formBuilder.group({
      name: '',
      nbGuests: '',
      manager: '',
      category: 'Entrée'
    });
    this.stageForm = this.formBuilder.group({
      stageName: '',
      stageBody: '',
      stageDuration: ''
    });
  }
  
  ngOnInit(): void { 
    this.listStages = new Array<Stage>(); 
  }

  onSubmitForm(): void {
    const formValue = this.infoForm.value;
    const name = formValue['name'];
    const nbGuests = formValue['nbGuests'];
    const manager = formValue['manager'];
    const category = formValue['category'];
    var ingredients = [];
    var meal = new Meal(null, name, manager, category, nbGuests, this.listStages);
    this.mealService.addUpdateMeal(meal);

    this.infoForm.reset();
    this.infoForm.markAsUntouched();
    this.resetInputs()
    this.listStages = []
  }

  addIngredientForm(): void { 
    if (this.listIngredientsForm.length == 0)
      this.add();
    else {
      const ing = this.listIngredientsForm[this.listIngredientsForm.length - 1].instance;
      if (ing.selectedIng.name != "Ingrédients..." && ing.quantityInput != undefined) { 
        this.add();
        this.displayErrorMessageI = false;
      } 
      else
        this.displayErrorMessageI = true;
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

    var ingredients: { name: string, unit: string, quantity: string} = { name: "", unit: "", quantity: ""}; 
    this.listIngredientsForm.forEach(element => {
      if (element.instance.quantityInput && element.instance.selectedIng) {  
        if (element.instance.selectedIng.name) {
          ingredients["name"] = element.instance.selectedIng.name;
          ingredients["unit"] = element.instance.selectedIng.unit;   
          ingredients["quantity"] = element.instance.quantityInput;   
        } 
      }
    });  

    duration = duration ? ' (' + duration + ')' : '';
    var stage = new Stage("", '<b>' + name + '<b\>' + '<br\>', ingredients, body.replace('\n','<br\>') + duration, 60);
    this.listStages.push(stage); 

    this.resetInputs();
  }

  onValidateExistingStage() {
    if (!this.displayStageList) this.displayStageList = true;
    var ingre : [Ingredient, string][] = [];
    ingre.push([new Ingredient("","naa",false,"",0,"u", "4"), "5"]);
    var stage = new Stage("", '<b>' + this.selectedExistingStage.name + '<b\>' + '<br\>', ingre, this.selectedExistingStage.description!.replace('\n','<br\>') + this.selectedExistingStage.duration, 60);
    this.listStages.push(stage); 

    this.resetInputs();
  }

  resetInputs() { 
    this.target.clear(); 
    this.listIngredientsForm = [];  
    this.stageForm.reset();   
    this.stageForm.markAsUntouched();

    this.stageSelectedGroup.reset();
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
} 