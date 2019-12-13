---
---

scripts=[
    {% for marklet in site.static_files %}
      {% if marklet.path contains 'bookmarklets/' %}
        {
          "edit":"https://github.com/ktsuttlemyre/RogueBookmarklets/edit/master/{{ marklet.path | escape }}",
          "href":"javascript:{{ marklet.path | escape }}",
          "name":"{{ marklet.name | escape }}",
          "src":"https://cdn.jsdelivr.net/gh/ktsuttlemyre/RogueBookmarklets/{{ marklet.path | escape }}",
          "github_raw":"https://raw.githubusercontent.com/ktsuttlemyre/RogueBookmarklets/master/bookmarklets/{{ marklet.name | escape }}",
          "github_pages":"https://ktsuttlemyre.github.io/RogueBookmarklets/{{ marklet.path | escape }}"
        },
      {% endif %}
    {% endfor %}
  ]
