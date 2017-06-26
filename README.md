# QuickStart Ionic v2 Client-side Template
---------
Author: Carlos Vicens 
Level: Intermediate   
Technologies: Javascript, Cordova, RHMAP   
Summary: A basic HTML5/ Ionic 2 Hybrid client side template with RHMAP.   
Community Project: [Feed Henry](http://feedhenry.org)
Target Product: RHMAP   
Product Versions: RHMAP 3.8.0+   
Source: https://github.com/feedhenry-staff/quickstart-ionic-v2-tabs
Prerequisites: Node.js v6.10.0+, fh-js-sdk : 2.14.+, Cordova 5.0+, RHMAP instance

**This template is not official and you won't find it in RHMAP Studio but is fully functional**

## What is it?

This application is a basic [Ionic v2](http://ionicframework.com/docs/getting-started/) client side template, it should be used in combination with the [HelloWorld cloud app](https://github.com/feedhenry-templates/helloworld-cloud). Refer to [fhconfig.json](www/fhconfig.json) for configuration.

To learn more about Ionic v2 please go [here](http://ionicframework.com/docs/getting-started/)

## How do I run it?
Because it's not an official RHMAP template we have to do a small change to the usual process, specifically we have to create an App using the import utility within Studio instead of choosing a client app template.

### Importing the app in your RHMAP project

_**Note**: You need to have a RHMAP project created in order to import a Client App._

* Open your project in Studio and go to your project
* Click on the plus '+' sign on the **Apps** area
* Then select 'Import Existing App'
	1. App Type: Cordova
	2. App Name: <your-new-app>
	3. Import From: Public Git Repository
		* Git URL: this repo git url; https://github.com/feedhenry-staff/quickstart-ionic-v2-tabs.git
		* Git Branch: master
	4. Click on 'Import & Move to Integration'
	5. Once at 'Integrate', click 'Next' until done.

### Clone your new app git repo and change dir to the folder created
```
$ git clone <your-new-app-rhmap-git-repo-url>
$ cd <your-new-app>
```

### Install dependencies
Before running the install command please check that node 6 is in your PATH.

```
$ npm install
...
│ └── serviceworker-cache-polyfill@4.0.0 
├── typescript@2.0.9 
└── zone.js@0.7.2 
```
## Set up your application to point your RHMAP instance
Edit [fhconfig.json](src/fhconfig.json) to include the relevant information from RHMAP.
Below you can find an example:

```
{
  "appid": "i2qhg7lltebtretlrchr4qww",
  "appkey": "ccae35188acb74bdqounmd87642109a7c091c148",
  "apptitle": "My Client App",
  "connectiontag": "0.0.1",
  "host": "https://example.com",
  "projectid": "i2qhg7ldd5g3k6i2jnbfqgpj"
}
```

### Run your app
You can run your all locally with ``ionic server`` as in the following example. This command transpiles from Typescript to Javascripts and  starts up an http server serving your app files and it should also opens a browser pointing to the local url.

```
$ ionic serve

> ionic-app-base@ ionic:serve /Users/...quickstart-ionic-v2-tabs
> ionic-app-scripts serve "--v2" "--address" "0.0.0.0" "--port" "8100" "--livereload-port" "35729"

[09:11:46]  ionic-app-scripts 1.1.4 
[09:11:46]  watch started ... 
...
[09:11:58]  dev server running: http://localhost:8100/ 
```

### Commit/Push changes
As we have explained before ``ionic serve`` also compiles and the generated files end up in www folder. As you know www folder is usually ignored in terms of git, not this time.

Run ``git status`` to be sure that www folder has been created.

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	www/

no changes added to commit (use "git add" and/or "git commit -a")
```
As you see www is untracked (but not ignored) so please add www, commit and push your changes.

```
$ git add www
$ git commit -a -m "import"
[master 58b26ea] import
 36 files changed, 181639 insertions(+), 1 deletion(-)
$ git push origin master
...
Writing objects: 100% (37/37), 3.27 MiB | 2.34 MiB/s, done.
Total 37 (delta 3), reused 0 (delta 0)
To git.tom.redhatmobile.com:xyz/Ionic-v2-Test-Ionic-v2-Test-Client-App.git
   b035b0f..58b26ea  master -> master
```

### Test the app in Studio
Go back to Studio, to your new app and check:

* Click on 'Editor' and check if www folder is included
* Check on the simulator, on the right that the app runs properly

### Updating fh-js-sdk version
To update the JS SDK:
- change the version in [package.json](package.json)
- run `npm install`

### FeedHenry local development
This template doesn't use grunt to run the app and hence it's not possible to use ``grunt serve:local`` instead do the following.

* run your app with ``ionic serve`` as explained before, pay attention to the line ``[09:11:58]  dev server running: http://localhost:8100/ ``
* as usual, point your browser to the suggested [url](http://localhost:8100/)
* add a 'url' parameter to the local url pointing to your local cloud app as in this sample url ``http://localhost:8100/?url=http://localhost:8001``