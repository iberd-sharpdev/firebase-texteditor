import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediumComponent } from './medium/medium.component';

const routes: Routes = [
    { path: 'medium', component: MediumComponent },

    { path: '', pathMatch: 'full', redirectTo: 'medium' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditorRoutingModule { }
