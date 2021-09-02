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
  margin: 8px auto 20px auto;
  position: relative;
  width: fit-content;
`;

export const Btn = styled.button`
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
  margin-left:${props => props.update ? '17%' : '5%'} ;
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
  width: fit-content;
  margin-left: 5%;
  input {
    cursor: pointer;
    width: 5%;
  }
  label {
    font-size: 14px;
    cursor: pointer;
    margin-right: 33%;
  }
`;