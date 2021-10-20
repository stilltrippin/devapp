import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidationService {
  takenUsernames = ['test2@test.test'];

  constructor() {}

  checkIfUsernameExists(username: string): Observable<boolean> {
   
    return of(this.takenUsernames.includes(username)).pipe(delay(1000));
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map(res => {
          console.log(res);
         
          return res ? { usernameExists: true } : null;
        
        })
      );
    };
  }
}
