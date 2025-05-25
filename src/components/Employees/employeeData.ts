
import { Employee, EmployeeStatus } from "@/types/employees";

export const employeesData: Employee[] = [
  {
    id: "1",
    name: "Иванов Иван Иванович",
    position: "Директор",
    department: "Руководство",
    email: "ivanov@logaz.ru",
    phone: "+7 (495) 123-45-67",
    status: "active" as EmployeeStatus,
    initials: "ИИ",
    hireDate: new Date("2020-01-15"),
    salary: 250000,
  },
  {
    id: "2",
    name: "Петрова Марина Сергеевна",
    position: "Менеджер по продажам",
    department: "Продажи",
    email: "petrova@logaz.ru",
    phone: "+7 (495) 234-56-78",
    status: "active" as EmployeeStatus,
    initials: "МП",
    hireDate: new Date("2021-03-10"),
    salary: 80000,
  },
  {
    id: "3",
    name: "Сидоров Алексей Петрович",
    position: "Бухгалтер",
    department: "Финансы",
    email: "sidorov@logaz.ru",
    phone: "+7 (495) 345-67-89",
    status: "vacation" as EmployeeStatus,
    initials: "АС",
    hireDate: new Date("2019-07-22"),
    salary: 65000,
  },
  {
    id: "4",
    name: "Кузнецова Ольга Владимировна",
    position: "HR-специалист",
    department: "Персонал",
    email: "kuznetsova@logaz.ru",
    phone: "+7 (495) 456-78-90",
    status: "active" as EmployeeStatus,
    initials: "ОК",
    hireDate: new Date("2022-01-12"),
    salary: 70000,
  },
  {
    id: "5",
    name: "Новиков Дмитрий Александрович",
    position: "Стажер",
    department: "ИТ",
    email: "novikov@logaz.ru",
    phone: "+7 (495) 567-89-01",
    status: "onboarding" as EmployeeStatus,
    initials: "ДН",
    hireDate: new Date("2024-11-01"),
    salary: 45000,
  },
];

export const departments = [
  "Руководство",
  "Продажи",
  "Маркетинг",
  "Финансы",
  "Персонал",
  "ИТ",
  "Логистика",
  "Производство",
];

export const positions = [
  "Директор",
  "Заместитель директора",
  "Менеджер",
  "Менеджер по продажам",
  "Бухгалтер",
  "HR-специалист",
  "Разработчик",
  "Стажер",
];

export const statusLabels: Record<EmployeeStatus, string> = {
  active: "Активный",
  vacation: "В отпуске",
  onboarding: "Адаптация",
  fired: "Уволен"
};
