//  alert('only works on github.com, github.io or githubusercontent.com');
var host = window.location.hostname||window.location.host.split(':')[0];
var username=window.getSelection(); //get selection
if(!username){ //if no selection then get from url
  if(host=='github.com' || host.indexOf('githubusercontent.com')>=0){
    username=window.location.pathname.split('/')[1];
  }else if(host.indexOf('github.io')>=0){
    username=host.split('.')[0];
  }
  if(!username){ //if no url then ask user
    username=prompt("Please provide a username");
  }
}
//load data
window.open('https://www.gitmemory.com/'+username);
