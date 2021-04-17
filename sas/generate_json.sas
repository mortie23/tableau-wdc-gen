*  Get the latest package of macros from SASjs core;
filename mc url "https://raw.githubusercontent.com/sasjs/core/main/all.sas";
%inc mc;
*  Get the current working directory (note this is for windows);
filename pwd pipe 'echo %cd%';
data _null_;
  infile pwd;
  input;
  put _infile_;
  pwd=tranwrd(_infile_,'0d'x,'');
  call symputx('pwd',pwd);
run;
%put pwd: &pwd.;
libname this "&pwd.";

* Configure your path to write the JSON;
%let outdir=&pwd.;
* Generate the metadata SAS dataset;
proc datasets lib=this memtype=data;
  contents data=this.class out=work.class_meta;
quit;
* Create filename handle for files to write to;
filename json "&outdir./classdata.json";
filename jsonmeta "&outdir./classdata_meta.json";
* Export to JSON;
%mp_jsonout(OBJ,this.class,jref=json)
%mp_jsonout(OBJ,class_meta,jref=jsonmeta)
