import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useAuthStore } from '../../store';

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <LayoutContainer>
      {isAuthenticated && !hideNavbar && <Navbar />}
      <Main hasNavbar={isAuthenticated && !hideNavbar}>
        {children}
      </Main>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text-primary);
`;

interface MainProps {
  hasNavbar: boolean;
}

const Main = styled.main<MainProps>`
  flex: 1;
  padding: ${props => props.hasNavbar ? '84px 32px 32px' : '0'};
`;

export default Layout;