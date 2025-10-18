import React, { useState } from 'react';
import { FileText, Trash2, AlertCircle, FileCode, Shield } from 'lucide-react';
import { formatCurrency } from '../utils/resicoCalculator';
import { getDeductionBadge } from '../utils/deductionValidator';

export default function InvoicesList({ invoices, onDeleteInvoice }) {
  const [filter, setFilter] = useState('all');

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'all') return true;
    return inv.type === filter;
  });

  const sortedInvoices = [...filteredInvoices].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Facturas Procesadas ({invoices.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('emitida')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === 'emitida'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Emitidas
          </button>
          <button
            onClick={() => setFilter('recibida')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === 'recibida'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Recibidas
          </button>
        </div>
      </div>

      {sortedInvoices.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No hay facturas para mostrar
        </p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sortedInvoices.map((invoice, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                invoice.error
                  ? 'border-red-200 bg-red-50'
                  : invoice.type === 'emitida'
                  ? 'border-green-200 bg-green-50'
                  : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-center flex-1 min-w-0">
                {invoice.error ? (
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                ) : invoice.format === 'XML' ? (
                  <FileCode className={`w-5 h-5 mr-3 flex-shrink-0 ${
                    invoice.type === 'emitida' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                ) : (
                  <FileText className={`w-5 h-5 mr-3 flex-shrink-0 ${
                    invoice.type === 'emitida' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {invoice.fileName}
                    </p>
                    {invoice.format === 'XML' && invoice.certified && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Certificado SAT
                      </span>
                    )}
                    {invoice.format === 'PDF' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Validar
                      </span>
                    )}
                    {invoice.deductionValidation && (() => {
                      const badge = getDeductionBadge(invoice.deductionValidation);
                      return badge ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badge.color}`}>
                          {badge.text}
                        </span>
                      ) : null;
                    })()}
                  </div>
                  {invoice.deductionValidation && invoice.deductionValidation.reason && (
                    <div className="mt-1">
                      <span className="text-xs text-gray-600 italic">
                        {invoice.deductionValidation.reason}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-1 flex-wrap">
                    <span className="text-xs text-gray-600">
                      {new Date(invoice.date).toLocaleDateString('es-MX')}
                    </span>
                    {!invoice.error && (
                      <>
                        <span className="text-xs text-gray-600">
                          Subtotal: {formatCurrency(invoice.subtotal)}
                        </span>
                        <span className="text-xs text-gray-600">
                          Total: {formatCurrency(invoice.total)}
                        </span>
                        {invoice.uuid && (
                          <span className="text-xs text-gray-500">
                            UUID: {invoice.uuid.substring(0, 8)}...
                          </span>
                        )}
                      </>
                    )}
                    {invoice.error && (
                      <span className="text-xs text-red-600">
                        Error: {invoice.error}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDeleteInvoice(index)}
                className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                title="Eliminar factura"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
