import React, { useState } from 'react';
import { Upload, FileText, Loader2, FileCode } from 'lucide-react';

export default function FileUploader({ onFilesProcessed, isProcessing }) {
  const [isDragging, setIsDragging] = useState(false);
  const [invoiceType, setInvoiceType] = useState('emitida');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf' || 
              file.type === 'text/xml' || 
              file.type === 'application/xml' ||
              file.name.toLowerCase().endsWith('.xml') ||
              file.name.toLowerCase().endsWith('.pdf')
    );
    
    if (files.length > 0) {
      onFilesProcessed(files, invoiceType);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(
      file => file.type === 'application/pdf' || 
              file.type === 'text/xml' || 
              file.type === 'application/xml' ||
              file.name.toLowerCase().endsWith('.xml') ||
              file.name.toLowerCase().endsWith('.pdf')
    );
    
    if (files.length > 0) {
      onFilesProcessed(files, invoiceType);
    }
    
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Factura
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="emitida"
              checked={invoiceType === 'emitida'}
              onChange={(e) => setInvoiceType(e.target.value)}
              className="mr-2"
              disabled={isProcessing}
            />
            <span className="text-sm font-medium text-gray-700">
              Facturas Emitidas (Ingresos)
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="recibida"
              checked={invoiceType === 'recibida'}
              onChange={(e) => setInvoiceType(e.target.value)}
              className="mr-2"
              disabled={isProcessing}
            />
            <span className="text-sm font-medium text-gray-700">
              Facturas Recibidas (Gastos)
            </span>
          </label>
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Procesando archivos...</p>
            <p className="text-sm text-gray-500 mt-2">
              Extrayendo datos de las facturas
            </p>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Arrastra tus archivos XML o PDF aquí
            </p>
            <p className="text-sm text-gray-500 mb-4">
              o haz clic para seleccionar archivos
            </p>
            <div className="flex gap-3 justify-center">
              <label className="inline-block">
                <input
                  type="file"
                  multiple
                  accept=".xml,text/xml,application/xml,.pdf,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isProcessing}
                />
                <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                  <FileCode className="w-4 h-4 mr-2" />
                  XML (Recomendado)
                </span>
              </label>
              <label className="inline-block">
                <input
                  type="file"
                  multiple
                  accept=".pdf,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isProcessing}
                />
                <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" />
                  PDF (Alternativo)
                </span>
              </label>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <span className="font-semibold text-green-600">📋 XML (CFDI):</span>
          <div>
            <p className="font-medium">100% preciso - Datos certificados por el SAT</p>
            <ul className="list-disc list-inside mt-1 ml-2 text-gray-500">
              <li>Extracción exacta de todos los campos</li>
              <li>Incluye UUID, RFC, y timbrado fiscal</li>
              <li>Soporta CFDI 3.3 y 4.0</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <span className="font-semibold text-blue-600">📄 PDF:</span>
          <div>
            <p className="font-medium">~80% preciso - Requiere validación manual</p>
            <ul className="list-disc list-inside mt-1 ml-2 text-gray-500">
              <li>Extracción aproximada de campos</li>
              <li>Solo funciona con PDFs con texto</li>
              <li>Revisa los datos extraídos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
