const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios").default;
const https = require("https");
const fs = require("fs");
const { URLSearchParams } = require("url");

// Constants
const serverConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "server.conf.json"), "utf-8"));
const port = serverConfig.port ?? 3000;
const allowedDomains = serverConfig.allowedOrigins ?? ["*"];
const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Connection: "keep-alive",
};

// Mutable
let config = {...serverConfig, toggleApiExchangeHub: true};
let appToken = undefined;
let server = undefined;


// Utility Functions

function parseBoolean(value) {
  return value === "true";
}

async function fetchAppToken(conf, res) {
  try {
    console.log("Fetching App Token using configurations : ", conf, "\n");

    const appTokenQueryParams = new URLSearchParams();
    appTokenQueryParams.append("grant_type", "client_credentials");
    appTokenQueryParams.append("client_id", conf.clientId);
    appTokenQueryParams.append("client_secret", conf.clientSecret);

    const appTokenUrl = conf.toggleApiExchangeHub 
        ? `https://${conf.labFQDN}/api/auth/v1/${conf.realm}/protocol/openid-connect/token`
        : `https://${conf.labFQDN}/auth/realms/${conf.realm}/protocol/openid-connect/token`;

    const response = await axios.post(
      appTokenUrl,
      appTokenQueryParams,
      {
        headers: {
          ...headers,
          "appkey": conf.appkey
        },
      }
    );
    
    return response.data.access_token;
  } catch (e) {
    console.log(e);
    if (e.response) res.status(e.response.status).send(e.response.data);
    else res.sendStatus(500);
    throw new Error('An error occurred while fetching app token ' + e.message);
  }
}

function processAxiosError(error) {
  console.error("Error details :");
  try {
    console.error(error.toJSON());
  } catch (e) {
    console.log(e);
  }
}

process.on("SIGINT", () => {
  server.close();
});

// Server setup

const app = express();

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin || allowedDomains.indexOf('*') !== -1) return callback(null, true);
    if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.post("/v1/getJWT", async (req, res) => {

  console.log("\nJWT Token requested with ->\n");
  console.log("Query Parameters : ", req.query, "\n");
  console.log("Request Body : ", req.body, "\n");

  const requestBody = req.body;

  // Check if the new values are passed to the settings
  if (Object.keys(req.query).length > 0) {
    config = {
      ...req.query,
      toggleApiExchangeHub: parseBoolean(req.query.toggleApiExchangeHub)
    }
  }

  try {
    appToken = await fetchAppToken(config, res);
  } catch(e) {
    console.log(e);
    return;
  }
  
  console.log("App Token fetched. Fetching JWT ...");
  
  try {
    const response = await axios.post(
      `https://${config.labFQDN}/api/digital/chat/v1/accounts/${config.realm}/tokens`,
      {
        customerId: requestBody.customerId,
        integrationId: config.integrationId,
        verifiedCustomer: requestBody.verifiedCustomer,
        customerName: requestBody.customerName,
        customerIdentifiers: requestBody.customerIdentifiers,
        ttl: config.ttl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`,
          "appkey": config.appkey
        },
      }
    );

    console.log("Fetched JWT token at ", new Date());
    console.log("Request complete, sending back JWT");
    console.log("----------------------------------");

    res.json({
      jwtToken: response.data.jwtToken,
      appkey: config.appkey
    }).send();

  } catch (e) {
    console.log("Error occurred while fetching JWT token : ", e, "\n");
    processAxiosError(e);
    res.sendStatus(500);
  }
});

app.get("/v1/getIntegration", (req, res) => {
  res.send(serverConfig.integrationId);
});

app.get("v1/getConfiurations", (req, res) => {
  res.send({
    ccaasFQDN: serverConfig.labFQDN,
    integrationId: serverConfig.integrationId,
    configuredJwtTTL: serverConfig.ttl,
  });
});

// Start the server

if (serverConfig.secure) {
  // Read the Private Key
  const privateKey = fs.readFileSync(
    path.join(__dirname, serverConfig.privateKeyPath),
    "utf-8"
  );

  // Read the SSL Certificate
  const SSLcertificate = fs.readFileSync(
    path.join(__dirname, serverConfig.certificatePath),
    "utf-8"
  );

  const passphrase = serverConfig.passphrase;

  server = https.createServer(
    {
      key: privateKey,
      cert: SSLcertificate,
      passphrase: passphrase,
    },
    app
  );

  server.listen(port, () => {
    console.log(
      `▲ [HTTPS] Server started at https://localhost:${port}`
    );
  });
} else {
  server = app.listen(port, () => {
    console.log(
      `▲ [HTTP] Server started at http://localhost:${port}`
    );
  });
}
