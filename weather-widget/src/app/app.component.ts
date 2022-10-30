import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";
import { WeatherResponse } from "./domain";
import { GeolocationService } from "./services/geolocation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  res?: WeatherResponse;
  sunrise?: Date;
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''

  constructor(private http: HttpClient,
              private geolocationService: GeolocationService) {

    geolocationService.getLocationOnce().then(geolocation => {
      http.get(`https://fcc-weather-api.glitch.me/api/current?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}`).pipe(map(
        (response: unknown) => plainToInstance(WeatherResponse, response)
      )).subscribe(weatherResponse => {
        this.res = weatherResponse
        if (weatherResponse.sys?.sunset && weatherResponse.timezone) {
          this.sunrise = new Date(weatherResponse.sys?.sunset * 1000);
        }
      });
    }).catch(console.warn)
  }

  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
  }

}
