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


  //DI dependency injection
  constructor(private heroService: HeroService,private messageService: MessageService) {}

    //esas constructor budur :)
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }}
  // onSelect(hero: Hero): void {
  //   // this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  //servisten veri çeken metodları asenkron yapmak gerekir.
