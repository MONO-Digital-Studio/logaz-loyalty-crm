import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Save, Settings, Users, Building2, Plus } from 'lucide-react';
import { useLoyaltySettings } from '@/hooks/useLoyaltySettings';
import LoyaltyLevelCard from '@/components/LoyaltyProgram/LoyaltyLevelCard';
import BonusSettingsForm from '@/components/LoyaltyProgram/BonusSettingsForm';
import LoyaltyPreview from '@/components/LoyaltyProgram/LoyaltyPreview';
import LoyaltySettingsError from '@/components/ErrorBoundary/LoyaltySettingsError';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

const loyaltyLevelsData = [
  { id: 1, name: "Стандарт", pointsPerRub: 0.5, minAmount: 0, maxAmount: 10000, color: "#3B55A2" },
  { id: 2, name: "Серебряный", pointsPerRub: 1, minAmount: 10000, maxAmount: 30000, color: "#CCCCCC" },
  { id: 3, name: "Золотой", pointsPerRub: 1.5, minAmount: 30000, maxAmount: 100000, color: "#FB8607" },
  { id: 4, name: "Платиновый", pointsPerRub: 2, minAmount: 100000, maxAmount: null, color: "#333333" },
];

const loyaltyActivityData = [
  { month: 'Янв', начислено: 42500, использовано: 31200, сгорело: 2800 },
  { month: 'Фев', начислено: 58900, использовано: 35600, сгорело: 1200 },
  { month: 'Мар', начислено: 45700, использовано: 38900, сгорело: 1500 },
  { month: 'Апр', начислено: 62300, использовано: 41200, сгорело: 3100 },
  { month: 'Май', начислено: 55800, использовано: 43800, сгорело: 2600 },
  { month: 'Июн', начислено: 67900, использовано: 48500, сгорело: 1800 },
];

const referralData = [
  { id: 1, referrer: "Иванов Алексей", phone: "+7 (905) 123-45-67", referrals: 12, revenue: 128500 },
  { id: 2, referrer: "Петрова Елена", phone: "+7 (912) 345-67-89", referrals: 9, revenue: 94300 },
  { id: 3, referrer: "Сидоров Дмитрий", phone: "+7 (921) 987-65-43", referrals: 8, revenue: 86700 },
  { id: 4, referrer: "Козлова Мария", phone: "+7 (916) 765-43-21", referrals: 7, revenue: 74200 },
  { id: 5, referrer: "Николаев Игорь", phone: "+7 (903) 567-89-12", referrals: 6, revenue: 65800 },
];

