import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.css']
})
export class ItemLineComponent implements OnInit {
  @Input() name: string;
  @Input() quantity: number;
  @Input() unit: string;
  @Input() price: number;

  constructor() { }

  ngOnInit(): void {
  }

  get image(): string {
    const unit  = this.unit.trim().toLowerCase();

    switch(unit) {
      case 'pack':
      case 'box':
      case 'carton':
        return '/assets/box.png';
      case 'kilogram':
        return '/assets/kilo.png';
      case 'bag':
      case 'sack':
        return '/assets/bag.png';
      case 'pack':
        return '/assets/pack.png';
      case 'gallon':
        return '/assets/gallon.png';
      case 'roll':
        return '/assets/roll.png';
      case 'jar':
        return '/assets/jar.png';
      default:
        return '/assets/piece.png';
    }
  }
}
