import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.scss";
import { setChatConfig, setLang, setTranslation } from "./store/ui/actions.";
import { ThemeProvider } from "styled-components";
import theme from "./themes/defaultTheme";
import { TranslatorProvider } from "react-translate";
import User from "./services/user";
import ChatContextProvider from "./contexts/ChatContextProvider";
import { MemoryRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

class ChatApp extends HTMLElement {
  static get observedAttributes() {
    return ["jwt-server-url", "integration-id", "lang", "connector-url"];
  }
  connectedCallback() {
    const mountPoint = document.createElement("div");
    this.appendChild(mountPoint);
    store.dispatch(
      setChatConfig({
        connectorUrl: this.getAttribute("connector-url"),
        color: this.getAttribute("color"),
        textColor: this.getAttribute("text-color"),
        name: this.getAttribute("brand-name"),
        logoUrl: this.getAttribute("logo-url"),
        description: this.getAttribute("description"),
        disclaimer: this.getAttribute("disclaimer"),
        showContextParams: this.getAttribute("show-context-params") === "true",
        signInLogoUrl: this.getAttribute("pre-chat-logo-url"),
        showChatHeader: this.getAttribute("show-chat-header") === "true",
        chatHeaderText: this.getAttribute("chat-header-text"),
        chatPageUrl: this.getAttribute("cshat-page-url"),
        showPreChat: this.getAttribute("show-pre-chat") === "true",
        // participantsAvatar: this.getAttribute("participants-avatar-bg-colors")
        //   ? this.getAttribute("participants-avatar-bg-colors")
        //   : "#CC0000,#000000,#ffffff,#eeeeee",
        participantsAvatar: this.getAttribute("participants-avatar-bg-colors"),
        systemAvatarIcon: this.getAttribute("System-avatar-icon"),
        participantAvatarIcon: this.getAttribute("participant-avatar-icon"),
        participantIdentityType: this.getAttribute("participant-identity-type"),
        brandName: this.getAttribute("brand-name"),
        direction: this.getAttribute("direction") || "ltr",
        lang: this.getAttribute("lang") || "en",
        size: this.getAttribute("size"),
        jwtServer: this.getAttribute("jwt-server-url"),
        integrationId: this.getAttribute("integration-id"),
        customerId: this.getAttribute("customerId"),
        engagementParams: this.getAttribute("engagement-params")
          ? JSON.parse(this.getAttribute("engagement-params"))
          : {},
        emojiControlDisabled:
          this.getAttribute("emoji-control-disabled") === "true",
      })
    );

    let uiConfig = store.getState().ui.config;
    if (!uiConfig.showPreChat) {
      // here we expect to have 3 hidden input fields with the names chat_client_first_name , chat_client_last_name and email
      // capture them using document.querySelector
      // and create user using user service
      let firstName =
        document.querySelector("[name=chat_client_first_name]")?.value || "";
      let lastName =
        document.querySelector("[name=chat_client_last_name]")?.value || "";
      let email =
        document.querySelector("[name=chat_client_email]")?.value || "";

      let customerInfo = {
        displayName: firstName + " " + lastName,
        customerIdentifiers: {
          emailAddresses: [email],
          userId: [email],
        },
        customerId: email,
        engagementParamters: uiConfig.engagementParamters,
        sessionParameters: {},
      };
      User.set(customerInfo);
    }

    document.documentElement.style.setProperty(
      "--chat-client-primary",
      store.getState().ui.config.color
    );

    document.documentElement.style.setProperty(
      "--chat-client-primary-text",
      store.getState().ui.config.textColor
    );

    document.documentElement.style.setProperty(
      "--chat-client-direction",
      store.getState().ui.config.direction
    );

    store.dispatch(setLang(this.getAttribute("lang")));
    store.dispatch(setTranslation(CHAT_CLIENT_LOCALS));
    const root = createRoot(this);

    const renderScriptWithPromise = new Promise((resolve, reject) => {
      var script = document.createElement("script");
      document.head.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
      script.async = true;
      script.src = `./locales/${this.getAttribute("lang")}.js`;
    });

    const renderChat = () => {
      root.render(
        <ThemeProvider theme={theme}>
          <TranslatorProvider
            translations={{
              locale: "en",
              ...store.getState().ui.translations,
            }}
          >
            <React.StrictMode>
              <Router>
                <Provider store={store}>
                  <ChatContextProvider>
                    <App />
                  </ChatContextProvider>
                </Provider>
              </Router>
            </React.StrictMode>
          </TranslatorProvider>
        </ThemeProvider>
      );
    };
    renderScriptWithPromise
      .then(() => {
        const scriptTag = document.getElementById("langScript");
        if (scriptTag) {
          scriptTag.remove();
        }
        if (CHAT_CLIENT_LOCALS) {
          store.dispatch(setTranslation(CHAT_CLIENT_LOCALS));
        }
        renderChat();
      })
      .catch((err) => {
        renderChat();
      });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // store.dispatch(setTranslation(CHAT_CLIENT_LOCALS));
    // console.log(CHAT_CLIENT_LOCALS, "2222222222222222222222")
    store.dispatch(
      setChatConfig({
        connectorUrl: this.getAttribute("connector-url"),
        color: this.getAttribute("color"),
        textColor: this.getAttribute("text-color"),
        name: this.getAttribute("brand-name"),
        logoUrl: this.getAttribute("logo-url"),
        description: this.getAttribute("description"),
        disclaimer: this.getAttribute("disclaimer"),
        showContextParams: this.getAttribute("show-context-params") === "true",
        signInLogoUrl: this.getAttribute("pre-chat-logo-url"),
        showChatHeader: this.getAttribute("show-chat-header") === "true",
        chatHeaderText: this.getAttribute("chat-header-text"),
        chatPageUrl: this.getAttribute("cshat-page-url"),
        showPreChat: this.getAttribute("show-pre-chat") === "true",
        // participantsAvatar: this.getAttribute("participants-avatar-bg-colors")
        //   ? this.getAttribute("participants-avatar-bg-colors")
        //   : "#CC0000,#000000,#ffffff,#eeeeee",
        participantsAvatar: this.getAttribute("participants-avatar-bg-colors"),
        systemAvatarIcon: this.getAttribute("System-avatar-icon"),
        participantAvatarIcon: this.getAttribute("participant-avatar-icon"),
        participantIdentityType: this.getAttribute("participant-identity-type"),
        brandName: this.getAttribute("brand-name"),
        direction: this.getAttribute("direction") || "ltr",
        lang: this.getAttribute("lang") || "en",
        size: this.getAttribute("size"),
        jwtServer: this.getAttribute("jwt-server-url"),
        integrationId: this.getAttribute("integration-id"),
        customerId: this.getAttribute("customerId"),
        engagementParams: this.getAttribute("engagement-params")
          ? JSON.parse(this.getAttribute("engagement-params"))
          : {},
        emojiControlDisabled:
          this.getAttribute("emoji-control-disabled") === "true",
      })
    );
  }
}

customElements.define("chat-app", ChatApp);
