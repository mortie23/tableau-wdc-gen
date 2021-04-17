#!/usr/bin/env node
/**
 * Author:  Christopher Mortimer
 * Date:    2021-01-21
 * Desc:    Script to generate the WDC HTML and JS files from input metadata
 * Usage:   node .\script\tableauwdc.js --filename <filename (no extension)> --title "<a title for the dataset with quotes>"
 * Example: node .\script\tableauwdc.js --filename classdata --title "Class Data"
 */

const fs = require("fs");
const { ArgumentParser } = require("argparse");
const chalk = require("chalk");
const readlineSync = require("readline-sync");
const { tableau } = require("./tableauenum");
const contentdef = require("./contentdef");
const validation = require("./validation");

const parser = new ArgumentParser({
  add_help: true,
  description: "Argparse example",
});

parser.add_argument("-f", "--filename", {
  type: String,
  help: "name of the dataset (json) you are building a WDC for",
  required: true,
});
parser.add_argument("-t", "--title", {
  type: String,
  help: "name of the dataset (json) you are building a WDC for",
  required: true,
});
parser.add_argument("-g", "--geojson", {
  help: "Flag for geojson input",
  required: false,
  action: "store_true",
});

/**
 * Create global variables from argument parser
 */
const args = parser.parse_args();
const filename = args.filename;
const title = args.title;
const geojson = args.geojson;
console.log(geojson);

console.log(chalk.bgBlueBright.black("\nSTART: Validations"));

// First run all validations before proceeding
var validateFilename = validation.validateFilename(filename, geojson);
validation.displayValidation(validateFilename, "filename");
var validateFilenameContent = validation.validateFilenameContent(filename);
validation.displayValidation(validateFilenameContent, "filename-content");

var proceeding = readlineSync.question("Do you want to proceed (Y/N)? ");
if (proceeding == "Y") {
  console.log(chalk.bold("\n\nContinue:"));
} else {
  console.log(
    chalk.bold("\n\nDiscontinue:"),
    ", if you had validations",
    chalk.yellow("fail"),
    "please fix them"
  );
  process.exit();
}

console.log(chalk.bgBlueBright.black("\nSTART: Building WDC files"));

/**
 * Read the metadata JSON file
 */
let sourceMeta = JSON.parse(fs.readFileSync("meta/" + filename + "_meta.json"));

/**
 * Function to return the JSON array that defines the columns for Tableau native types
 * @param {string} filename name of the file
 */
const colsData = (filename) => {
  var cols = [];
  if (geojson) {
    // For GeoJSON
    var cols = sourceMeta.map((col) => {
      dataType =
        col.TYPE == 2
          ? tableau.dataTypeEnum.string
          : col.FORMAT == "YYMMDD"
          ? tableau.dataTypeEnum.date
          : col.FORMATD !== 0
          ? tableau.dataTypeEnum.float
          : tableau.dataTypeEnum.int;
      columnRole =
        (col.TYPE == 2) |
        (col.FORMAT == "YYMMDD") |
        (col.NAME == "EXTRACT_YEAR")
          ? tableau.columnRoleEnum.dimension
          : tableau.columnRoleEnum.measure;
      columnType =
        (col.TYPE == 2) |
        (col.FORMAT == "YYMMDD") |
        (col.NAME == "EXTRACT_YEAR")
          ? tableau.columnTypeEnum.discrete
          : tableau.columnTypeEnum.continuous;
      var newCol = {
        id: col.NAME,
        alias: col.LABEL,
        dataType: dataType,
        columnRole: columnRole,
        columnType: columnType,
      };
      return newCol;
    });
    var geometryCol = {
      id: "geometry",
      alias: "geometry",
      dataType: tableau.dataTypeEnum.geometry,
    };
    cols.push(geometryCol);
  } else {
    // For SAS output
    var cols = sourceMeta.map((col) => {
      dataType =
        col.TYPE == 2
          ? tableau.dataTypeEnum.string
          : col.FORMAT == "YYMMDD"
          ? tableau.dataTypeEnum.date
          : col.FORMATD !== 0
          ? tableau.dataTypeEnum.float
          : tableau.dataTypeEnum.int;
      columnRole =
        (col.TYPE == 2) |
        (col.FORMAT == "YYMMDD") |
        (col.NAME == "EXTRACT_YEAR")
          ? tableau.columnRoleEnum.dimension
          : tableau.columnRoleEnum.measure;
      columnType =
        (col.TYPE == 2) |
        (col.FORMAT == "YYMMDD") |
        (col.NAME == "EXTRACT_YEAR")
          ? tableau.columnTypeEnum.discrete
          : tableau.columnTypeEnum.continuous;
      var newCol = {
        id: col.NAME,
        alias: col.LABEL,
        dataType: dataType,
        columnRole: columnRole,
        columnType: columnType,
      };
      return newCol;
    });
  }
  return JSON.stringify(cols).replace(/"!/g, "").replace(/!"/g, "");
};

