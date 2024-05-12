import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/oktaauth.service';


@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit{
  constructor(private authService: AuthenticationService){}
  ngOnInit(): void {
    this.authService.getToken();
  }
}
