---
---

scripts={
    {% for marklet in site.static_files %}
      {% if marklet.path contains 'bookmarklets/' %}
    "{{ marklet.basename | escape }}":{
          "basename":"{{ marklet.basename }}",
          "name":"{{ marklet.name }}",
          "path":"{{ marklet.path }}",
          "modified_time":"{{ marklet.modified_time }}",
          "extname":"{{ marklet.extname }}",
          "edit":"https://github.com/ktsuttlemyre/RogueBookmarklets/edit/master/{{ marklet.path | url_escape }}",
          "href":"javascript:{{ marklet.path | url_escape }}",
          "src":"https://cdn.jsdelivr.net/gh/ktsuttlemyre/RogueBookmarklets/{{ marklet.path | url_escape }}",
          "github_raw":"https://raw.githubusercontent.com/ktsuttlemyre/RogueBookmarklets/master/bookmarklets/{{ marklet.name | url_escape }}",
          "github_pages":"https://ktsuttlemyre.github.io/RogueBookmarklets/{{ marklet.path | url_escape }}"
        },
      {% endif %}
    {% endfor %}
    }
