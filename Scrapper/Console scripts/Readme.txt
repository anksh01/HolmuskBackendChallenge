/************************************************
*
* Console based scripts
* - These scripts inputs and outputs the data through console
*   - Provides query by id/fooditem and manually inserting the data functionality
*************************************************/

There are 3 scripts for submissions:
1. QueryFoodId.js
   - Provided an input '_id' (console input) for a food item in DB, outputs the nutrition detail on console.

2. ReadData.js
   - Provided an input JSON file (console input) containing the name and nutrition data for a food item,
     parses the JSON file and inserts the data in the DB.

3. AutoComplete.js
   - Provided an input string (console input), outputs  10 food items with the most similar names.
   - In case < 10 matching items are present, outputs all the items.

4. Input.json
   - A sample JSON input file
