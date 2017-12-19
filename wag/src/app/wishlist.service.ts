import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { WishlistItem } from './wishlistitem';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class WishlistService {

	private url = 'https://cors.io/?http://wag-api.timtoon.com/api/v1/wishlist';
	wishlist: WishlistItem[] = [];
	term: string;

	constructor(
		private http: HttpClient
	) { }

	searchWishlist(term: string): Observable<WishlistItem[]> {
		if (!term.trim()) {
			return of([]);
		}
		
		this.term = term;

		return this.http.get<WishlistItem[]>(`${this.url}/?search=${this.term}`).pipe(
			tap(_ => this.log(`Results matching "${this.term}"`)),
			catchError(this.handleError<WishlistItem[]>('searchResults', []))
		);
	}

	createWishlistItem (item: WishlistItem): Observable<WishlistItem> {
		this.log(`${this.url}/add/?name=${item.name}`);
		
		return this.http.get<WishlistItem>(`${this.url}/add/?name=${item.name}`).pipe(
			tap((wishlistItem: WishlistItem) => this.log(`added ${wishlistItem.name} to wishlist`)),
			catchError(this.handleError<any>('createWishlistItem'))
		);
	}

	getWishlist(): Observable<WishlistItem[]> {
		return of(this.wishlist);
	}

	addToWishlist(item: WishlistItem): void {
		this.wishlist.push(item);
		this.log(`added wishlist item ${item.name}`);
	}

	private log(message: string) {
		console.log('WishlistService: ' + message);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	
	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);
	
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}
