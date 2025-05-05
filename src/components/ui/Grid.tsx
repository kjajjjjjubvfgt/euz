import React from 'react';
import styled from 'styled-components';

interface GridProps {
  children: React.ReactNode;
  columns: number;
  gap?: number;
}

const Grid: React.FC<GridProps> = ({ children, columns, gap = 16 }) => {
  return (
    <GridContainer columns={columns} gap={gap}>
      {children}
    </GridContainer>
  );
};

const GridContainer = styled.div<{ columns: number; gap: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: ${({ gap }) => gap}px;
  margin-top: 24px;
`;

export default Grid;