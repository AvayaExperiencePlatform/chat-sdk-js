# Reference Chat Widget
------------------------------------------------

This folder contains source code of a sample chat widget that can be embedded on a web page. The chat widget uses the Avaya Experience Platform™ Digital Chat SDK to showcase the chat capabilities.

## Requirements
------------------------------------------------

1. Node js - `v20.9.0`

## Setup
------------------------------------------------

1. Make sure Node JS is installed.

2. Open a terminal in the directory of this file.

3. Install the dependencies using command `npm install`.

4. To create the build for the widget single js file, run the following command - `npm run build`.

## Widget attribute reference
------------------------------------------------

Additional parameters for the chat widget.

### `connector-url`
------------------------------------------------

Description: The URL used to connect to Avaya Experience Platform™.
Example: `https://na.api.avayacloud.com/`

### `jwt-server-url`
------------------------------------------------

Description: The URL of your backend webapp server which will provide you the JWT.

### `show-pre-chat`
------------------------------------------------

Default Value: True
Description: Toggling on and off Pre chat window.

### `participant-identity-type`
------------------------------------------------

Default Value: "participant-name"
options Values: brand-name or participant-name or participant-type
Description: if participant-identity-type value is participant-name,
participantName display above received message and also in list of participants and so on.

### `participants-avatar-bg-colors`
------------------------------------------------

Default Values: #D93D32 For System, #0B3363 For Agent1, #000000 For Agent2, #A63B11 For Supervisor"
options: Customer can set array of the favorite colors for each Participant

### `system-avatar-icon`
------------------------------------------------

Default Value: avatar.svg "imported from Public folder"
options:
1. import your icon from public folder.
2. use an image URL.

Description:Customer can set a System Avatar Icon.

### `participant-avatar-icon`
------------------------------------------------

Default Value: participant-avatar.svg "imported from Public folder"
options:
1. import your icon from public folder.
2. use an image URL.

Description:Customer can set a participant Avatar Icon.

### `brand-name`
------------------------------------------------

Default Value: "Avaya"
Description: Customer set a brand name value to show the brand name in case participant-identity-type is set to brand-name .

### `lang`
------------------------------------------------

Default Value: "en"
Description: the language of the client.

### `direction`
------------------------------------------------

options Values: ltr or rtl
Default Value: "ltr"
Description: the direction of the client it can be rtl or ltr.

### `size`
------------------------------------------------

options Values: lg , md or sm
Default Value: "md"
Description: the window size of the client.

### `engagement-params`
------------------------------------------------

Default Value: "md"
Description: An object to be passed to the Avaya Experience Platform™ as an engagement parameters.

### `emoji-control-disabled`
------------------------------------------------

Default Value: "false"
Description: to show or hide the emojis controls to pick emojis for the chat.

### `integration-id`
------------------------------------------------

Description: The unique 36 character Integration ID available to your account administrator when the integration was created.

### `color`
------------------------------------------------

Description: the chat main theme color.

### `text-color`
------------------------------------------------

Description: the chat main theme text color.

### `logo-url`
------------------------------------------------

Description: it will be used to identify the logo you want to show in the chat screen while customer is interacting with agent.

### `pre-chat-logo-url`
------------------------------------------------

Description: it will be used to identify the logo you want to show in the pre chat  screen while customer is entering his info.

### `description`
------------------------------------------------

Description: it is a welcome message or can be considered as description for the company will appear in the chat screen.

### `disclaimer`
------------------------------------------------

Description: it is a disclaimer that will appear in the bottom of the pre chat window.

### `show-context-params`
------------------------------------------------

Description: show controls to add engagement params manually through the form controls.

### `show-chat-header`
------------------------------------------------

Description: in the chat window show the section has the company logo and description.
