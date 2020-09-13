---
---
var version="{{ site.github.build_revision }}"
var site={
  "documents":{{ site.documents | jsonify }},//{% comment %}Site wide information + configuration settings from _config.yml. See below for details.{% endcomment %}
}
