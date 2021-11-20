import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchGroup = this.formBuilder.group({
      searchName: '',
    });
  }

  ngOnInit() {}

  onSubmitForm() {
    const formValue = this.searchGroup.value;
    const userSearch = formValue['searchName'];
    console.log(userSearch);
  }
} 