
window.onload = () => {
 
  // Sign In
  const chatElement = document.getElementsByTagName("chat-app").item(0);
  const showModalBtn = document.getElementById("showModalBtn");
  const showPreChat = chatElement.getAttribute("show-pre-chat");
  const modalSignInForm = document.getElementById("modalSignInForm");
  const sessionUser = sessionStorage.getItem("ccaasUser");
  const chatSettings = sessionStorage.getItem("chatSettings");
  const settingModalForm = document.getElementById("settingModalForm");
  const jwtServerUrl = chatElement.getAttribute("jwt-server-url") || "";

  if (showPreChat === "false") {
    // hide chat bubble
    chatElement.style.display = "none";
  }

  if (chatSettings) {
    let _chatsettings = JSON.parse(chatSettings);
    setChatElementAttrs(_chatsettings);
    chatElement.style.display = "block";
    settingModalForm["labFQDN"].value = _chatsettings["labFQDN"];
    settingModalForm["integrationId"].value = _chatsettings["integrationId"];
    settingModalForm["jwt-server-url"].value = _chatsettings["jwt_server_url"];
    settingModalForm["realm"].value = _chatsettings["realm"];
    settingModalForm["ttl"].value = _chatsettings["ttl"];
    settingModalForm["clientId"].value = _chatsettings["clientId"];
    settingModalForm["clientSecret"].value = _chatsettings["clientSecret"];
    settingModalForm["appKey"].value = _chatsettings["appKey"];
    settingModalForm["toggleApiExchangeHub"].checked = _chatsettings["toggleApiExchangeHub"];
  }else{
    settingModalForm["labFQDN"].value = chatElement.getAttribute("connector-url").split('//')[1];
    settingModalForm["integrationId"].value = chatElement.getAttribute("integration-id");
    settingModalForm["jwt-server-url"].value = chatElement.getAttribute("jwt-server-url");
    settingModalForm["realm"].setAttribute('placeholder', 'default')
    settingModalForm["ttl"].setAttribute('placeholder', 'default')
    settingModalForm["clientId"].setAttribute('placeholder', 'default')
    settingModalForm["clientSecret"].setAttribute('placeholder', 'default')
    settingModalForm["appKey"].setAttribute('placeholder', 'Application Key');
    settingModalForm["toggleApiExchangeHub"].checked = false;
  }

  if (sessionUser) {
    let user = JSON.parse(sessionUser);
    document.getElementById("sign-out-dropdown").style.display = "inline-block";
    document.getElementById(
      "SignInUserName"
    ).innerHTML = `${user["displayName"]}`;
    showModalBtn.style.display = "none";
  }

  // on form submission
  modalSignInForm.addEventListener("submit", (event) => {
    // prevent form default behaviour
    event.preventDefault();

    //   collect form data
    let firstName = modalSignInForm.elements["modal_first_name"].value;
    let lastName = modalSignInForm.elements["modal_last_name"].value;
    let email = modalSignInForm.elements["modal_email_address"].value;

    // assign form data to hidden chat client fields
    document.querySelector("[name=chat_client_first_name]").value = firstName;
    document.querySelector("[name=chat_client_last_name]").value = lastName;
    document.querySelector("[name=chat_client_email]").value = email;

    // show user name in navbar
    document.getElementById("sign-out-dropdown").style.display = "inline-block";
    document.getElementById(
      "SignInUserName"
    ).innerHTML = `${firstName} ${lastName}`;

    // hide sin in button
    showModalBtn.style.display = "none";

    // set user data in session storage
    let userInfo = {
      displayName: firstName + " " + lastName,
      customerIdentifiers: {
        emailAddresses: [email],
        userId: [email],
      },
      customerId: email,
      engagementParamters: JSON.parse(
        chatElement.getAttribute("engagement-params")
      ),
      sessionParameters: {},
    };
    sessionStorage.setItem("ccaasUser", JSON.stringify(userInfo));

    // close the modal after getting the data successfully
    let signInModalElement = document.getElementById("signInModal");
    let signInModal = bootstrap.Modal.getInstance(signInModalElement);
    signInModal.hide();
    
    // show chat bubble
    // document.getElementsByTagName("chat-app").item(0).style.display = "block";
  });

  // set settings
  settingModalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let labFQDN = settingModalForm["labFQDN"].value;
    let realm = settingModalForm["realm"].value;
    let integrationId = settingModalForm["integrationId"].value;
    let ttl = settingModalForm["ttl"].value;
    let clientId = settingModalForm["clientId"].value;
    let clientSecret = settingModalForm["clientSecret"].value;
    let jwt_server_url = settingModalForm['jwt-server-url'].value;
    let selectedLang = settingModalForm['selectLang'].value;
    let appKey = settingModalForm['appKey'].value;
    let toggleApiExchangeHub = settingModalForm['toggleApiExchangeHub'].checked;
    sessionStorage.setItem("lang", selectedLang);

 
      // const chatApp = document.getElementById("chat-app");
      //   console.log(selectedLang.value);
        // if(selectedLang.value ==='ar'){
        //   chatApp.setAttribute("direction", "rtl");
        // }else{
        //   chatApp.setAttribute("direction", "ltr");
        // }
        // const scriptTag = document.getElementById("langScript"); 
        // scriptTag.src = `./locales/${selectedLang}.js`;
    
    


    const settingsObject = {
      labFQDN: labFQDN,
      realm: realm,
      integrationId: integrationId,
      ttl: ttl,
      clientId: clientId,
      clientSecret: clientSecret,
      jwt_server_url:jwt_server_url,
      appKey: appKey,
      toggleApiExchangeHub: toggleApiExchangeHub
    };
    sessionStorage.setItem("chatSettings", JSON.stringify(settingsObject));
    setChatElementAttrs(settingsObject);
    // close the modal after getting the data successfully
    let settingsModalElement = document.getElementById("settingsModal");
    let settingsModal = bootstrap.Modal.getInstance(settingsModalElement);
    settingsModal.hide();
    location.reload();
  });

  function setChatElementAttrs(config) {
    let JWTURL = `${config.jwt_server_url || jwtServerUrl}?labFQDN=${config.labFQDN}&realm=${config.realm}&integrationId=${config.integrationId}&ttl=${config.ttl}&clientId=${config.clientId}&clientSecret=${config.clientSecret}&appkey=${config.appKey}&toggleApiExchangeHub=${config.toggleApiExchangeHub}`;
    chatElement.style.display = "block";
    chatElement.setAttribute("connector-url", `https://${config.labFQDN}`);
    chatElement.setAttribute("jwt-server-url", JWTURL);
    chatElement.setAttribute("integration-id", config.integrationId);
    // chatElement.setAttribute("jwt-server-url", );
  }

  document.getElementById('sign-out-btn').addEventListener('click', (event) => {
    event.preventDefault();
    signOut();
  })

  function signOut(){
    sessionStorage.removeItem('ccaasUser');
    document.getElementById("sign-out-dropdown").style.display = "none";
    showModalBtn.style.display = "inline-block";
  }

}
// console.log(CHAT_CLIENT_LOCALS)
  