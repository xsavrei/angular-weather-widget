import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { GeolocationService } from "../../services/geolocation.service";
import { Observable } from "rxjs";
import { WeatherResponse } from "../../domain";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  citiesList = new Array<Observable<WeatherResponse>>();

  page: number = 1;
  pageSize: number = 5;

  @ViewChild('googleSearch')
  el?: ElementRef;

  constructor(private api: ApiService,
              private geolocationService: GeolocationService) {
    geolocationService.getLocationOnce().then(geolocation => {
      const weatherResponse$ = this.api.getWeatherByCoords({
        lat: geolocation.coords.latitude,
        lon: geolocation.coords.longitude
      });
      this.citiesList.push(weatherResponse$);
      console.log(this.citiesList)
    }).catch(console.warn);
  }

  handleAddressChange(address: any) {
    const prevLength = this.citiesList.length;
    if (address.geometry.location.lat() && address.geometry.location.lng()) {
      this.citiesList.push(this.api.getWeatherByCoords({
          lat: address.geometry.location.lat(),
          lon: address.geometry.location.lng()
        })
      );
      if (prevLength < this.citiesList.length) {
        this.el ? this.el.nativeElement.value = '' : undefined;
      }
    }
  }
}
