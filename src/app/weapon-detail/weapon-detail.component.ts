import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {

  @Input() weapon?: Weapon;

  constructor(
    private route:ActivatedRoute,
    private weaponService:WeaponService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWeapon();
  }
  getWeapon():void{
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.weaponService.getWeapon(id)
      .subscribe(wpn=>this.weapon=wpn)
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.weapon) {
      this.weaponService.updateWeapon(this.weapon)
        .subscribe(() => this.goBack());
    }
  }
}
