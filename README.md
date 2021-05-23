# Accessible Focus

This utility developed to improve and restrict *focus* using tab key.

## Installation

```sh
npm install typescript -g
npm install
npm start

```


## Restrict focus
Restrict focus on any container. It will helps to stay focus on predefined focus elements.
It does not includes [aria-hidden]="true" atributes elements.


### Usage

To initiate focus in container.
``` javascript
var ao = new aoFocus("form"); //set container for focus
```
To unset focus.

``` javascript
ao.cleanFocus(); // it will unset focus from last set container.
```
