import React from 'react';

interface CustomerFormProps {
  onFocus: (inputName: string) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onFocus }) => {
  const formFields = [
    { name: 'name', label: 'Adı', },
    { name: 'idNumber', label: 'TC/Pasaport', },
    { name: 'district', label: 'İlçe/Semt', },
    { name: 'neighborhood', label: 'Mahalle', },
    { name: 'street', label: 'Cadde', },
    { name: 'avenue', label: 'Sokak', },
    { name: 'buildingNo', label: 'Bina No', },
    { name: 'apartmentNo', label: 'Daire No', },
    { name: 'region', label: 'Bölge', },
    { name: 'site', label: 'Site', },
    { name: 'block', label: 'Blok', },
    { name: 'apartmentName', label: 'Apt. Adı', },
    { name: 'description', label: 'Tarif', },
  ];

  return (
    <div className="space-y-4">
      {formFields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">{field.label}</label>
          {field.name === 'description' ? (
            <textarea
              className="bg-white border border-gray-200 rounded-md px-4 py-3 text-gray-800 resize-none h-32"
              onFocus={() => onFocus(field.name)}
            />
          ) : (
            <input
              type="text"
              className="bg-white border border-gray-200 rounded-md px-4 py-3 text-gray-800"
              onFocus={() => onFocus(field.name)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomerForm;
