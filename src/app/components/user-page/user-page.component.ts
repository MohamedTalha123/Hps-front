import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {
userInfo :any;
constructor(private  keycloakService: KeycloakService) {}
ngOnInit(): void {
    this.userInfo = this.keycloakService.profile;
    window.scrollTo(0, 0);

}
}
