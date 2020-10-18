


//for(var i=0,l=arguments.length;i<l;i++){
  RogueBM.run(argument[0],function(data){
    if(data.data){
     RogueBM.run(argument[1],next)
    }else{
     RogueBM.run(argument[2],next)
  })


//}

