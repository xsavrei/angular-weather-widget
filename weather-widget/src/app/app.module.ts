import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgOptimizedImage } from "@angular/common";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ImageComponent } from './components/image/image.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ImageComponent,
    WeatherCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GooglePlaceModule,
    NgOptimizedImage,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
