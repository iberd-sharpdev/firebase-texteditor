import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '@env/environment';
import { HeaderComponent, HomeComponent, NotFoundComponent } from '@layout/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const LAYOUT_COMPONENTS = [HeaderComponent, HomeComponent, NotFoundComponent];

const FIREBASE_INTEGRATION = [AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule];

@NgModule({
    declarations: [AppComponent, ...LAYOUT_COMPONENTS],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
