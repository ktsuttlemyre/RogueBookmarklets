---
---
var version="{{ site.github.build_revision }}"
var site={
  "site":{{ site | jsonify }},{% comment %}Site wide information + configuration settings from _config.yml. See below for details.{% endcomment %}
   "page":{{ page | jsonify }},{% comment %}Page specific information + the front matter. Custom variables set via the front matter will be available here. See below for details.{% endcomment %}
  "layout":{{ layout | jsonify }},{% comment %}Layout specific information + the front matter. Custom variables set via front matter in layouts will be available here.{% endcomment %}
  "content":{{ content | jsonify }},{% comment %}In layout files, the rendered content of the Post or Page being wrapped. Not defined in Post or Page files.{% endcomment %}
}
