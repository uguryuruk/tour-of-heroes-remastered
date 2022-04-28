import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';  //asenkron işlemler için.
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //service in service
  constructor(private messageService: MessageService) { }

//asenkron!
getHeroes(): Observable<Hero[]> {
  const heroes = of(HEROES);
  //adds incoming heroes to the messages property of msgs service. Then you use it from there
  this.messageService.add('HeroService: fetched heroes');
  return heroes;
}

getHero(id: number): Observable<Hero> {
  // For now, assume that a hero with the specified `id` always exists.
  // Error handling will be added in the next step of the tutorial.
  const hero = HEROES.find(h => h.id === id)!;
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(hero);
}

}
