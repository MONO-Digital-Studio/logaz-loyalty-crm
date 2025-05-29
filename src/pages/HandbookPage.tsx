
import React, { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import HandbookViewer from '@/components/Handbook/HandbookViewer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const HandbookPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    // Здесь можно открыть модальное окно редактирования или перейти к редактору
    console.log('Открыть редактор справочника');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Справочник</h1>
            <p className="text-gray-600 mt-1">
              Определения терминов и понятий системы
            </p>
          </div>
          
          <Button 
            onClick={() => console.log('Добавить новый термин')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Добавить термин
          </Button>
        </div>

        <HandbookViewer 
          editable={true}
          onEdit={handleEdit}
        />
      </div>
    </Layout>
  );
};

export default HandbookPage;
