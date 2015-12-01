# Placeholder Image Loader Thing (working title)

## Introduction

Because I honestly don't know what else to call it.

Sometimes when you want to load a bunch of images into a document it's a good idea to set the height and/or with attributes on the image to prevent the content from jumping all over the place as the images load in.

Unfortunately this isn't always possible with responsive designs as the images are resized by CSS after the fact so setting the width and height causes images to render really screwy. Unless you nullify that with CSS, in which case it was all pointless.

So that's why I have created this. Given the original width and height of the image being loaded and the width of the parent container of the element, we can dynamically set the resized height temporarily until the image has loaded in.

## Usage

Simple:

    <img pilt original-width="1024" original-height="768" ng-src="{{image}}" />

Which **before load** in a parent container that is 500px wide will yield:

    <img plit width="500" height="375" original-height="768" ng-src="http://example.com/image.jpg" />

After the image has loaded and we have a natural height and width those `width` and `height` attributes will be removed from the element to restore the natural flow of the document without forcing CSS on the element.

## Tests

1. Use bower to pull down frontend test dependencies. `bower install`.
2. Install the dependencies specified in `package.json`. `npm install`.
3. Run the tests with npm. `npm test`.