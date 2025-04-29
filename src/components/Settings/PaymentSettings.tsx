
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const PaymentSettings = () => {
  const [formData, setFormData] = useState({
    defaultCurrency: "RUB",
    vatNumber: "7701234567",
    paymentMethod: "bank_transfer",
    cardNumber: "•••• •••• •••• 4242",
    expiryDate: "12/25",
    invoicePrefix: "INV-",
  });

  const [options, setOptions] = useState({
    autoGenerateInvoices: true,
    sendPaymentReminders: true,
    storePaymentDetails: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionToggle = (option: string, checked: boolean) => {
    setOptions((prev) => ({
      ...prev,
      [option]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Платежные настройки сохранены");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Платежные настройки</CardTitle>
          <CardDescription>
            Управляйте платежными методами и настройками выставления счетов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="defaultCurrency">Валюта по умолчанию</Label>
                <Select
                  value={formData.defaultCurrency}
                  onValueChange={(value) => handleSelectChange("defaultCurrency", value)}
                >
                  <SelectTrigger id="defaultCurrency">
                    <SelectValue placeholder="Выберите валюту" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RUB">Российский рубль (₽)</SelectItem>
                    <SelectItem value="USD">Доллар США ($)</SelectItem>
                    <SelectItem value="EUR">Евро (€)</SelectItem>
                    <SelectItem value="CNY">Китайский юань (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vatNumber">ИНН компании</Label>
                <Input
                  id="vatNumber"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-3">Способ оплаты по умолчанию</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="paymentMethod">Метод оплаты</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Выберите метод оплаты" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Банковский перевод</SelectItem>
                      <SelectItem value="card">Банковская карта</SelectItem>
                      <SelectItem value="cash">Наличные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.paymentMethod === "card" && (
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                )}
              </div>
              {formData.paymentMethod === "card" && (
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="mt-2">
                    Обновить платежные данные
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-3">Настройки счетов</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="invoicePrefix">Префикс счетов</Label>
                  <Input
                    id="invoicePrefix"
                    name="invoicePrefix"
                    value={formData.invoicePrefix}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoGenerateInvoices">Автоматически создавать счета</Label>
                  <p className="text-sm text-muted-foreground">
                    Создавать счета автоматически при завершении заказа
                  </p>
                </div>
                <Switch
                  id="autoGenerateInvoices"
                  checked={options.autoGenerateInvoices}
                  onCheckedChange={(checked) => handleOptionToggle("autoGenerateInvoices", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sendPaymentReminders">Отправлять напоминания</Label>
                  <p className="text-sm text-muted-foreground">
                    Отправлять напоминания о предстоящих и просроченных платежах
                  </p>
                </div>
                <Switch
                  id="sendPaymentReminders"
                  checked={options.sendPaymentReminders}
                  onCheckedChange={(checked) => handleOptionToggle("sendPaymentReminders", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="storePaymentDetails">Хранить платежные данные</Label>
                  <p className="text-sm text-muted-foreground">
                    Безопасно хранить информацию о платежных картах для повторных платежей
                  </p>
                </div>
                <Switch
                  id="storePaymentDetails"
                  checked={options.storePaymentDetails}
                  onCheckedChange={(checked) => handleOptionToggle("storePaymentDetails", checked)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-logaz-blue">
                Сохранить настройки
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSettings;
