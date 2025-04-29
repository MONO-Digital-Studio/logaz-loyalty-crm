
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { PlusCircle, UserCircle } from "lucide-react";
import { employeesData, departments } from "./employeeData";

const EmployeeStructure = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Организационная структура</CardTitle>
          <CardDescription>
            Управление структурой организации и отделами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex justify-center pb-4">
              <div className="border rounded-md p-4 text-center w-48">
                <div className="flex justify-center mb-2">
                  <Avatar className="h-12 w-12">
                    <div className="bg-logaz-blue text-white flex items-center justify-center h-full">
                      ИИ
                    </div>
                  </Avatar>
                </div>
                <div className="font-medium">Иванов И.И.</div>
                <div className="text-sm text-muted-foreground">Директор</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {departments.slice(1, 7).map((dept, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{dept}</h3>
                    <Button variant="ghost" size="sm">
                      Редактировать
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {employeesData
                      .filter(e => e.department === dept)
                      .slice(0, 1)
                      .map(employee => (
                        <div key={employee.id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <div className="bg-logaz-blue text-white text-xs flex items-center justify-center h-full">
                              {employee.initials}
                            </div>
                          </Avatar>
                          <span className="text-sm">{employee.name}</span>
                        </div>
                      ))}
                    <Button variant="ghost" size="sm" className="w-full">
                      <UserCircle className="h-4 w-4 mr-1" />
                      {employeesData.filter(e => e.department === dept).length > 0 ? 
                        `Показать всех (${employeesData.filter(e => e.department === dept).length})` : 
                        "Добавить сотрудника"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Добавить отдел
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeStructure;
