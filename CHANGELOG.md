
# 1.0.53 (January 24th, 2024)

- Extended the compatibility of the Chat SDK and the reference applications to include support for Node.js 20 (LTS).
- Upgraded the dependent libraries of reference applications to improve performance and stability.
- Introduced the concept of 'appkey' in the Chat SDK and the reference applications. An Application Key (appkey) is a string value passed by a client to API. The key uniquely identifies the Account (Tenant). Necessary changes have been made within the SDK and reference applications to handle this new 'appkey'. More details about the 'appkey' are available here (https://developers.avayacloud.com/avaya-experience-platform/docs/how-to-authenticate-with-axp-apis) and further details about the usage of the ‘appkey’ in the Chat SDK are present here (https://developers.avayacloud.com/avaya-experience-platform/docs/digital-channel-javascript-sdk-overview).