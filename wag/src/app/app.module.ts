import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';

import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistSearchComponent } from './wishlist-search/wishlist-search.component';

import { WishlistService } from './wishlist.service';

@NgModule({
  declarations: [
    AppComponent,
    WishlistComponent,
    WishlistSearchComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	AppRoutingModule,
	HttpClientModule
  ],
  providers: [
  	WishlistService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
