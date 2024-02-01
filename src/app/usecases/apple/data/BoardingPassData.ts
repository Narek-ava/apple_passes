export type PassDataField = {
  label: string;
  value: string;
};

export type BoardingPassData = {
  from: PassDataField;
  to: PassDataField;
  passenger: PassDataField;
  time: PassDataField;
  passengers: PassDataField;
  payToDriver: PassDataField;
};
