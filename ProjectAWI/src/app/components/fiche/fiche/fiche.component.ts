import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { ResumeComponent } from '../resume/resume.component';

@Component({
  selector: 'fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent { 
  displayErrorMessageI = false;
  displayErrorMessageTA = false;
  infoForm: FormGroup;
  listIngredients = new Array<ComponentRef<IngredientFormComponent>>();  
  nbStages = 1;
  myTextArea=""; 

  @ViewChild('parent', { read: ViewContainerRef }) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  @ViewChild('resume', { read: ViewContainerRef }) targetResume: ViewContainerRef;
  private componentRefResume: ComponentRef<any>;

  constructor(private formBuilder: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver) {
    this.infoForm = this.formBuilder.group({
      name: '',
      nbGuests: '',
      manager: '',
    });
  }
  
  ngOnInit(): void { 
  }

  onSubmitForm(): void {
    const formValue = this.infoForm.value;
    const name = formValue['name'];
    const nbGuests = formValue['nbGuests'];
    const manager = formValue['manager'];
    console.log(name + '\n' + nbGuests + '\n' + manager);
  }

  addIngredientForm(): void { 
    if (this.listIngredients.length == 0)
      this.add();
    else {
      const ing = this.listIngredients[this.listIngredients.length - 1].instance;
      if (ing.ingredientInput != undefined && ing.quantityInput != undefined) { 
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
    this.listIngredients.push(this.componentRef);  
  }

  OnValidateStage(stageHTML: string) {  
    if (this.myTextArea == "") { 
      this.displayErrorMessageTA = true;
      return;
    }

    const childComponent = this.componentFactoryResolver.resolveComponentFactory(ResumeComponent); 
    this.componentRefResume = this.targetResume.createComponent(childComponent);  
    
    var ingredients = "";
    this.listIngredients.forEach(element => {
      ingredients += element.instance.quantityInput + " " + element.instance.ingredientInput.viewValue + "\n"; 
    }); 
    this.componentRefResume.instance.innerHtmlIngredients = ingredients;
    this.componentRefResume.instance.innerHtmlStage = stageHTML;
    this.componentRefResume.instance.i = this.nbStages.toString();
    this.nbStages++;

    this.target.clear();
    this.myTextArea = "";
    this.displayErrorMessageTA = false;
  }
} 