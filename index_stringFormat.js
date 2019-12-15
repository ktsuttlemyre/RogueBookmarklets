---
---
window.RogueBookmarklets=window.RogueBookmarklets||{}

RogueBookmarklets.scripts={
    {% for marklet in site.static_files %}
      {% if marklet.path contains 'bookmarklets/' %}
    "{{ marklet.basename }}":{
          "basename":"{{ marklet.basename }}",
          "path":"{{ marklet.path }}",
          "modified_time":"{{ marklet.modified_time }}",
          "name":"{{ marklet.name }}",
          "extname":"{{ marklet.extname }}",
//          "href":"javascript:{{ marklet.path | url_escape }}",
          "primarySrc":"jsdelivr",
        },
      {% endif %}
    {% endfor %}
    }

RogueBookmarklets.scriptEndpoints={
  "edit":"https://github.com/ktsuttlemyre/RogueBookmarklets/edit/master/{path}",
  "jsdelivr":"https://cdn.jsdelivr.net/gh/ktsuttlemyre/RogueBookmarklets/{path}",
  "github_raw":"https://raw.githubusercontent.com/ktsuttlemyre/RogueBookmarklets/master/bookmarklets/{path}",
  "github_pages":"https://ktsuttlemyre.github.io/RogueBookmarklets/{path}",

}

//encodeURI(RogueBookmarklets.stringFormat(RogueBookmarklets.scriptEndpoints.edit,RogueBookmarklets.scripts['to_qr']))
RogueBookmarklets.stringFormat=function(format, args1, args2){
    return format.replace(/{(\w+)}/g, function(match, word) {
      var sub = args1[word];

      return sub != null? sub: match;//( args2[word] != null? args2[word]: match );
    });
};
