import {NgModule} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    MatAutocompleteModule, MatCardModule],
    exports: [MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatButtonModule,
      MatAutocompleteModule, MatCardModule]
})
export class MaterialModule {

}
