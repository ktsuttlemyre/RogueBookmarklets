---
---
var version="{{ site.github.build_revision }}"
var site={
  "collections":{{ site.collections | jsonify }},//{% comment %}Site wide information + configuration settings from _config.yml. See below for details.{% endcomment %}
}
