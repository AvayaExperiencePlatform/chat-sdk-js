import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.scss";
import BeatLoader from "react-spinners/BeatLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { CgMathPlus } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import styled, { css } from "styled-components";
import { minimizeChatPopUp } from "../../store/ui/actions.";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import CustomScrollbars from "../../components/Scrollbars/CustomScrollbars";
import { useTranslate } from "react-translate";
import User from "../../services/user";
import { ChatContext } from "../../contexts/ChatContextProvider";

const isEngagmentField = (props) =>
  props.engagementField &&
  css`
    width: 40%;
    height: 75px;
  `;
const FormControl = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  ${isEngagmentField}
  label {
    font-weight: 400;
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 16px;
    color: #323232;
  }
  input {
    outline: 0;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #939393;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 2px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:hover {
      border-color: #323232;
    }
    &:focus {
      background-color: #fff;
      border-color: #86b7fe;
      outline: 0;
      box-shadow: none;
      border-width: 2px;
      border-color: #1473e6;
    }
  }

  &.invalid {
    label {
    }
    input {
      border-color: #dc3545;
      &:focus {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.25rem rgb(220 53 69 / 25%);
      }
    }
  }
`;

const Divider = styled.div`
  padding: 0 16px;
  margin: 16px 0;
  height: 1px;
  border-top: 1px solid #c9c9c9;
`;
const InvalidFeedback = styled.span`
  color: #cc0000;
  font-size: 12px;
  margin-top: 5px;
  font-family: "Noto Sans", sans-serif;
`;

const SignInHeader = styled.div`
  display: flex;
  align-items: center;
`;
const ChatCompLogo = styled.div`
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: contain;
  }
`;

const HowCanWeHelp = styled.p`
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 19px;
  line-height: 28px;
  font-weight: normal;
  text-transform: capitalize;
  color: #242424;
`;

const ValidationMessagesStar = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

const SignInFooter = styled.div`
  padding-top: 15px;
  padding-bottom: 0;
  background: #fff;
  p {
    font-weight: 300;
    font-family: "Noto Sans", sans-serif;
    font-size: 12px;
    letter-spacing: -0.01rem;
    line-height: 16px;
    margin-top: 16px;
    margin-bottom: 0;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ErrorSvg = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.9799 24.0846C16.7013 24.0846 17.2862 23.4998 17.2862 22.7783C17.2862 22.0569 16.7013 21.472 15.9799 21.472C15.2584 21.472 14.6736 22.0569 14.6736 22.7783C14.6736 23.4998 15.2584 24.0846 15.9799 24.0846Z"
      fill="#B84C4C"
    />
    <path
      d="M15.9799 19.2085C16.0785 19.2098 16.1763 19.1914 16.2677 19.1543C16.359 19.1171 16.442 19.0621 16.5117 18.9924C16.5814 18.9227 16.6365 18.8397 16.6736 18.7484C16.7107 18.657 16.7291 18.5592 16.7278 18.4606V10.7225C16.7278 10.5241 16.649 10.3339 16.5087 10.1937C16.3685 10.0534 16.1782 9.97462 15.9799 9.97462C15.7815 9.97462 15.5913 10.0534 15.4511 10.1937C15.3108 10.3339 15.232 10.5241 15.232 10.7225V18.4606C15.232 18.6589 15.3108 18.8491 15.4511 18.9894C15.5913 19.1297 15.7815 19.2085 15.9799 19.2085Z"
      fill="#B84C4C"
    />
    <path
      d="M29.5415 23.9151L18.5726 4.5799C18.3171 4.10252 17.9368 3.70343 17.4723 3.42519C17.0078 3.14695 16.4765 3 15.935 3C15.3936 3 14.8623 3.14695 14.3978 3.42519C13.9333 3.70343 13.553 4.10252 13.2975 4.5799L2.41833 23.9151C2.14816 24.3708 2.00383 24.89 2.00008 25.4197C1.99632 25.9494 2.13329 26.4706 2.39698 26.93C2.66066 27.3894 3.04161 27.7706 3.50088 28.0345C3.96015 28.2985 4.48128 28.4358 5.01098 28.4323H26.9488C27.4819 28.4429 28.0081 28.3109 28.473 28.0499C28.9379 27.7889 29.3246 27.4083 29.5931 26.9477C29.8616 26.487 30.002 25.963 30 25.4298C29.9979 24.8966 29.8534 24.3737 29.5814 23.9151H29.5415ZM28.2352 26.1787C28.1095 26.4127 27.9245 26.6096 27.6987 26.7496C27.4729 26.8896 27.2143 26.9679 26.9488 26.9764H5.01098C4.74262 26.9788 4.47843 26.9099 4.24541 26.7768C4.0124 26.6436 3.81892 26.451 3.68474 26.2186C3.55276 25.986 3.48337 25.7232 3.48337 25.4557C3.48337 25.1883 3.55276 24.9255 3.68474 24.6929L14.6537 5.3577C14.7876 5.12127 14.9818 4.92461 15.2166 4.78778C15.4513 4.65095 15.7182 4.57885 15.9899 4.57885C16.2616 4.57885 16.5284 4.65095 16.7632 4.78778C16.9979 4.92461 17.1922 5.12127 17.3261 5.3577L28.295 24.6929C28.4135 24.9248 28.4703 25.1834 28.4598 25.4436C28.4493 25.7039 28.372 25.9571 28.2352 26.1787Z"
      fill="#B84C4C"
    />
  </svg>
);

