import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WeatherResponse } from "../../domain";
import { IdbService } from "../../services/idb.service";

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
  sunset = new Date(0);
  sunrise = new Date(0);

  constructor(private idb: IdbService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.weather.currentValue && this.weather?.sys?.sunset && this.weather.sys.sunrise) {
      this.idb.insertWeatherValue('weather', this.weather);
      this.sunset.setUTCSeconds(this.weather.sys.sunset);

      this.sunrise.setUTCSeconds(this.weather.sys.sunrise);
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
