import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { Meal } from 'src/app/models/Meal'; 
import { DownloadService } from 'src/app/services/download.service'; 
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

  constructor(private downloadService: DownloadService, private route: ActivatedRoute, private router : Router, private mealService: MealService) {} 

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
}
