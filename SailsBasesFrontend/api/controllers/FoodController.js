/**
 * FoodController
 * - Implementation of following route actions:
 *   - fetchByName : Fetch data from db based on food-item name
 *   - fetchById   : Fetch data from db based on food-id
 *   - insertFoodItem   : Insert the food item details entered manually from frontend
 */

module.exports = {
	
  	/**
   	* `FoodController.fetchByName()`
   	*/
  	fetchByName: function( req, res)
	{
		// Autocomplete feature : 
		// - create regex for input key
		// - regex: input key should be beginning of the food-item name
    	var input_key = req.param("input_key");
		var reg_expr_key = '^' + input_key;
		var reg_expr = new RegExp( reg_expr_key);

		// Query the db for the food item
        Food.find( { foodname: reg_expr}).exec( function( db_connect_error, result)
		{
    		console.log("################################################");
            if( db_connect_error)
			{
                return res.send(501, "DB connection error for action 'FoodController.fetchByName()'");
            } 
			else if( result.length)
			{
				console.log("Found matching food items with given name: %s", input_key);

				// Return the 10 foods with the most similar names(Autocomplete)
      			var item_count = result.length;
				var items = [];
				var i = 0;
				result.sort();
                
				while( i < item_count && i < 10)
				{
					var current_obj = {};
					current_obj['name']  = result[i].foodname;
					current_obj['id']    = result[i].id;
					items.push(current_obj);
					++i;
				}

				// render the view with the fetched objects
				return res.view( 'food/fetched_list', {item_list : items});
        	}
			else
			{
                console.log( "No items found with the given input query '%s'", input_key);
                //return res.send(401, "No items found with the given input Query: " + input_key);
				return res.view( 'food/fetched_list_error', {input_key : input_key});
			}
    	});	
  	},


  	/**
   	* `FoodController.fetchById()`
   	*/
  	fetchById: function( req, res)
	{
    	var input_key = req.param("input_key");

		// Find the item in DB using the given input key
        Food.find( { id: input_key}).exec( function( db_connect_error, result)
		{
    		console.log("################################################");
            if( db_connect_error)
			{
                return res.send(502, "DB connection error for action 'FoodController.fetchById()'");
            } 
			else if( result.length)
			{
    			console.log( "Found item with the given input food-id: %s", input_key);
        		console.log( " - Matching Food Name : %s", result[0].foodname);
				var Json_obj = {};

				// create the Json object
				Json_obj["Foodname"] 	= result[0].foodname;
				Json_obj["Id"] 			= result[0].id;
				Json_obj["Calories"] 	= result[0].calories;
				Json_obj["Sodium"] 		= result[0].sodium;
				Json_obj["Potassium"] 	= result[0].potassium;
				Json_obj["Calcium"] 	= result[0].calcium;
				Json_obj["Iron"] 		= result[0].iron;
				Json_obj["Total_carbs"] = result[0].total_carbs;
				Json_obj["Dietary_fibres"] 	= result[0].dietary_fibres;
				Json_obj["Sugar"] 			= result[0].sugar;
				Json_obj["Protien"] 		= result[0].protiens;
				Json_obj["Cholestrol"] 		= result[0].cholestrol;
				Json_obj["Vitamin_a"] 		= result[0].vitamin_a;
				Json_obj["Vitamin_c"] 		= result[0].vitamin_c;
				Json_obj["Total_fat"] 		= result[0].total_fat;
				Json_obj["Saturated_fat"] 	= result[0].saturated_fat;
				Json_obj["PolyUnsaturated_fat"] = result[0].polyunsaturated_fat;
				Json_obj["MonoUnsaturated_fat"] = result[0].monounsaturated_fat;
				Json_obj["Trans_fat"] 			= result[0].trans_fat;

				// render the view with the fetched object
				return res.view( 'food/food_details', {food_details: Json_obj});
        	}
			else
			{
                console.log( "No item found with given input id '%s'", input_key);
                //return res.send(402, "No item found with the given input Id: " + input_key);
				return res.view( 'food/food_details_error', {input_key : input_key});
      		}
    	});	
  	},


  	/**
   	* `FoodController.insertFoodItem()`
   	*/
  	insertFoodItem:function( req, res)
	{
    	var foodname 		= req.param("foodname");
    	var calories 		= req.param("calories");
    	var sodium 			= req.param("sodium");
    	var potassium	 	= req.param("potassium");
    	var calcium	 		= req.param("calcium");
    	var iron 			= req.param("iron");
    	var total_carbs 	= req.param("total_carbs");
    	var dietary_fibres 	= req.param("dietary_fibres");
    	var sugar			= req.param("sugar");;
    	var protiens	 	= req.param("protiens");
    	var cholestrol	 	= req.param("cholestrol");
    	var vitamin_a	 	= req.param("vitamin_a");
    	var vitamin_c	 	= req.param("vitamin_c");
    	var total_fat 		= req.param("total_fat");
    	var saturated_fat 	= req.param("saturated_fat");
    	var polyunsaturated_fat = req.param("polyunsaturated_fat");
    	var monounsaturated_fat = req.param("monounsaturated_fat");
    	var trans_fat 			= req.param("trans_fat");

		// create the Json object
		var Json_obj = {};
		Json_obj["foodname"] 	= foodname;
		Json_obj["calories"] 	= calories;
		Json_obj["sodium"] 		= sodium;
		Json_obj["potassium"]	= potassium;
		Json_obj["calcium"] 	= calcium;
		Json_obj["iron"] 		= iron;
		Json_obj["total_carbs"] = total_carbs;
		Json_obj["dietary_fibres"] 	= dietary_fibres;
		Json_obj["sugar"] 			= sugar;
		Json_obj["protiens"] 		= protiens;
		Json_obj["cholestrol"] 		= cholestrol;
		Json_obj["vitamin_a"]		= vitamin_a;
		Json_obj["vitamin_c"] 		= vitamin_c;
		Json_obj["total_fat"] 		= total_fat;
		Json_obj["saturated_fat"] 	= saturated_fat;
		Json_obj["polyunsaturated_fat"] = polyunsaturated_fat;
		Json_obj["monounsaturated_fat"] = monounsaturated_fat;
		Json_obj["trans_fat"] 			= trans_fat;

		// Create a new entry in DB with given input details
        Food.create( Json_obj).exec(function( db_connect_error, result)
		{
    		console.log("################################################");
            if( db_connect_error)
			{
                return res.send(503, "DB connection error for action 'FoodController.insertFoodItem()'");
            }
			else
			{
        		console.log( "Food Item inserted successfully");
                return res.ok();
			}
		});
	}
};
