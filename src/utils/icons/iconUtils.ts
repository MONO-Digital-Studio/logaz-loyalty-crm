
import React from 'react';
import { mainIconMap, subIconMappings, defaultIcon } from './iconMappings';

export const getIconForItem = (id: string, isCollapsed: boolean = false) => {
  const IconComponent = mainIconMap[id as keyof typeof mainIconMap];
  const size = isCollapsed ? 24 : 18;
  return IconComponent ? React.createElement(IconComponent, { size }) : React.createElement(defaultIcon, { size });
};

export const getIconForSubItem = (parentId: string, childId: string) => {
  const actualParentId = parentId.split('.')[0];
  const actualChildId = childId.split('.')[0];
  
  const parentMappings = subIconMappings[actualParentId as keyof typeof subIconMappings];
  if (!parentMappings) {
    return null;
  }
  
  const IconComponent = parentMappings[actualChildId as keyof typeof parentMappings];
  return IconComponent ? React.createElement(IconComponent, { size: 14 }) : React.createElement(defaultIcon, { size: 14 });
};
