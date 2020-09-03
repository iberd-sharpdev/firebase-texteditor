import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@layout/home/home.component';
import { NotFoundComponent } from '@layout/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'editor',
        loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule),
    },

    {
        path: 'not-found',
        component: NotFoundComponent,
    },

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', redirectTo: 'not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
