import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

// import { FormBuilder, FormGroup, FormControl } from '@angular/core';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private registerForm: FormGroup;

  constructor(private form: FormBuilder, private authService: AuthService) {
    this.createForm();
   }

  ngOnInit() {
  }
  createForm() {
    this.registerForm = this.form.group({
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }
  onSubmit() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe( () => this.authService.login(this.registerForm.value));
  }
}
