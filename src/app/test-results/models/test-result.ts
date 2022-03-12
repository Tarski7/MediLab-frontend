export class TestResult {
  _id: string;
  name: string;
  date: Date;
  price: number;
  description: string;
}

export class TestResultPaginationRsp {
  docs: TestResult[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}
