import styled from "styled-components";

export const StyledTable = styled.div<{ maxHeight: string }>`
  max-height: ${({ maxHeight }) => maxHeight};
  overflow: hidden;
  transition: max-height 0.3s ease;
  width: 100%;
`;