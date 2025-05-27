
import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { LoyaltyLevel } from '@/types/loyalty-individuals';
import LoyaltyLevelCard from './LoyaltyLevelCard';

interface LoyaltyLevelsSectionProps {
  levels: LoyaltyLevel[];
  onUpdateLevel: (levelId: string, updates: Partial<LoyaltyLevel>) => void;
  onAddLevel: (level: Omit<LoyaltyLevel, 'id'>) => void;
  onRemoveLevel: (levelId: string) => void;
}

const LoyaltyLevelsSection: React.FC<LoyaltyLevelsSectionProps> = ({
  levels,
  onUpdateLevel,
  onAddLevel,
  onRemoveLevel
}) => {
  const [editingLevels, setEditingLevels] = useState<Record<string, boolean>>({});

  const handleAddNewLevel = useCallback(() => {
    const maxPoints = Math.max(...levels.map(l => l.maxPoints || 0));
    onAddLevel({
      name: 'Новый уровень',
      minPoints: maxPoints + 1,
      maxPoints: maxPoints + 5000,
      pointsPerRuble: 1,
      color: '#3B55A2',
      benefits: ['Базовые преимущества'],
      isActive: true
    });
  }, [levels, onAddLevel]);

  const toggleLevelEdit = useCallback((levelId: string) => {
    setEditingLevels(prev => ({
      ...prev,
      [levelId]: !prev[levelId]
    }));
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Уровни лояльности</CardTitle>
            <CardDescription>
              Настройка уровней и условий начисления баллов
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleAddNewLevel} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Добавить уровень
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {levels
            .sort((a, b) => a.minPoints - b.minPoints)
            .map(level => (
              <LoyaltyLevelCard
                key={level.id}
                level={level}
                onUpdate={onUpdateLevel}
                onRemove={onRemoveLevel}
                canRemove={levels.length > 1}
                isEditing={editingLevels[level.id]}
                onToggleEdit={() => toggleLevelEdit(level.id)}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyLevelsSection;
