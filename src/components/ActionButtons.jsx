import React from 'react';
import { Download, Trash2, FileSpreadsheet } from 'lucide-react';

export default function ActionButtons({ 
  onExportCSV, 
  onExportExcel, 
  onClearAll, 
  hasData 
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onExportCSV}
          disabled={!hasData}
          className={`
            flex items-center px-4 py-2 rounded-lg font-medium transition-all
            ${hasData
              ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </button>

        <button
          onClick={onExportExcel}
          disabled={!hasData}
          className={`
            flex items-center px-4 py-2 rounded-lg font-medium transition-all
            ${hasData
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Exportar Excel
        </button>

        <button
          onClick={onClearAll}
          disabled={!hasData}
          className={`
            flex items-center px-4 py-2 rounded-lg font-medium transition-all
            ${hasData
              ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpiar Todo
        </button>
      </div>
    </div>
  );
}
