import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, HomeComponent, NotFoundComponent } from '@layout/index';

const LAYOUT_COMPONENTS = [HeaderComponent, HomeComponent, NotFoundComponent];

@NgModule({
    declarations: [AppComponent, ...LAYOUT_COMPONENTS],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
