import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { Stage } from 'src/app/models/Stage';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component'; 
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent { 
  displayErrorMessageI = false;
  displayErrorMessageTA = false;
  displayErrorMessageNoName = false;
  infoForm: FormGroup;
  listIngredientsForm = new Array<ComponentRef<IngredientFormComponent>>();  
  listStages:  Array<Stage>;  
  myTextArea="";  
  myInputArea=""; 

  @ViewChild('parent', { read: ViewContainerRef })
  target!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private formBuilder: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver) {
    this.infoForm = this.formBuilder.group({
      name: '',
      nbGuests: '',
      manager: '',
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

  OnValidateStage(stageHTML: string) {  
    if (this.myInputArea == "") {
      this.displayErrorMessageNoName = true;
      return;
    }
    if (this.myTextArea == "") { 
      this.displayErrorMessageTA = true;
      return;
    } 
    
    var ingredients: { [ingredientId: string]: number; } = {};
    this.listIngredientsForm.forEach(element => {
      if (element.instance.quantityInput && element.instance.selectedFood) { 
        if (element.instance.selectedFood.id) (ingredients as any)[element.instance.selectedFood.id] = element.instance.quantityInput;  
      }
    }); 

    var stage = new Stage("", "Stage x", ingredients, stageHTML.replace('\n','<br\>'), 60)
    this.listStages.push(stage); 

    this.target.clear();
    this.myTextArea = "";
    this.myInputArea = "";
    this.displayErrorMessageTA = false;
    this.displayErrorMessageI = false;
    this.displayErrorMessageNoName = false;

    this.listIngredientsForm = []; 
  }

  isIngredientDictEmpty(ingredientDict: { [ingredientId: string]: number; }) { 
    return Object.keys(ingredientDict).length === 0;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listStages, event.previousIndex, event.currentIndex);
  }
}  