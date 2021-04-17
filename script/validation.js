/**
 * Author:  Christopher Mortimer
 * Date:    2021-01-22
 * Desc:    Modules used for validation and displaying help to user
 */

const fs = require("fs");
const logSymbols = require("log-symbols");
const chalk = require("chalk");

/**
 * Function to display to the user the result of validation
 * @param {object} validate the returned object from a validate function call
 * @param {string} component the name of the component being tested
 */
const displayValidation = (validate, component) => {
  if (validate.validation == "fail") {
    console.log(logSymbols.warning, chalk.yellow(`FAIL:`));
    console.log(
      logSymbols.warning,
      chalk.yellow(`-> ${validate.invalidMessage}`)
    );
    console.log(logSymbols.warning, chalk.red(`   values: ${validate.values}`));
  } else if (validate.validation == "pass") {
    console.log(logSymbols.success, chalk.green(`PASS:`));
    console.log(
      logSymbols.success,
      chalk.green(`-> ${component} is valid, ${validate.validMessage}`)
    );
    console.log(
      logSymbols.success,
      chalk.green(`   values: ${validate.values}`)
    );
  } else if (validate.validation == "error") {
    console.log(logSymbols.error, chalk.red(`ERROR:`));
    console.log(logSymbols.error, chalk.red(`-> ${validate.invalidMessage}`));
    console.log(logSymbols.error, chalk.red(`   values: ${validate.values}`));
  }
};

/**
 * checks to see if the data JSON file exists
 * @param {object} options
 */
const validateFilename = (filename, geojson) => {
  // Read the directory
  files = fs.readdirSync("json/");

  // create a return object
  if (!geojson & files.includes(filename + ".json")) {
    return {
      validation: "pass",
      values: filename + ".json",
      validMessage: "Data file exists with filename",
    };
  } else if (geojson & files.includes(filename + ".geojson")) {
    return {
      validation: "pass",
      values: filename + ".geojson",
      validMessage: "Data file exists with filename",
    };
  } else {
    if (!geojson) {
      return {
        validation: "fail",
        values: filename + ".json",
        invalidMessage:
          "You have entered a filename that does not have an associated data JSON file",
      };
    } else {
      return {
        validation: "fail",
        values: filename + ".geojson",
        invalidMessage:
          "You have entered a filename that does not have an associated data GeoJSON file",
      };
    }
  }
};

/**
 * checks to see if the content JSON file exists
 * @param {object} options
 */
const validateFilenameContent = (filename) => {
  // Read the directory
  files = fs.readdirSync("json/");

  // create a return object
  if (files.includes(filename + "_content.json")) {
    return {
      validation: "pass",
      values: filename + "_content.json",
      validMessage: "Content file exists with filename",
    };
  } else {
    return {
      validation: "fail",
      values: filename + "_content.json",
      invalidMessage:
        "You have entered a filename that does not have an associated content JSON file",
    };
  }
};

module.exports.validateFilename = validateFilename;
module.exports.validateFilenameContent = validateFilenameContent;
module.exports.displayValidation = displayValidation;
