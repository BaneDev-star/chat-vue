# ChatEngine + Vue + Amazon Lex
Featured:
- Integrate ChatEngine
- Build ChatEngine plugin for Vue
- Architect and implement 1:1 chat
- Display the user's ID in the UI so they can make 1:1 chats with other users
- Add functionality for creating new chats
- Secure the 1:1 chats with PAM
- Implement the [AWS Cognitive blocks](https://www.pubnub.com/blog/making-chat-apps-smarter-with-amazon-machine-learning-services/) from the [catalog](https://www.pubnub.com/docs/blocks-catalog)
- Implement a ChatBot in the Demo using Amazon Lex
- ChatEngine Typing Indicator plugin in 1:1 chats

## **To build your own you need PubNub Keys**
Make a PubNub Account
https://www.pubnub.com/register?devrel_gh=chat-engine-vue

Make a ChatEngine App in your PubNub Account
https://www.pubnub.com/docs/tutorials/chatengine#step-one-pubnub-keys?devrel_gh=chat-engine-vue

Put keys in **main.js**

For a ChatBot, make an Amazon Lex ChatBot, and a PubNub Function On Request handler using **pubnub-functions/lex-text-on-request.js** and add the URL to **main.js**

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
