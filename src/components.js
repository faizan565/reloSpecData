import styled from "styled-components";

export const MainDiv = styled.div`
  margin: 0 auto;
  max-width: fit-content;
  h2 {
    color: #666;
    font-size: 15px;
  }
  h3 {
    color: #666;
    font-size: 20px;
  }
`;
export const ButtonContainer = styled.div`
  margin:${props => !props.allUser ? '8px auto 20px auto' : '14px auto 20px 67%'} ;
  position: relative;
  width: fit-content;
  // left: ${props => props.update && '7%'};
`;

export const Btn = styled.button`
  display: ${props => props.modal && 'block'};
  margin: ${props => props.modal && '0 auto'};;
  padding: 6px;
  background-color: white;
  color: #666;
  margin-right: ${props => props.margin && '30px'};
  border: 2px solid #6c7ae0;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #6c7ae0;
    color: white;
    border: 2px solid white;
    cursor: pointer;
  }
`;

export const TableBody = styled.table`

  font-size: small;
  border:${props => props.update ? 'none' : '3px solid #d9d9fa'} ;
  border-radius: 5px;
  padding: 5px;
  max-width: 90%;
  margin-left:${props => props.update ? '11%' : '5%'} ;
  tr{
    &:hover{
      background-color: #d9d9fa;
    }
  }
  th {
    border-radius: 5px;
    padding: 5px;
    background: #6c7ae0;
    border: none;
    color: #FFF !important;
    font-family: sans-serif;
  }
  td {
    text-align: center;
    color: #666;
    padding: 5px;
    font-family: Arial, Helvetica, sans-serif;

  }
  input {
    border: 0;
    border-bottom: 2px solid #d9d9fa;
    color: #666;
  }
  fieldset {
    border: 3px solid #d9d9fa ;
    padding: 15px;
  }
  legend {
    background: #d9d9fa;
    border-radius: 10px;
    font-size: 15px;
    padding: 7px;
    font-weight: 600;
    color: #666;
  }


`;

export const LinkOption = styled.div`
  width: 13%;
  //margin-left: 5%;
  input {
    float: left;
    cursor: pointer;
    width: 5%;
  }
  label {
    font-size: 14px;
    cursor: pointer;
    //margin-right: 33%;
  }
`;

export const ConfirmModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 135px;
  padding: 10px;
  border: 3px solid #6c7ae0;
  background: whitesmoke;
  border-radius: 15px;
  p {
    text-align: center;
    margin-top: 10%;
    color: #666;
    font-size: large;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  opacity: .6;
  html{
    overflow: hidden !important;
  }
`;

export const Loading = styled.div`
  padding: 10px;
  font-size: large;
`;
export const WarningText = styled.p`
  padding: 2px;
  font-size: small;
  color: red;
  text-align: center;
`;