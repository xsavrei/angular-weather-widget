import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { GeolocationService } from "../../services/geolocation.service";
import { CustomGeolocation, WeatherResponse } from "../../domain";
import { IdbService } from "../../services/idb.service";
import { map } from "rxjs/operators";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{

  citiesList = new Array<WeatherResponse>();

  page: number = 1;
  pageSize: number = 5;


  @ViewChild('googleSearch')
  el?: ElementRef;

  constructor(private api: ApiService,
              private geolocationService: GeolocationService,
              private idb: IdbService) {

  }

  ngOnInit(): void {
    this.idb.getGeolocationFromIdb('geolocation').then(resolved => {
      const currentTimestamp = Date.now();
      if ((currentTimestamp - resolved.timestamp > this.convertHoursToMs(24))) {
        this.getDefaultWeather();
      } else {
        this.getFavouriteWeatherFromIdb().then(res => {
          if (res) {
            this.citiesList.push(res);
          }
        })
      }
    }).catch(() => this.getDefaultWeather());
  }

  handleAddressChange(address: any) {
    const prevLength = this.citiesList.length;
    if (address.geometry.location.lat() && address.geometry.location.lng()) {
      this.api.getWeatherByCoords({
        lat: address.geometry.location.lat(),
        lon: address.geometry.location.lng()
      }).pipe(untilDestroyed(this)).subscribe(res => {
        this.citiesList.push(res);
        if (prevLength < this.citiesList.length) {
          this.el ? this.el.nativeElement.value = '' : this.el;
        }
      });
    }
  }

  getDefaultWeather() {
    this.geolocationService.getLocationOnce().then(geolocation => {

      const geo: CustomGeolocation = new CustomGeolocation({
        lat: geolocation.coords.latitude,
        lon: geolocation.coords.longitude,
        timestamp: geolocation.timestamp
      });
      this.idb.insertGeoValue('geolocation', geo);
      this.api.getWeatherByCoords(geo).pipe(untilDestroyed(this),
        map((weatherResponse: WeatherResponse) => {
          return { ...weatherResponse, favourite: true }
        })).subscribe(res => {
        this.citiesList.push(res);
      });

    }).catch(console.warn);
  }

  async getFavouriteWeatherFromIdb(): Promise<WeatherResponse | undefined> {
    return await this.idb.getAll('weather').then((res: WeatherResponse[]) =>
      res.find(weatherResponse => weatherResponse.favourite === true
      )
    );
  }

  convertHoursToMs(hours: number): number {
    return hours * 60 * 60 * 1000; //hour to minute to second to millisecond
  }

  onDeleteClick() {
    this.idb.deleteDb();
    location.reload();
  }
}
