
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Edit } from 'lucide-react';

interface HandbookViewerProps {
  onEdit?: () => void;
  editable?: boolean;
}

const HandbookViewer: React.FC<HandbookViewerProps> = ({ onEdit, editable = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [handbookContent, setHandbookContent] = useState('');

  useEffect(() => {
    loadHandbookContent();
  }, []);

  const loadHandbookContent = async () => {
    try {
      const content = `# Справочник терминов

Данный справочник содержит определения основных терминов и понятий, используемых в системе аналитики АЗС.

## Аналитические методы

### Скользящее среднее
**Скользящее среднее** - статистический метод сглаживания данных, который показывает тренды путем усреднения значений за определенный смещающийся период времени.

**Принцип работы:**
- Берется определенное количество последних значений (например, за 7 дней)
- Вычисляется их среднее арифметическое
- При добавлении нового значения самое старое исключается из расчета
- Таким образом "окно" расчета постоянно смещается

**Применение в контексте АЗС:**
- Анализ волатильных показателей (продажи, объемы реализации, количество клиентов)
- Выявление долгосрочных тенденций без учета краткосрочных колебаний
- Сглаживание сезонных и случайных факторов
- Прогнозирование будущих значений на основе трендов

## KPI и метрики

### Продажи
Общая выручка от реализации товаров и услуг за выбранный период.

### Средний чек
Средняя сумма одной транзакции, рассчитывается как отношение общей выручки к количеству транзакций.

### NPS (Net Promoter Score)
Индекс готовности клиентов рекомендовать компанию. Значения от 50% считаются отличными.`;
      
      setHandbookContent(content);
    } catch (error) {
      console.error('Ошибка загрузки справочника:', error);
    }
  };

  const filteredContent = handbookContent
    .split('\n')
    .filter(line => 
      searchTerm === '' || 
      line.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .join('\n');

  const renderMarkdown = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mb-4 text-gray-800">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mb-3 mt-6 text-gray-700">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-medium mb-2 mt-4 text-gray-600">{line.slice(4)}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold mb-2">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 mb-1 text-gray-600">{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2 text-gray-600">{line}</p>;
    });
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Справочник терминов</CardTitle>
          </div>
          {editable && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEdit}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Редактировать
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Поиск по справочнику..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="prose prose-sm max-w-none">
          {renderMarkdown(filteredContent)}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
          Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
        </div>
      </CardContent>
    </Card>
  );
};

export default HandbookViewer;
