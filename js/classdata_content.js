(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var cols = [
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

    var tableSchema = {
      id: "classdata_content",
      alias: "Class Data Content",
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    loadJSON("classdata_content", function (resp) {
      var respJson = JSON.parse(resp);
      var dataarray = respJson,
        tableData = [];

      // Iterate over the JSON object
      for (var i = 0, len = dataarray.length; i < len; i++) {
        tableData.push({
          CONTENT_TYPE: dataarray[i].CONTENT_TYPE,
          CONTENT: dataarray[i].CONTENT,
        });
      }

      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
  $("#submitButton").click(function () {
    tableau.connectionName = "Class Data Content";
    tableau.submit();
  });
});

// Helper function that loads a json and a callback to call once that file is loaded
function loadJSON(path, cb) {
  var obj = new XMLHttpRequest();
  obj.overrideMimeType("application/json");
  obj.open("GET", "../json/" + path + "." + "json", true);
  obj.onreadystatechange = function () {
    if (obj.readyState == 4 && obj.status == "200") {
      console.log(obj.responseText);
      cb(obj.responseText);
    }
  };
  obj.send(null);
}
