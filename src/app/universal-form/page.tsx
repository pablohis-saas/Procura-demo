'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { insuranceFormats, defaultFormData, type UniversalFormData, type InsuranceFormat } from '../../data/mockUniversalForm';

export default function UniversalFormPage() {
  const [formData, setFormData] = useState<UniversalFormData>(defaultFormData);
  const [selectedFormat, setSelectedFormat] = useState<InsuranceFormat | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (section: keyof UniversalFormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (section: keyof UniversalFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value.split(',').map(item => item.trim())
      }
    }));
  };

  const isFieldRequired = (field: string) => {
    return selectedFormat?.requiredFields.includes(field) || false;
  };

  const renderFormField = (
    section: keyof UniversalFormData,
    field: string,
    label: string,
    type: string = 'text',
    isArray: boolean = false
  ) => {
    const value = formData[section][field];
    const required = isFieldRequired(field);

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {isArray ? (
          <input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : ''}
            onChange={(e) => handleArrayInputChange(section, field, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Separar valores con comas"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(section, field, type === 'number' ? Number(e.target.value) : e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required={required}
          />
        )}
      </div>
    );
  };

  const renderPreview = () => {
    if (!selectedFormat) return null;

    const previewStyles = {
      vertical: 'flex flex-col space-y-4',
      horizontal: 'grid grid-cols-2 gap-4',
      grid: 'grid grid-cols-3 gap-4'
    };

    return (
      <div 
        className="p-6 rounded-lg shadow-lg"
        style={{ borderColor: selectedFormat.color, borderWidth: '2px' }}
      >
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">{selectedFormat.logo}</span>
          <h2 className="text-xl font-bold" style={{ color: selectedFormat.color }}>
            {selectedFormat.name}
          </h2>
        </div>

        <div className={previewStyles[selectedFormat.layout]}>
          {Object.entries(formData).map(([section, data]) => (
            <div key={section} className="space-y-2">
              <h3 className="font-semibold capitalize">{section}</h3>
              {Object.entries(data).map(([field, value]) => (
                <div key={field} className="text-sm">
                  <span className="font-medium capitalize">{field}: </span>
                  <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Regresar al Dashboard
        </Link>
        <h1 className="text-3xl font-bold">Formulario Universal Inteligente</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario Universal */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Formulario Universal</h2>
          
          <form className="space-y-6">
            {/* Información del Paciente */}
            <div>
              <h3 className="text-lg font-medium mb-4">Información del Paciente</h3>
              {renderFormField('patientInfo', 'name', 'Nombre Completo')}
              {renderFormField('patientInfo', 'age', 'Edad', 'number')}
              {renderFormField('patientInfo', 'gender', 'Género')}
              {renderFormField('patientInfo', 'insuranceNumber', 'Número de Seguro')}
              {renderFormField('patientInfo', 'policyNumber', 'Número de Póliza')}
            </div>

            {/* Diagnóstico */}
            <div>
              <h3 className="text-lg font-medium mb-4">Diagnóstico</h3>
              {renderFormField('diagnosis', 'mainDiagnosis', 'Diagnóstico Principal')}
              {renderFormField('diagnosis', 'secondaryDiagnosis', 'Diagnósticos Secundarios', 'text', true)}
              {renderFormField('diagnosis', 'symptoms', 'Síntomas', 'text', true)}
              {renderFormField('diagnosis', 'observations', 'Observaciones')}
            </div>

            {/* Tratamiento */}
            <div>
              <h3 className="text-lg font-medium mb-4">Tratamiento</h3>
              {renderFormField('treatment', 'prescribedMedication', 'Medicamentos Prescritos', 'text', true)}
              {renderFormField('treatment', 'procedures', 'Procedimientos', 'text', true)}
              {renderFormField('treatment', 'followUpDate', 'Fecha de Seguimiento', 'date')}
              {renderFormField('treatment', 'recommendations', 'Recomendaciones')}
            </div>

            {/* Costos */}
            <div>
              <h3 className="text-lg font-medium mb-4">Costos</h3>
              {renderFormField('costs', 'consultation', 'Consulta', 'number')}
              {renderFormField('costs', 'medications', 'Medicamentos', 'number')}
              {renderFormField('costs', 'procedures', 'Procedimientos', 'number')}
              {renderFormField('costs', 'total', 'Total', 'number')}
            </div>
          </form>
        </div>

        {/* Formatos de Aseguradora */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Formatos de Aseguradora</h2>
            <div className="space-y-4">
              {insuranceFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => {
                    setSelectedFormat(format);
                    setPreviewMode(true);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                  style={{ borderColor: format.color }}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{format.logo}</span>
                    <span className="font-medium">{format.name}</span>
                  </div>
                  <DocumentDuplicateIcon className="h-5 w-5" style={{ color: format.color }} />
                </button>
              ))}
            </div>
          </div>

          {/* Vista Previa */}
          {previewMode && selectedFormat && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Vista Previa</h2>
              {renderPreview()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 