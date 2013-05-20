# ifwtw

If Whatever Then Whatever

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