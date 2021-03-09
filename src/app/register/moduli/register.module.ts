import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import {RegisterComponent} from "../register.component";
import {FormsModule} from "@angular/forms";
import {ValidateEqualModule} from "ng-validate-equal";


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ValidateEqualModule
  ]
})
export class RegisterModule { }
