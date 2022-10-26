import { Type } from "class-transformer";

export class Weather {
  id?: number;
  main?: string;
  description?: string;
  icon?: string;

  constructor(copy?: Weather) {
    Object.assign(this, copy);
  }
}

export class Geolocation {
  lon?: number;
  lat?: number;

  constructor(copy?: Geolocation) {
    Object.assign(this, copy);
  }
}

export class MainWeatherParams {
  temp?: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  pressure?: number;
  humidity?: number;

  constructor(copy?: MainWeatherParams) {
    Object.assign(this, copy);
  }
}

export class Clouds {
  all?: number;

  constructor(copy?: Clouds) {
    Object.assign(this, copy);
  }
}

export class Wind {
  speed?: number;
  deg?: number;
  gust?: number;

  constructor(copy?: Wind) {
    Object.assign(this, copy);
  }
}

export class System {
  type?: number;
  id?: number;
  country?: string;
  sunrise?: number;
  sunset?: number;

  constructor(copy?: System) {
    Object.assign(this, copy);
  }
}

export class WeatherResponse {
  @Type(() => Geolocation)
  coord?: Geolocation;
  @Type(() => Weather)
  weather?: Weather;
  base?: string;
  @Type(() => MainWeatherParams)
  main?: MainWeatherParams;
  visibility?: number;
  @Type(() => Wind)
  wind?: Wind;
  @Type(() => Clouds)
  clouds?: Clouds;
  dt?: number;
  @Type(() => System)
  sys?: System;
  timezone?: number;
  id?: number;
  name?: string;
  cod?: string;

  constructor(copy?: WeatherResponse) {
    Object.assign(this, copy);
  }
}
