export interface PeopleSearchControlType {
  url: string | undefined;
  job?: string | undefined;
  name?: string | undefined;
  location?: string | undefined;
  image: string | undefined;
  description?: string | null | undefined;
  jobCompanyId?: string | undefined;
  company?: string | undefined;
  id?: string | undefined;
}

export interface CompanySearchControlType {
  url: string | undefined;
  description: string | null | undefined;
  name: string | undefined;
  location?: string | undefined;
  image: string | undefined;
  numberOfEmployees?: number | null | undefined;
  id?: string | undefined | null;
}
