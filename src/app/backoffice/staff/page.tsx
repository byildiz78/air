'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, User, Calendar, Save, X, Shield, FileText, Briefcase } from 'lucide-react';
import { Staff, ROLES, SECURITY_LEVELS, PROGRAMMING_LANGUAGES } from '@/types/staff';
import { JobTitle, initialJobTitles } from '@/types/jobTitle';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Tabs } from '@/components/ui/Tabs';
import { nanoid } from 'nanoid';

// Örnek veri
const initialStaff: Staff[] = [
  {
    id: '1',
    firstName: 'Robotpos',
    lastName: 'Admin',
    role: 'MUDUR',
    securityLevel: '10',
    programmingLanguage: 'TR',
    authorizationCode: '1234',
    mifareCode: '',
    proximityCode: '',
    isDeliveryPerson: false,
    hideFromStaffList: false,
    identityNumber: '',
    areaCodeAndPhone: '',
    address: '',
    gender: 'Erkek',
    startDate: '2020-12-29',
    birthDate: '',
    fatherName: '',
    disabilityDegree: '',
    nationality: '',
    terminationDate: null,
    terminationPay: null,
    terminationReason: null,
    integrations: []
  }
];

const tabs = [
  { id: 'active', title: 'Aktif Personel' },
  { id: 'terminated', title: 'İşten Çıkanlar' },
  { id: 'jobTitles', title: 'Görev Tanımları' }
];

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [jobTitles, setJobTitles] = useState<JobTitle[]>(initialJobTitles);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>();
  const [editMode, setEditMode] = useState<'new' | 'edit'>('new');
  const [editingJobTitle, setEditingJobTitle] = useState<string | null>(null);
  const [newJobTitle, setNewJobTitle] = useState('');

  const handleNewStaff = () => {
    setSelectedStaff(undefined);
    setEditMode('new');
    setShowModal(true);
  };

  const handleEditStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setEditMode('edit');
    setShowModal(true);
  };

  const handleDeleteStaff = (staffId: string) => {
    if (confirm('Bu personeli silmek istediğinize emin misiniz?')) {
      setStaff(staff.filter(s => s.id !== staffId));
    }
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const staffMember: Staff = {
      id: selectedStaff?.id || nanoid(),
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      role: formData.get('role') as string,
      securityLevel: formData.get('securityLevel') as string,
      programmingLanguage: formData.get('programmingLanguage') as string,
      authorizationCode: formData.get('authorizationCode') as string,
      mifareCode: formData.get('mifareCode') as string,
      proximityCode: formData.get('proximityCode') as string,
      isDeliveryPerson: formData.get('isDeliveryPerson') === 'on',
      hideFromStaffList: formData.get('hideFromStaffList') === 'on',
      identityNumber: formData.get('identityNumber') as string,
      areaCodeAndPhone: formData.get('areaCodeAndPhone') as string,
      address: formData.get('address') as string,
      gender: formData.get('gender') as 'Erkek' | 'Kadın',
      startDate: formData.get('startDate') as string,
      birthDate: formData.get('birthDate') as string,
      fatherName: formData.get('fatherName') as string,
      disabilityDegree: formData.get('disabilityDegree') as string,
      nationality: formData.get('nationality') as string,
      terminationDate: formData.get('terminationDate') as string || null,
      terminationPay: formData.get('terminationPay') ? parseFloat(formData.get('terminationPay') as string) : null,
      terminationReason: formData.get('terminationReason') as string || null,
      integrations: []
    };

    if (editMode === 'edit') {
      setStaff(staff.map(s => s.id === staffMember.id ? staffMember : s));
    } else {
      setStaff([...staff, staffMember]);
    }

    setShowModal(false);
  };

  const handleAddJobTitle = () => {
    if (newJobTitle.trim()) {
      setJobTitles([
        ...jobTitles,
        { 
          id: nanoid(), 
          title: newJobTitle.trim(),
          securityLevel: 1
        }
      ]);
      setNewJobTitle('');
    }
  };

  const handleUpdateJobTitle = (id: string, updates: Partial<JobTitle>) => {
    setJobTitles(jobTitles.map(jt => 
      jt.id === id ? { ...jt, ...updates } : jt
    ));
    setEditingJobTitle(null);
  };

  const handleDeleteJobTitle = (id: string) => {
    if (confirm('Bu görev tanımını silmek istediğinize emin misiniz?')) {
      setJobTitles(jobTitles.filter(jt => jt.id !== id));
    }
  };

  const columns: Column<Staff>[] = [
    {
      header: 'Adı',
      accessor: 'firstName',
      sortable: true
    },
    {
      header: 'Soyadı',
      accessor: 'lastName',
      sortable: true
    },
    {
      header: 'Görevi',
      accessor: (staff: Staff) => ROLES.find(r => r.id === staff.role)?.name || staff.role,
      sortable: true
    },
    {
      header: 'Güvenlik Seviyesi',
      accessor: (staff: Staff) => SECURITY_LEVELS.find(s => s.id === staff.securityLevel)?.name || staff.securityLevel,
      sortable: true
    },
    {
      header: 'İşe Giriş',
      accessor: 'startDate',
      sortable: true
    },
    {
      header: 'İşlemler',
      accessor: (staffMember: Staff) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditStaff(staffMember);
            }}
            className="text-blue-500 hover:text-blue-600 transition-colors"
            title="Düzenle"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteStaff(staffMember.id);
            }}
            className="text-red-500 hover:text-red-600 transition-colors"
            title="Sil"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  const jobTitleColumns: Column<JobTitle>[] = [
    {
      header: 'Görev Başlığı',
      accessor: (jobTitle: JobTitle) => {
        if (editingJobTitle === jobTitle.id) {
          return (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                className="flex-1 h-8 rounded bg-white border border-blue-300 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                defaultValue={jobTitle.title}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.currentTarget.value.trim();
                    if (value) {
                      handleUpdateJobTitle(jobTitle.id, { title: value });
                    }
                  } else if (e.key === 'Escape') {
                    setEditingJobTitle(null);
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value.trim();
                  if (value) {
                    handleUpdateJobTitle(jobTitle.id, { title: value });
                  }
                }}
                autoFocus
              />
            </div>
          );
        }
        return jobTitle.title;
      },
      sortable: true
    },
    {
      header: 'Yetki Seviyesi',
      accessor: (jobTitle: JobTitle) => {
        if (editingJobTitle === jobTitle.id) {
          return (
            <div onClick={(e) => e.stopPropagation()}>
              <select
                className="w-24 h-8 rounded bg-white border border-blue-300 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                value={jobTitle.securityLevel}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    handleUpdateJobTitle(jobTitle.id, { securityLevel: value });
                  }
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-sm font-medium">
              Seviye {jobTitle.securityLevel}
            </span>
          </div>
        );
      },
      sortable: true
    },
    {
      header: 'İşlemler',
      accessor: (jobTitle: JobTitle) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {editingJobTitle === jobTitle.id ? (
            <>
              <button
                onClick={() => setEditingJobTitle(null)}
                className="text-gray-500 hover:text-gray-600 transition-colors"
                title="İptal"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditingJobTitle(jobTitle.id)}
                className="text-blue-500 hover:text-blue-600 transition-colors"
                title="Düzenle"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteJobTitle(jobTitle.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Sil"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Personel Ayarları</h1>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            {activeTab === 'active' ? 'Aktif personel listesi' : 
             activeTab === 'terminated' ? 'İşten çıkan personel listesi' :
             'Görev tanımları listesi'}
          </div>
          {activeTab === 'active' && (
            <button
              onClick={handleNewStaff}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Yeni Personel
            </button>
          )}
          {activeTab === 'jobTitles' && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                placeholder="Yeni görev başlığı"
                className="h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddJobTitle();
                  }
                }}
              />
              <button
                onClick={handleAddJobTitle}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors h-10"
              >
                <Plus className="w-5 h-5" />
                Ekle
              </button>
            </div>
          )}
        </div>

        {activeTab === 'jobTitles' ? (
          <DataTable
            columns={jobTitleColumns}
            data={jobTitles}
          />
        ) : (
          <DataTable
            columns={columns}
            data={activeTab === 'active' 
              ? staff.filter(s => !s.terminationDate)
              : staff.filter(s => s.terminationDate)
            }
            onRowClick={handleEditStaff}
          />
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {editMode === 'edit' ? 'Personel Düzenle' : 'Yeni Personel'}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {editMode === 'edit' ? 'Personel bilgilerini güncelleyin' : 'Yeni personel bilgilerini girin'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto">
              <form onSubmit={handleSaveStaff} className="divide-y divide-gray-100">
                {/* Genel Bilgiler */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <div className="p-1 bg-blue-50 rounded">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    Genel Bilgiler
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adı
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        defaultValue={selectedStaff?.firstName}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Soyadı
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        defaultValue={selectedStaff?.lastName}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Görevi
                      </label>
                      <select
                        name="role"
                        defaultValue={selectedStaff?.role}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      >
                        <option value="">Seçiniz</option>
                        {ROLES.map(role => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Güvenlik Seviyesi
                      </label>
                      <select
                        name="securityLevel"
                        defaultValue={selectedStaff?.securityLevel}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      >
                        <option value="">Seçiniz</option>
                        {SECURITY_LEVELS.map(level => (
                          <option key={level.id} value={level.id}>
                            {level.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Program Dili
                      </label>
                      <select
                        name="programmingLanguage"
                        defaultValue={selectedStaff?.programmingLanguage}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      >
                        <option value="">Seçiniz</option>
                        {PROGRAMMING_LANGUAGES.map(lang => (
                          <option key={lang.id} value={lang.id}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Diğer Bilgiler */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <div className="p-1 bg-emerald-50 rounded">
                      <Shield className="w-4 h-4 text-emerald-600" />
                    </div>
                    Diğer Bilgiler
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Yetki Kodu
                      </label>
                      <input
                        type="text"
                        name="authorizationCode"
                        defaultValue={selectedStaff?.authorizationCode}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mifare Kodu
                      </label>
                      <input
                        type="text"
                        name="mifareCode"
                        defaultValue={selectedStaff?.mifareCode}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Proximity Kodu
                      </label>
                      <input
                        type="text"
                        name="proximityCode"
                        defaultValue={selectedStaff?.proximityCode}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="isDeliveryPerson"
                          defaultChecked={selectedStaff?.isDeliveryPerson}
                          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Paketçidir</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="hideFromStaffList"
                          defaultChecked={selectedStaff?.hideFromStaffList}
                          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Personeli Gizle</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Kişisel Bilgiler */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <div className="p-1 bg-purple-50 rounded">
                      <FileText className="w-4 h-4 text-purple-600" />
                    </div>
                    Kişisel Bilgiler
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SSK Numarası
                      </label>
                      <input
                        type="text"
                        name="identityNumber"
                        defaultValue={selectedStaff?.identityNumber}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alan Kodu + Tel No
                      </label>
                      <input
                        type="text"
                        name="areaCodeAndPhone"
                        defaultValue={selectedStaff?.areaCodeAndPhone}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adresi
                      </label>
                      <input
                        type="text"
                        name="address"
                        defaultValue={selectedStaff?.address}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cinsiyeti
                      </label>
                      <select
                        name="gender"
                        defaultValue={selectedStaff?.gender}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      >
                        <option value="Erkek">Erkek</option>
                        <option value="Kadın">Kadın</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        İşe Giriş Tarihi
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        defaultValue={selectedStaff?.startDate}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Doğum Tarihi
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        defaultValue={selectedStaff?.birthDate}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Baba Adı
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        defaultValue={selectedStaff?.fatherName}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Engel Derecesi
                      </label>
                      <input
                        type="text"
                        name="disabilityDegree"
                        defaultValue={selectedStaff?.disabilityDegree}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Uyruğu
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        defaultValue={selectedStaff?.nationality}
                        className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* İşten Çıkış Bilgileri */}
                {activeTab === 'terminated' && (
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <div className="p-1 bg-red-50 rounded">
                        <Calendar className="w-4 h-4 text-red-600" />
                      </div>
                      İşten Çıkış Bilgileri
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          İşten Çıkış Tarihi
                        </label>
                        <input
                          type="date"
                          name="terminationDate"
                          defaultValue={selectedStaff?.terminationDate || ''}
                          className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Çıkış Ücreti
                        </label>
                        <input
                          type="number"
                          name="terminationPay"
                          defaultValue={selectedStaff?.terminationPay || ''}
                          step="0.01"
                          className="w-full h-10 rounded-lg bg-gray-50 border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Çıkış Nedeni
                        </label>
                        <textarea
                          name="terminationReason"
                          defaultValue={selectedStaff?.terminationReason || ''}
                          rows={3}
                          className="w-full rounded-lg bg-gray-50 border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-gray-50 p-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors inline-flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
