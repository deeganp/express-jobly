const { BadRequestError } = require("../expressError");

// /**
//  * This function generates a SQL query for updating rows with the given data.
//  *
//  * @param {Object} dataToUpdate - The data to update in the format {field1: newVal1, field2: newVal2, ...}
//  * @param {Object} jsToSql - Maps js-style data fields to database column names,
//  *                           like {firstName: 'first_name', age: 'age'}
//  *
//  * @returns {Object} - An object containing the SQL SET clause as a string and an array of string values
//  *                     to replace placeholders in the SET clause.
//  *
//  * @throws {BadRequestError} - If no data is provided to update.
//  */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
