import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HypertensionCalculatorComponent} from "./hypertension-calculator/hypertension-calculator.component";
import {KidneyDiseaseCalculatorComponent} from "./kidney-disease-calculator/kidney-disease-calculator.component";

const routes: Routes = [
  {path: 'hypertension', component: HypertensionCalculatorComponent },
  {path: 'kidney', component: KidneyDiseaseCalculatorComponent },
  {path: '**', component: HypertensionCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
