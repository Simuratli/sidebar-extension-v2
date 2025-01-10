import { getDataverse } from "../api";
import { BackendCompanyInterface } from "../api/api.types";

export const checkIfUserExistOrNotSearch = async (
  url?: string,
  webApiEndpoint?: string,
  accessToken?: string,
) => {
  const query = `contains(${"uds_linkedin"},'${url}')`;
  const encodedQuery = encodeURIComponent(query);

  const existWithUrl = await getDataverse(
    `${webApiEndpoint}/contacts?$filter=${encodedQuery}`,
    accessToken ? accessToken : "",
  );

  let companyData: null | [] = null;
  if (existWithUrl.value && existWithUrl.value.length !== 0) {

    if (existWithUrl.value[0]?._parentcustomerid_value) {
      const query = `accountid eq ${existWithUrl.value[0]?._parentcustomerid_value}`;
      const encodedQuery = encodeURIComponent(query);
      const existWithID = await getDataverse(`${webApiEndpoint}/accounts?$filter=${encodedQuery}`, accessToken ? accessToken : "");
      if (existWithID.value && existWithID.value.length > 0) {
        companyData = existWithID.value[0];
      }
    }


  }

  if (existWithUrl.error) {
    return {
      userData: { error: "Something went wrong!" },
      companyData: { error: "Something went wrong!" },
    };
  }

  return {
    userData: existWithUrl.value[0] as any,
    companyData: companyData as any,
  };
};

export const checkIfCompanyExistOrNotSearch = async (
  name?: string,
  id?: string | null | undefined,
  webApiEndpoint?: string,
  accessToken?: string,
) => {
  const query_uds_linkedincompanyid = `contains(uds_linkedincompanyid,'${id}')`;
  const encodedQuery_uds_linkedincompanyid = encodeURIComponent(
    query_uds_linkedincompanyid,
  );

  const query_name = `contains(name,'${name}')`;
  const encodedQuery_name = encodeURIComponent(query_name);

  const existWithName = id
    ? await getDataverse(
      `${webApiEndpoint}/accounts?$filter=${encodedQuery_uds_linkedincompanyid}`,
      accessToken ? accessToken : "",
    )
    : await getDataverse(
      `${webApiEndpoint}/accounts?$filter=${encodedQuery_name}`,
      accessToken ? accessToken : "",
    );

  return existWithName;
};
