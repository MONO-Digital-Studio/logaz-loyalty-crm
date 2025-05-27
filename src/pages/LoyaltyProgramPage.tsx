
import { useEffect, useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Users } from 'lucide-react';
import { useLoyaltySettings } from '@/hooks/useLoyaltySettings';
import { IndividualsLoyaltySettings } from '@/types/loyalty-individuals';
import LoyaltyPreview from '@/components/LoyaltyProgram/LoyaltyPreview';
import LoyaltySettingsError from '@/components/ErrorBoundary/LoyaltySettingsError';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import LoyaltyGeneralSettings from '@/components/LoyaltyProgram/LoyaltyGeneralSettings';
import LoyaltyLevelsSection from '@/components/LoyaltyProgram/LoyaltyLevelsSection';
import BonusSettingsForm from '@/components/LoyaltyProgram/BonusSettingsForm';
import LoyaltyStatistics from '@/components/LoyaltyProgram/LoyaltyStatistics';
import LoyaltyNPSSection from '@/components/LoyaltyProgram/LoyaltyNPSSection';
import ReferralProgramSection from '@/components/LoyaltyProgram/ReferralProgramSection';

const LoyaltyProgramPage = () => {
  const [activeTab, setActiveTab] = useState("individuals");
  
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
    addBonusRule,
    removeBonusRule
  } = useLoyaltySettings();

  useEffect(() => {
    document.title = "Программа лояльности | ЛОГАЗ SV";
  }, []);

  const handleSaveSettings = useCallback(async () => {
    if (levelValidation.isValid) {
      await saveLoyaltySettings();
    }
  }, [levelValidation.isValid, saveLoyaltySettings]);

  const handleUpdateSettings = useCallback((updates: Partial<IndividualsLoyaltySettings>) => {
    setLoyaltySettings(prev => ({ ...prev, ...updates }));
  }, [setLoyaltySettings]);

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
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="individuals" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Настройки программы</span>
            </TabsTrigger>
            <TabsTrigger value="loyalty-index">Индекс лояльности</TabsTrigger>
            <TabsTrigger value="referral">Реферальная программа</TabsTrigger>
          </TabsList>

          <TabsContent value="individuals" className="space-y-6">
            <LoyaltyGeneralSettings
              settings={loyaltySettings}
              onUpdateSettings={handleUpdateSettings}
              validationErrors={levelValidation.errors}
            />

            <LoyaltyLevelsSection
              levels={loyaltySettings.levels}
              onUpdateLevel={updateLevel}
              onAddLevel={addLevel}
              onRemoveLevel={removeLevel}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <BonusSettingsForm
                  bonusRules={loyaltySettings.bonusRules}
                  onUpdateRule={updateBonusRule}
                  onAddRule={addBonusRule}
                  onRemoveRule={removeBonusRule}
                />
              </div>

              <LoyaltyPreview settings={loyaltySettings} />
            </div>

            <LoyaltyStatistics />
          </TabsContent>

          <TabsContent value="loyalty-index">
            <LoyaltyNPSSection />
          </TabsContent>

          <TabsContent value="referral">
            <ReferralProgramSection />
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default LoyaltyProgramPage;
