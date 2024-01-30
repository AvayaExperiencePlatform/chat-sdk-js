import styled from "styled-components";

const DialogsWrapper = styled.div`
 direction: var(--chat-client-direction);
  display: flex;
  flex-direction: column;
  padding:0 16px;
`;

export const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
  border-radius: 4px;
  margin: 8px;
  padding: 16px;

  .section {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
  }

  label {
    flex-grow: 1;
    font-size: 12px;
    line-height: 16px;
    color: #323232;
  }

  span {
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    margin: 4px 0px;
  }

  button {
    margin-top: 16px;
    align-self: flex-end;
    padding: 8px 16px;
    background: #ffffff;
    border: 1px solid #1473e6;
    box-sizing: border-box;
    border-radius: 2px;
    color: #1473e6;
    font-size: 14px;
    line-height: 20px;
    font-family: Noto Sans;
    cursor: pointer;
  }
`;

export const ButtonFooterWrapper = styled.div`
  margin: 0px 20px;
  /* position: absolute; */
  bottom: 0px;
  width: 90%;
  height: 70px;
`;

export default DialogsWrapper;
