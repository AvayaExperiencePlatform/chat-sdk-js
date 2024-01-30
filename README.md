# Avaya Experience Platform™ Chat JavaScript SDK

Avaya Experience Platform™ Digital provides the Chat SDK which allows your client application to access the built-in chat capabilities. The Chat SDK is a JavaScript library that provides a collection of methods, objects and events using which you can easily build or integrate as a chat client for your websites and enable it with Avaya Experience Platform™ Digital Chat.

### :warning: Disclaimer

    Installing, downloading, copying or using this SDK is subject to terms and conditions available in the LICENSE file


### Key Resources
- [SDK API Reference](https://avayaexperienceplatform.github.io/chat-sdk.js)
- [Digital Chat SDK Intro Guide](https://developers.avayacloud.com/avaya-experience-platform/docs/digital-channel-chat-sdk-intro)
- [Chat SDK Provisioning Guide](https://developers.avayacloud.com/avaya-experience-platform/docs/digital-channel-chat-sdk-provisioning)
- [Chat SDK Overview](https://developers.avayacloud.com/avaya-experience-platform/docs/digital-channel-javascript-sdk-overview)
  
## Usage

Before using the Chat SDK please ensure that the chat integration provisioning requirements are fulfilled. To use the Chat SDK you must provide the `integrationId` and a valid JWT Token during the [initialization](https://developers.avayacloud.com/avaya-experience-platform/docs/digital-channel-javascript-sdk-overview#initialization). Refer to [this page](https://developers.avayacloud.com/avaya-experience-platform/docs/digital-channel-chat-sdk-provisioning) on how to provision the chat integration, get the `integrationId` and generate a valid JWT Token.

The Chat SDK can imported in a webpage using the HTML `<script>` tag.

```html
<script src="path/to/avaya-ccaas-chat-sdk.js" defer></script>
```

Please review the links provided above for a full guide on how to use the Avaya Experience Platform™ Digital Chat SDK .


## License

View [LICENSE](./LICENSE)


## Changelog

View [CHANGELOG.md](./CHANGELOG.md)

## Reference Application

To help you get started with integrating Chat into your Avaya Experience Platform™ tenant, a reference application is available under the [reference-applications/](./reference-applications) folder.

Read the [README](reference-applications/README.md) to know more.
