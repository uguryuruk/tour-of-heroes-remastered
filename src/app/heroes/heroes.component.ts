import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {

  // selectedHero?: Hero;
  //main hero property
  heroes: Hero[] = [];


  //DI dependency injection of two services
  constructor(private heroService: HeroService,private messageService: MessageService) {}

    //esas constructor budur :)
    // get hero list from the server
  ngOnInit(): void {
    this.getHeroes();
  }

  //calls the add hero method from the heroService,
  //then pushes the hero to the list directly-not from response
  add(name: string): void {
    //trim name, if name is empty exit
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  //calls hero delete function from the heroService
  delete(hero: Hero): void {
      //then filters the hero list without deleted hero directly-not from response

    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  //fills the hero list from the service
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }}

  //servisten veri çeken metodları asenkron yapmak gerekir.
