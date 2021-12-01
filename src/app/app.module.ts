import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HypertensionCalculatorComponent } from './hypertension-calculator/hypertension-calculator.component';
import { KidneyDiseaseCalculatorComponent } from './kidney-disease-calculator/kidney-disease-calculator.component';
import {MaterialModule} from "./material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BloodPressureInputParserService} from "./service/blood-pressure-input-parser.service";
import {BloodPressureClassifierService} from "./service/blood-pressure-classifier.service";
import {EgfrInputParserService} from "./service/egfr-input-parser.service";
import {EgfrDataClassifierService} from "./service/egfr-data-classifier.service";

@NgModule({
  declarations: [
    AppComponent,
    HypertensionCalculatorComponent,
    KidneyDiseaseCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    BloodPressureInputParserService,
    BloodPressureClassifierService,
    EgfrInputParserService,
    EgfrDataClassifierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
