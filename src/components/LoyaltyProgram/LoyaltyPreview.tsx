
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { useLoyaltyCalculations } from '@/hooks/useLoyaltyCalculations';
import { IndividualsLoyaltySettings } from '@/types/loyalty-individuals';

interface LoyaltyPreviewProps {
  settings: IndividualsLoyaltySettings;
}

const LoyaltyPreview: React.FC<LoyaltyPreviewProps> = React.memo(({ settings }) => {
  const [customerPoints, setCustomerPoints] = React.useState(2500);
  const [purchaseAmount, setPurchaseAmount] = React.useState(1000);

  const {
    currentLevel,
    nextLevel,
    pointsToNextLevel,
    finalEarnedPoints,
    bonusMultiplier,
    availableRedemptions,
    levelProgress,
    calculation
  } = useLoyaltyCalculations(settings, customerPoints, purchaseAmount);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-logaz-blue" />
          <CardTitle>Калькулятор лояльности</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customer-points">Текущие баллы клиента</Label>
            <Input
              id="customer-points"
              type="number"
              value={customerPoints}
              onChange={(e) => setCustomerPoints(parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div>
            <Label htmlFor="purchase-amount">Сумма покупки (₽)</Label>
            <Input
              id="purchase-amount"
              type="number"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        {currentLevel && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: currentLevel.color }}
                  />
                  <span className="font-medium">Текущий уровень: {currentLevel.name}</span>
                </div>
                {nextLevel && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>До {nextLevel.name}:</span>
                    <Badge variant="outline">
                      {pointsToNextLevel} баллов
                    </Badge>
                  </div>
                )}
              </div>
              
              <Progress value={levelProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Будет начислено</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {finalEarnedPoints} баллов
                </div>
                {bonusMultiplier > 1 && (
                  <div className="text-xs text-green-600 mt-1">
                    Бонус ×{bonusMultiplier}
                  </div>
                )}
              </Card>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Коэффициент</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {currentLevel.pointsPerRuble}
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  баллов за рубль
                </div>
              </Card>

              <Card className="p-4 bg-orange-50 border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Итого баллов</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {customerPoints + finalEarnedPoints}
                </div>
                <div className="text-xs text-orange-600 mt-1">
                  после покупки
                </div>
              </Card>
            </div>

            {availableRedemptions.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Доступные скидки</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableRedemptions.slice(0, 4).map((redemption) => (
                    <div 
                      key={redemption.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">{redemption.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {redemption.pointsCost} баллов
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {redemption.discountType === 'percentage' ? `${redemption.discountValue}%` : `${redemption.discountValue}₽`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Баллы действительны в течение {settings.pointsExpirationDays} дней с момента начисления
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

LoyaltyPreview.displayName = 'LoyaltyPreview';

export default LoyaltyPreview;
