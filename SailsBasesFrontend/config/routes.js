/**
 * Route Mappings
 */

module.exports.routes = {

  /***************************************************************************
  * homepage route                                                           *
  ***************************************************************************/

  '/': {
    view: 'assignment_layout'
  },

  /***************************************************************************
  * Custom routes here...                                                    *
  ***************************************************************************/
  '/fetchByName': 'FoodController.fetchByName',
  '/fetchById'  : 'FoodController.fetchById',
  '/enterFoodItemManually'  : 'FoodController.insertFoodItem'
};
