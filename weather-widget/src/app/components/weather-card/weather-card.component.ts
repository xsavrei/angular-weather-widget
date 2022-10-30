import { Component, Input, OnInit } from '@angular/core';
import { WeatherResponse } from "../../domain";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input()
  weather?: WeatherResponse | null;

  constructor() { }

  ngOnInit(): void {
  }

}
