<?php

namespace App\Http\Controllers;

use App\Wishlist;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
	public $primaryKey = 'name';
	
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    
    public function index(Request $request) {
		// Search DB for term
		// If nothing is found, return an empty set
		// Save the saving a new term for the front-end.
		$search = $request->input('search');
        $results = Wishlist::Where('name', 'LIKE', "%$search%")->get();

		if($results->count()){
	        return response()->json($results, 200);
/*
		} else {
			return response()->json(['message' => "'{$search}' matched no results."], 404);
*/
		}
	}

	public function add(Request $request){

		$name = $request->input('name');

		$item = Wishlist::create([
			'name' => $name,
		]);
	
		return response()->json($item, 200);
	
	}
}
