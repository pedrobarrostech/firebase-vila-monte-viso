import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { AuthenticationService } from '../common/_services/authentication.service';

@Component({
  selector: 'app-header',
  styleUrls: [ './header.style.css' ],
  templateUrl: './header.template.html'
})
export class HeaderComponent  implements OnInit {
  
    isLoggedIn$: Observable<boolean>;
  
    constructor(private _authService: AuthenticationService) { }
  
    ngOnInit() {
      this.isLoggedIn$ = this._authService.isLoggedIn;
    }

}
