import React from 'react';
import {FiAlertTriangle} from 'react-icons/fi';
import styled from 'styled-components';
import './ErrorComponent.scss'



const AlertDanger = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 14px 10px;
  margin-bottom: 15px;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  box-shadow: 0 0 5px rgb(0 0 0 / 15%);
  font-family: "Noto Sans", sans-serif;
  font-weight: 600;
  p{
    margin: 0;
    padding: 0px 10px;

  }
`;

const ErrorComponent =({msg})=>{
  return <AlertDanger>
        <FiAlertTriangle />
            <p data-testid="getErrMesg">{msg}</p>
    </AlertDanger>
  
}

export default ErrorComponent;
