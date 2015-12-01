# Placeholder Image Loader Thing (working title)

## Introduction

Because I honestly don't know what else to call it.

Sometimes when you want to load a bunch of images into a document it's a good idea to set the height and/or with attributes on the image to prevent the content from jumping all over the place as the images load in.

Unfortunately this isn't always possible with responsive designs as the images are resized by CSS after the fact so setting the width and height causes images to render really screwy. Unless you nullify that with CSS, in which case it was all pointless.

So that's why I have created this. Given the original width and height of the image being loaded and the width of the parent container of the element, we can dynamically set the resized height temporarily until the image has loaded in.

## Usage

   <img pilt original-width="1024" original-height="768" ng-src="{{image}}" />