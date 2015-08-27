/************************************************ 
* - For a given input key, output the 10 most matching food items
    using the Autocomplete feature
   - Output is displayed on the console

Usage:
     ~ node AutoComplete.js Subway  
     - 'Subway' is the input key in the command given above   
************************************************/


/************************************************ 
*  		---- Code ----
************************************************/



// import the mongodb native drivers.
var MongoDB     = require("mongodb");
var MongoClient = MongoDB.MongoClient;

// Connection URL. This is where your mongodb server is running.
var mongodb_url = "mongodb://localhost:27017/FitnessPal_DB";

// Input key to search the DB
var input_key   = process.argv[2];
console.log( "---- Input key is:", input_key);

// Connect to the MongoDB server
MongoClient.connect( mongodb_url, function( db_connect_error, db)
{
  	if( db_connect_error)
	{
    	console.log( "Unable to connect to the mongoDB server. Error: ", db_connect_error);
  	}
	else
	{
    	console.log( "Connection established to:", mongodb_url);
    	var foods = db.collection("foods");

		// create regex for input key
		// Autocomplete: So input key should start from beginning
		var reg_expr_key = '^' + input_key;
		var reg_expr = new RegExp( reg_expr_key);

		foods.find( { foodname: reg_expr}).toArray( function( find_error, result)
		{
      		if( find_error)
			{
    			console.log( "Error in querying DB. Error: ", find_error);
      			db.close();
      		}
			else if( result.length)
			{
    			console.log( "Found matching food items !!!");
      			var item_count = result.length;
				var i = 0;

				// Return the 10 foods with the most similar names(Autocomplete)
				result.sort();
                while( i < item_count && i < 10)
				{
        			console.log( "Matching Food Name and _id: %d -> %s, %s ", i+1, result[i].foodname, result[i]._id);
					++i;
				}
	
      			db.close();
      		}
			else
			{
        		console.log('No items found with defined "find" criteria!', result);
      			db.close();
      		}
    	});	
  	}
});
