import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Calendar, Gift, TrendingUp, Users, RotateCcw, UserPlus, Bell } from 'lucide-react';
import { BonusRule } from '@/types/loyalty-individuals';

interface BonusSettingsFormProps {
  bonusRules: BonusRule[];
  onUpdateRule: (ruleId: string, updates: Partial<BonusRule>) => void;
  onAddRule: (rule: Omit<BonusRule, 'id'>) => void;
  onRemoveRule?: (ruleId: string) => void;
}

const bonusTypeIcons = {
  birthday: Calendar,
  anniversary: Gift,
  seasonal: Calendar,
  volume: TrendingUp,
  frequency: Users,
  auto_return: RotateCcw,
  registration: UserPlus,
  expiration_reminder: Bell
};

const bonusTypeLabels = {
  birthday: 'День рождения',
  anniversary: 'Годовщина',
  seasonal: 'Сезонная акция',
  volume: 'Объем покупок',
  frequency: 'Частота посещений',
  auto_return: 'Автовозврат клиентов',
  registration: 'Баллы за регистрацию',
  expiration_reminder: 'Сервисные баллы'
};

const BonusSettingsForm: React.FC<BonusSettingsFormProps> = React.memo(({
  bonusRules,
  onUpdateRule,
  onAddRule,
  onRemoveRule
}) => {
  const [isAddingRule, setIsAddingRule] = React.useState(false);
  const [newRule, setNewRule] = React.useState<Omit<BonusRule, 'id'>>({
    name: '',
    description: '',
    type: 'birthday',
    multiplier: 1.5,
    conditions: {},
    isActive: true
  });

  const handleAddRule = React.useCallback(() => {
    if (newRule.name.trim()) {
      onAddRule(newRule);
      setNewRule({
        name: '',
        description: '',
        type: 'birthday',
        multiplier: 1.5,
        conditions: {},
        isActive: true
      });
      setIsAddingRule(false);
    }
  }, [newRule, onAddRule]);

  const handleUpdateRule = React.useCallback((ruleId: string, field: keyof BonusRule, value: any) => {
    onUpdateRule(ruleId, { [field]: value });
  }, [onUpdateRule]);

  const handleUpdateCondition = React.useCallback((ruleId: string, conditionKey: string, value: any) => {
    const rule = bonusRules.find(r => r.id === ruleId);
    if (rule) {
      onUpdateRule(ruleId, {
        conditions: {
          ...rule.conditions,
          [conditionKey]: value
        }
      });
    }
  }, [bonusRules, onUpdateRule]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Дополнительные бонусы</h3>
        <Button
          onClick={() => setIsAddingRule(true)}
          size="sm"
          className="bg-logaz-blue hover:bg-logaz-blue/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить правило
        </Button>
      </div>

      {bonusRules.map((rule) => {
        const IconComponent = bonusTypeIcons[rule.type];
        
        return (
          <Card key={rule.id} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5 text-logaz-blue" />
                  <CardTitle className="text-base">{rule.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={(checked) => handleUpdateRule(rule.id, 'isActive', checked)}
                  />
                  {onRemoveRule && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveRule(rule.id)}
                      className="h-8 w-8 p-0 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название</Label>
                  <Input
                    value={rule.name}
                    onChange={(e) => handleUpdateRule(rule.id, 'name', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>
                    {rule.type === 'registration' ? 'Количество баллов' : 'Множитель'}
                  </Label>
                  <Input
                    type="number"
                    step={rule.type === 'registration' ? '1' : '0.1'}
                    value={rule.type === 'registration' ? (rule.conditions.minAmount || 0) : rule.multiplier}
                    onChange={(e) => {
                      if (rule.type === 'registration') {
                        handleUpdateCondition(rule.id, 'minAmount', parseInt(e.target.value) || 0);
                      } else {
                        handleUpdateRule(rule.id, 'multiplier', parseFloat(e.target.value) || 1);
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <Label>Описание</Label>
                <Textarea
                  value={rule.description}
                  onChange={(e) => handleUpdateRule(rule.id, 'description', e.target.value)}
                  rows={2}
                />
              </div>

              {rule.type === 'volume' && (
                <div>
                  <Label>Минимальная сумма покупки</Label>
                  <Input
                    type="number"
                    value={rule.conditions.minAmount || ''}
                    onChange={(e) => handleUpdateCondition(rule.id, 'minAmount', parseInt(e.target.value) || 0)}
                    placeholder="Сумма в рублях"
                  />
                </div>
              )}

              {rule.type === 'frequency' && (
                <div>
                  <Label>Минимальная частота посещений (раз в месяц)</Label>
                  <Input
                    type="number"
                    value={rule.conditions.minFrequency || ''}
                    onChange={(e) => handleUpdateCondition(rule.id, 'minFrequency', parseInt(e.target.value) || 1)}
                  />
                </div>
              )}

              {rule.type === 'auto_return' && (
                <div>
                  <Label>Количество дней неактивности</Label>
                  <Input
                    type="number"
                    value={rule.conditions.daysInactive || 30}
                    onChange={(e) => handleUpdateCondition(rule.id, 'daysInactive', parseInt(e.target.value) || 30)}
                    placeholder="Дни"
                  />
                </div>
              )}

              {rule.type === 'seasonal' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Дата начала</Label>
                    <Input
                      type="date"
                      value={rule.conditions.dateRange?.start || ''}
                      onChange={(e) => handleUpdateCondition(rule.id, 'dateRange', {
                        ...rule.conditions.dateRange,
                        start: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label>Дата окончания</Label>
                    <Input
                      type="date"
                      value={rule.conditions.dateRange?.end || ''}
                      onChange={(e) => handleUpdateCondition(rule.id, 'dateRange', {
                        ...rule.conditions.dateRange,
                        end: e.target.value
                      })}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {isAddingRule && (
        <Card className="border-dashed border-2 border-logaz-blue/30">
          <CardHeader>
            <CardTitle className="text-base">Новое правило бонусов</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Название</Label>
                <Input
                  value={newRule.name}
                  onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Название правила"
                />
              </div>
              
              <div>
                <Label>Тип бонуса</Label>
                <Select 
                  value={newRule.type} 
                  onValueChange={(value: any) => setNewRule(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(bonusTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Описание</Label>
              <Textarea
                value={newRule.description}
                onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Описание правила"
                rows={2}
              />
            </div>

            <div>
              <Label>
                {newRule.type === 'registration' ? 'Количество баллов' : 'Множитель'}
              </Label>
              <Input
                type="number"
                step={newRule.type === 'registration' ? '1' : '0.1'}
                value={newRule.type === 'registration' ? (newRule.conditions.minAmount || 500) : newRule.multiplier}
                onChange={(e) => {
                  if (newRule.type === 'registration') {
                    setNewRule(prev => ({
                      ...prev,
                      conditions: { ...prev.conditions, minAmount: parseInt(e.target.value) || 500 }
                    }));
                  } else {
                    setNewRule(prev => ({ ...prev, multiplier: parseFloat(e.target.value) || 1 }));
                  }
                }}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsAddingRule(false)}
              >
                Отменить
              </Button>
              <Button 
                onClick={handleAddRule}
                className="bg-logaz-blue hover:bg-logaz-blue/90"
              >
                Добавить
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

BonusSettingsForm.displayName = 'BonusSettingsForm';

export default BonusSettingsForm;
