import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthGuard } from 'src/app/services/auth-guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {

  secretCode = new FormControl();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.secretCode.value == "test") this.authService.correctCredentials = true;
    else this.secretCode.markAsDirty();
    console.log(this.authService.correctCredentials);
  }
}
