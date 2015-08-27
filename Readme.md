Holmusk Backend Challenge Submission
----------------------------------------------

This submission contains two sub-sections (directories with same name also):
1. Scrapper
	- A web scrapper - Scrapper_MyFitness.js to scrap the required data from an input link
	  and store the data in a DB(MongoDB here).
    - Input links used here are from MyFitnessPal
    - A file links.txt contains links for 50 different food items from MyFitnessPal
	- run.sh scripts runs the scrapper script on each of the link from links.txt
	- Console_scripts subdirectory contains the console based functionality for:
		- Query by foodid
		- Query by foodname
		- Manually insert the food item details

2. Sail JS based FrontEnd:
	- Sail JS based frontend with the following endpoints:
		- Query by foodid
		- Query by foodname
		- Manually insert the food item details
	- Major files:
		- api/controllers/FoodController.js
			- Actions provided for all the endpoints based functionality.
		- config/routes.js
			- Custom routes
		- views/assignment_layout.js
			- Homepage for the application
		- views/food/fetched_list.js
			- Webpage for fetched list of food items for given input foodname
		- views/food/fetched_list_error.js
			- Webpage to display error for query for given input foodname
		- views/food/food_details.js
			- Webpage for fetched data for a given input foodid
		- views/food/food_details_error.js
			- Webpage to display error for query for a given input foodid
	- Data to query is stored in DB as fetched from Step 1 above. 


DB and other prerequisites
----------------------------------------------
1. DB used: MongoDB
   - Running on default port
2. All other required modules like Cherio, Request etc have already been installed


Instructions:
----------------------------------------------
1. Run the MongoDB server on the default port.
2. Run Scrapper_MyFitness.js for input links from MyFitnessPal
   - This will populate the DB to be used for Sail JS app.
   NOTE: run.sh can also be used for some predefined links
3. Run the Sail JS app
