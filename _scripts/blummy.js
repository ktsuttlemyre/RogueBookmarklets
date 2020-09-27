---
description: |
  blummy is a free tool for quick access to your favorite web services via your bookmark toolbar.
  It's a kind of drop down menu consisting of widgets (called blummlets) that provide rich functionality.
  It works on almost every page on the web*. Just click on it at your toolbar.

####### Other Metadata #######
authors: |
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
originalsource: https://github.com/ktsuttlemyre/RogueBookmarklets



####### function signature #######
specs: [async]
layout: script

# for syntax see: https://jsdoc.app/tags-type.html
params: |
  {string} user - your blumy user name. This will become your default user name for each time you call this function
returns: |
  {undefined}
---
{{ raw }}
var key='blumy-user';
if(user){
    RogueBM.setData(key,user);
    blumy(user);
    next();
    return
}
RogueBM.getData(key,function(err,user){
    blummy(user)
    next();
});

function blummy(user){
    (function(){var l,s,d=document,i,a=function(o){d.body.appendChild(o)};if(d.getElementById('blummy'))return Blummy.close();l=d.createElement('div');l.innerHTML='Loading..';i=l.style;i.position='absolute';i.top='0';i.left='9px';i.backgroundColor='#f00';i.color='#fff';i.font='normal 14px sans-serif';i.padding='2px';i.zIndex='999';l.id='l_blm';a(l);s=d.createElement('script');s.type='text/javascript';s.src='https://blummy.com/blummy.js?user='+user;a(s)})();
}
{{ endraw }}
