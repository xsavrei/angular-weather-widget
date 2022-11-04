import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WeatherResponse } from "../../domain";
import { IdbService } from "../../services/idb.service";
import * as moment from "moment";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnChanges {

  @Input()
  weather?: WeatherResponse | null;

  @Output()
  favouriteChange = new EventEmitter<WeatherResponse>();

  favourite?: boolean = false;
  sunset?: string;
  sunrise?: string;

  constructor(private idb: IdbService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.weather.currentValue) {
      this.idb.insertWeatherValue('weather', changes.weather.currentValue);
      if (this.weather?.sys?.sunset && this.weather.sys.sunrise && this.weather.timezone) {
        this.sunset = moment.utc((this.weather.sys.sunset * 1000) + (this.weather.timezone * 1000)).format('LTS');
        this.sunrise = moment.utc((this.weather.sys.sunrise * 1000) + (this.weather.timezone * 1000)).format('LTS');
      }
    }
  }

  onFavouriteClick() {
    this.favourite = !this.favourite;
    if (this.weather) {
      this.weather.favourite = this.favourite;
      this.favouriteChange.emit(this.weather)
    }
  }
}
