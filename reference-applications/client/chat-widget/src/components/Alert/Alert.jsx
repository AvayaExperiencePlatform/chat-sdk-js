import React from 'react';
import styled from 'styled-components';
const AlertStyled = styled.div`
  padding:12px 16px;
  display: flex;
  align-items:center;
  background-color: #EDBFBB;
  border-radius: 4px;
  border: 1px solid #EDBFBB;
  svg{
    font-size: 26px;
  }
  .info {
   
  }

  &.danger{
    background: #FCECEB;
    border: 1px solid #EDBFBB;
    .alert-icon{
        color:#AB2C2C;
      }
    }

    &.info{
      background-color: #F1F1F1;
      border: 1px solid #C9C9C9;
      .alert-icon{
        color:#5E5E5E;
      }
    }
    
    &.success{
      background: #E4F7E4;
      border: 1px solid #9CD99C;
      .alert-icon{
        color:#2B6B2B;
      }
    
    }
    &.warning{
      background: #FCEEE8;
      border: 1px solid #F7BBA3;
      .alert-icon{
        color:#A63B11;
      }
     
    }



  .alert-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    width:28px;
    height:26px;
  }

  .alert-content{
    flex-grow: 1;
    font-weight: 400;
    padding: 0 10px;
    h2{
      margin: 0;
      font-size: 19px;
      line-height: 28px;
      font-weight:400;
    }
    p{
      margin: 0;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .alert-action {
    button{
      cursor: pointer;
      outline: none;
      border: none;
      background-color: transparent;
      * {
      width:14px;
      height:14px;
      }
    }
  }
`
const Alert = ({
  icon,
  content,
  header,
  onActionPressed,
  actionIcon,
  visible,
  type
})=>{
    if(!visible){
        return null;
    }


    return (
        <AlertStyled className={type}>
        <div data-testid="alertIcon" className="alert-icon">
          {icon}
        </div>
        <div  className="alert-content">
         {header &&  <h2 data-testid="alertHeader">{header}</h2>}
          <p data-testid="alertContent">{content}</p>
        </div>
        <div data-testid="alertAction"  className="alert-action">
         {onActionPressed ?
          <button  data-testid="buttonActionIcon" onClick={onActionPressed}>
            {actionIcon}
            </button>
            :actionIcon}
        </div>
      </AlertStyled>
    )
}

export default Alert;