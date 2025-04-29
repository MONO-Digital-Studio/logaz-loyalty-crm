
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClientInfoProps {
  phone: string;
  email: string;
  birthDate: string;
  registrationDate: string;
  lastVisit: string;
}

const ClientInfo: React.FC<ClientInfoProps> = ({
  phone,
  email,
  birthDate,
  registrationDate,
  lastVisit
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Информация о клиенте</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-gray-500">Телефон</div>
          <div>{phone}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-gray-500">Email</div>
          <div>{email}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-gray-500">Дата рождения</div>
          <div>{birthDate}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-gray-500">Дата регистрации</div>
          <div>{registrationDate}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-gray-500">Последний визит</div>
          <div>{lastVisit}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInfo;
