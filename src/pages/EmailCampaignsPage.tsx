
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, Send, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CampaignsList from "@/components/Campaigns/CampaignsList";

const EmailCampaignsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Рассылки | ЛОГАЗ SV";
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Управление рассылками</h1>
          <p className="text-muted-foreground mt-1">
            Создание и управление email рассылками и автоматизациями
          </p>
        </div>
        <Button 
          className="bg-logaz-blue"
          onClick={() => navigate("/campaigns/editor")}
        >
          <PlusIcon className="mr-2" size={18} />
          Создать рассылку
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Send size={16} />
            Рассылки
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Mail size={16} />
            Шаблоны
          </TabsTrigger>
          <TabsTrigger value="automated" className="flex items-center gap-2">
            <Clock size={16} />
            Автоматические
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <CampaignsList campaignType="regular" />
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

export default EmailCampaignsPage;
