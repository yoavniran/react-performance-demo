This code was used for my presentation @ React-Next (Nov) 2018

[Talk on youtube](https://www.youtube.com/watch?v=O6pLZK3R2II)

[Slides on SlideShare](https://www.slideshare.net/yoavniran/react-responsively-render-responsibly) 


## How to Run

### Client Side

After cloning this repo run (from the root of the project):

> yarn 

After that run:

> yarn start

This will start the webpack dev server and serve the client side of this app.

### Server Side

The images for the app are fetched from a Cloudinary Cloud. Therefore you'll need to have a 
registered account first. You can register for free [here](https://cloudinary.com/users/register/free).

run (from the root of the project) 

> cd server

You will need to configure the server with details from your Cloudinary account as the app fetches
photos from Cloudinary based on a specified tag. 

You pass these as environment params when starting the server code like so: 

> CLD_KEY="<key>" CLD_SECRET="<secret>" CLD_TAG="<tag>" DEBUG="smocker" node server.js


* Replace <key> with your API Key
* Replace <secret> with your API Secret
* Replace <tag> with a tag you used on your photos

The first two parameters you can get from your [account's dashboard](https://cloudinary.com/console) 


