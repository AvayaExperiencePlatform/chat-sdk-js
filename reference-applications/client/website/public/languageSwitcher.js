function setLang() {
  const lang = sessionStorage.getItem("lang");
  const chatApp = document.getElementById("chat-app");
  const scriptTag = document.getElementById("langScript");
  if (chatApp) {
    if (lang) {
      scriptTag.remove();
      chatApp.setAttribute("lang", lang);
      document.getElementById("settingModalForm")["selectLang"].value = lang;
      if (lang === "ar" || lang === "he") {
        chatApp.setAttribute("direction", "rtl");
      } else {
        chatApp.setAttribute("direction", "ltr");
      }
    } 
  }


}
setLang();
