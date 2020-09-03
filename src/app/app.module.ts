import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { HeaderComponent, HomeComponent, NotFoundComponent } from '@layout/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EditorComponent } from './editor/editor.component';
import { MathModule } from './mathjax/math.module';

const LAYOUT = [
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
];

const PAGES = [
    AuthComponent,
    EditorComponent,
];

const FIREBASE_INTEGRATION = [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
];

@NgModule({
    declarations: [
        AppComponent,
        ...LAYOUT,
        ...PAGES,
        AuthComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule.forRoot(),
        MathModule.forRoot(),
        ...FIREBASE_INTEGRATION,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
