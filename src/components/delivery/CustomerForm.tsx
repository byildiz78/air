import React from 'react';

interface CustomerFormProps {
  onFocus: (inputName: string) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onFocus }) => {
  const formFields = [
    { name: 'name', label: 'ADI', },
    { name: 'idNumber', label: 'TC/PASAPORT', },
    { name: 'district', label: 'İLÇE/SEMT', },
    { name: 'neighborhood', label: 'MAHALLE', },
    { name: 'street', label: 'CADDE', },
    { name: 'avenue', label: 'SOKAK', },
    { name: 'buildingNo', label: 'BİNA NO', },
    { name: 'apartmentNo', label: 'DAİRE NO', },
    { name: 'region', label: 'BÖLGE', },
    { name: 'site', label: 'SİTE', },
    { name: 'block', label: 'BLOK', },
    { name: 'apartmentName', label: 'APT. ADI', },
    { name: 'description', label: 'TARİF', },
  ];

  return (
    <div className="space-y-4">
      {formFields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">{field.label}</label>
          {field.name === 'description' ? (
            <textarea
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white resize-none h-32"
              onFocus={() => onFocus(field.name)}
            />
          ) : (
            <input
              type="text"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              onFocus={() => onFocus(field.name)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomerForm;
