# Reference Client Website

## Dependencies

1. Node js - `v20.9.0`
2. `backend-web-app-server` (located /reference-applications/backend-web-app-server).

## Setup

1. Make sure Node JS is installed.

2. Make sure the `backend-web-app-server` is setup and running (refer to it's `README.md`) file for details on how to do so.

3. Open a terminal in the directory of this file.

4. Install the dependencies using command `npm install`.

5. Start the website using command `npm start`. Application will run on port `3001` by default.

Note: If the application needs to be started on a different port then edit the server.js file (located in the same directory as this file) and change the port number to the desired value.

6. Open the index.html file update the values of the following attributes under the "chat-app" element - 

    i. `connector-url` : Provide the host region specific Avaya Experience Platform™ base URL, example - https://na.api.avayacloud.com for North America region.

    ii. `jwt-server-url` : Put the full url of your backend web app server's REST API endpoint that fetches JWT from Avaya Experience Platform™. The sample backend-web-app-server provided with this package exposes a REST endpoint `/v1/getJWT`. For example, if the backend-web-app-server is hosted on a machine with FQDN as www.example.com, port number as 3000 and it is configured in HTTPS mode, then provide the value of `jwt-server-url` attribute as `https://www.example.com:3000/v1/getJWT`.

    iii. `integration-id` : Specify the Integration ID available to your account administrator when the integration was created.
