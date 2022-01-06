import { Component, Input, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { FormControl, Validators } from '@angular/forms';
import { decodedTextSpanIntersectsWith } from 'typescript';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.css']
})
export class ParamComponent implements OnInit {

  public name : string;
  public value : number;
  @Input() public set : Settings;

  public valueControl : FormControl;
  public val : boolean;
  public modif : boolean;

  constructor(public setService : SettingsService, public _snackBar: MatSnackBar) { } 

  ngOnInit(): void {
    this.name = this.set.name;
    this.value = this.set.value;
    this.valueControl = new FormControl({value : this.set.value, disabled: true}, Validators.required);
    this.val = true;
    this.modif = false;
  }

  public modify() : void {
    this.modif = true;
    this.val = false;
    this.valueControl.enable();
  }

  public validate() : void {
    this.modif = false;
    this.val = true;
    this.valueControl.disable();
    var inputValue = this.valueControl.value;
    if (inputValue == "") {
      alert("Vous devez renseigner une valeur");
    }
    else {
      var newValue : number = +inputValue;
      console.log(newValue);
      if(isNaN(newValue)){
        alert("Vous devez renseigner un nombre");
        this.valueControl.reset();
      }
      else{
        this.set.value = newValue;
        this.setService.addUpdateSetting(this.set);
        this.openSnackBar("Modification effectuée", "Fermer");
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition : 'top'
    });
  }
}
