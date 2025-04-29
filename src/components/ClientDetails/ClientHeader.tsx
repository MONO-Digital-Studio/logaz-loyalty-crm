
import React from "react";
import { Button } from "@/components/ui/button";

interface ClientHeaderProps {
  name: string;
  id: string;
  level: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ name, id, level }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-500">ID: {id} • Уровень: {level}</p>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline">Редактировать</Button>
        <Button variant="default" className="bg-logaz-orange">Связаться</Button>
      </div>
    </div>
  );
};

export default ClientHeader;
