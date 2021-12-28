import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Meal } from 'src/app/models/Meal'; 
import { DownloadService } from 'src/app/services/download.service'; 

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

  constructor(private downloadService: DownloadService, private route: ActivatedRoute) {} 

  ngOnInit() {
    this.route.queryParams.subscribe(params => {  
      var json = JSON.parse(params['meal']); 
      this.meal = new Meal( 
        json.id,
        json.name,
        json.manager,
        json.category,
        json.nbGuests,
        json.stageList ? json.stageList : [],
        json.matS,
        json.matD
      );  
    });  
  }
  
  public downloadAsPDF() {  
    this.downloadService.downloadFile(
      this.pdfTable.nativeElement,
      `${(this.meal.name).replace(" ","-").toLowerCase()}-fiche-technique.pdf`
    ) 
  } 
}