const LoyaltyProgramPage = () => {
  const [activeTab, setActiveTab] = useState("individuals");
  const [editingLevels, setEditingLevels] = useState<Record<string, boolean>>({});
  
  const {
    loyaltySettings,
    setLoyaltySettings,
    isLoading,
    hasChanges,
    levelValidation,
    saveLoyaltySettings,
    updateLevel,
    addLevel,
    removeLevel,
    updateBonusRule,
    addBonusRule
  } = useLoyaltySettings();

  useEffect(() => {
    document.title = "Программа лояльности | ЛОГАЗ SV";
  }, []);

  const handleSaveSettings = useCallback(async () => {
    if (levelValidation.isValid) {
      await saveLoyaltySettings();
    }
  }, [levelValidation.isValid, saveLoyaltySettings]);

  const handleAddNewLevel = useCallback(() => {
    const maxPoints = Math.max(...loyaltySettings.levels.map(l => l.maxPoints || 0));
    addLevel({
      name: 'Новый уровень',
      minPoints: maxPoints + 1,
      maxPoints: maxPoints + 5000,
      pointsPerRuble: 1,
      color: '#3B55A2',
      benefits: ['Базовые преимущества'],
      isActive: true
    });
  }, [loyaltySettings.levels, addLevel]);

  const toggleLevelEdit = useCallback((levelId: string) => {
    setEditingLevels(prev => ({
      ...prev,
      [levelId]: !prev[levelId]
    }));
  }, []);

  return (
    <ErrorBoundary fallback={<LoyaltySettingsError />}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Программа лояльности</h1>
          <Button 
            variant="default" 
            className="bg-logaz-blue"
            onClick={handleSaveSettings}
            disabled={isLoading || !hasChanges || !levelValidation.isValid}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="individuals" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Физические лица</span>
            </TabsTrigger>
            <TabsTrigger value="legal-entities" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Юридические лица</span>
            </TabsTrigger>
            <TabsTrigger value="loyalty-index">Индекс лояльности</TabsTrigger>
            <TabsTrigger value="referral">Реферальная программа</TabsTrigger>
          </TabsList>

          <TabsContent value="individuals" className="space-y-6">
            {/* Общие настройки программы */}
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
                    checked={loyaltySettings.isActive}
                    onCheckedChange={(checked) => 
                      setLoyaltySettings(prev => ({ ...prev, isActive: checked }))
                    }
                  />
                  <Label>Программа лояльности активна</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="program-name">Название программы</Label>
                    <Input
                      id="program-name"
                      value={loyaltySettings.programName}
                      onChange={(e) => 
                        setLoyaltySettings(prev => ({ ...prev, programName: e.target.value }))
                      }
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="points-expiration">Срок действия баллов (дни)</Label>
                    <Input
                      id="points-expiration"
                      type="number"
                      value={loyaltySettings.pointsExpirationDays}
                      onChange={(e) => 
                        setLoyaltySettings(prev => ({ 
                          ...prev, 
                          pointsExpirationDays: parseInt(e.target.value) || 365 
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="program-description">Описание программы</Label>
                  <Textarea
                    id="program-description"
                    value={loyaltySettings.programDescription}
                    onChange={(e) => 
                      setLoyaltySettings(prev => ({ ...prev, programDescription: e.target.value }))
                    }
                    rows={3}
                  />
                </div>

                {!levelValidation.isValid && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Ошибки конфигурации:</p>
                    <ul className="mt-1 text-red-700 text-sm">
                      {levelValidation.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Уровни лояльности */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Уровни лояльности</CardTitle>
                    <CardDescription>
                      Настройка уровней и условий начисления баллов
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleAddNewLevel}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить уровень
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loyaltySettings.levels
                    .sort((a, b) => a.minPoints - b.minPoints)
                    .map((level) => (
                      <LoyaltyLevelCard
                        key={level.id}
                        level={level}
                        onUpdate={updateLevel}
                        onRemove={removeLevel}
                        canRemove={loyaltySettings.levels.length > 1}
                        isEditing={editingLevels[level.id]}
                        onToggleEdit={() => toggleLevelEdit(level.id)}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Дополнительные бонусы */}
              <Card>
                <CardContent className="pt-6">
                  <BonusSettingsForm
                    bonusRules={loyaltySettings.bonusRules}
                    onUpdateRule={updateBonusRule}
                    onAddRule={addBonusRule}
                  />
                </CardContent>
              </Card>

              {/* Калькулятор и предпросмотр */}
              <LoyaltyPreview settings={loyaltySettings} />
            </div>

            {/* Дополнительные механики */}
            <Card>
              <CardHeader>
                <CardTitle>Дополнительные механики</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Автовозврат клиентов</h3>
                    <p className="text-sm text-gray-500">Напоминание клиентам, которые не посещали АЗС более 30 дней</p>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Баллы за регистрацию</h3>
                    <p className="text-sm text-gray-500">Начисление приветственных баллов новым клиентам</p>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Поздравления с днем рождения</h3>
                    <p className="text-sm text-gray-500">Автоматические поздравления и бонусы в день рождения</p>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Напоминание о сгорании баллов</h3>
                    <p className="text-sm text-gray-500">Уведомления о скором сгорании неиспользованных баллов</p>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>
              </CardContent>
            </Card>

            {/* Статистика баллов */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика баллов</CardTitle>
                <CardDescription>Активность по начислению и использованию баллов за 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={loyaltyActivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="начислено" fill="#3B55A2" />
                    <Bar dataKey="использовано" fill="#FB8607" />
                    <Bar dataKey="сгорело" fill="#F44336" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal-entities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Уровни начисления баллов для юридических лиц</CardTitle>
                <CardDescription>
                  Настройте уровни лояльности корпоративных клиентов и соответствующие им начисления баллов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название уровня</TableHead>
                      <TableHead>Баллов за рубль</TableHead>
                      <TableHead>Мин. сумма покупок</TableHead>
                      <TableHead>Макс. сумма покупок</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loyaltyLevelsData.map((level) => (
                      <TableRow key={level.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: level.color }}></div>
                            {level.name}
                          </div>
                        </TableCell>
                        <TableCell>{level.pointsPerRub}</TableCell>
                        <TableCell>{level.minAmount.toLocaleString()} ₽</TableCell>
                        <TableCell>{level.maxAmount ? `${level.maxAmount.toLocaleString()} ₽` : "∞"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Изменить
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="outline" className="mt-4">
                  Добавить уровень
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ... keep existing code for loyalty-index and referral tabs */}
          <TabsContent value="loyalty-index">
            <Card>
              <CardHeader>
                <CardTitle>Индекс лояльности клиентов (NPS)</CardTitle>
                <CardDescription>Оценка лояльности клиентов к бренду на основе опросов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500">Текущий NPS</h3>
                    <p className="text-4xl font-bold mt-2 text-logaz-blue">68%</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500">Промоутеры</h3>
                    <p className="text-4xl font-bold mt-2 text-green-500">72%</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500">Критики</h3>
                    <p className="text-4xl font-bold mt-2 text-red-500">4%</p>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Динамика NPS</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={[
                        { month: 'Янв', nps: 62 },
                        { month: 'Фев', nps: 65 },
                        { month: 'Мар', nps: 63 },
                        { month: 'Апр', nps: 67 },
                        { month: 'Май', nps: 65 },
                        { month: 'Июн', nps: 68 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="nps" fill="#3B55A2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <Button variant="outline">Настроить опросы NPS</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referral">
            <Card>
              <CardHeader>
                <CardTitle>Реферальная программа</CardTitle>
                <CardDescription>Управление реферальной системой и ее метриками</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500">Всего рефералов</h3>
                    <p className="text-4xl font-bold mt-2 text-logaz-blue">386</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500">Активные рефералы</h3>
                    <p className="text-4xl font-bold mt-2 text-green-500">284</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-500">Выручка через рефералов</h3>
                    <p className="text-4xl font-bold mt-2 text-logaz-orange">1.2M ₽</p>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Лучшие рефереры</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Привлечено рефералов</TableHead>
                        <TableHead>Выручка</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referralData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.referrer}</TableCell>
                          <TableCell>{item.phone}</TableCell>
                          <TableCell>{item.referrals}</TableCell>
                          <TableCell>{item.revenue.toLocaleString()} ₽</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="default" className="bg-logaz-blue">Настроить реферальную программу</Button>
                  <Button variant="outline">Экспорт данных</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default LoyaltyProgramPage;
