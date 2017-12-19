import { Component, OnInit, Input } from '@angular/core';

import { WishlistItem } from '../wishlistItem';
import { WishlistService} from '../wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {

	@Input('wishlist') wishlist: WishlistItem[];

	constructor(private wishlistService: WishlistService) { }
	
	// You don't need to do anything on init, since there isn't anything to search
	ngOnInit() {
		this.wishlistService.getWishlist().subscribe(wishlist => this.wishlist = wishlist);
	}
	
	//Remove this item from the list
	deleteFromWishlist(item: WishlistItem): void {
		var index = this.wishlist.indexOf(item);
		this.wishlistService.wishlist.splice(index, 1); 
	}
}
