export interface JobTitle {
  id: string;
  title: string;
  securityLevel: number;
}

export const initialJobTitles: JobTitle[] = [
  { id: '1', title: 'MUTFAK EKİBİ', securityLevel: 3 },
  { id: '2', title: 'KOMİ', securityLevel: 2 },
  { id: '3', title: 'GARSON', securityLevel: 4 },
  { id: '4', title: 'KASİYER', securityLevel: 5 },
  { id: '5', title: 'ŞEF GARSON', securityLevel: 6 },
  { id: '6', title: 'MÜDÜR', securityLevel: 9 },
  { id: '7', title: 'İŞLETME SAHİBİ', securityLevel: 10 }
];
