# Twilio Spike

A good place to start: https://www.twilio.com/docs/usage

## When a call comes in, what request does Twilio send, and which fields identify the caller and the call?

https://www.twilio.com/docs/voice/twiml#twilios-request-to-your-application

When someone calls a number associated with your Twilio number, Twilio sends an HTTP request to the webhook you provided to Twilio.

Twilio needs to request TwiML from the call-tracker-api to get instructions on handling the call.

Here are the docs on which parameters the request will have: https://www.twilio.com/docs/voice/twiml#request-parameters

Twilio identifies the caller using the `From` property in the request. The `To` property is the called party's number. `CallStatus` is the descriptive status of the call, with values like `canceled`, `completed`, `busy`, etc...

`CallSid` is the unique identifier for the call itself. Important to our application, there is a `ParentCallSid`, a parent identifier from which the call leg was created. `CallToken` is a token for invoking forwarded calls while `Direction` describes the direction of the call, like `inbound` for incoming calls, or `outbound-dial` for calls initiated by `<Dial>`.

Requests to Twilio are expected to have a content type of `application/x-www-form-urlencoded` (or `multipart/form-data`). See docs here: https://www.twilio.com/docs/usage/requests-to-twilio#content-type-requirements.

## How does the API tell Twilio to forward the call to your phone?

https://www.twilio.com/docs/voice/twiml/dial

1. A caller dials your Twilio phone number
2. Twilio triggers the webhook on the call-tracker-api
3. call-tracker-api returns a TwiML <Dial> response with the configured forwarding number (the number we want Twilio to call)
4. Twilio bridges that call and connects the caller to your personal or business phone

Simple TwiML in code:

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>415-123-4567</Dial>
</Response>
```

Use E.164 number format for phone numbers: https://www.twilio.com/docs/glossary/what-e164

## When and where does call duration arrive?

For the purpose of the call-tracker-api, we want to see whether or not a call's conversation lasts 90 seconds. Picture this scenario. A caller dials to connect to the business owner. They dial the configured Twilio number, then Twilio forwards that call to the actual business owner. The question becomes: did that conversation pass the 90-second threshold so that we may charge the business? Using the duration of the child leg of the call is more appropriate here since that's where the real conversation happens, not the moment the user calls the public facing number. It's more fair this way.

https://www.twilio.com/docs/voice/twiml/dial#action

We should go this route: `<Dial>`'s `action` attribute. After the dialed call ends, Twilio uses the URL inside the `action` attribute's value to know where to go, giving us a request with `DialCallDuration`, which has the number of seconds a call lasts (the child leg of the call, where the convo actually happens). This is perhaps our better option. We also get `DialCallStatus`, `DialCallSid`, and as a bonus `RecordingUrl` for the recorded audio.

A different way of finding the child leg's duration of the call below.

https://www.twilio.com/docs/voice/twiml/number#attributes-status-callback

The `statusCallbackEvent` let's us specify which events Twilio will trigger a webhook on, including multiple events if we wish. Defining the URL we give to `statusCallback`, we get back http parameters that include `CallDuration`, which is only present in the `completed` step.

## How does Twilio reach a server running on your Mac during development?

https://www.twilio.com/en-us/blog/test-your-webhooks-locally-with-ngrok-html

We can use ngrok to tunnel traffic to our local machine by way of their secure, temporary url. Also, check `cloudflared` as an alternative: https://www.twilio.com/en-us/blog/developers/tutorials/building-blocks/develop-webhooks-locally-using-cloudflared-tunnel.

## How does the API verify a request really came from Twilio?

We verify by the `X-Twilio-Signature` header that comes from each request. Moreover, we can use a request validation middleware to validate incoming webhook signatures. This can be done by steps outlined in this doc: https://www.twilio.com/docs/usage/api-security-reference-guide/webhook#signature. In short, we need to compare our computed signature to that of the `X-Twilio-Signature` header value to ensure they match and reject requests that do not.

While we are not able to use Express middleware for this, we can still validate manually from the Twilio Node SDK. Instructions found here: https://github.com/twilio/twilio-node/blob/main/examples/WebhookSignatureValidation.md#validating-webhook-signatures-hmac-sha1-and-hmac-sha256.

Beware, the URL must match exactly what Twilio has called. That means Twilio may have called a URL from `ngrok` or `cloudflared` (whichever was chosen to tunnel traffic). In that case, `http://localhost:8080...` or what have you will fail validation against an `https://abc.ngrok.app...` url. Build for the public URL, not the local development one.

Remember, keep your secrets secret. This includes the auth-token needed for this step.

## References (other useful docs)

https://www.twilio.com/docs/phone-numbers

<!-- create phone numbers -->

https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource#code-provision-a-phone-number-with-a-voice-url

<!-- calls api -->

https://www.twilio.com/docs/voice/api/call-resource

<!-- TwiML -->

Twilio Markup Language. A set of instructions you can use to tell Twilio what to do when you receive an incoming call or SMS

<!-- How TwiML works -->

https://www.twilio.com/docs/voice/twiml#how-twiml-works

When someone makes a call to one of your Twilio numbers, Twilio looks up the URL associated with that phone number and sends it a request. Twilio then reads the TwiML instructions hosted at that URL to determine what to do, whether it's recording the call, playing a message for the caller, or prompting the caller to press digits on their keypad.

<!-- Webhooks -->

https://www.twilio.com/docs/usage/webhooks/getting-started-twilio-webhooks

https://www.twilio.com/docs/serverless/functions-assets/quickstart/receive-call // not using serverless but still descriptive
