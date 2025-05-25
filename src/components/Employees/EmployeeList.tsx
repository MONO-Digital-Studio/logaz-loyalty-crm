
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { employeesData, departments, positions } from "./employeeData";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilters from "./EmployeeFilters";
import AddEmployeeDialog from "./AddEmployeeDialog";

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const filteredEmployees = employeesData.filter(
    (employee) =>
      (searchQuery === "" || 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filter === null || filter === "all" || employee.department === filter)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Сотрудники</CardTitle>
            <CardDescription>
              Управление данными о сотрудниках компании
            </CardDescription>
          </div>
          <AddEmployeeDialog departments={departments} positions={positions} />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <EmployeeFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filter={filter}
              setFilter={setFilter}
              departments={departments}
            />
            <EmployeeTable employees={filteredEmployees} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeList;
