
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit3 } from 'lucide-react';
import { LoyaltyLevel } from '@/types/loyalty-individuals';
import { cn } from '@/lib/utils';

interface LoyaltyLevelCardProps {
  level: LoyaltyLevel;
  onUpdate: (levelId: string, updates: Partial<LoyaltyLevel>) => void;
  onRemove: (levelId: string) => void;
  canRemove?: boolean;
  isEditing?: boolean;
  onToggleEdit?: () => void;
}

const LoyaltyLevelCard: React.FC<LoyaltyLevelCardProps> = React.memo(({
  level,
  onUpdate,
  onRemove,
  canRemove = true,
  isEditing = false,
  onToggleEdit
}) => {
  const handleInputChange = React.useCallback((field: keyof LoyaltyLevel, value: any) => {
    onUpdate(level.id, { [field]: value });
  }, [level.id, onUpdate]);

  const handleBenefitChange = React.useCallback((index: number, value: string) => {
    const newBenefits = [...level.benefits];
    newBenefits[index] = value;
    onUpdate(level.id, { benefits: newBenefits });
  }, [level.id, level.benefits, onUpdate]);

  const addBenefit = React.useCallback(() => {
    onUpdate(level.id, { benefits: [...level.benefits, ''] });
  }, [level.id, level.benefits, onUpdate]);

  const removeBenefit = React.useCallback((index: number) => {
    const newBenefits = level.benefits.filter((_, i) => i !== index);
    onUpdate(level.id, { benefits: newBenefits });
  }, [level.id, level.benefits, onUpdate]);

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      !level.isActive && "opacity-60"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: level.color }}
            />
            {isEditing ? (
              <Input
                value={level.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-lg font-semibold"
              />
            ) : (
              <CardTitle className="text-lg">{level.name}</CardTitle>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={level.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
            />
            {onToggleEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleEdit}
                className="h-8 w-8 p-0"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
            {canRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(level.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`min-points-${level.id}`}>Минимум баллов</Label>
            {isEditing ? (
              <Input
                id={`min-points-${level.id}`}
                type="number"
                value={level.minPoints}
                onChange={(e) => handleInputChange('minPoints', parseInt(e.target.value) || 0)}
              />
            ) : (
              <p className="text-sm text-muted-foreground mt-1">{level.minPoints.toLocaleString()}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor={`max-points-${level.id}`}>Максимум баллов</Label>
            {isEditing ? (
              <Input
                id={`max-points-${level.id}`}
                type="number"
                value={level.maxPoints || ''}
                onChange={(e) => handleInputChange('maxPoints', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="∞"
              />
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                {level.maxPoints ? level.maxPoints.toLocaleString() : '∞'}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor={`points-per-ruble-${level.id}`}>Баллов за рубль</Label>
            {isEditing ? (
              <Input
                id={`points-per-ruble-${level.id}`}
                type="number"
                step="0.1"
                value={level.pointsPerRuble}
                onChange={(e) => handleInputChange('pointsPerRuble', parseFloat(e.target.value) || 0)}
              />
            ) : (
              <p className="text-sm text-muted-foreground mt-1">{level.pointsPerRuble}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Преимущества уровня</Label>
          <div className="mt-2 space-y-2">
            {level.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <Input
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      placeholder="Описание преимущества"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBenefit(index)}
                      className="h-8 w-8 p-0 text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    {benefit}
                  </Badge>
                )}
              </div>
            ))}
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addBenefit}
                className="mt-2"
              >
                Добавить преимущество
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

LoyaltyLevelCard.displayName = 'LoyaltyLevelCard';

export default LoyaltyLevelCard;
