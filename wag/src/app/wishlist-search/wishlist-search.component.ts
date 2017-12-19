import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
 
import {
	debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
 
import { WishlistItem } from '../wishlistitem';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-search',
  templateUrl: './wishlist-search.component.html',
  styleUrls: ['./wishlist-search.component.css']
})
export class WishlistSearchComponent implements OnInit {

	results$: Observable<WishlistItem[]>;
	private searchTerms = new Subject<string>();

	constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
	this.results$ = this.searchTerms.pipe(
		debounceTime(300),
		distinctUntilChanged(),	// ignore new term if same as previous term
		// switch to new search observable each time the term changes
		switchMap((term: string) => this.wishlistService.searchWishlist(term)),
	);
  }
  
	search(term: string): void {
		this.searchTerms.next(term);
	}

	addToWishlist(item: WishlistItem) : void {
		this.wishlistService.addToWishlist(item);
	}
	
	createWishlistItem(name: string): void {
		name = name.trim();
		if (!name) { return; }
		this.wishlistService.createWishlistItem({ name } as WishlistItem)
			.subscribe(item => {
				this.addToWishlist(item);
			});
	}
}
