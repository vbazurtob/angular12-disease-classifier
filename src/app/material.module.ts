import {NgModule} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  imports: [MatTableModule,  MatInputModule,  MatButtonModule, MatCardModule],
    exports: [MatTableModule,  MatInputModule,  MatButtonModule, MatCardModule]
})
export class MaterialModule {

}
