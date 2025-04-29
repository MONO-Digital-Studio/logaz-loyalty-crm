
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Send } from "lucide-react";

const CampaignEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    document.title = id ? "Редактирование рассылки | ЛОГАЗ SV" : "Новая рассылка | ЛОГАЗ SV";
    
    // Если есть id, загружаем данные кампании (в реальном приложении это был бы API запрос)
    if (id) {
      // Демо данные для примера
      setTitle("Новые функции платформы");
      setSubject("Представляем новые функции ЛОГАЗ SV");
      setContent("Уважаемые пользователи,\n\nМы рады представить вам новые функции нашей платформы...");
    }
  }, [id]);

  const handleSave = () => {
    // В реальном приложении здесь был бы API запрос для сохранения
    console.log("Saving campaign:", { title, subject, content });
    navigate("/campaigns");
  };

  const handleSendNow = () => {
    // В реальном приложении здесь был бы API запрос для отправки
    console.log("Sending campaign:", { title, subject, content });
    navigate("/campaigns");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/campaigns")}>
            <ArrowLeft size={16} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold">
            {id ? "Редактирование рассылки" : "Новая рассылка"}
          </h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Сохранить
          </Button>
          <Button className="bg-logaz-blue" onClick={handleSendNow}>
            <Send size={16} className="mr-2" />
            Отправить
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название рассылки</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Введите название рассылки"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Тема письма</Label>
                <Input 
                  id="subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  placeholder="Введите тему письма"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Содержание</Label>
                <Textarea 
                  id="content" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="Введите текст рассылки"
                  className="min-h-[300px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Параметры отправки</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Здесь будут настройки получателей, времени отправки и других параметров рассылки.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                Функциональность в разработке
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignEditorPage;
