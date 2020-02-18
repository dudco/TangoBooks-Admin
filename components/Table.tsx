import styled from "styled-components";

export const Table = styled.div`
  width: 100%;
`;

export const Cell = styled.div`
  flex: 1;
  border: 1px solid #000;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;

  &:not(:last-child) > ${Cell} {
    border-bottom: none;
  }

  & > ${Cell}:not(:last-child) {
    border-right: none;
  }
`;
