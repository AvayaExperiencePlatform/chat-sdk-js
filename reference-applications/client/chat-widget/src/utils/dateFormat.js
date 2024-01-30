import React from "react";

const DateFormat = (props) => {
  const date = new Date(props.date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const time = hours + ":" + minutes + " " + ampm;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const renderDate =
    props.currentLocale == "ar-sa"
      ? date.toLocaleDateString("ar-EG", options)
      : `${date.toDateString()} ${time}`;

  return <React.Fragment>{renderDate}</React.Fragment>;
};

export default React.memo(DateFormat);
