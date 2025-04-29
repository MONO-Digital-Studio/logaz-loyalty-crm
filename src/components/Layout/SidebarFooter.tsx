
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

interface SidebarFooterProps {
  isOpen: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isOpen }) => {
  return (
    <div className="p-4 border-t border-sidebar-border flex justify-center">
      <Link 
        to="/ai-assistant" 
        className={`hover:bg-sidebar-accent p-2 rounded transition-colors ${
          isOpen ? 'flex items-center' : 'w-10 h-10 flex items-center justify-center'
        }`}
      >
        <Bot size={18} className="text-sidebar-foreground" />
        {isOpen && <span className="ml-3">AI ассистент</span>}
      </Link>
    </div>
  );
};

export default SidebarFooter;
