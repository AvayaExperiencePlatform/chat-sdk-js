# Backend Web App Server Usage
------------------------------------------------

## Requirements
------------------------------------------------

1. Node js - `v20.9.0`

## Setup
------------------------------------------------

1. Run `npm install`

2. Make appropriate changes in `server.conf.json` file

## Start server
------------------------------------------------

To start server run `npm start`

### For starting server in HTTP
------------------------------------------------

For starting server in HTTP mode, make the `secure` flag false in `server.conf.json`.

### For starting server in HTTPS mode
------------------------------------------------

For starting server in HTTPS mode, make the `secure` flag true in `server.conf.json`.
Make sure that the certificatePath and privateKeyPath point to the SSL certificate and its private key in `server.conf.json`.
Also, make sure to provide the passphrase for the privateKey in `server.conf.json`.

## Configuration Reference
------------------------------------------------

All server configurations are present the `server.config.json` file.

- port :  The port on which to this server will listen for incoming HTTP requests.
- realm : The Account Id to use.
- labFQDN : Host region specific Avaya Experience Platform™ FQDN. For example - `na.api.avayacloud.com` for North America region.
- integrationId : The Integration ID available to your account administrator when the integration was created.
- clientId : Client ID required to authenticate Avaya Experience Platform™ APIs.
- clientSecret : Secret for the above Client ID used to authenticate Avaya Experience Platform™ APIs.
- appkey: Application Key (appkey) which is required to access the APIs for your Account. This will be returned alongside the JWT token to the client application.
- ttl : TTL of JWT to be requested. Min 15 mins, Max 60 mins.
- secure : `true` to start this server in HTTPS mode. `false` for starting in HTTP mode. 
- certificatePath : Path to SSL certificate. (Required if `secure` is `true`).
- privateKeyPath : Path to private key. (Required if `secure` is `true`)
- passphrase : passphrase to decrypt private key.  (Required if `secure` is `true`)
- allowedOrigins : Array of origins allowed by this server. This is required for CORS. Typically the URL of the website hosting the chat widget. For example - `["http://www.example.com"]`. Use `["*"]` for allowing all origins.

Complete Example:

```json
{
    "port" : 3000,
    "realm" : "ABCDEF",
    "labFQDN" : "na.api.avayacloud.com",
    "integrationId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientId" : "<Client ID>",
    "clientSecret" : "<Client Secret>",
    "appkey": "<Application Key>"
    "ttl": "30",
    "secure": true, 
    "certificatePath": "path/to/certs/certificate.pem",
    "privateKeyPath": "path/to/certs/private_key.pem",
    "passphrase": "passphrase",
    "allowedOrigins": ["http://www.example.com"]
}
```

## REST API to get the JWT
------------------------------------------------

The backend-web-app-server exposes the REST API `/v1/getJWT`. The client can call this endpoint to get the JWT token for requested user.

### API Details
----------------------------------------

API Path: `/v1/getJWT`

### Request
----------------------------------------

Method: `POST`
Content Type: `application/json`

Request Body Fields: 
- customerId: string
- verifiedCustomer: boolean
- customerName: string
- customerIdentifiers: Map<string, Array<string>>

Example of Request Body -

```json
{
    "customerId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "customerName": "John Doe",
    "customerIdentifiers": {
        "emailAddresses": ["jhondoe@example.com"]
    },
    "verifiedCustomer": true
}
```

### Response
-----------------------------------------

The backend web app server returns JWT token and the Application Key (appkey) in response of the `/v1/getJWT` API.

Response body fields:
- jwtToken: string
- appkey: string

Example of Response - 
```json
{
    "jwtToken": "<the actual jwt token>",
    "appkey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```