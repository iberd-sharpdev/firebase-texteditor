import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '@env/environment';
import { HeaderComponent, HomeComponent, NotFoundComponent } from '@layout/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { MathModule } from './mathjax/math.module';

const LAYOUT = [HeaderComponent, HomeComponent, NotFoundComponent];

const PAGES = [EditorComponent];

const FIREBASE_INTEGRATION = [AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule];

@NgModule({
    declarations: [AppComponent, ...LAYOUT, ...PAGES],
    imports: [BrowserModule, AppRoutingModule, MathModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
