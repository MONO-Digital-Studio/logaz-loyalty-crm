
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { productCategories } from "../data/mockData";
import { Search } from "lucide-react";

const mockProducts = [
  { id: 1, name: "Дизельное топливо", category: "Топливо", price: 58.50, inStock: true },
  { id: 2, name: "Бензин АИ-92", category: "Топливо", price: 47.80, inStock: true },
  { id: 3, name: "Бензин АИ-95", category: "Топливо", price: 52.20, inStock: true },
  { id: 4, name: "Пропан", category: "Топливо", price: 29.30, inStock: true },
  { id: 5, name: "Метан", category: "Топливо", price: 22.40, inStock: true },
  { id: 6, name: "Масло моторное ЛОГАЗ 5W-40", category: "Автомобильные масла", price: 2580, inStock: true },
  { id: 7, name: "Масло моторное ЛОГАЗ 10W-40", category: "Автомобильные масла", price: 2380, inStock: false },
  { id: 8, name: "Масло трансмиссионное ЛОГАЗ 80W-90", category: "Автомобильные масла", price: 1950, inStock: true },
  { id: 9, name: "Жидкость омывателя зимняя", category: "Автохимия", price: 420, inStock: true },
  { id: 10, name: "Жидкость омывателя летняя", category: "Автохимия", price: 320, inStock: true },
];

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    document.title = "Товары и категории | ЛОГАЗ SV";
    setFilteredProducts(
      mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Товары и категории</h1>
        <div className="flex space-x-2">
          <Button variant="default" className="bg-logaz-blue">Добавить товар</Button>
          <Button variant="outline">Экспорт</Button>
        </div>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="products">Товары</TabsTrigger>
          <TabsTrigger value="categories">Категории</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Каталог товаров</CardTitle>
              <CardDescription>Управление товарами и услугами</CardDescription>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="bg-logaz-blue">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Наименование</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Наличие</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price.toFixed(2)} ₽</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {product.inStock ? "В наличии" : "Нет в наличии"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Редактировать</Button>
                          <Button variant="destructive" size="sm">Удалить</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Категории товаров</CardTitle>
              <CardDescription>Управление категориями товаров</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название категории</TableHead>
                    <TableHead>Кол-во товаров</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.productCount}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Редактировать</Button>
                          <Button variant="destructive" size="sm">Удалить</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" className="mt-4">Добавить категорию</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsPage;
