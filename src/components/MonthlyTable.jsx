import React from 'react';
import { formatCurrency } from '../utils/resicoCalculator';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function MonthlyTable({ monthlyTotals, annualTotals }) {
  const [expandedMonths, setExpandedMonths] = React.useState(new Set());

  const toggleMonth = (monthKey) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey);
    } else {
      newExpanded.add(monthKey);
    }
    setExpandedMonths(newExpanded);
  };

  if (monthlyTotals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">
          No hay datos para mostrar. Sube tus facturas para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Mes</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Facturas</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Subtotal Emitidas</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">IVA Trasladado</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Ret. IVA</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Ret. ISR</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">IVA Acreditable</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Pago Mensual</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Saldo a Favor</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Total Recibido</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {monthlyTotals.map((month, index) => (
              <React.Fragment key={month.month}>
                <tr 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => toggleMonth(month.month)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      {expandedMonths.has(month.month) ? (
                        <ChevronUp className="w-4 h-4 mr-2 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 mr-2 text-gray-400" />
                      )}
                      {month.monthName} {month.year}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {month.emitidas.count} E
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-1">
                      {month.recibidas.count} R
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-900">
                    {formatCurrency(month.emitidas.subtotal)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-900">
                    {formatCurrency(month.emitidas.ivaTrasladado)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-red-600">
                    {formatCurrency(month.emitidas.retencionIVA)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-red-600">
                    {formatCurrency(month.emitidas.retencionISR)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-green-600">
                    {formatCurrency(month.recibidas.iva)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-indigo-600">
                    {formatCurrency(month.pagoMensual)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-blue-600">
                    {formatCurrency(month.saldoAFavor)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                    {formatCurrency(month.totalRecibido)}
                  </td>
                </tr>
                {expandedMonths.has(month.month) && (
                  <tr className="bg-gray-50">
                    <td colSpan="10" className="px-4 py-3">
                      <div className="text-xs text-gray-600 space-y-1">
                        <p><strong>Subtotal Recibidas:</strong> {formatCurrency(month.recibidas.subtotal)}</p>
                        <p><strong>IVA a Pagar:</strong> {formatCurrency(month.ivaAPagar)}</p>
                        <p className="text-gray-500 italic">
                          Cálculo: IVA Trasladado - IVA Acreditable - Retenciones IVA = IVA a Pagar
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr className="font-bold">
              <td className="px-4 py-4 text-sm text-gray-900">TOTALES ANUALES</td>
              <td className="px-4 py-4 text-center text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {annualTotals.totalEmitidas} E
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-1">
                  {annualTotals.totalRecibidas} R
                </span>
              </td>
              <td className="px-4 py-4 text-right text-sm text-gray-900">
                {formatCurrency(annualTotals.subtotalEmitidas)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-gray-900">
                {formatCurrency(annualTotals.ivaTrasladado)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-red-600">
                {formatCurrency(annualTotals.retencionesIVA)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-red-600">
                {formatCurrency(annualTotals.retencionesISR)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-green-600">
                {formatCurrency(annualTotals.ivaAcreditable)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-indigo-600">
                {formatCurrency(annualTotals.totalPagado)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-blue-600">
                {formatCurrency(annualTotals.saldoFinal)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-gray-900">
                {formatCurrency(annualTotals.totalRecibido)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div>
            <span className="font-semibold">E</span> = Emitidas (Ingresos) | 
            <span className="font-semibold ml-2">R</span> = Recibidas (Gastos)
          </div>
          <div className="text-right">
            <p className="text-gray-500">
              Tasas RESICO: IVA 16% | Ret. IVA 10.6667% | Ret. ISR 1.25%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
