/************************************************ 
* - Read the Nutritent details from the input JSON file

Usage:
  - node ReadData.js Input.json
    - 'Input.json' file is the Input file to read the data from
************************************************/


/************************************************ 
*  		---- Code ----
************************************************/


// import the mongodb native drivers.
var MongoDB = require("mongodb");
var MongoClient = MongoDB.MongoClient;
var input_json_file = process.argv[2];

// Connection URL. This is where your mongodb server is running.
var mongodb_url = "mongodb://localhost:27017/FitnessPal_DB";

// File handle to read the input json file
var fs = require("fs");

// Connect to the MongoDB server
MongoClient.connect( mongodb_url, function( db_connect_error, db)
{
  	if( db_connect_error)
	{
    	console.log( "Unable to connect to the mongoDB server. Error:", db_connect_error);
  	}
	else
	{
    	console.log( "Connection established to", mongodb_url);

		// Read the JSON data file
		fs.readFile( input_json_file, function( file_read_error, data)
		{
    		if( file_read_error)
			{ 
				console.log( file_read_error);
				db.close();
			}
			else
			{
    			var Json_obj = JSON.parse( data)
				console.log( Json_obj);

				// Insert the data
				var foods = db.collection("foods");
   				foods.insert( Json_obj, function( db_insert_error, result)
				{
     				if( db_insert_error)
					{
        				console.log( "Unable to insert in DB. Error: ", db_insert_error);
						db.close();
      				}
					else
					{
        				console.log("Insertion done successfully for the input");
      					db.close();
      				}	
				});
			}
		});	
	}
});
