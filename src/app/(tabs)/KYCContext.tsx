import React, { createContext, useContext, useState } from 'react';

// Define the KYC data structure matching your project images
interface KYCData {
  fullName: string;
  panNumber: string;
  dob: string;
  gender: string;
  annualIncome: string;
  residentialStatus: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'Savings' | 'Current' | 'NRO';
  currentStep: number;
}

interface KYCContextType {
  kycData: KYCData;
  updateKYC: (newData: Partial<KYCData>) => void;
  resetKYC: () => void;
}

const KYCContext = createContext<KYCContextType | undefined>(undefined);

export const KYCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [kycData, setKycData] = useState<KYCData>({
    fullName: '',
    panNumber: '',
    dob: '',
    gender: 'Female',
    annualIncome: '',
    residentialStatus: 'Indian resident',
    accountNumber: '',
    ifscCode: '',
    accountType: 'Savings',
    currentStep: 1, // Step 1 of 6
  });

  const updateKYC = (newData: Partial<KYCData>) => {
    setKycData((prev) => ({ ...prev, ...newData }));
  };

  const resetKYC = () => {
    setKycData({
      fullName: '', panNumber: '', dob: '', gender: 'Female',
      annualIncome: '', residentialStatus: 'Indian resident',
      accountNumber: '', ifscCode: '', accountType: 'Savings', currentStep: 1,
    });
  };

  return (
    <KYCContext.Provider value={{ kycData, updateKYC, resetKYC }}>
      {children}
    </KYCContext.Provider>
  );
};

export const useKYC = () => {
  const context = useContext(KYCContext);
  if (!context) throw new Error('useKYC must be used within a KYCProvider');
  return context;
};