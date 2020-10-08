---
description: |
  Internal command for RogueRunner to set a command to run every time you go to a website
  
####### Other Metadata #######
authors: |
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://github.com/ktsuttlemyre/RogueBookmarklets

####### function signature #######
qualified urls: []
async: true
type: tool
data privacy: [local]

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {string} method - push,shift,set,get,remove
  {string} profile - Regex that matches the urls you want the comand to run on
  {string} script - The command with arguments you want to run
returns: |
  {string|object} Returns the string if you use get otherwise returns 

---
/*method,profile,script*/
if(!script){
    script=profile;
    profile='.*';
}
var key='@';
var callback=function(err,data){
  if(err){
    console.error(err);
  }
  next(data);
}
method=method.toLowerCase();
switch(method){
    case 'push':
    case 'shift':
            getData(key,function(err,data){
                data=data||{};
                var array=data[profile]||[];
                array[method](script);
                setData(key,data,callback);
            });
        break;
    case 'set':
            getData(key,function(err,data){
                data=data||{};
                data[profile]=script;
                setData(key,data,callback);
            });
        break;
    case 'get':
            getData(key,callback);
        break;
    case 'remove':
            getData(key,function(err,data){
                data=data||{};
                data[profile]=null;
                delete data[profile];
                setData(ns,data,callback);
            });
        break;
    default:
        throw 'error'
        next(); //idk if i need this
}
