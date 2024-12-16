import { ACCESS_TOKEN_ENUM } from "../types/global.types";
import { CreateCompanyRequestType } from "./api.types";

export async function getDataverse(url: string, token: string) {
  const headers = {
    Authorization: `Bearer ${token.includes('"') ? JSON.parse(token) : token}`,
    Accept: "application/json",
    "OData-MaxVersion": "4.0",
    "OData-Version": "4.0",
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error };
  }
}

export async function createDataverse(
  url: string,
  token: string,
  request: Partial<CreateCompanyRequestType>,
  method: "POST" | "PATCH",
) {
  const headers = {
    Authorization: `Bearer ${token.includes('"') ? JSON.parse(token) : token}`,
    Accept: "application/json",
    "OData-MaxVersion": "4.0",
    "OData-Version": "4.0",
    "Content-Type": "application/json",
    // "Prefer": "odata.include-annotations='*'",
    Prefer: "return=representation",
  };

  const options = {
    method: method,
    headers: headers,
    body: JSON.stringify(request),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      response.text().then((errorText) => {
        console.error("Error Text:", errorText);
        throw new Error(`Error Text: ${errorText}`);
      });
      // throw new Error(`Error creating data: ${response.statusText}`);
    }
    const data = await response.json(); // Assuming successful creation returns data
    return data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error creating Dataverse data:", error);
    // Handle the error appropriately (e.g., throw or return an error object)
    return { error: typedError.stack };
  }
}

export const getAccessTokenRequest = async (
  clientId: string,
  tenantId: string,
  crmUrl: string,
  verifier: string,
  type: ACCESS_TOKEN_ENUM,
  token: string,
) => {
  const response = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      credentials: "omit",
      body: `client_id=${clientId}&scope=${crmUrl}/.default&grant_type=${type === ACCESS_TOKEN_ENUM.REFRESH ? "refresh_token" : "authorization_code"}&${type === "refresh" ? "refresh_token" : "code"}=${token.includes('"') ? JSON.parse(token) : token}&redirect_uri=http://localhost:5678&code_verifier=${verifier}`,
    },
  );
  const data = response.json();
  return data;
};
