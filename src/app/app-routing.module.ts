import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SorterComponent } from './sorter/sorter.component';


const routes: Routes = [{path: '', component: SorterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
