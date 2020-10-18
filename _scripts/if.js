

var index=0
function doIteration(){
  RogueBM.run(arguments[index],function(data){
    index+=1
    if(data.data){
      RogueBM.run(arguments[index],next)
    }else{
      index+=1
      if(arguments.length-1<=index){
        RogueBM.run(arguments[index],next)
      }else{
        doIteration();
      }
  })
}
doIteration();


