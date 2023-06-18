
export default interface IAccident {
  hittingDriver: {
    name?: string;
    carNumber: string;
    phoneNumber?: string;
  };
  date: string;
  imageSource: string;
  type: 'report' | 'note';
  isAnonymous?: boolean;
  isIdentify?: boolean;
  reporter?: {
    name: string;
    phoneNumber: string;
  };
}
