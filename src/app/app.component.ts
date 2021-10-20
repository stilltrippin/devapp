import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UsernameValidationService } from './usernames.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  frmAsyncValidator: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private usernameService: UsernameValidationService
  ) {
    this.frmAsyncValidator = this.createForm();
    
  }

  ngOnInit() {}

  hasError(field: string, error: string): boolean {
    if (error === 'any' || error === '') {
      return (
        this.frmAsyncValidator.controls[field].dirty &&
        this.frmAsyncValidator.controls[field].invalid
      );
    }

    

    return (
      this.frmAsyncValidator.controls[field].dirty &&
      this.frmAsyncValidator.controls[field].hasError(error)
    );
  }
  
  
 
  
  

  createForm(): FormGroup {
    return this.fb.group({
      firstName:[
        null,
        [Validators.required]],
        lastName:[
          null,
          [Validators.required]],     
        email: [
        null,
        [Validators.required],
        [this.usernameService.usernameValidator()]
      ],
      dateOfBirth:[
        null,
        [Validators.required]],
        language:[
          null,
          [Validators.required]],
          version :[
            null,
            [Validators.required]],
            hobby1Name:[
              null,
          [Validators.required]],
          hobby1Duration:[
            null,
        [Validators.required]],
        hobby2Name:[
          null,
      ],
      hobby2Duration:[
        null,
    ],
            
      
      
    });
  }
  onSubmit(): void {
    // Process checkout data here
    console.log(this.frmAsyncValidator.value);
  }
}
