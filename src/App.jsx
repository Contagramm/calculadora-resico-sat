import React, { useState, useEffect } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import FileUploader from './components/FileUploader';
import MonthlyTable from './components/MonthlyTable';
import InvoicesList from './components/InvoicesList';
import ActionButtons from './components/ActionButtons';
import { processFiles } from './utils/fileProcessor';
import { 
  groupInvoicesByMonth, 
  calculateMonthlyTotals, 
  calculateAnnualTotals 
} from './utils/resicoCalculator';
import { exportToCSV, exportToExcel } from './utils/exportUtils';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [annualTotals, setAnnualTotals] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Recalculate totals whenever invoices change
  useEffect(() => {
    if (invoices.length > 0) {
      const monthlyData = groupInvoicesByMonth(invoices);
      const totals = calculateMonthlyTotals(monthlyData);
      const annual = calculateAnnualTotals(totals);
      
      setMonthlyTotals(totals);
      setAnnualTotals(annual);
    } else {
      setMonthlyTotals([]);
      setAnnualTotals(null);
    }
  }, [invoices]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle file upload
  const handleFilesProcessed = async (files, type) => {
    setIsProcessing(true);
    
    try {
      const result = await processFiles(files, type);
      
      // Add type to each invoice
      const invoicesWithType = result.invoices.map(inv => ({
        ...inv,
        type
      }));
      
      setInvoices(prev => [...prev, ...invoicesWithType]);
      
      const successCount = invoicesWithType.filter(inv => !inv.error).length;
      const errorCount = invoicesWithType.filter(inv => inv.error).length;
      
      // Build notification message
      let message = '';
      if (result.stats.xml > 0 && result.stats.pdf > 0) {
        message = `${result.stats.xml} XML y ${result.stats.pdf} PDF procesados`;
      } else if (result.stats.xml > 0) {
        message = `${result.stats.xml} archivos XML procesados con precisión 100%`;
      } else if (result.stats.pdf > 0) {
        message = `${result.stats.pdf} archivos PDF procesados - Revisa los datos`;
      }
      
      // Add deduction info for expenses
      if (type === 'recibida' && result.stats.nonDeductible > 0) {
        message += ` | ⚠️ ${result.stats.nonDeductible} no deducibles detectados`;
      }
      
      if (errorCount > 0) {
        message += ` (${errorCount} con errores)`;
        showNotification(message, 'warning');
      } else {
        showNotification(message, type === 'recibida' && result.stats.nonDeductible > 0 ? 'warning' : 'success');
      }
    } catch (error) {
      console.error('Error processing files:', error);
      showNotification('Error al procesar los archivos', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Delete invoice
  const handleDeleteInvoice = (index) => {
    setInvoices(prev => prev.filter((_, i) => i !== index));
    showNotification('Factura eliminada', 'success');
  };

  // Clear all data
  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los datos?')) {
      setInvoices([]);
      showNotification('Todos los datos han sido eliminados', 'success');
    }
  };

  // Export handlers
  const handleExportCSV = () => {
    if (monthlyTotals.length > 0 && annualTotals) {
      exportToCSV(monthlyTotals, annualTotals);
      showNotification('CSV exportado correctamente', 'success');
    }
  };

  const handleExportExcel = () => {
    if (monthlyTotals.length > 0 && annualTotals) {
      exportToExcel(monthlyTotals, annualTotals, invoices);
      showNotification('Excel exportado correctamente', 'success');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-white mr-3" />
            <h1 className="text-4xl font-bold text-white">
              Calculadora RESICO
            </h1>
          </div>
          <p className="text-white text-lg opacity-90">
            Calcula automáticamente tus declaraciones mensuales al SAT
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`
              mb-6 p-4 rounded-lg shadow-lg flex items-center
              ${notification.type === 'success' ? 'bg-green-100 text-green-800' : ''}
              ${notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${notification.type === 'error' ? 'bg-red-100 text-red-800' : ''}
            `}
          >
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <p className="font-medium">{notification.message}</p>
          </div>
        )}

        {/* File Uploader */}
        <FileUploader 
          onFilesProcessed={handleFilesProcessed}
          isProcessing={isProcessing}
        />

        {/* Action Buttons */}
        <ActionButtons
          onExportCSV={handleExportCSV}
          onExportExcel={handleExportExcel}
          onClearAll={handleClearAll}
          hasData={invoices.length > 0}
        />

        {/* Monthly Table */}
        {monthlyTotals.length > 0 && annualTotals && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Resumen Mensual
            </h2>
            <MonthlyTable 
              monthlyTotals={monthlyTotals}
              annualTotals={annualTotals}
            />
          </div>
        )}

        {/* Invoices List */}
        {invoices.length > 0 && (
          <InvoicesList
            invoices={invoices}
            onDeleteInvoice={handleDeleteInvoice}
          />
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-white text-sm opacity-75">
          <p>
            💡 Esta calculadora utiliza las tasas RESICO vigentes: IVA 16%, Retención IVA 10.6667%, Retención ISR 1.25%
          </p>
          <p className="mt-2">
            Los cálculos son aproximados. Consulta con tu contador para la declaración oficial.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
