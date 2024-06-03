interface Props {
  data: any;
  setPageItem: any;
  setPreviewPageItem: any;
  setNextPageItem: any;
  paginate: any;
  isPreviousData: any;
  pageItem: number;
}

export type SortModel = 'asc' | 'desc';

export type IsPaginate = 'TRUE' | 'FALSE';

export type PaymentType = 'CARD' | 'PAYPAL' | 'PHONE' | 'IBAN';

export type PaginationRequest = {
  organizationId?: string;
  isPaginate?: IsPaginate;
  search?: string;
  sort: SortModel;
  page?: number;
  take?: number;
  sortBy?: string;
};

export type PaginationResponse = {
  total: number;
  per_page: number;
  current_page: number;
  next_page: number;
  last_page: number;
  skip: number;
  sort: SortModel;
  total_page: number;
  total_value: number;
};
