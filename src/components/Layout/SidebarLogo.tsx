
import React from 'react';

interface SidebarLogoProps {
  isOpen: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ isOpen }) => {
  return (
    <div className="p-4 flex items-center justify-center border-b border-sidebar-border">
      {isOpen ? (
        <img 
          src="/lovable-uploads/57c42d09-8af7-4d89-b6d3-69515b834828.png" 
          alt="ЛОГАЗ SV" 
          className="h-8 w-auto"
        />
      ) : (
        <img 
          src="/lovable-uploads/943c1851-114c-432d-8498-cdadc4b2b112.png" 
          alt="ЛС" 
          className="h-10 w-10 object-contain"
        />
      )}
    </div>
  );
};

export default SidebarLogo;
