# ifwtw

If Whatever Then Whatever

How to make the Electric Imp work with IFTTT in a simple and free way.

I always wanted to use IFTTT with the Electric Imp, but, sadly, there is not an Electric Imp or a generic webservice channel on IFTTT. So I decided to use the GTalk channel, since I thought that it was the fastest and more secure way to get near real time messages from IFTTT. 

The process is simple: I've made a simple Node.js application, that gets the GTalk message from IFTTT and converts it into an HTTP call to the Electric Imp webservices.

The Node.js application - called IFWTW (If Whatever Than Whatever) - is on my github and can be forked freely. It's designed to be deployed on the Heroku platform, so you can host it for free. Since Heroku puts the free webapps in a sleep state after a while they've not been called, I provided a very simple web page for the application, and I used the Electric Imp's planner Variable Tick Tock and HTTP Call features to call it every 10 minutes.

You can freely fork the source code, configure it, make it run locally and eventually deploy it on heroku in less than 10 minutes.

Sadly, I discovered that the IFTTT GTalk support is very poor, and it's very far from being real time. So the application can be configured to check your email and use the email channel instead. I hope that IFTTT will have a better support for GTalk in the future, so I can get rid of this feature.

Last thing. Since my application listens for an XMPP message, and it works pretty well, you can use it to communicate with your Electric Imp via Jabber/GTalk, even if you don't use IFTTT

I hope you will have fun with this little project, and that it will help to expand the already near infinite possibilities of use that the Electric Imp provides.

## Usage

If you want to run this locally:

First rename the config.js.example file into config.js, then start the service with

`Node index.js`


If you want to run this on heroku, configure the Heroku enviroinment then set these config variables

`heroku config:set ENV=PRODUCTION`

`heroku config:set USERNAME=username`

`heroku config:set PASSWORD=yourpass`

`heroku config:set WS=electric imp webservice address`

(http:// not https://) without the "?value=" part, because it will be appended automatically
