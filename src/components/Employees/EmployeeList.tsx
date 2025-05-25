
import React, { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { employeesData, departments, positions } from "./employeeData";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilters from "./EmployeeFilters";
import AddEmployeeDialog from "./AddEmployeeDialog";
import { useTableState } from "@/hooks/useTableState";
import { useDebounced } from "@/hooks/useDebounced";
import { useMemo } from "react";

const EmployeeList = memo(() => {
  const [tableState, tableActions] = useTableState({
    pageSize: 10,
    filters: { department: null }
  });

  const debouncedSearch = useDebounced(tableState.search, 300);

  const filteredEmployees = useMemo(() => {
    let filtered = employeesData;

    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(searchLower) ||
        employee.position.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower)
      );
    }

    // Department filter
    if (tableState.filters.department && tableState.filters.department !== "all") {
      filtered = filtered.filter(employee => 
        employee.department === tableState.filters.department
      );
    }

    return filtered;
  }, [debouncedSearch, tableState.filters.department]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (tableState.page - 1) * tableState.pageSize;
    return filteredEmployees.slice(startIndex, startIndex + tableState.pageSize);
  }, [filteredEmployees, tableState.page, tableState.pageSize]);

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
              searchQuery={tableState.search}
              setSearchQuery={tableActions.updateSearch}
              filter={tableState.filters.department}
              setFilter={(value) => tableActions.updateFilter('department', value)}
              departments={departments}
            />
            <EmployeeTable 
              employees={paginatedEmployees}
              totalItems={filteredEmployees.length}
              currentPage={tableState.page}
              pageSize={tableState.pageSize}
              onPageChange={tableActions.updatePage}
              onPageSizeChange={tableActions.updatePageSize}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

EmployeeList.displayName = 'EmployeeList';

export default EmployeeList;
