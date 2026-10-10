export interface ReminderRecord {
  id: number;
  fullName: string;
  birthDate: string;
  bhxhCccd: string;
  phoneNumber: string;
  cardExpiryHint?: string;
  createdAt: string;
  wpSynced?: boolean;
}

export interface LookupResultItem {
  id: number;
  fullName: string;
  maskedCode: string;
  maskedPhone: string;
  cardExpiryHint: string;
  createdAt: string;
}
