import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MathModule } from './mathjax/math.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, MathModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
