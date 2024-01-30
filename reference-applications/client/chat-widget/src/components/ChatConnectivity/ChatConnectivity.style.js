import styled, { css } from "styled-components";

const isRtl = (props)=>props.rtl?css`margin-right: auto; margin-left: 0;`:''
export const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 30px;
  ${isRtl(props)}
`;
