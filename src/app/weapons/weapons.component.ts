import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  weapons:Weapon[]=[];

  constructor(private weaponService: WeaponService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  //fills the weapon list from the service
  getWeapons(): void {
    this.weaponService.getWeapons()
        .subscribe(weapons => this.weapons = weapons);
  }

  //calls the add weapon method from the weaponService,
  //then pushes the weapon to the list directly-not from response
  add(name: string): void {
    //trim name, if name is empty exit
    name = name.trim();
    if (!name) { return; }
    this.weaponService.addWeapon({ name } as Weapon)
      .subscribe(weapon => {
        this.weapons.push(weapon);
      });
  }

  //calls weapon delete function from the weaponService
  delete(weapon: Weapon): void {
      //then filters the weapon list without deleted weapon directly-not from response

    this.weapons = this.weapons.filter(h => h !== weapon);
    this.weaponService.deleteWeapon(weapon.id).subscribe();
  }
}
