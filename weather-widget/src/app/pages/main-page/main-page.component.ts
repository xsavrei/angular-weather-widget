import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { GeolocationService } from "../../services/geolocation.service";
import { Observable, of } from "rxjs";
import { Clouds, CustomGeolocation, MainWeatherParams, System, Weather, WeatherResponse, Wind } from "../../domain";

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
    this.getCitiesListMock();
    // geolocationService.getLocationOnce().then(geolocation => {
    //   const weatherResponse$ = this.api.getWeatherByCoords({
    //     lat: geolocation.coords.latitude,
    //     lon: geolocation.coords.longitude
    //   });
    //   this.citiesList.push(weatherResponse$);
    //   console.log(this.citiesList)
    // }).catch(console.warn);
  }

  onAddressChange(address: any) {
    const prevLength = this.citiesList.length;
    if (address.geometry.location.lat() && address.geometry.location.lng()) {
      this.citiesList.push(this.api.getWeatherByCoords({
          lat: address.geometry.location.lat(),
          lon: address.geometry.location.lng()
        })
      );
      if (prevLength < this.citiesList.length) {
        this.el ? this.el.nativeElement.value = '' : this.el;
      }
    }
  }

  getCitiesListMock() {
    let mock = new WeatherResponse({
      weather: new Array<Weather>(new Weather({
        id: 1,
        main: 'main',
        description: 'description',
        icon: 'assets/loading.gif'
      })),
      coord: new CustomGeolocation({
        lat: 15,
        lon: 45,
      }),
      base: 'base',
      main: new MainWeatherParams({
        temp: 15,
        feels_like: 17,
        temp_max: 20,
        temp_min: 12,
        pressure: 1000
      }),
      visibility: 10000,
      wind: new Wind(),
      clouds: new Clouds(),
      dt: 10,
      sys: new System(),
      timezone: 3600,
      name: 'cityName',
      cod: '200'
    });
    for (let i = 0; i < 5; i++) {
      this.citiesList.push(of({ ...mock, name: 'cityName' + i }));
    }
    return this.citiesList
  }
}
