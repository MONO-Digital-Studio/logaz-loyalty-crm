
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings } from 'lucide-react';
import { IndividualsLoyaltySettings } from '@/types/loyalty-individuals';

interface LoyaltyGeneralSettingsProps {
  settings: IndividualsLoyaltySettings;
  onUpdateSettings: (updates: Partial<IndividualsLoyaltySettings>) => void;
  validationErrors?: string[];
}

const LoyaltyGeneralSettings: React.FC<LoyaltyGeneralSettingsProps> = ({
  settings,
  onUpdateSettings,
  validationErrors = []
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-logaz-blue" />
          <CardTitle>Общие настройки программы лояльности</CardTitle>
        </div>
        <CardDescription>
          Основные параметры программы лояльности для физических лиц
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.isActive}
            onCheckedChange={(checked) => onUpdateSettings({ isActive: checked })}
          />
          <Label>Программа лояльности активна</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="program-name">Название программы</Label>
            <Input
              id="program-name"
              value={settings.programName}
              onChange={(e) => onUpdateSettings({ programName: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="points-expiration">Срок действия баллов (дни)</Label>
            <Input
              id="points-expiration"
              type="number"
              value={settings.pointsExpirationDays}
              onChange={(e) => onUpdateSettings({ 
                pointsExpirationDays: parseInt(e.target.value) || 365 
              })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="program-description">Описание программы</Label>
          <Textarea
            id="program-description"
            value={settings.programDescription}
            onChange={(e) => onUpdateSettings({ programDescription: e.target.value })}
            rows={3}
          />
        </div>

        {validationErrors.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">Ошибки конфигурации:</p>
            <ul className="mt-1 text-red-700 text-sm">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoyaltyGeneralSettings;
