import React from 'react';
import { X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  type: 'text' | 'number' | 'select' | 'text-with-button' | 'select-with-button' | 'text-with-buttons' | 'file-input';
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: Option[];
  buttonText?: string;
  readOnly?: boolean;
  hasCloseButton?: boolean;
  step?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  options,
  buttonText,
  readOnly,
  hasCloseButton,
  step
}) => {
  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <input 
            type="text" 
            name={name}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        );
      
      case 'number':
        return (
          <input 
            type="number" 
            name={name}
            step={step}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        );
      
      case 'select':
        return (
          <div className="relative">
            <select
              name={name}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full appearance-none"
              value={value}
              onChange={onChange}
            >
              {options?.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <span className="text-gray-500">▼</span>
            </div>
          </div>
        );
      
      case 'text-with-button':
        return (
          <div className="relative">
            <input 
              type="text" 
              name={name}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full pr-16"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                {buttonText}
              </button>
            </div>
          </div>
        );
      
      case 'select-with-button':
        return (
          <div className="relative">
            <select
              name={name}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full appearance-none pr-16"
              value={value}
              onChange={onChange}
            >
              {options?.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                {buttonText}
              </button>
            </div>
          </div>
        );
      
      case 'text-with-buttons':
        return (
          <div className="relative">
            <input 
              type="text" 
              name={name}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm w-full pr-16"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                {buttonText}
              </button>
              {hasCloseButton && (
                <button className="ml-1 text-gray-500 hover:text-gray-700">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        );
      
      case 'file-input':
        return (
          <div className="flex">
            <input 
              type="text" 
              name={name}
              className="border border-gray-300 rounded-l-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={value}
              onChange={onChange}
              readOnly
              placeholder={placeholder}
            />
            <button className="flex items-center justify-center bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-3 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-gray-600">...</span>
            </button>
            <button className="ml-1 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md px-3 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-gray-600">×</span>
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      {renderField()}
    </div>
  );
};
