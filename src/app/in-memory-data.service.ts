import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const weapons = [
      { id: 11, name: 'Sword',attackPoint:15,endurance:70 },
      { id: 12, name: 'Arrow',attackPoint:10,endurance:50 },
      { id: 13, name: 'Axe',attackPoint:25,endurance:80 },
      { id: 14, name: 'Dagger',attackPoint:8,endurance:90 },
      { id: 15, name: 'Club',attackPoint:20,endurance:30 },
      { id: 16, name: 'Spear',attackPoint:20,endurance:40 },
    ];
    //returs that api address?
    return {heroes,weapons};
  }


  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
