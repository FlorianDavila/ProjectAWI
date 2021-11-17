import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.css']
})
export class ParamComponent implements OnInit {

  @Input() public name? : string;
  public input1? : boolean;
  public val? : boolean;
  public modif? : boolean;

  constructor() { }

  ngOnInit(): void {
    this.input1 = true;
    this.val = true;
    this.modif = false;
  }

  public modify() : void {
    this.input1 = false;
    this.val = false;
    this.modif = true;
  }

  public validate() : void {
    this.input1 = true;
    this.modif = false;
    this.val = true;
  }
}
