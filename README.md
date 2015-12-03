# Angular Image Utils

## Introduction

A (very) small collection of directives to help with the loading of images. Will be adding more as I think of them.

## Installation

Currently available on bower. Hoping to make it available on NPM also.

    bower install angular-image-utils --save

## Usage

### Sizes

Setting the `width` and `height` attributes on an image can be desirable if you have something like a grid of images. Unfortunately even if you can return width and height of images before you load the image in the users browser setting these attributes will often overflow thier bounds.

This is a simple little directive which dynamically sets those attributes while the image loads and removes those attributes once it that is done to restore the natural flow.

Simple:

    <img iu-sizes iu-width="1024" iu-height="768" ng-src="{{image}}" />

Which **before load** in a parent container that is 500px wide will yield:

    <img iu-sizes width="500" height="375" iu-width="1024" iu-height="768" src="..." ng-src="..." />

As mentioned before, after load those `width` and `height` attributes will be removed.

### Spinner

Inserts a small user-defined string at the end of the images parent container.

So:

    <div>
      <img iu-spinner iu-template-string="<span class='spinner'></div>" ng-src="..." />
    </div>

Will compile to:

    <div class="iu-load">
      <img iu-spinner iu-template-string="<span class='spinner'></div>" ng-src="..." />
      <span class='spinner'></div>
    </div>

Notice how the iu-load class was added to the class. The `iu-spinner` directive will add this class on `link()` when the `onload` event is triggered on the image element a further `iu-complete` class is added so that you may do things like hide the spinner or trigger animations.

So to clarify, when the image has loaded the HTML will look like this:

    <div class="iu-load iu-complete">
      <img iu-spinner iu-template-string="<span class='spinner'></div>" ng-src="..." />
      <span class='spinner'></div>
    </div>

You can customize the class names. Refer to the API below.

## Attributes

### iu-sizes

* `iu-width`: The original width of the image in pixels. Required.  
* `iu-height`: The original width of the image in pixels. Required.

### iu-spinner

* `iu-template-string`: The template to insert into the bottom of the parent container. Optional if `iu-template-url` is specified.  
* `iu-template-url`: Dynamically loads a template to insert into the bottom of the parent container via Angular's `$http` service. Optional if `iu-template-string` is specified.  
* `iu-load-class`: Change class that is added to the parent when the `link()` function on the directive is called. Optional. Default `iu-load`.  
* `iu-complete-class`: Change class that is added to the parent when the image element finished loading. Optional. Default `iu-complete`.

## Todo

* ~~Restrict `iu-spinner` and `iu-sizes` to attributes, not elements.~~
* Add to NPM directory.
* Add ngDocs.

## Tests

1. Use bower to pull down frontend test dependencies. `bower install`.
2. Install the dependencies specified in `package.json`. `npm install`.
3. Run the tests with npm. `npm test`.
