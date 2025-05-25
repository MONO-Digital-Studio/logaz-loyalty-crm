
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Phone, Bell } from "lucide-react";

interface CommunicationChannel {
  type: 'email' | 'sms' | 'telegram' | 'push';
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  value?: string;
  lastActivity?: string;
}

interface ClientCommunicationChannelsProps {
  channels: CommunicationChannel[];
}

const ClientCommunicationChannels: React.FC<ClientCommunicationChannelsProps> = ({ channels }) => {
  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <Phone className="h-4 w-4" />;
      case 'telegram':
        return <MessageSquare className="h-4 w-4" />;
      case 'push':
        return <Bell className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getChannelName = (type: string) => {
    switch (type) {
      case 'email':
        return 'Email';
      case 'sms':
        return 'SMS';
      case 'telegram':
        return 'Telegram';
      case 'push':
        return 'PUSH';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Активен', variant: 'default' as const },
      inactive: { label: 'Неактивен', variant: 'secondary' as const },
      pending: { label: 'Ожидает', variant: 'outline' as const },
      blocked: { label: 'Заблокирован', variant: 'destructive' as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Каналы коммуникации</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {channels.map((channel, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              {getChannelIcon(channel.type)}
              <div>
                <div className="font-medium">{getChannelName(channel.type)}</div>
                {channel.value && (
                  <div className="text-sm text-gray-500">{channel.value}</div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(channel.status)}
              {channel.lastActivity && (
                <div className="text-xs text-gray-400">
                  {channel.lastActivity}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ClientCommunicationChannels;
