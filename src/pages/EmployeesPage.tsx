
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import EmployeeSettings from "../components/Settings/EmployeeSettings";

const EmployeesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tab } = useParams();
  
  const currentTab = tab || 'list';

  useEffect(() => {
    document.title = "Сотрудники | ЛОГАЗ SV";
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Сотрудники</h1>
        <p className="text-muted-foreground mt-1">
          Управление сотрудниками и организационной структурой
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs 
            defaultValue={currentTab} 
            value={currentTab} 
            className="w-full"
            onValueChange={(value) => navigate(`/employees/${value}`)}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="list">Сотрудники</TabsTrigger>
              <TabsTrigger value="structure">Структура</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <EmployeeSettings currentSubtab="list" />
            </TabsContent>

            <TabsContent value="structure">
              <EmployeeSettings currentSubtab="structure" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeesPage;
