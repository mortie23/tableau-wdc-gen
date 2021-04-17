/**
 * Static definition of a content file
 */

const { tableau } = require("./tableauenum");

/**
 * The columns definition will always be a CONTENT_TYPE and CONTENT
 */
const colsData = () => {
  const data = [
    {
      id: "CONTENT_TYPE",
      alias: "Content Type",
      dataType: tableau.dataTypeEnum.string,
      columnRole: tableau.columnRoleEnum.dimension,
      columnType: tableau.columnTypeEnum.discrete,
    },
    {
      id: "CONTENT",
      alias: "Content",
      dataType: tableau.dataTypeEnum.string,
      columnRole: tableau.columnRoleEnum.dimension,
      columnType: tableau.columnTypeEnum.discrete,
    },
  ];
  return JSON.stringify(data).replace(/"!/g, "").replace(/!"/g, "");
};

/**
 * The columns definition will always be a CONTENT_TYPE and CONTENT
 */
const colsPush = () => {
  const data = {
    CONTENT_TYPE: "dataarray[i].CONTENT_TYPE",
    CONTENT: "dataarray[i].CONTENT",
  };
  return JSON.stringify(data).replace(/"/g, "");
};

module.exports.colsData = colsData;
module.exports.colsPush = colsPush;
