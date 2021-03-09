import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NavbarComponent} from "../navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {FilterPaymentsByUserPipe} from "../filter-payments-by-user.pipe";


@NgModule({
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        CommonModule,
    ]
})
export class SharedModule { }
