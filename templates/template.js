(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var cols = { cols };

    var tableSchema = {
      id: "{ filename }",
      alias: "{ title }",
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    loadJSON("{ filename }", function (resp) {
      var respJson = JSON.parse(resp);
      var dataarray = { arrayis },
        tableData = [];

      // Iterate over the JSON object
      for (var i = 0, len = dataarray.length; i < len; i++) {
        tableData.push({ colpush });
      }

      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
  $("#submitButton").click(function () {
    tableau.connectionName = "{ title }";
    tableau.submit();
  });
});

// Helper function that loads a json and a callback to call once that file is loaded
function loadJSON(path, cb) {
  var obj = new XMLHttpRequest();
  obj.overrideMimeType("application/json");
  obj.open("GET", "../json/" + path + "." + "{ filetype }", true);
  obj.onreadystatechange = function () {
    if (obj.readyState == 4 && obj.status == "200") {
      console.log(obj.responseText);
      cb(obj.responseText);
    }
  };
  obj.send(null);
}
