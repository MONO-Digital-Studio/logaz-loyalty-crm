
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: string;
}

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Работает";
      case "vacation": return "В отпуске";
      case "fired": return "Уволен";
      case "onboarding": return "Стажировка";
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "vacation": return "bg-blue-100 text-blue-800";
      case "fired": return "bg-red-100 text-red-800";
      case "onboarding": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Сотрудник</TableHead>
          <TableHead>Должность</TableHead>
          <TableHead>Отдел</TableHead>
          <TableHead>Контакты</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <span>{employee.name}</span>
              </div>
            </TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="text-sm">{employee.email}</div>
                <div className="text-sm text-muted-foreground">{employee.phone}</div>
              </div>
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(employee.status)}`}
              >
                {getStatusText(employee.status)}
              </span>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                Изменить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
