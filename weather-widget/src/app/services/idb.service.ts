import { Injectable } from '@angular/core';
import { DBSchema, deleteDB, IDBPDatabase, openDB } from "idb";
import { CustomGeolocation, WeatherResponse } from "../domain";

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  async connect(): Promise<IDBPDatabase<WeatherDb>> {
    console.log('Connecting to IDB[Weather]')
    return await openDB<WeatherDb>('weather-db', 1, {
      upgrade(db, oldVersion, newWVersion, transaction) {
        db.createObjectStore('geolocation');
        const weatherStore = db.createObjectStore('weather');
        weatherStore.createIndex('id', 'name');
      }
    })
  }

  async insertGeoValue(storeName: StoreName, value: any): Promise<any> {
    console.log('Inserting value to [geolocationStore]');
    const db = await this.connect();
    return await db.put(storeName, value, 'geolocation');
  }

  async insertWeatherValue(storeName: StoreName, value: WeatherResponse): Promise<void> {
    console.log('Inserting value to [weatherStore]');
    const db = await this.connect();
    const tx = db.transaction(storeName, 'readwrite');
    await Promise.all([
      db.put(storeName, value, value.name),
      tx.done
    ])
  }

  async getValue(storeName: StoreName, key?: string): Promise<any> {
    const db = await this.connect();
    return await db.get(storeName, storeName === 'geolocation' ? 'geolocation' : (key ? key : ''));
  }

  async getAll(storeName: StoreName): Promise<any[]> {
    const db = await this.connect();
    return await db.getAll(storeName);
  }

  async deleteDb() {
    return await deleteDB('weather-db');
  }

}

export type StoreName = 'geolocation' | 'weather';

export interface WeatherDb extends DBSchema {
  'geolocation': {
    key: string,
    value: CustomGeolocation,

  };
  'weather': {
    key: string,
    value: WeatherResponse
    indexes: { 'id': number },
    autoIncrement: true
  };
}

