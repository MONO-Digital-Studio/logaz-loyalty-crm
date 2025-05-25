
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, Send, Mail, Clock, Smartphone, MessageCircle, Phone } from "lucide-react";
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
            Создание и управление рассылками по всем каналам коммуникации
          </p>
        </div>
        <Button 
          className="bg-logaz-blue"
          onClick={() => navigate("/contact-center/campaigns/editor")}
        >
          <PlusIcon className="mr-2" size={18} />
          Создать рассылку
        </Button>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            Email
          </TabsTrigger>
          <TabsTrigger value="push" className="flex items-center gap-2">
            <Smartphone size={16} />
            PUSH
          </TabsTrigger>
          <TabsTrigger value="telegram" className="flex items-center gap-2">
            <MessageCircle size={16} />
            Telegram
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <Phone size={16} />
            SMS
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Send size={16} />
            Шаблоны
          </TabsTrigger>
          <TabsTrigger value="automated" className="flex items-center gap-2">
            <Clock size={16} />
            Автоматические
          </TabsTrigger>
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

export default EmailCampaignsPage;
