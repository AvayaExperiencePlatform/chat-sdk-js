import styled, { css, keyframes } from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const tooltipTargetShowOnFocus = ({ showOnFocus }) =>
!showOnFocus &&
css`
  outline: none;
`
export const TooltipTarget = styled.button`
  border: none;
  background: inherit;
  font-size: inherit;
  color: inherit;
  cursor: inherit;
  display: flex;
  ${tooltipTargetShowOnFocus};
`;


const centerContainerPosition = ({ position }) => {
  switch (position) {
    case "bottom":
      return css`
        bottom: unset !important;
        top: calc(100% + 5px);
      `;
    case "left":
      return css`
        margin-right: 0;
        width: 100%;
        left: unset;
        top: 50%;
        right: calc(100% + 5px);
        width: max-content;
        
      `;
    case "right":
      return css`
        margin-left: 0;
        width: 100%;
        top: 50%;
        right: calc(100% + 5px);
        width: max-content;
        left: auto;
      `;
    default:
      return css`
        bottom: calc(100% + 5px);
      `;
  }
}
export const CenterContainer = styled.div`
  position: absolute;
  width: 200px;
  margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  bottom: calc(100% + 5px);
  pointer-events: none;
  max-width: 200px;
  z-index:9;
  ${centerContainerPosition}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const tooltipBoxBg = (props) => props.background;
const tooltipBoxColor = ({ position }) => {
  if(position ==="right" ) {
      return css`
        color: #fff;
      `;
    
  }

  return css``;
};

const tooltipBoxPosition = ({ position }) => {
  switch (position) {
    case "bottom":
      return css`
        &:after {
          border-color: transparent transparent #${(props) =>
              props.background} transparent;
          top: unset;
          width: 1px;
          bottom: 100%;
          left: calc(50% - 5px);
        }
      `;
    case "left":
      return css`
        &:after {
          border-color: transparent transparent transparent #${(props) => props.background};
          left: 100%;
          top: calc(50% - 5px);
        }
      `;
    case "right":
      return css`
        &:after {
          border-color: transparent #${(props) => props.background} transparent
            transparent;
          left: 100%;
          right: unset;
          top: calc(50% - 5px);
        }
      `;
    default:
      return css``;
  }
}

export const TooltipBox = styled.span`
  position: relative;
  background-color: #${tooltipBoxBg};
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 10px 8px;
  font-size: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.2);
  ${tooltipBoxColor}
  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 1px;
    border-width: 5px;
    border-style: solid;
    border-color: #${tooltipBoxBg} transparent transparent transparent;
    left: calc(50% - 4.5px);
    top: 100%;
  }
  ${tooltipBoxPosition}
`;