export const RefreshSvg = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.5417 11.163C25.0688 5.13902 18.2633 2.07101 11.9634 4.17097L11.959 4.17244L11.959 4.17243C7.31185 5.68987 4.17646 9.77058 3.6065 14.3302C3.55473 14.7444 3.177 15.0382 2.76281 14.9865C2.34863 14.9347 2.05483 14.5569 2.10661 14.1428C2.74581 9.0291 6.26043 4.44405 11.4876 2.73625C18.2549 0.481686 25.5826 3.56188 28.6036 9.8334V5.06631C28.6036 4.64891 28.942 4.31053 29.3594 4.31053C29.7768 4.31053 30.1152 4.64891 30.1152 5.06631V11.9188C30.1152 12.3362 29.7768 12.6745 29.3594 12.6745H22.507C22.0896 12.6745 21.7512 12.3362 21.7512 11.9188C21.7512 11.5014 22.0896 11.163 22.507 11.163H27.5417ZM29.3524 16.9128C29.7666 16.9646 30.0604 17.3423 30.0086 17.7565C29.369 22.873 25.8538 27.4507 20.6385 29.2601L20.6298 29.2631L20.6298 29.263C13.8619 31.519 6.5329 28.4388 3.51157 22.1666V26.9337C3.51157 27.3511 3.17319 27.6895 2.75578 27.6895C2.33838 27.6895 2 27.3511 2 26.9337V20.0812C2 19.6638 2.33838 19.3255 2.75578 19.3255H9.60823C10.0256 19.3255 10.364 19.6638 10.364 20.0812C10.364 20.4986 10.0256 20.837 9.60823 20.837H4.57351C7.04582 26.8596 13.8487 29.9276 20.1474 27.8305C24.8053 26.2126 27.9392 22.1251 28.5087 17.569C28.5605 17.1548 28.9382 16.861 29.3524 16.9128Z"
      fill="black"
    />
  </svg>
);

const isInvalid = (errors, touched, el) => errors[el] && touched[el];

const getInputFeedback = (errors, touched, _itemName) =>
  errors[_itemName] && touched[_itemName] ? errors[_itemName] : null;

export const SubmitButtonLoading = ({ loading }) => {
  const t = useTranslate("sign-in");
  return loading ? <BeatLoader color={"#fff"} /> : <> {t("start-chat")} </>;
};
const isSubmitBtnValid = (isValid, isInitialValid) =>
  !isValid || isInitialValid;
