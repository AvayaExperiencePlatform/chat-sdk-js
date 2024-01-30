import styled, { css } from "styled-components";
import {Tooltip as ReactTooltip} from "react-tooltip";

export const TimeWrapper = styled.div`
  margin-top: 4px;
  display: flex;
`;

export const Time = styled.div`
  margin-top: 4px;
  font-size: 12px;
  line-height: 16px;
  color: #323232;
  padding: 0px 3px;
`;

const messageComponentIsCustomer = (props) =>
props.isCustomer &&
css`
  position: relative;
  flex-direction: row-reverse;
`;
export const MessageComponent = styled.div`
  padding: 0 12px;
  margin: 10px 0;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: flex-start;
  flex-direction:column ;
  color: #000;
  ${messageComponentIsCustomer}
`;

const messageBodyHideAvatar = (props) =>props.hideAvatar && css`display: none;`
const messageBodyIsCustomer = (props) =>
props.isCustomer &&
css`
  display: flex;
  flex-direction: row-reverse;
  padding-left: 45px;
  padding-right: 10px;
`
export const MessageBody = styled.div`
  padding-right: 45px;
  padding-left: 10px;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  word-break: break-word;
  /* width: calc(100% - 50px); */
  ${messageBodyIsCustomer}

  .message-sender-name {
    font-size: 12px;
    font-weight: 400;
    display: block;
    margin-bottom: 4px;
    text-transform: capitalize;
    ${messageBodyHideAvatar}
  }
`;



const messageBodyContainerBg = (props) =>
props.isCustomer &&
css`
  background-color: #e8f1fc;
`
const messageBodyContainerIsCustomer = (props) =>
props.isCustomer
  ? css`
      align-items: flex-end;
    `
  : css`
      align-items: flex-start;
    `

const messageBodyContainerRadiusIsCustomer = (props) =>
props.isCustomer
  ? css`
      border-radius: 8px 0px 8px 8px;
    `
  : css`
      border-radius: 0px 8px 8px 8px;
    `
export const MessageBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${messageBodyContainerIsCustomer}
  .message-content {
    white-space: pre-line;
    display: inline-block;
    background-color: #f1f1f1;
    padding: 8px;
    ${messageBodyContainerRadiusIsCustomer}
    ${messageBodyContainerBg}
    a {
      color: var(--chat-client-blue-light);
    }
  }
`;
const messageAvatarHide = (props) =>
props.hideAvatar &&
css`
  visibility: hidden;
`
export const MessageAvatar = styled.div`
  width: 36px;
  ${messageAvatarHide}
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${(props) => props.avatarBg};
    color: #fff;
    img {
      width:100%
    }
  }
`;

export const ReactTooltipStyled = styled(ReactTooltip)`
  &.type-dark.place-top {
    background-color: blue;
    padding: 0.3rem 1rem;

    &:after {
      border-top-color: blue;
    }
  }
`;

export const MessageStatus = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
`;