/**
 * Function to return the push statements for the Tableau WDC
 * @param {string} filename name of the file
 */
const colsPush = (filename) => {
  var pushes = {};
  // GeoJSON data is not flat. there is a features array and each feature has a geometry and then properties
  if (geojson) {
    var cols = sourceMeta.forEach((col) => {
      pushes[col.NAME] = `dataarray[i].properties.${col.NAME}`;
    });
    var geoCol = "dataarray[i].geometry";
    pushes["geometry"] = geoCol;
  } else {
    const cols = sourceMeta.forEach((col) => {
      pushes[col.NAME] = `dataarray[i].${col.NAME}`;
    });
  }
  return JSON.stringify(pushes).replace(/"/g, "");
};

/**
 * Create the HTML and JS for the data source
 */

// Read the template files
const htmlTemplate = fs.readFileSync("templates/template.html", "utf8");
const jsTemplate = fs.readFileSync("templates/template.js", "utf8");

// HTML
var htmlTemplateReplace = htmlTemplate
  .replace(/{ filename }/g, filename)
  .replace(/{ title }/g, title);
fs.writeFileSync(`html/${filename}.html`, htmlTemplateReplace, "utf8");
// JS
var jsTemplateReplace = jsTemplate
  .replace(/{ filename }/g, filename)
  .replace(/{ title }/g, title)
  .replace(/{ cols }/g, colsData(filename))
  .replace(/{ colpush }/g, colsPush(filename));
if (geojson) {
  var jsTemplateReplace = jsTemplateReplace
    .replace(/{ filetype }/g, "geojson")
    .replace(/{ arrayis }/g, "respJson.features");
} else {
  var jsTemplateReplace = jsTemplateReplace
    .replace(/{ filetype }/g, "json")
    .replace(/{ arrayis }/g, "respJson");
}
fs.writeFileSync(`js/${filename}.js`, jsTemplateReplace, "utf8");

/**
 * Create the HTML and JS for the extra text content
 */

// HTML
var htmlTemplateReplaceContent = htmlTemplate
  .replace(/{ filename }/g, filename + "_content")
  .replace(/{ title }/g, title + " Content");
fs.writeFileSync(
  `html/${filename}_content.html`,
  htmlTemplateReplaceContent,
  "utf8"
);
// JS
var jsTemplateReplaceContent = jsTemplate
  .replace(/{ filename }/g, filename + "_content")
  .replace(/{ title }/g, title + " Content")
  .replace(/{ cols }/g, contentdef.colsData())
  .replace(/{ colpush }/g, contentdef.colsPush());
var jsTemplateReplaceContent = jsTemplateReplaceContent
  .replace(/{ filetype }/g, "json")
  .replace(/{ arrayis }/g, "respJson");
fs.writeFileSync(`js/${filename}_content.js`, jsTemplateReplaceContent, "utf8");
