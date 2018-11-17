import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {
    private rentals: Rental[] = [
        {
            id: '1',
            title: 'Central Apartment',
            city: 'New York',
            street: 'Times Square',
            category: 'apartment',
            image: 'http://via.placeholder.com/350x250',
            bedrooms: 3,
            description: 'Very nice apartment',
            dailyRate: 34,
            shared: false,
            createdAt: '24/12/2017'
        },
        {
            id: '2',
            title: 'Central Apartment2',
            city: 'San Francisco',
            street: 'Main street',
            category: 'condo',
            image: 'http://via.placeholder.com/350x250',
            bedrooms: 3,
            description: 'Very nice apartment',
            dailyRate: 12,
            shared: true,
            createdAt: '24/12/2017'
        },
        {
            id: '3',
            title: 'Central Apartment3',
            city: 'Bratislava',
            street: 'Hlavna',
            category: 'condo',
            image: 'http://via.placeholder.com/350x250',
            bedrooms: 2,
            description: 'Very nice apartment',
            dailyRate: 334,
            shared: true,
            createdAt: '24/12/2017'
        },
        {
            id: '4',
            title: 'Central Apartment4',
            city: 'Berlin',
            street: 'Haupt strasse',
            category: 'house',
            image: 'http://via.placeholder.com/350x250',
            bedrooms: 9,
            description: 'Very nice apartment',
            dailyRate: 33,
            shared: true,
            createdAt: '24/12/2017'
        }
    ];

    public getRentalById(rentalId: string): Observable<Rental> {
        return new Observable<Rental>((observer) => {

            setTimeout(() => {
                const rentalFound = this.rentals.find((rental) => {
                    return rental.id === rentalId;
                });
                // emit the found data
                observer.next(rentalFound);
            }, 500);

        });
    }
    public getRentals(): Observable<Rental[]> {
        return new Observable<Rental[]> ((observer) => {
            // emulating async requests to server

            // emittting rentals as the data to the subscriber
            setTimeout(() => {
                observer.next(this.rentals);
            }, 1000);

            /*
            // emittting errors as the data to the subscriber
            setTimeout(() => {
                observer.error('I am error');
            }, 2000);

            // emittting complete as the data to the subscriber
            setTimeout(() => {
                observer.complete();
            }, 3000);
            */

        });
    }
}
