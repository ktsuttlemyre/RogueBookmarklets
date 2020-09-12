---
---
var version= {{ site.github.build_revision }}
var site={
  "site":{{ site | jsonify }},//Site wide information + configuration settings from _config.yml. See below for details.
   "page":{{ page | jsonify }},//Page specific information + the front matter. Custom variables set via the front matter will be available here. See below for details.
  "layout":{{ layout | jsonify }},//Layout specific information + the front matter. Custom variables set via front matter in layouts will be available here.

}
