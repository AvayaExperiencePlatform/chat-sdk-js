# Avaya Experience Platform™ Digital Reference Chat Client


This package contains the sample widget, server and website that can be used as a reference for building actual chat client widget that connects to Avaya Experience Platform™ (formerly known as Avaya OneCloud CCaaS). This code is for reference only and shouldn't be used in production.

The package follows the following directory structure - 

    / (package root)
    \ -- reference-applications
        | -- client
        |   | -- chat-widget
        |   \ -- website
        | -- backend-web-app-server
        \ -- README.md (this file)


## /reference-applications/client/chat-widget

This folder contains source code of a sample chat widget that can be embedded on a web page. The chat widget uses the Chat SDK to showcase chat capabilities. Review the `README.md` file present in this folder for more details.

## /reference-applications/client/website

This folder contains source code of a sample web page to host the chat widget. Review the `README.md` file present in this folder for more details.

## /reference-applications/backend-web-app-server

This folder contains the source code of a sample backend web application server that fetches the JWT from the Avaya Experience Platform™ Digital for a user. Review the `README.md` file present in this folder for more details.
