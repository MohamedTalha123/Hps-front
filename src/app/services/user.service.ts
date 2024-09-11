import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../entity/user';
import { AuthService } from './keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8091/api/v1/users';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  setCurrentUser(user: User) {
    this.userSubject.next(user);
  }

  resetCurrentUser(){
    this.userSubject.next(null);
  }
  getUserByMail(): Observable<User> {
    return new Observable<User>(observer => {
      this.authService.loadUserProfile()
        .then(profile => {
          if (profile) {            
            this.http.get<User>(`${this.apiUrl}/email/${profile.email}`)
              .subscribe({
                next: user => observer.next(user),
                error: err => observer.error(err),
                complete: () => observer.complete()
              });
          } else {
            observer.error('User profile is undefined');
          }
        })
        .catch(error => observer.error(error));
    });
  }



}