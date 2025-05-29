
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TestComponent: React.FC = () => {
  return (
    <Card className="stats-card">
      <CardHeader>
        <CardTitle>Тестовый компонент</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Этот компонент отображается корректно. Если вы видите этот текст, значит дашборд работает.</p>
      </CardContent>
    </Card>
  );
};

export default TestComponent;
