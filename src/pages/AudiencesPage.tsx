
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Plus, Filter, Download } from 'lucide-react';
import AudienceDistribution from '@/components/Audiences/AudienceDistribution';
import AudienceStats from '@/components/Audiences/AudienceStats';

// Тестовые данные для аудиторий
const audiencesData = [
  { 
    id: "1", 
    name: "VIP клиенты", 
    description: "Клиенты с высоким LTV", 
    count: 145,
    createdAt: "12.03.2023",
    lastUpdated: "28.06.2023" 
  },
  { 
    id: "2", 
    name: "Новые клиенты", 
    description: "Клиенты, присоединившиеся за последние 30 дней", 
    count: 278,
    createdAt: "05.05.2023",
    lastUpdated: "27.06.2023" 
  },
  { 
    id: "3", 
    name: "Спящие клиенты", 
    description: "Не совершали покупки более 90 дней", 
    count: 342,
    createdAt: "18.01.2023",
    lastUpdated: "15.06.2023" 
  },
  { 
    id: "4", 
    name: "Активные пользователи", 
    description: "Совершили более 3 покупок за 60 дней", 
    count: 203,
    createdAt: "22.04.2023",
    lastUpdated: "25.06.2023" 
  },
  { 
    id: "5", 
    name: "Потенциальные лояльные", 
    description: "Совершили 2 покупки за последние 45 дней", 
    count: 167,
    createdAt: "30.05.2023",
    lastUpdated: "20.06.2023" 
  }
];

// Данные для распределения аудиторий
const distributionData = [
  { name: 'VIP клиенты', value: 12 },
  { name: 'Новые клиенты', value: 23 },
  { name: 'Спящие клиенты', value: 28 },
  { name: 'Активные', value: 17 },
  { name: 'Потенциальные лояльные', value: 14 },
  { name: 'Другие', value: 6 }
];

const AudiencesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAudiences, setFilteredAudiences] = useState(audiencesData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query) {
      const filtered = audiencesData.filter(audience => 
        audience.name.toLowerCase().includes(query) || 
        audience.description.toLowerCase().includes(query)
      );
      setFilteredAudiences(filtered);
    } else {
      setFilteredAudiences(audiencesData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Аудитории</h1>
        <Button className="bg-logaz-blue">
          <Plus className="mr-2 h-4 w-4" />
          Создать аудиторию
        </Button>
      </div>

      <AudienceStats 
        totalAudiences={audiencesData.length} 
        totalContacts={1135} 
        activeAudiences={3} 
        averageSize={227}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Аудитории</CardTitle>
            <CardDescription>Управление сегментами клиентов</CardDescription>
            <div className="flex items-center justify-between mt-2">
              <div className="relative w-64">
                <Input 
                  placeholder="Поиск аудиторий..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-8"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Экспорт
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Контактов</TableHead>
                  <TableHead>Создано</TableHead>
                  <TableHead>Обновлено</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudiences.map((audience) => (
                  <TableRow key={audience.id}>
                    <TableCell className="font-medium">{audience.name}</TableCell>
                    <TableCell>{audience.description}</TableCell>
                    <TableCell>{audience.count}</TableCell>
                    <TableCell>{audience.createdAt}</TableCell>
                    <TableCell>{audience.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Просмотр
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <AudienceDistribution data={distributionData} />
      </div>
    </div>
  );
};

export default AudiencesPage;
