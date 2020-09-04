import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';
import { NotFoundComponent } from '@layout/index';

import { AuthComponent } from './auth/auth.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
    { path: 'auth', component: AuthComponent },

    { path: 'editor', canActivate: [AuthGuard], component: EditorComponent },
    { path: 'not-found', canActivate: [AuthGuard], component: NotFoundComponent },

    { path: '', pathMatch: 'full', redirectTo: 'editor' },
    { path: '**', redirectTo: 'not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
