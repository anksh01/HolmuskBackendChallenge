/************************************************ 
* - Provide the nutrient details for the '_id' value read as input
* - Script connects with the DB and queries DB with the given input '_id'
*   - Nutrient details are displayed on console 

Usage:
     ~ node QueryFoodId.js 1234a567b
     - 1234a567b is the input '_id' in the command given above
************************************************/


/************************************************ 
*  		---- Code ----
************************************************/


// Import the mongodb native drivers.
var MongoDB     = require("mongodb");
var MongoClient = MongoDB.MongoClient;
var ObjectId    = require('mongodb').ObjectID;

// MongoDB URL: MongoDB is running at this location
var mongodb_url = "mongodb://localhost:27017/FitnessPal_DB";

// Input key to search the DB
var input_key   = process.argv[2];
console.log( "Input key:", input_key);

// Connect to the MongoDB server
MongoClient.connect( mongodb_url, function( db_connect_error, db)
{
  	if( db_connect_error)
	{
    	console.log( "Unable to connect to the mongoDB server. Error: ", db_connect_error);
      	db.close();
  	}
	else
	{
    	console.log( "Connection established to: ", mongodb_url);
    	var food_collection = db.collection("foods");

		// Search the food item with a given key
		food_collection.find( { _id: ObjectId(input_key)}).toArray( function( find_error, result)
		{
      		if( find_error)
			{
    			console.log( "Error in querying DB. Error: ", find_error);
      			db.close();
      		}
			else if( result.length)
			{
    			console.log( "Found item with the given input key.");
				var Json_obj = result;
        		console.log( "- Item Details:", result);
      			db.close();
      		}
			else
			{
        		console.log( "No items found with defined 'find' criteria!");
      			db.close();
      		}
    	});	
  	}
});
