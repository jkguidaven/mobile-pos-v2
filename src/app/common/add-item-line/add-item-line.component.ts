import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-item-line',
  templateUrl: './add-item-line.component.html',
  styleUrls: ['./add-item-line.component.css']
})
export class AddItemLineComponent implements OnInit {
  @Input() disabled: boolean;
  @Output() add: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