const doenNotHaveSpecialChars = (str) =>
  !/[!"%&,:;<>\-={}~\$\(\)\*\+\/\\\?\[\]\^\?]+/gi.test(str);

const getFirstInvaildFieldName = (errors) => {
  if (errors?.firstName) {
    return "firstName";
  } else if (errors?.lastName) {
    return "lastName";
  } else if (errors?.email) {
    return "email";
  } else if (errors.engagementParamters) {
    return "engagementParamters";
  }
};

export const ContextParamsFields = ({ shown, values, errors, touched }) => {
  const t = useTranslate("context-parameter");

  return shown ? (
    <FieldArray
      name="engagementParamters"
      render={({ insert, remove, push }) => (
        <div className={"engagement-params"}>
          {values.engagementParamters?.length > 0 &&
            values?.engagementParamters.map((item, index) => (
              <div className="engagement-params-row" key={index}>
                <FormControl
                  engagementField
                  className={clsx({
                    invalid:
                      errors?.engagementParamters?.[index]?.key &&
                      touched["engagementParamters"]?.[index]?.key,
                  })}
                >
                  <label
                    aria-label="context parameter key"
                    htmlFor={`engagementParamters.${index}.key`}
                  >
                    {t("key")}
                  </label>
                  <Field
                    autoFocus
                    id={`engagementParamters.${index}.key`}
                    name={`engagementParamters.${index}.key`}
                    placeholder={t("key-holder")}
                    type="text"
                    aria-required="true"
                    aria-describedby="keyFeedback"
                    aria-invalid={
                      errors?.engagementParamters?.[index]?.key &&
                      touched["engagementParamters"]?.[index]?.key
                    }
                  />{" "}
                  <InvalidFeedback id="keyFeedback">
                    {errors?.engagementParamters?.[index]?.key &&
                    touched["engagementParamters"]?.[index]?.key
                      ? errors.engagementParamters[index]?.key
                      : ""}
                  </InvalidFeedback>
                </FormControl>

                <FormControl
                  engagementField
                  className={clsx({
                    invalid:
                      errors?.engagementParamters?.[index]?.value &&
                      touched["engagementParamters"]?.[index]?.value,
                  })}
                >
                  <label
                    aria-label="context parameter value"
                    htmlFor={`engagementParamters.${index}.value`}
                  >
                    {t("value")}
                  </label>
                  <Field
                    id={`engagementParamters.${index}.value`}
                    name={`engagementParamters.${index}.value`}
                    placeholder={t("value-holder")}
                    type="text"
                    aria-required="true"
                    aria-describedby="valueFeedback"
                    aria-invalid={
                      errors?.engagementParamters?.[index]?.value &&
                      touched["engagementParamters"]?.[index]?.value
                    }
                  />
                  <InvalidFeedback id="valueFeedback">
                    {errors?.engagementParamters?.[index]?.value &&
                      touched["engagementParamters"]?.[index]?.value &&
                      errors.engagementParamters[index]?.value}
                  </InvalidFeedback>
                </FormControl>

                <div className="remove-param-btn">
                  <button
                    aria-label="remove context parameter"
                    type="button"
                    className="btn-danger"
                    onClick={() => remove(index)}
                    data-testid="remove-param"
                  >
                    <RiDeleteBin6Line
                      size={22}
                      color="#D43C31"
                      alt="remove context parameters key value field"
                    />
                  </button>
                </div>
              </div>
            ))}

          <div className={"engagement-params-actions"}>
            <button
              data-testid="add-new-param"
              type="button"
              className="add-new-param"
              aria-label="add new Context Parameter"
              onClick={() => push({ key: "", value: "" })}
            >
              <CgMathPlus alt="add new context parameters key value field" />{" "}
              {/* Add Context Parameter */}
              {t("add-context-parameter")}
            </button>
          </div>
        </div>
      )}
    />
  ) : (
    <></> 
  );
};

export const Loader = ({ visible }) => {
  return visible ? (
    <LoaderWrapper>
      <img className="spinner" src="assets/icons/icon.svg" alt="loader" />
    </LoaderWrapper>
  ) : (
    <></>
  );
};

const handleErrorCode = (e) => {
  if (e.code === "ACS-204") {
    AvayaCCaaSChatSDK.shutdown();
  } else if (e.code === "ACS-304") {
    sessionStorage.removeItem("ccaasClientSessionId");
  }
};
export const SignIn = () => {
  const { ui } = useSelector((s) => s);
  const t = useTranslate("sign-in");
  const { state } = useLocation();
  const validation = useTranslate("validation");
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isErrorCreatingSession, setIsErrorCreatingSession] = useState(false);
  const [isCreatingSessionFromStorage, setIsCreatingSessionFromStorage] =
    useState(false);
  const [
    isErrorCreatingSessionFromStorage,
    setIsErrorCreatingSessionFromStorage,
  ] = useState(false);
  const isCreatingSessionRef = useRef(false);

  const { joinEngagement, initSdk, createEngagement } = useContext(ChatContext);
  const navigate = useNavigate();
  const formikRef = useRef();
  const firstNameRef = useRef();
  const secondNameRef = useRef();
  const emailRef = useRef();
  const { isChatPopUpMinimized } = useSelector((s) => s.ui);
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      // .matches(, validation("alphabets"))
      .min(2, validation("first-name"))
      .max(35, validation("first-name"))
      .required(validation("first-name"))
      .trim()
      .test("special-chars", validation("first-name"), doenNotHaveSpecialChars),
    lastName: Yup.string()
      // .matches(/[!"#%&,:;<>\-=@{}~\$\(\)\*\+\/\\\?\[\]\^\|0-9]+/gi, validation("alphabets"))
      .min(2, validation("last-name"))
      .max(34, validation("last-name"))
      .required(validation("last-name"))
      .trim()
      .test("special-chars", validation("last-name"), doenNotHaveSpecialChars),
    email: Yup.string()
      .email(validation("email"))
      .required(validation("email"))
      .label("Email"),
    engagementParamters: Yup.array().of(
      Yup.object().shape({
        key: Yup.string().required(validation("key")),
        value: Yup.string().required(validation("value")),
      })
    ),
  });

  const handleOnEscBtnPressed = function (evt) {
    const isEsc = ["Escape", "Esc"].includes(evt.key);
    if (isEsc) {
      dispatch(minimizeChatPopUp());
      formikRef?.current?.resetForm();
    }
  };

  useEffect(() => {
    document.onkeydown = handleOnEscBtnPressed;
  }, []);

  const SUBMIT_STATE = {
    ON_REFRESH: 1,
    ON_REDIRECT: 2,
  };
  useEffect(() => {
    if (state?.shouldCreatEngagement) {
      onSubmit(User.get(), SUBMIT_STATE.ON_REDIRECT);
    } else if (User.get() && isCreatingSessionFromStorage) {
      onSubmit(User.get(), SUBMIT_STATE.ON_REFRESH);
    }
  }, [isCreatingSessionFromStorage, state]);

  useEffect(() => {
    setIsCreatingSessionFromStorage(!isChatPopUpMinimized && User.get());
  }, [isChatPopUpMinimized]);

  const isEmptyForm = () => {
    if (formikRef.current) {
      const { values } = formikRef.current;
      if (values.firstName != "" || values.lastName != "" || values.email != "")
        return false;
    }
    return true;
  };

  const handleSubmitForm = () => {
    document
      .getElementsByClassName("sign-in screen-container")[0]
      .removeAttribute("role");
    const { errors } = formikRef.current;
    const fieldName = getFirstInvaildFieldName(errors);

    switch (fieldName) {
      case "firstName":
        {
          firstNameRef.current?.focus();
        }
        break;
      case "lastName":
        {
          secondNameRef.current?.focus();
        }
        break;
      case "email":
        {
          emailRef.current?.focus();
        }
        break;
      case "engagementParamters":
        {
          document.querySelector(".engagement-params .invalid input")?.focus();
        }
        break;
    }
    formikRef.current?.submitForm();
  };

  const onSubmit = useCallback(
    async (values, submitState) => {
      if (isCreatingSessionRef.current || !formikRef.current.isValid) return;

      isCreatingSessionRef.current = true;
      const isOnReloadCall = submitState === SUBMIT_STATE.ON_REFRESH;
      setIsCreatingSession(true);
      setIsErrorCreatingSession(false);
      setIsErrorCreatingSessionFromStorage(false);
      let engagementParamters = ui.config.engagementParams;
      let customerInfo = {};

      try {
        if (submitState === SUBMIT_STATE.ON_REDIRECT) {
          await initSdk(User.get());
          const engagement = await createEngagement();
          navigate("chat", { state: { engagement } });
          return;
        }

        if (Array.isArray(values.engagementParamters)) {
          values.engagementParamters.forEach((item) => {
            engagementParamters = {
              ...engagementParamters,
              [item["key"]]: item["value"],
            };
          });
        }

        if (isOnReloadCall && User.get()) {
          customerInfo = User.get();
        } else {
          customerInfo = {
            displayName: values.firstName + " " + values.lastName,
            customerIdentifiers: {
              emailAddresses: [values.email],
              userId: [values.email],
            },
            customerId: values.email,
            engagementParamters: engagementParamters,
            sessionParameters: {},
          };
          User.set(customerInfo);
        }

        const initRes = await initSdk(customerInfo);
        let engagements = initRes.engagements;
        if (engagements.length > 1) {
          navigate("dialogs", { state: { engagements } });
        } else if (engagements.length == 1) {
          const engagement = engagements[0];
          if (engagement.engagementId == User.getEngagementId()) {
            await joinEngagement(engagement);
            const pageIterator = await engagement.getMessages();
            let prevMessages = pageIterator.items;
            // console.log(prevMessages,'prevMessages')
            prevMessages = prevMessages.map((m) => ({
              ...m,
              isDelivered: true,
              isFailed: false,
              isSending: false,
            }));
            navigate("chat", {
              state: {
                engagement,
                pageIterator,
                prevMessages: prevMessages.reverse(),
              },
            });
          } else {
            navigate("dialogs", { state: { engagements } });
          }
        } else {
          const engagement = await createEngagement();
          navigate("chat", { state: { engagement } });
        }
      } catch (e) {
        console.log("INIT_ERROR", e);
        handleErrorCode(e);
        setIsErrorCreatingSessionFromStorage(isCreatingSessionFromStorage);
        setIsErrorCreatingSession(!isCreatingSessionFromStorage);
      } finally {
        setIsCreatingSession(false);
        setIsCreatingSessionFromStorage(false);
        isCreatingSessionRef.current = false;
      }
    },
    [
      setIsErrorCreatingSessionFromStorage,
      setIsCreatingSessionFromStorage,
      setIsCreatingSession,
      setIsErrorCreatingSession,
      navigate,
      isCreatingSessionFromStorage,
    ]
  );

  return (
    <>
      <Loader visible={isCreatingSessionFromStorage} />
      <CustomScrollbars
        width={"100%"}
        height={"100%"}
        renderThumbHorizontal={() => <span></span>}
      >
        <div
          className="sign-in screen-container"
          role="dialog"
          aria-labelledby="sign-in-header"
        >
          <SignInHeader id="sign-in-header">
            <ChatCompLogo>
              <img
                data-testid="chat-Logo"
                alt={`${ui.config.name}  ${t("logo")}`}
                src={ui.config.signInLogoUrl}
              />
            </ChatCompLogo>
            <HowCanWeHelp> {t("Avaya-Messaging")} </HowCanWeHelp>
          </SignInHeader>

          <Formik
            role="form"
            novalidate="novalidate"
            innerRef={formikRef}
            initialValues={{
              firstName: "",
              name: "",
              lastName: "",
              email: "",
              engagementParamters: [],
            }}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              isValid,
              isInitialValid,
            }) => (
              <Form>
                <div>
                  <Alert
                    visible={isErrorCreatingSessionFromStorage}
                    icon={<ErrorSvg />}
                    type="danger"
                    content={t("something-went-wrong")}
                  />
                  <Alert
                    visible={isErrorCreatingSession}
                    header={t("Error-creating-chat-session")}
                    icon={<ErrorSvg />}
                    onActionPressed={() => onSubmit(values)}
                    actionIcon={<RefreshSvg />}
                    type="danger"
                    content={t("Please-try-again")}
                    data-testid="Alert-Please-try"
                  />
                  <ValidationMessagesStar>
                    {t("required-fields-followed-by")}
                  </ValidationMessagesStar>
                  <FormControl
                    onBlur={() => {
                      setFieldValue(
                        "firstName",
                        values.firstName?.trimEnd(),
                        true
                      );
                    }}
                    className={clsx({
                      invalid: isInvalid(errors, touched, "firstName"),
                    })}
                  >
                    <label htmlFor="firstName"> {t("first-name")}</label>
                    <Field
                      innerRef={firstNameRef}
                      id="firstName"
                      name="firstName"
                      placeholder={t("first-name-holder")}
                      aria-required="true"
                      aria-describedby="firstNameFeedback"
                      aria-invalid={isInvalid(errors, touched, "firstName")}
                      data-testid="firstName"
                    />
                    <InvalidFeedback
                      data-testid="firstNameFeedback"
                      id="firstNameFeedback"
                    >
                      {getInputFeedback(errors, touched, "firstName")}
                    </InvalidFeedback>
                  </FormControl>

                  <FormControl
                    onBlur={() => {
                      setFieldValue(
                        "lastName",
                        values.lastName?.trimEnd(),
                        true
                      );
                    }}
                    className={clsx({
                      invalid: isInvalid(errors, touched, "lastName"),
                    })}
                  >
                    <label htmlFor="lastName"> {t("last-name")}</label>
                    <Field
                      innerRef={secondNameRef}
                      id="lastName"
                      name="lastName"
                      placeholder={t("last-name-holder")}
                      aria-required="true"
                      aria-describedby="lastNameFeedback"
                      aria-invalid={isInvalid(errors, touched, "lastName")}
                      data-testid="lastName"
                    />
                    <InvalidFeedback
                      id="lastNameFeedback"
                      data-testid="lastNameFeedback"
                    >
                      {getInputFeedback(errors, touched, "lastName")}
                    </InvalidFeedback>
                  </FormControl>

                  <FormControl
                    onBlur={() => {
                      setFieldValue("email", values.email?.trimEnd(), true);
                    }}
                    className={clsx({
                      invalid: isInvalid(errors, touched, "email"),
                    })}
                  >
                    <label htmlFor="email">{t("email")}</label>
                    <Field
                      innerRef={emailRef}
                      id="email"
                      name="email"
                      placeholder={t("email-holder")}
                      aria-required="true"
                      aria-describedby="emailFeedback"
                      aria-invalid={isInvalid(errors, touched, "email")}
                      data-testid="email"
                      // style={{direction:'ltr'}}
                    />
                    <InvalidFeedback
                      id="emailFeedback"
                      data-testid="emailFeedback"
                    >
                      {getInputFeedback(errors, touched, "email")}
                    </InvalidFeedback>
                  </FormControl>
                  {/* <Divider /> */}
                  <ContextParamsFields
                    shown={ui.config.showContextParams}
                    values={values}
                    touched={touched}
                    errors={errors}
                  />
                </div>
                <div>
                  <SignInFooter>
                    {/* invalid={isSubmitBtnValid(isValid, isInitialValid)} */}
                    <Button
                      aria-label="start chat"
                      type="submit"
                      onClick={handleSubmitForm}
                      disabled={
                        isCreatingSession ||
                        isSubmitBtnValid(isValid, isInitialValid) ||
                        isEmptyForm()
                      }
                      data-testid="submitButton"
                    >
                      <SubmitButtonLoading loading={isCreatingSession} />
                    </Button>
                    <p
                      dangerouslySetInnerHTML={{ __html: ui.config.disclaimer }}
                    ></p>
                  </SignInFooter>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomScrollbars>
    </>
  );
};

export default SignIn;
