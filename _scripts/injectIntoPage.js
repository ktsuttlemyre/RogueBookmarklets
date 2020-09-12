var script=prompt('Post the script source (or script tag')
var match=script.match(/(?:<script [^>]+src=['"])([^"']+)/)
if(match){
  script=match[1]
}
RogueBM.getSessionID();
RogueBM.injectScript(script,prompt('input session id'))
