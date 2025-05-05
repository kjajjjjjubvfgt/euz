import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFocusable } from '../../hooks';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);
  
  // Update selected tab when activeTab prop changes
  useEffect(() => {
    setSelectedTab(activeTab);
  }, [activeTab]);
  
  // Handle tab selection
  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    onChange(tabId);
  };
  
  return (
    <TabsContainer>
      {tabs.map((tab) => {
        const { ref, isFocused } = useFocusable({
          onEnter: () => handleTabClick(tab.id),
        });
        
        const isActive = tab.id === selectedTab;
        
        return (
          <TabItem
            key={tab.id}
            ref={ref as React.RefObject<HTMLDivElement>}
            active={isActive}
            focused={isFocused}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </TabItem>
        );
      })}
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
`;

const TabItem = styled.div<{ active: boolean; focused: boolean }>`
  padding: 12px 24px;
  margin-right: 8px;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-text-secondary)')};
  border-bottom: 2px solid ${({ active }) => (active ? 'var(--color-primary)' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    color: var(--color-primary);
  }
  
  ${({ focused }) =>
    focused &&
    `
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
    border-radius: 4px;
  `}
`;

export default Tabs;