import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HypertensionCalculatorComponent } from './hypertension-calculator/hypertension-calculator.component';
import { KidneyDiseaseCalculatorComponent } from './kidney-disease-calculator/kidney-disease-calculator.component';
import {MaterialModule} from "./material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BloodPressureInputParser} from "./service/BloodPressureInputParser";
import {Classifier} from "./service/Classifier";

@NgModule({
  declarations: [
    AppComponent,
    HypertensionCalculatorComponent,
    KidneyDiseaseCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
      BloodPressureInputParser,
      Classifier
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
