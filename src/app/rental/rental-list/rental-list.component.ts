import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { debug } from 'util';
import { Rental } from '../shared/rental.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})

export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];

  // we are injecting the service into the constructor
  constructor(private rentalService: RentalService) { }

  // oninit called just before the component is instanciated
  ngOnInit() {
    const rentalObservable = this.rentalService.getRentals();
    rentalObservable.subscribe(
      (rentals: Rental[]) => {
          this.rentals = rentals;
      },
      (error) => {
      },
      () => {
      });
  }
}
