
method=(method||'').toUperCase();
if(method=='GET'){
  getData(data,function(){
    if(err){
      throw err
      
    }
    next(data);
  })
}else if(method=='SET')){
  setData(data,function(err){
    if(err){
      throw err
    }
    next(data);
  })
}else{
  throw "error with storage.js"
}
