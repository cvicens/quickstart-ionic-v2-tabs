QuickStart Ionic 2 Client-side Template
=====================

This is the base template for Ionic 2 starter apps.

## Using this project

You'll need Node.js 6 or greater and Ionic CLI with support for v2 apps:

```bash
$ npm install -g ionic
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/docs/v2/getting-started/) page.

Then, after cloning this template, change to the repository folder and run:

```bash
$ npm install
```

This command installs all the npm modules you'll need, including fh-js-sdk.
More information on this module can be found here [FeedHenry JS SDK](https://github.com/feedhenry/fh-js-sdk).

The next step is to adapt src/fhconfig.json file to point to your RHMAP enviroment.

The contents of this file should look like this once you get the proper values for you connection from RHMAP.

```bash
{
  "appid": "mYiwxBq5IRSo6qvY8ILGDAKU",
  "appkey": "B9xVYzK9e9QIkspMMboUTqT5zDGUAcsn1k3obyU0",
  "apptitle": "Example App",
  "connectiontag": "0.0.1",
  "host": "https://xyz.demos.example.com",
  "projectid": "cid4wm8XFg14KHkiU7e2SxPn"
}
```

To test the app locally run:

```bash
$ ionic serve
```
