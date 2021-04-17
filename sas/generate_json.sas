* Configure your path to write the JSON;
%let outdir=/some/path/on/server;
* Create the SAS dataset to output to JSON;
data datasourcename;
  * the dataset we want to work with;
run;
* Generate the metadata SAS dataset;
proc datasets lib=work memtype=data;
  modify datasourcename;
  contents data=work.datasourcename out=work.datasourcename_meta;
quit;
* Create filename handle for files to write to;
filename json "&outdir./datasourcename.json";
filename jsonmeta "&outdir./datasourcename_meta.json";
* Export to JSON;
%mp_jsonout(OBJ,datasourcename,jref=json)
%mp_jsonout(OBJ,datasourcename_meta,jref=jsonmeta)
