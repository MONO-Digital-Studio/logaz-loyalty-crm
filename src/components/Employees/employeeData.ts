
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "active" | "vacation" | "fired" | "onboarding";
  initials: string;
}

export const employeesData: Employee[] = [
  {
    id: "1",
    name: "Иванов Иван Иванович",
    position: "Директор",
    department: "Руководство",
    email: "ivanov@logaz.ru",
    phone: "+7 (495) 123-45-67",
    status: "active",
    initials: "ИИ",
  },
  {
    id: "2",
    name: "Петрова Марина Сергеевна",
    position: "Менеджер по продажам",
    department: "Продажи",
    email: "petrova@logaz.ru",
    phone: "+7 (495) 234-56-78",
    status: "active",
    initials: "МП",
  },
  {
    id: "3",
    name: "Сидоров Алексей Петрович",
    position: "Бухгалтер",
    department: "Финансы",
    email: "sidorov@logaz.ru",
    phone: "+7 (495) 345-67-89",
    status: "vacation",
    initials: "АС",
  },
  {
    id: "4",
    name: "Кузнецова Ольга Владимировна",
    position: "HR-специалист",
    department: "Персонал",
    email: "kuznetsova@logaz.ru",
    phone: "+7 (495) 456-78-90",
    status: "active",
    initials: "ОК",
  },
  {
    id: "5",
    name: "Новиков Дмитрий Александрович",
    position: "Стажер",
    department: "ИТ",
    email: "novikov@logaz.ru",
    phone: "+7 (495) 567-89-01",
    status: "onboarding",
    initials: "ДН",
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
