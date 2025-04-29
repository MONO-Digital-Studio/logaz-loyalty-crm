
import React from 'react';

const RfmAnalysis: React.FC = () => {
  return (
    <div className="stats-card p-6">
      <h3 className="text-lg font-semibold mb-4">RFM-анализ клиентов</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-logaz-blue/10 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Recency</h4>
          <div className="text-xl font-bold">7.8</div>
          <div className="text-sm text-gray-500 mt-1">дней</div>
        </div>
        <div className="bg-logaz-orange/10 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Frequency</h4>
          <div className="text-xl font-bold">3.2</div>
          <div className="text-sm text-gray-500 mt-1">покупки в месяц</div>
        </div>
        <div className="bg-logaz-green/10 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Monetary</h4>
          <div className="text-xl font-bold">6 420 ₽</div>
          <div className="text-sm text-gray-500 mt-1">средняя сумма</div>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-3">Сегменты клиентов</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-32">VIP клиенты</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-logaz-blue h-4 rounded-full" style={{ width: '15%' }}></div>
            </div>
            <div className="w-10 text-right">15%</div>
          </div>
          <div className="flex items-center">
            <div className="w-32">Активные</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-logaz-orange h-4 rounded-full" style={{ width: '42%' }}></div>
            </div>
            <div className="w-10 text-right">42%</div>
          </div>
          <div className="flex items-center">
            <div className="w-32">Случайные</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-logaz-green h-4 rounded-full" style={{ width: '28%' }}></div>
            </div>
            <div className="w-10 text-right">28%</div>
          </div>
          <div className="flex items-center">
            <div className="w-32">Спящие</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-logaz-gray h-4 rounded-full" style={{ width: '15%' }}></div>
            </div>
            <div className="w-10 text-right">15%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RfmAnalysis;
