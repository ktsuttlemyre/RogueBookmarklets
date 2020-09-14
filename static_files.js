---
---
var version="{{ site.github.build_revision }}"
var site={
  "static_files":{{ site.static_files | jsonify }},//{% comment %}Site wide information + configuration settings from _config.yml. See below for details.{% endcomment %}
}
