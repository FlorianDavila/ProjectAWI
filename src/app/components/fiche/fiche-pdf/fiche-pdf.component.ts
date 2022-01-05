import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { Meal } from 'src/app/models/Meal'; 
import { DownloadService } from 'src/app/services/download.service'; 
import { IngredientService } from 'src/app/services/ingredient.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-fiche-pdf',
  templateUrl: './fiche-pdf.component.html',
  styleUrls: ['./fiche-pdf.component.css'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class FichePDFComponent {

  meal: Meal;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  constructor(private downloadService: DownloadService, public ingredientService: IngredientService, private route: ActivatedRoute, private router : Router, private mealService: MealService) {} 

  ngOnInit() {   
    this.route.queryParams.subscribe(params => {  
      var json = JSON.parse(params['meal']); 
      this.meal = this.mealService.jsonToMeal(json);
    });     
  }
  
  public downloadAsPDF() {  
    this.downloadService.downloadFile(
      this.pdfTable.nativeElement,
      `${(this.meal.name).replace(" ","-").toLowerCase()}-fiche-technique.pdf`
    ) 
  } 

  public parseInt(number: any) {  
    return +number; 
  }

  public findBreakEvenPoint(benefIndiv: any, coutCharges: any) {
    var breakEvenPoint = 0;
    var nbPortions = 0;
    while (breakEvenPoint < coutCharges) {
      breakEvenPoint += benefIndiv;
      nbPortions++;
    }
    return nbPortions;
  }
}
