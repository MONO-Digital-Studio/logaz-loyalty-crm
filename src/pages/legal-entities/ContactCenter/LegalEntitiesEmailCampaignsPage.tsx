
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CampaignsList from "@/components/Campaigns/CampaignsList";

const LegalEntitiesEmailCampaignsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("email");
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate("/legal-entities/contact-center/campaigns/editor");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Управление рассылками ЮЛ</h1>
        <Button onClick={handleCreateCampaign} className="bg-logaz-blue">
          <Plus className="h-4 w-4 mr-2" />
          Создать рассылку
        </Button>
      </div>

      <Tabs defaultValue="email" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="email">Email рассылки</TabsTrigger>
          <TabsTrigger value="push">PUSH уведомления</TabsTrigger>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="automated">Автоматические</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <CampaignsList campaignType="email" />
        </TabsContent>

        <TabsContent value="push">
          <CampaignsList campaignType="push" />
        </TabsContent>

        <TabsContent value="telegram">
          <CampaignsList campaignType="telegram" />
        </TabsContent>

        <TabsContent value="sms">
          <CampaignsList campaignType="sms" />
        </TabsContent>

        <TabsContent value="templates">
          <CampaignsList campaignType="templates" />
        </TabsContent>

        <TabsContent value="automated">
          <CampaignsList campaignType="automated" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalEntitiesEmailCampaignsPage;
