import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { Stage } from 'src/app/models/Stage';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component'; 
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Ingredient } from 'src/app/models/Ingredient';

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

  @ViewChild('parent', { read: ViewContainerRef })
  target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private formBuilder: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver) {
    this.infoForm = this.formBuilder.group({
      name: '',
      nbGuests: '',
      manager: ''
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
    console.log(name + '\n' + nbGuests + '\n' + manager);
  }

  addIngredientForm(): void { 
    if (this.listIngredientsForm.length == 0)
      this.add();
    else {
      const ing = this.listIngredientsForm[this.listIngredientsForm.length - 1].instance;
      if (ing.selectedFood != undefined && ing.quantityInput != undefined) { 
        this.add();
        this.displayErrorMessageI = false;
      } 
      else
        this.displayErrorMessageI = true;
    }
    
    console.log(this.listStages)
  } 

  private add(): void { 
    const childComponent = this.componentFactoryResolver.resolveComponentFactory(IngredientFormComponent); 
    this.componentRef = this.target.createComponent(childComponent); 
    this.listIngredientsForm.push(this.componentRef);  
  }

  OnValidateStage() {    
    const formValue = this.stageForm.value;
    var name = formValue['stageName'];
    var body = formValue['stageBody'];
    var duration = formValue['stageDuration'];
    if (!this.checkFields(name, body)) return;

    var ingredients: [Ingredient, string][] = []; 
    this.listIngredientsForm.forEach(element => {
      if (element.instance.quantityInput && element.instance.selectedFood) { 
        console.log("azerty")
        if (element.instance.selectedFood.name) {
          ingredients.push([element.instance.selectedFood, element.instance.quantityInput]);  
          console.log("azerty2")
        } 
      }
    });  

    duration = duration ? ' (' + duration + ')' : '';
    var stage = new Stage("", '<b>' + name + '<b\>' + '<br\>', ingredients, body.replace('\n','<br\>') + duration, 60);
    this.listStages.push(stage); 

    this.target.clear();
    this.stageForm.patchValue({ stageName: '', stageBody: '' });

    if (!this.displayStageList) this.displayStageList = true;
    this.displayErrorMessageTA = false;
    this.displayErrorMessageI = false;
    this.displayErrorMessageNoName = false;

    this.listIngredientsForm = []; 
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
}  