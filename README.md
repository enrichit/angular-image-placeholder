# Ng Image Placeholder

## Introduction

A (very) small collection of directives to help with the loading of images.

## Usage

### Placeholder sizes

Setting the `width` and `height` attributes on an image can be desirable if you have something like a grid of images. Unfortunately even if you can return width and height of images before you load the image in the users browser setting these attributes will often overflow thier bounds.

This is a simple little directive which dynamically sets those attributes while the image loads and removes those attributes once it that is done to restore the natural flow.

Simple:

    <img placeholder-sizes ps-width="1024" ps-height="768" ng-src="{{image}}" />

Which **before load** in a parent container that is 500px wide will yield:

    <img placeholder-sizes width="500" height="375" ps-width="1024" ps-height="768" src="..." ng-src="..." />

As mentioned before, after load those `width` and `height` attributes will be removed.

## Tests

1. Use bower to pull down frontend test dependencies. `bower install`.
2. Install the dependencies specified in `package.json`. `npm install`.
3. Run the tests with npm. `npm test`.