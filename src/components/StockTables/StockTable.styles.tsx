import styled from "styled-components";

export const StyledTable = styled.div<{ maxHeight: string }>`
  max-height: ${({ maxHeight }) => maxHeight};
  transition: max-height 0.3s ease;
  overflow-y: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar-thumb {
    background-color: #B7BAC2;
    border-radius: 4px;
    height: 3px;
  }
  &::-webkit-scrollbar {
    
    height: 3px ;
  
  }
`;