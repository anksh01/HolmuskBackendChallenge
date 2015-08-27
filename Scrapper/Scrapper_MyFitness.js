/************************************************ 
* - Build a Scraper to fetch food and Nutrition contents from site: www.myfitnesspal.com
*   - Store the scraped contents in DB
* - Food item to scrap is provided as a link via input

Usage:
  - node Srapper_MyFitness.js http://www.myfitnesspal.com/food/calories/207462062 
  	- 'http://www.myfitnesspal.com/food/calories/207462062' is the link to the food item
       to scrap
************************************************/


/************************************************ 
*  		---- Code ----
************************************************/


// ----- Required Modules and URL -----
var Request = require("request");
var Cheerio = require("cheerio");
var input_url = process.argv[2];

// ----- Required MongoDB Settings -----
// 1. import the mongodb native drivers.
// 2. get the "MongoClient" interface to connect to a mongodb server.
// 3. Mongodb URL
var MongoDB     = require("mongodb");
var MongoClient = MongoDB.MongoClient;
var mongodb_url = "mongodb://localhost:27017/FitnessPal_DB";


// ----- Request the Input URL -----
Request( input_url, function( request_error, response, body)
{
	if( !request_error)
	{
		// 1) ----- Scrapping Begin -----
		// load the body of the webpage
		var $ = Cheerio.load(body);
		
		// Get the food element: header with class food-description
		var food_element = $(":header.food-description");	
		console.log( "Found food item: " + food_element.text());

		// Get the nutrition table and create Json Obj
		// - table with id nutrition-facts
		var nutrition_table = $("table#nutrition-facts tr");

		var Json_obj = {};
		Json_obj['foodname'] = food_element.text();
		nutrition_table.each( function()
		{
    		var nutrition_elem1 = $(this).find("td").eq(0).text();
			// Check for non-breakable space cells '&nbsp;'
			if( nutrition_elem1 != String.fromCharCode(160))
    		{
				var elem1_val = $(this).find("td").eq(1).text();
				Json_obj[nutrition_elem1] = elem1_val;
			}

    		var nutrition_elem2 = $(this).find("td").eq(2).text();
			// Check for non-breakable space cells '&nbsp;'
			if( nutrition_elem2 != String.fromCharCode(160))
    		{
    			var elem2_val = $(this).find("td").eq(3).text();
				Json_obj[nutrition_elem2] = elem2_val;
			}
		});
		console.log(Json_obj);
		// ----- Scrapping End -----


		// 2) ----- Store In DB -----
		// Use connect method to connect to the Server
		MongoClient.connect( mongodb_url, function( db_connect_error, db)
		{
  			if( db_connect_error)
			{
    			console.log( "Unable to connect to the MongoDB server. Error: ", db_connect_error);
  			}
			else
			{
    			console.log( "Connection established to:", mongodb_url);

    			// Fetch the collection and insert the food details
    			var foods = db.collection("foods");
    			foods.insert( Json_obj, function( db_insert_error, result)
				{
      				if( db_insert_error)
					{
        				console.log( "Unable to insert in DB. Error: ", db_insert_error);
      				}
					else
					{
        				console.log( result);
      					db.close();
      				}	
				});
  			}
		});
	}
	else
	{
		console.log( "Encountered an error using Request. Error: ", request_error);
	}
});
