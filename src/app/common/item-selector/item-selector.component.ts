import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Observable, Subscription } from 'rxjs';
import { LookupTableService } from 'src/app/services/lookup-table.service';

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.css']
})
export class ItemSelectorComponent implements OnInit {
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;

  constructor(private lookupTable: LookupTableService) { }

  ngOnInit(): void {
  }

  searchItems(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (text.length < 2) {
      event.component.items = [];
      event.component.endSearch();
      return;
    }

    const fetch = new Observable((subscriber) => {
      const filter = (customer) => {
        const name = customer.name.trim().toLowerCase();
        return name.includes(text);
      };

      event.component.items = this.lookupTable.searchDataFromCache('items', filter);
      subscriber.complete();
      event.component.endSearch();
    });

    this.subscription = fetch.subscribe();
  }

  onChange($event) {
    this.modelChange.emit($event.value);
  }
}
