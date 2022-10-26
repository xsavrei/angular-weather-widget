import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";
import { WeatherResponse } from "./domain";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  res?: WeatherResponse;

  constructor(private http: HttpClient) {
    http.get('https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139').pipe(map(
      (response: unknown) => plainToInstance(WeatherResponse, response)
    )).subscribe(response => {
      this.res = response
    });
  }
}
