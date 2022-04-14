import { Patient } from './../../patients/models/patient';
export class TestResult {
  _id: string;
  name: string;
  date: Date;
  price: number;
  description: string;
  patient: Patient
}

export class TestResultPaginationRsp {
  docs: TestResult[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}
