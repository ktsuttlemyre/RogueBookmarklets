window.RogueBM.loadScript('https://html2canvas.hertzen.com/dist/html2canvas.js','javascript',function(err){
  if(err){
    console.error(err)
    return
  }
  html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
    //https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
    var saved = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    window.location.href=saved; // it will save locally
  });
  })
