import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherResponse } from "../../domain";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {

  @Input()
  weather?: WeatherResponse | null;

  @Output()
  favouriteChange = new EventEmitter<WeatherResponse>();

  favourite?: boolean = false;

  onFavouriteClick() {
    this.favourite = !this.favourite;
    if (this.weather) {
      this.weather.favourite = this.favourite;
      this.favouriteChange.emit(this.weather)
    }
  }
}
