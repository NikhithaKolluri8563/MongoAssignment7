var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  cust_id: String,
  cust_name: String,
  cust_email: String,
  cust_ph_num: String,
  updated_date: {type: Date, default: Date.now},
});
/**
 * @class Customer
 * @typeof Model<CustomerSchema>
 */
const Customer = mongoose.model('CustomerDetails',CustomerSchema);
module.exports = Customer;
