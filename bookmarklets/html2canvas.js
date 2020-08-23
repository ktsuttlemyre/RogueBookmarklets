window.RogueBM.loadScript('https://html2canvas.hertzen.com/dist/html2canvas.js','javascript',function(err){
  if(err){
    console.error(err)
    return
  }
  html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
  });
  })
