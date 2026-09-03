import type { MOBILITY } from './schema';

export type AssessmentFormValues = {
  mrn: string;
  patientName: string;
  dateOfBirth: string;
  assessmentDate: string;
  mobility: (typeof MOBILITY)[number] | '';
  barthelIndex: number | '';
  medicationCount: number | '';
  pharmacistReviewRequested: boolean;
  followUpDate: string;
  consentObtained: boolean;
};

export const initialFormValues: AssessmentFormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: '',
  assessmentDate: '',
  mobility: '',
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: '',
  consentObtained: false,
};
