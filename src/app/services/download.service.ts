import { Injectable } from '@angular/core';   
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';  

@Injectable({
  providedIn: 'root'
})
export class DownloadService { 

  constructor() { } 
  
  public downloadFile(toPrint: any, filename: string) {   
    html2canvas(toPrint).then(canvas => {
      var imgWidth = 190; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var position = 15;
      var imgData = canvas.toDataURL('application/pdf');
      const doc = new jsPDF("p", "mm", "a4");  
      doc.addImage(imgData, 'PDF', 10, position, imgWidth, imgHeight);
      
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PDF', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(filename)
    });  
  } 
}
