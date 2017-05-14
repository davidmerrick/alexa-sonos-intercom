Alexa skill that broadcasts messages via a Sonos system.

# Requirements

You must have a [Sonos API server](https://github.com/davidmerrick/rpi-node-sonos-http-api) running at a publicly-accessible endpoint.
I recommend using resin.io to do this with a Raspberry Pi.

# Installation

This is designed to be run on Lambda. 
The AWS SDK will automatically pull credentials from environment variables, as documented
here: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html.

In your Lambda function, set these environment variables:
* SONOS_API_SERVER: Publicly-accessible endpoint of your Sonos API server
* AUTH_USERNAME and AUTH_PASSWORD: Credentials to perform Basic auth on requests to that server

# Testing

Use [alexa-skill-test](https://github.com/voiyse/alexa-skill-test) to test locally.
