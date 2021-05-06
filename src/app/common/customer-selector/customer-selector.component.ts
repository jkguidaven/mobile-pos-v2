import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Observable, Subscription } from 'rxjs';
import { LookupTableService } from 'src/app/services/lookup-table.service';

@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.css']
})
export class CustomerSelectorComponent implements OnInit {
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;

  constructor(private lookupTable: LookupTableService) { }

  ngOnInit(): void {
  }

  searchCustomer(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (text.length < 3) {
      event.component.items = [];
      event.component.endSearch();
      return;
    }

    const fetch = new Observable((subscriber) => {
      const filter = (customer) => {
        const name = customer.name.trim().toLowerCase();
        return name.includes(text);
      };

      event.component.items = this.lookupTable.searchDataFromCache('customers', filter);
      subscriber.complete();
      event.component.endSearch();
    });

    this.subscription = fetch.subscribe();
  }

  onChange($event) {
    const withPriceScheme = { ...$event.value };
    withPriceScheme.price_scheme = this.lookupTable
      .searchDataFromCache('price_schemes', (scheme) => scheme.id === withPriceScheme.price_scheme_id)[0];
    this.modelChange.emit(withPriceScheme);
  }
}
