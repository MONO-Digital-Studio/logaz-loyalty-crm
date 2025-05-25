
import React from 'react';
import { mainIconMap, subIconMappings, defaultIcon } from './iconMappings';

export const getIconForItem = (id: string) => {
  const IconComponent = mainIconMap[id as keyof typeof mainIconMap];
  return IconComponent ? React.createElement(IconComponent, { size: 18 }) : React.createElement(defaultIcon, { size: 18 });
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
