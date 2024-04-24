import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, MatInputModule, MatFormField, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    this.form = new FormGroup({
      userName : new FormControl("", Validators.required),
      password : new FormControl("", Validators.required),
    });
  }
  form!: UntypedFormGroup;

  onSubmit(){
    
  }
}
