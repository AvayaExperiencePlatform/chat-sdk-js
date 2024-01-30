import styled, { css } from "styled-components";

const invalidStyles = (props) =>
  props.invalid
    ? css`
        background-color: #a1a1a1;
      `
    : css``;

const disabledStyles = (props) =>
  props.disabled
    ? css`
        opacity: 0.2;
      `
    : css``;
const Button = styled.button`
  height: 36px;
  cursor: pointer;
  background-color: #1473e6;
  display: block;
  width: 100%;
  border: 0;
  outline: 0;
  padding: 12px;
  color: #fff;
  border-radius: 2px;
  /* margin-bottom: 16px; */
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${invalidStyles}
  ${disabledStyles}
  &:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
`;

export const SeconderyButton = styled.button`
  height: 36px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #1473e6 !important;
  display: block;
  width: 100%;
  border: 0;
  outline: 0;
  color: #1473e6;
  border-radius: 2px;
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 14px;
`;

export default Button;
