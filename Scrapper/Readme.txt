/************************************************
*
* Submission: Holmusk Engineering Challenge Backend
* - Scrapper
*************************************************/

Following are the files:
1. Scrapper_MyFitness.js
   - Provided with an input link (console input) for a food item from MyFitnessPal,
     it scraps the nutrition data and save the data in a DB(MngoDB here).
   - It is assumed that the MongoDB server is running at the location provided in 
     the script( default location for a MongoDB server).
   - Unique '_id' is created by the DB itself while inserting the data.

2. links.txt and run.sh
   - Some links to food items in MyFitnessPal and shell script to run the Scrapper_MyFitness.js script
     on each link to automate the insertion process.
