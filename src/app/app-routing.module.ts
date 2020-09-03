import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';
import { HomeComponent } from '@layout/home/home.component';
import { NotFoundComponent } from '@layout/not-found/not-found.component';

import { AuthComponent } from './auth/auth.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
    { path: 'auth', component: AuthComponent },

    { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
    { path: 'editor', canActivate: [AuthGuard], component: EditorComponent },
    { path: 'not-found', canActivate: [AuthGuard], component: NotFoundComponent },

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', redirectTo: 'not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
