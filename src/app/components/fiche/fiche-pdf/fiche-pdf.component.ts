import { Component, ElementRef, ViewChild } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';  
import { Meal } from 'src/app/models/Meal'; 
import { Settings } from 'src/app/models/settings';
import { DownloadService } from 'src/app/services/download.service'; 
import { IngredientService } from 'src/app/services/ingredient.service';
import { MealService } from 'src/app/services/meal.service';
import { SettingsService } from 'src/app/services/settings.service';

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
  ingredientsPrices: string[] = [];
  settings: Settings[] = [];
  totalPrice: number = 0;
  totalDuration: number = 0;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  
  @ViewChild('prixVenteTTC', { read: HTMLSpanElement })
  prixVenteTTC!: HTMLSpanElement;

  constructor(private downloadService: DownloadService, public settingsService: SettingsService, public ingredientService: IngredientService, private route: ActivatedRoute, private router : Router, private mealService: MealService) {} 

  ngOnInit() {   
    this.route.queryParams.subscribe(params => {  
      var json = JSON.parse(params['meal']); 
      this.meal = this.mealService.jsonToMeal(json);
      for(let i=0; i< this.meal.stageList.length; i++) {
        let actualIngredients = this.meal.stageList[i].ingredients; 
        this.totalDuration += +this.meal.stageList[i].duration; 
        for(let j=0; j<actualIngredients.length; j++) {
          let ingredientName = actualIngredients[j].name;  
          this.setPrices(ingredientName);
        }
      }
      this.getSettings(); 
    });      
  }
  
  public downloadAsPDF() {  
    this.downloadService.downloadFile(
      this.pdfTable.nativeElement,
      `${(this.meal.name).replace(" ","-").toLowerCase()}-fiche-technique.pdf`
    ) 
  } 

  public parseInt(number: any) : number {  
    return +number; 
  }

  public findBreakEvenPoint(coutProd: any, nbGuests: any) {
    var breakEvenPoint = 0;
    var nbPortions = 0;  
    var prixVenteIndiv = +this.prixVenteTTC.textContent! / +nbGuests;
    while (breakEvenPoint < coutProd) {
      breakEvenPoint += prixVenteIndiv;
      nbPortions++;
    }
    return nbPortions;
  }

  public setPrices(ingName: string) {  
    this.ingredientService.getIngredientByName(ingName).subscribe(data => { 
      if (data[0].price) {
        this.ingredientsPrices.push(data[0].price); 
        this.totalPrice += +data[0].price.substring(0, data[0].price.length - 2)
      }
      else
        this.ingredientsPrices.push(" ");
    }) 
  }

  public getSettings() {
    this.settingsService.getSettings().subscribe(data => { 
      data.forEach(e => this.settings.push(e));  
    })
  }
}
