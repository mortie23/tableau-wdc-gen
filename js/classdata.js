(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var cols = [
      {
        id: "Age",
        alias: "",
        dataType: tableau.dataTypeEnum.int,
        columnRole: tableau.columnRoleEnum.measure,
        columnType: tableau.columnTypeEnum.continuous,
      },
      {
        id: "Height",
        alias: "",
        dataType: tableau.dataTypeEnum.int,
        columnRole: tableau.columnRoleEnum.measure,
        columnType: tableau.columnTypeEnum.continuous,
      },
      {
        id: "Name",
        alias: "",
        dataType: tableau.dataTypeEnum.string,
        columnRole: tableau.columnRoleEnum.dimension,
        columnType: tableau.columnTypeEnum.discrete,
      },
      {
        id: "Sex",
        alias: "",
        dataType: tableau.dataTypeEnum.string,
        columnRole: tableau.columnRoleEnum.dimension,
        columnType: tableau.columnTypeEnum.discrete,
      },
      {
        id: "Weight",
        alias: "",
        dataType: tableau.dataTypeEnum.int,
        columnRole: tableau.columnRoleEnum.measure,
        columnType: tableau.columnTypeEnum.continuous,
      },
    ];

    var tableSchema = {
      id: "classdata",
      alias: "Class Data",
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    loadJSON("classdata", function (resp) {
      var respJson = JSON.parse(resp);
      var dataarray = respJson,
        tableData = [];

      // Iterate over the JSON object
      for (var i = 0, len = dataarray.length; i < len; i++) {
        tableData.push({
          Age: dataarray[i].Age,
          Height: dataarray[i].Height,
          Name: dataarray[i].Name,
          Sex: dataarray[i].Sex,
          Weight: dataarray[i].Weight,
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
    tableau.connectionName = "Class Data";
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
