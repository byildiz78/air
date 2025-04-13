export interface Staff {
  id: string;
  // Genel Bilgiler
  firstName: string;
  lastName: string;
  role: string;
  securityLevel: string;
  programmingLanguage: string;
  
  // Diğer Bilgiler
  authorizationCode: string;
  mifareCode: string;
  proximityCode: string;
  isDeliveryPerson: boolean;
  hideFromStaffList: boolean;
  
  // Kişisel Bilgiler
  identityNumber: string;
  areaCodeAndPhone: string;
  address: string;
  gender: 'Erkek' | 'Kadın';
  startDate: string;
  birthDate: string;
  fatherName: string;
  disabilityDegree: string;
  nationality: string;
  terminationDate: string | null;
  terminationPay: number | null;
  terminationReason: string | null;
  
  // İlgili entegrasyonlar
  integrations: string[];
}

export const ROLES = [
  { id: 'MUDUR', name: 'MÜDÜR' },
  { id: 'GARSON', name: 'GARSON' },
  { id: 'ASCI', name: 'AŞÇI' },
  { id: 'KURYE', name: 'KURYE' }
];

export const SECURITY_LEVELS = [
  { id: '10', name: '10--EN YÜKSEK DÜZEY' },
  { id: '9', name: '9--YÜKSEK DÜZEY' },
  { id: '8', name: '8--ORTA DÜZEY' },
  { id: '7', name: '7--DÜŞÜK DÜZEY' }
];

export const PROGRAMMING_LANGUAGES = [
  { id: 'TR', name: 'Türkçe' },
  { id: 'EN', name: 'English' },
  { id: 'AR', name: 'العربية' }
];
