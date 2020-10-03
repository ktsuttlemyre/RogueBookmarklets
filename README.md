

## RogueBookmarklets

A collection of bookmarklets I created and some I found on the web (mostly via codepens) I try to archive them and preserve their original author's credit when I can find it.

## RogueRunner

A platform for searching, chaining and running RogueBookmarklets in the browser

Head over to the main page to check it out https://ktsuttlemyre.github.io/RogueBookmarklets/


## Submiting a Bookmarklet
  - Must be in bookmarklets folder
  - Must be all lower case characters
  - use a convention prefix
    - share-qr-code.js
    - share-reddit.js
    - share-email.js
    - share-facebook.js
    - export-png.js
    - export-pdf.js
    - export-html.js
    - to-
  

 - Use a - as a space in file names. Because Google and jQuery said so.
    - https://stackoverflow.com/questions/119312/urls-dash-vs-underscore
    - https://stackoverflow.com/questions/7273316/what-is-the-javascript-filename-naming-convention
    Must be in self calling closure
  - Can use Rogue Runner API
    - Ex: Window.RogueRunner.load()
  -  Call window.prompt multiple times to get required arguments


## Frontmatter format for scripts
See the [/dev/template.js]https://github.com/ktsuttlemyre/RogueBookmarklets/blob/master/dev/template.js


```
description: |
  <h1>This is some markdown content in YAML.</h1>
  Note that description should always be followed by a pipe character "|" 
  so you can use multiple lines.

  Its totally cool here
 ```
 Expected to be a string value. You may use the pipe character for multi lines. Do not expect the formatting to be mainatined when the script is built

```
deprecated: Originally created in 2005 it doesn't seem to work as well at it once did as browsers have evovled a lot since then.
```
If the script is partly broken or the service will be lost soon give the users a heads up

```
authors: |
  Jane Doe <another url>
  Kyle Suttlemyre <https://github.com/ktsuttlemyre/RogueBookmarklets>
```
Type: Multiline string
Format: author JSDOC https://jsdoc.app/tags-author.html
```
originalsource: codepen.com/something/something
```
Type: string
Format: url
A url of where the inspiration or original code came from

```
qualified urls: []
```
Type: Array
Format: RegExes
If this is empty then the commandlet can run anywhere. If it is provided then you can limit the execution of the commandlet to specific urls

```
async: true|false
```
Type: boolean
Format: boolean
If async is set to true then you must call `next()` within your code somewhere or the next command will not be called in a RogueScript

```
layout: script
```
Type: string
Just set it to script
```
type: tool, web-app, toy, service
```
Type: string
what kind of category does this commandlet fit under best?
```
data privacy: [local, server, third-party-request, third-party-inline, third-party-visit]
```
Type: array
Give the user an idea of where their data will be stored
```
libraries:
  - ["https://code.jquery.com/jquery-3.5.1.min.js", "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" ]
```
Type: multi dimensional array
can be an array of urls or an array of arrays with [url,integrity] strings


```
params: |
  {type} VarName - describe what you expect to see as input
  {type} VarName - describe what you expect to see as input
```
special values can be set for varnames
varName=varKeyName get value from local storage (varName=varName can be the same varName or can be different. the righthand varName will be the localstorage key
varname=stdin will get stdout from commnad before it. if its the first command and stdin=undefined then stdin=getSelection (from window)
varname=stdin|varname will use stdin first but will get varName from local storage if(stdin==null)
For more syntax see: https://jsdoc.app/tags-type.html
```
returns: |
  {bool} Something something
```
For more syntax see: https://jsdoc.app/tags-type.html


