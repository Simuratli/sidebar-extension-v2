import { APP_LOCATION } from "../types/global.types";

export const openInCrm = (
  crmUrl: string,
  location: APP_LOCATION,
  id: string,
) => {
  window.open(
    `${crmUrl}/main.aspx?pagetype=entityrecord&etn=${location === APP_LOCATION.COMPANY ? "account" : "contact"}&id=${id}`,
    "_blank",
  );
};
