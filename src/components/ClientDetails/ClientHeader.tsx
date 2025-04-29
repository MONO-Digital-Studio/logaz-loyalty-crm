
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ClientHeaderProps {
  name: string;
  id: string;
  level: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ name, id, level }) => {
  const navigate = useNavigate();
  
  const handleContactClick = () => {
    toast.success(`Инициирован контакт с клиентом ${name}`);
    navigate('/contact-center/dialogs');
  };
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-500">ID: {id} • Уровень: {level}</p>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Редактировать
        </Button>
        <Button variant="default" className="bg-logaz-orange" onClick={handleContactClick}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Связаться
        </Button>
      </div>
    </div>
  );
};

export default ClientHeader;
