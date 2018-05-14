import { Component } from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: [ './app.style.css' ],
  templateUrl: './app.template.html'
})

export class AppComponent {

  public token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).token : '';
}


