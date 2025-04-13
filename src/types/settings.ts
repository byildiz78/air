export interface SecuritySetting {
  level: number;
  required: boolean;
  manager: boolean;
  cashier: boolean;
}

export interface StoreSetting {
  SettingsID: number;
  OrderID: number;
  TabName: string;
  GroupName: string;
  ParamName: string;
  ParamKey: string;
  ParamValue: string;
  DefaultValue: string | null;
  ParamType: string;
  EditKey: string;
  SyncKey: string;
  BranchID: number;
  AddUserID: number | null;
  AddDateTime: string;
  EditUserID: number | null;
  EditDateTime: string;
  AllowEdit: string;
  UpdateDateTime: string;
}

export interface BusinessSettings {
  [key: string]: string | boolean | number | null;
}

export interface SecuritySettings {
  barkodModu: SecuritySetting;
  siparisNotu: SecuritySetting;
  satisTipi: SecuritySetting;
  indirimDuzenleme: SecuritySetting;
  foyDuzenleme: SecuritySetting;
  paraCekmecesi: SecuritySetting;
  terminalDegistirme: SecuritySetting;
  personelEkleme: SecuritySetting;
  hesapYazdirma: SecuritySetting;
  zamanDolan: SecuritySetting;
  kagitAdisyon: SecuritySetting;
  personelMesai: SecuritySetting;
  personelMesaiFormu: SecuritySetting;
  saatlikRapor: SecuritySetting;
  paketciHesap: SecuritySetting;
  muhasebe: SecuritySetting;
  iadeModu: SecuritySetting;
  personelGorev: SecuritySetting;
  paketSiparisler: SecuritySetting;
  tarihDegistirme: SecuritySetting;
  cariHesap: SecuritySetting;
  ayirEkrani: SecuritySetting;
}

export interface SettingsTabs {
  [key: string]: {
    label: string;
    subTabs: Array<{
      id: string;
      label: string;
    }>;
  };
}

export interface ServiceSettings {
  [key: string]: boolean | number | string | Record<string, boolean>;
  openCallOrderDirectly: boolean;
  retailModeActive: boolean;
  stayOnTableSelectionAfterOrder: boolean;
  askPasswordWhenReducingQuantity: boolean;
  showCashDiscountButton: boolean;
  enableVigoOperations: boolean;
  enableOnTheWayOperations: boolean;
  enablePackupOperations: boolean;
  enablePackageOperations: boolean;
  enablePackageTaxiOperations: boolean;
  enableHDHoldingCRMOperations: boolean;
  enableInstantCourierOperations: boolean;
  updateKDVGroups: boolean;
  orderScreenLockDuration: number;
  netGSMInternalNumber: string;
  roboticsFillingPoint: string;
  kobikomInternalNumber: string;
  tokenflexTerminalNo: string;
  visibleButtons: {
    tableService: boolean;
    takeaway: boolean;
    counterSale: boolean;
    packageService: boolean;
    call: boolean;
    courier: boolean;
    timeCard: boolean;
    transactions: boolean;
    backOffice: boolean;
    endOfDay: boolean;
  };
  quickServiceSaleTypes: {
    tableService: boolean;
    takeaway: boolean;
    counterSale: boolean;
    packageService: boolean;
  };
  stayOnNewOrderScreen: {
    takeaway: boolean;
    counterSale: boolean;
  };
  hideCompleteButton: {
    tableService: boolean;
    takeaway: boolean;
    counterSale: boolean;
    packageService: boolean;
  };
  hidePaymentButtons: {
    tableService: boolean;
    takeaway: boolean;
    counterSale: boolean;
    packageService: boolean;
  };
  hideGroupsOnCallScreen: {
    all: boolean;
    table: boolean;
    invoice: boolean;
    takeaway: boolean;
    counterSale: boolean;
    package: boolean;
  };
}

export interface CashierSettings {
  enablePaymentFeatures: boolean;
  rememberCashierAndAskPassword: boolean;
  showCashDrawerButton: boolean;
  cashOverlayDisplayDuration: number;
  showMobilePaymentsOnCashierScreen: boolean;
  useDelicatessenKDVGroups: boolean;
  activityCashier: boolean;
  loadKDVNamesFromTaxgroups: boolean;
  useHuginCashRegister: boolean;
}