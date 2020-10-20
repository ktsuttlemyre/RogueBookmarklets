


function doIteration(index){
  RogueBM.run(arguments[index++],function(data){
    if(data.data){
      RogueBM.run(arguments[index],next)
    }else{
      if(arguments.length-1<=++index){
        RogueBM.run(arguments[index],next)
      }else{
        doIteration(++index);
      }
    }})
}
doIteration(0);


