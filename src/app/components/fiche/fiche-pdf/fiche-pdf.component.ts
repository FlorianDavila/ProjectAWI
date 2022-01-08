import { Component, ElementRef, ViewChild } from '@angular/core'; 
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
  coutHFluide: number = 0; 
  coutHMoyen: number = 0; 
  coefVenteHT: number = 0; 
  coefVenteTTC: number = 0; 
  totalPrice: number = 0;
  totalDuration: number = 0;
  coutChargesPerso: number = 0;
  coutChargesFluid: number = 0;
  coutCharges: number = 0;
  coutTotal: number = 0;
  prixVenteHT: number = 0; 
  prixVenteTTC: number = 0; 
  prixVenteTotal: number = 0;
  benefIndiv: number = 0;
  benefTotal: number = 0;
  seuilRenta: number = 0;
  check : FormControl;
  showCosts: boolean = false;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef; 
 
  constructor(private downloadService: DownloadService, public settingsService: SettingsService, public ingredientService: IngredientService, private route: ActivatedRoute, private router : Router, private mealService: MealService) {} 

  ngOnInit() {   
    this.check = new FormControl('');
    this.route.queryParams.subscribe(params => {  
      var json = JSON.parse(params['meal']); 
      this.meal = this.mealService.jsonToMeal(json);
      for(let i=0; i< this.meal.stageList.length; i++) {
        let actualIngredients = this.meal.stageList[i].ingredients; 
        this.totalDuration += +this.meal.stageList[i].duration; 
        for(let j=0; j<actualIngredients.length; j++) {
          let ingredientName = actualIngredients[j].name;  
          let ingredientQuantity = actualIngredients[j].quantity;  
          this.setPrices(ingredientName, ingredientQuantity);
        }
      }
      this.totalPrice * 1.05;
      this.getSettings();  
    });      
  }

  public initCouts() {
    this.coutHFluide = this.meal.coutHFluide ? +this.meal.coutHFluide : this.settings[2].value;
    this.coutHMoyen = this.meal.coutHMoyen ? +this.meal.coutHMoyen : this.settings[3].value;
    this.coefVenteHT = this.meal.coefVenteHT ? +this.meal.coefVenteHT : this.settings[0].value;
    this.coefVenteTTC = this.meal.coefVenteTTC ? +this.meal.coefVenteTTC : this.settings[1].value;
    this.coutChargesPerso = this.coutHMoyen * this.totalDuration;
    this.coutChargesFluid = this.coutHFluide * this.totalDuration;
    this.coutCharges = this.coutChargesPerso + this.coutChargesFluid;
    this.coutTotal = this.coutCharges + this.totalPrice;
    this.prixVenteHT = this.coefVenteHT * this.totalPrice;
    this.prixVenteTTC = this.coefVenteTTC * this.coutTotal;
    this.prixVenteTotal = this.prixVenteTTC * 1.1;
    this.benefTotal = this.prixVenteTTC - this.coefVenteTTC;
    this.benefIndiv = this.benefTotal / this.meal.nbGuests;
    this.seuilRenta = this.findBreakEvenPoint();
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
  
  public setChecked(event: MatCheckboxChange) {
    if (event.checked == true) this.showCosts = true;
    else this.showCosts = false;
  }

  public findBreakEvenPoint() {
    var breakEvenPoint = 0;
    var nbPortions = 0;  
    var prixVenteIndiv = this.prixVenteTTC / this.meal.nbGuests;
    while (breakEvenPoint < this.coutTotal) {
      breakEvenPoint += prixVenteIndiv;
      nbPortions++;
    }
    return nbPortions;
  }

  public setPrices(ingName: string, ingredientQuantity: any) {  
    this.ingredientService.getIngredientByName(ingName).subscribe(data => { 
      if (data[0].price) {
        this.ingredientsPrices.push(data[0].price.substring(0, data[0].price.length - 2)); 
        this.totalPrice += (+data[0].price.substring(0, data[0].price.length - 2) * +ingredientQuantity)
      }
      else
        this.ingredientsPrices.push(" ");
    }) 
  }

  public getSettings() {
    this.settingsService.getSettings().subscribe(data => { 
      data.forEach(e => this.settings.push(e));  
      this.initCouts();
    })
  } 
}
