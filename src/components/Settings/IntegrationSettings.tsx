
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface IntegrationItemProps {
  title: string;
  description: string;
  icon: string;
  connected: boolean;
  apiKey?: string;
  onToggle: (connected: boolean) => void;
  onSaveApiKey?: (apiKey: string) => void;
}

const IntegrationItem = ({
  title,
  description,
  icon,
  connected,
  apiKey = "",
  onToggle,
  onSaveApiKey,
}: IntegrationItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [keyValue, setKeyValue] = useState(apiKey);

  const handleSaveKey = () => {
    if (onSaveApiKey) {
      onSaveApiKey(keyValue);
      toast.success(`API ключ для ${title} сохранен`);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-start justify-between space-y-1 py-4">
      <div className="flex space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          
          {connected && onSaveApiKey && (
            <div className="mt-2">
              {isEditing ? (
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="text"
                    value={keyValue}
                    onChange={(e) => setKeyValue(e.target.value)}
                    placeholder="Введите API ключ"
                    className="max-w-xs"
                  />
                  <Button size="sm" onClick={handleSaveKey}>
                    Сохранить
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Отмена
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="mt-2"
                >
                  {keyValue ? "Обновить API ключ" : "Добавить API ключ"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <Switch checked={connected} onCheckedChange={onToggle} />
    </div>
  );
};

const IntegrationSettings = () => {
  const [integrations, setIntegrations] = useState({
    sms: {
      connected: true,
      apiKey: "",
    },
    email: {
      connected: true,
      apiKey: "sk_test_*************",
    },
    payment: {
      connected: false,
      apiKey: "",
    },
    telegram: {
      connected: false,
      apiKey: "",
    },
    whatsapp: {
      connected: false,
      apiKey: "",
    },
  });

  const handleToggleIntegration = (integration: keyof typeof integrations, connected: boolean) => {
    setIntegrations((prev) => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        connected,
      },
    }));

    toast.success(
      connected
        ? `Интеграция ${getIntegrationName(integration)} подключена`
        : `Интеграция ${getIntegrationName(integration)} отключена`
    );
  };

  const handleSaveApiKey = (integration: keyof typeof integrations, apiKey: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        apiKey,
      },
    }));
  };

  const getIntegrationName = (key: string): string => {
    const names: Record<string, string> = {
      sms: "SMS Рассылка",
      email: "Email Маркетинг",
      payment: "Платежная система",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
    };
    
    return names[key] || key;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Интеграции</CardTitle>
        <CardDescription>
          Управление внешними интеграциями и API ключами
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <h3 className="font-medium">Коммуникации</h3>
          <p className="text-sm text-muted-foreground">
            Интеграции для связи с клиентами через различные каналы
          </p>
        </div>

        <div className="divide-y">
          <IntegrationItem
            title="SMS Рассылка"
            description="Интеграция для массовой отправки SMS клиентам"
            icon="📱"
            connected={integrations.sms.connected}
            apiKey={integrations.sms.apiKey}
            onToggle={(connected) => handleToggleIntegration("sms", connected)}
            onSaveApiKey={(apiKey) => handleSaveApiKey("sms", apiKey)}
          />
          
          <IntegrationItem
            title="Email Маркетинг"
            description="Сервис для email рассылок и кампаний"
            icon="📧"
            connected={integrations.email.connected}
            apiKey={integrations.email.apiKey}
            onToggle={(connected) => handleToggleIntegration("email", connected)}
            onSaveApiKey={(apiKey) => handleSaveApiKey("email", apiKey)}
          />
          
          <IntegrationItem
            title="Telegram"
            description="Бот для работы с клиентами в Telegram"
            icon="✈️"
            connected={integrations.telegram.connected}
            apiKey={integrations.telegram.apiKey}
            onToggle={(connected) => handleToggleIntegration("telegram", connected)}
            onSaveApiKey={(apiKey) => handleSaveApiKey("telegram", apiKey)}
          />
          
          <IntegrationItem
            title="WhatsApp"
            description="Интеграция с WhatsApp Business API"
            icon="💬"
            connected={integrations.whatsapp.connected}
            apiKey={integrations.whatsapp.apiKey}
            onToggle={(connected) => handleToggleIntegration("whatsapp", connected)}
            onSaveApiKey={(apiKey) => handleSaveApiKey("whatsapp", apiKey)}
          />
        </div>

        <Separator className="my-6" />

        <div className="space-y-1">
          <h3 className="font-medium">Финансы</h3>
          <p className="text-sm text-muted-foreground">
            Интеграции с платежными системами и банками
          </p>
        </div>

        <div className="divide-y">
          <IntegrationItem
            title="Платежная система"
            description="Интеграция для приема платежей онлайн"
            icon="💳"
            connected={integrations.payment.connected}
            apiKey={integrations.payment.apiKey}
            onToggle={(connected) => handleToggleIntegration("payment", connected)}
            onSaveApiKey={(apiKey) => handleSaveApiKey("payment", apiKey)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationSettings;
