
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: EmployeeStatus;
  initials: string;
  hireDate?: Date;
  salary?: number;
  avatar?: string;
}

export type EmployeeStatus = "active" | "vacation" | "fired" | "onboarding";

export interface EmployeeFilters {
  searchQuery: string;
  departmentFilter: string | null;
  statusFilter: EmployeeStatus | null;
  positionFilter: string | null;
}

export interface CreateEmployeeData {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate?: Date;
  salary?: number;
}

export interface UpdateEmployeeData extends Partial<CreateEmployeeData> {
  id: string;
  status?: EmployeeStatus;
}

export interface EmployeeSearchOptions {
  searchFields: (keyof Employee)[];
  caseSensitive: boolean;
}

export interface EmployeeFilterOptions {
  departments: string[];
  positions: string[];
  statuses: EmployeeStatus[];
}
