---
---
var version="{{ site.github.build_revision }}"
var site={
  "pages":{{ site.pages | jsonify }},//{% comment %}Site wide information + configuration settings from _config.yml. See below for details.{% endcomment %}
}
