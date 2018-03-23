# Twilio Barista Lite

This is a basic version of [Twilio Barista](https://github.com/dkundel/twilio-barista) to explain the basic concept.

## Requirements
* A Twilio account - [Sign up for free](https://www.twilio.com/try-twilio)
* [Node.js](https://nodejs.org) and [npm](https://npmjs.com)
* A [Twilio Studio](https://www.twilio.com/studio) flow as described in [this guide](https://www.twilio.com/docs/guides/build-a-chatbot-with-studio)

## Setup

### 1. Download and install dependencies
```bash
git clone https://github.com/dkundel/barista-lite.git
cd barista-lite
npm install
```

### 2. Install Twilio Functions
a) [Create a Twilio Sync Service](https://www.twilio.com/console/sync) and copy the SID

b) Configure the following variables in your [Twilio Functions section](https://www.twilio.com/console/runtime/functions/configure):
  * Enable `ACCOUNT_SID` and `AUTH_TOKEN`
  * Set `API_KEY` and `API_SECRET` to a valid pair. You can generate them in the [Twilio Console](https://www.twilio.com/console/runtime/api-keys)
  * Set `SERVICE_SID` to the SID of your Sync Service
  * Set `PHONE_NUMBER` to the phone number or Messaging Service SID that you want to use to send notification SMS

c) Create three Twilio functions out of the three files in the `twilio-functions` folder

d) Configure the Function in your Studio flow to point against the `create-sync-item` function and make sure it passes `trigger.message.From` as `phoneNumber` and `trigger.message.Body` as `order`.

e) Set the webhook URL of your Sync Service to the URL of your `sync-update-handler` function

f) Copy the URL of your `barista-token` URL and place it in the `src/data/orders.js` file as the `tokenUrl` variable.

### 3. Start the React dev server
Start the application by running:
```bash
npm start
```

### 4. Start sending and receiving your orders and seeing them in the browser

### 5. ☕️

## Contributors

* Dominik Kundel

## License

MIT