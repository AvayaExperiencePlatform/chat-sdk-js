import React from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import ShowParticipants from "../ShowParticipants/ShowParticipants";
const ChatCompInfo = ({shown, showParticipants}) => {
    const { ui } = useSelector((state) => state);

    if(!shown) return null;
    
    return (
      <ChatCompInfoStyled>
        <ChatComp>
          <img data-testid="logoUrl" alt={ui.config.name + "logo"} src={ui.config.logoUrl} />
          <ChatCompDataStyled>
            <p data-testid="comp-name" className={"comp-name"}>{ui.config.name}</p>
            <p data-testid="comp-description" className={"comp-desc"}>{ui.config.description}</p>
          </ChatCompDataStyled>
        </ChatComp>
   
        {showParticipants && <ShowParticipants />}
      </ChatCompInfoStyled>
    );
  };

const ChatCompInfoStyled = styled.div`
  padding: 12px 12px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
`;

const ChatComp = styled.div`
  display: flex;
  img {
    min-width: 48px;
    min-height: 48px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    max-width: 48px;
    max-height: 48px;
    object-fit: contain;
  }
`;

const ChatCompDataStyled = styled.div`
  padding: 0 16px;
  p {
    margin: 0;
  }
  .comp-name {
    font-weight: 400;
    font-size: 14px;
    line-height: 28px;
  }
  .comp-desc {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
`;

export default ChatCompInfo;
