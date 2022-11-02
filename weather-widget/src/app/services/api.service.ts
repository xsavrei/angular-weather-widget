import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";
import { CustomGeolocation, WeatherResponse } from "../domain";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getWeatherByCoords(coords: CustomGeolocation): Observable<WeatherResponse> {
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${coords.lat}&lon=${coords.lon}`;
    return this.http.get(url).pipe(
      map((response: unknown) => plainToInstance(WeatherResponse, response)));
  }
}
