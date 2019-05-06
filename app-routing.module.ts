import { NgModule } from '@angular/core';
//import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Routes, RouterModule } from '@angular/router';
//import {PasswordEditorComponent} from '../../src/app/password-editor/password-editor.component';

const routes: Routes = [
 // { path: 'password-editor', component: PasswordEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
