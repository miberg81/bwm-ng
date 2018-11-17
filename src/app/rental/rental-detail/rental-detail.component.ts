import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
  currentId: string;
  rental: Rental;
  // injecting the service through the constructor so we can use it
  constructor(private route: ActivatedRoute,
    private rentalService: RentalService) { }

  ngOnInit() {

    // params is a Observable with the URL details
    this.route.params.subscribe((params) => {
      this.getRental(params['rentalId']);
    });
  }

  // gets the rental from the rental service
  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental: Rental) => {
        // will get rental after delay! Should be initialised, otherwise undefined
        this.rental = rental;
      },
      (error) => {
      },
      () => {
      }
    );
  }

}
