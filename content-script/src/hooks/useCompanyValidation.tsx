import {
  companyValidators,
  emailPattern,
  urlPattern,
} from "../utils/companyValidators";
import { COMPANY_FIELDS, FIELD_TYPE } from "../types/global.types";
import { useStore } from "../store";

export function useCompanyValidation() {
  const {
    setCompanyAdress,
    setCompanyName,
    setCompanyWebsiteUrl,
    setCompanySize,
    setNumberOfEmployees,
    setCompanyDescription,
    setCompanyError,
  } = useStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const { min, max, type, required } =
      companyValidators[name as COMPANY_FIELDS];

    if (type === FIELD_TYPE.NUMBER && !isNaN(Number(value))) {
      setCompanyError(
        name,
        (min && Number(value) < min) || Number(value) > max
          ? `Character limit: ${max}`
          : null,
      );
    } else if (type === FIELD_TYPE.EMAIL) {
      setCompanyError(
        name,
        emailPattern.test(value)
          ? value.length > max
            ? `Character limit: ${max}`
            : null
          : "Not valid email",
      );
    } else if (type === FIELD_TYPE.URL) {
      setCompanyError(
        name,
        value ? (!urlPattern.test(value) ? "Not correct URL" : null) : null,
      );
    } else {
      setCompanyError(
        name,
        value.length > max
          ? `Character limit: ${max}`
          : required
            ? !value
              ? "Required field"
              : null
            : null,
      );
    }

    switch (name) {
      case COMPANY_FIELDS.COMPANY_NAME:
        setCompanyName(value);
        break;
      case COMPANY_FIELDS.NUMBER_OF_EMPLOYEES:
        if (!isNaN(Number(value))) {
          setNumberOfEmployees(Number(value));
        }
        break;
      case COMPANY_FIELDS.COMPANY_ADDRESS:
        setCompanyAdress(value);
        break;
      case COMPANY_FIELDS.COMPANY_SIZE:
        if (!isNaN(Number(value))) {
          setCompanySize(Number(value));
        }
        break;
      case COMPANY_FIELDS.COMPANY_WEBSITE_URL:
        setCompanyWebsiteUrl(value);
        break;
      case COMPANY_FIELDS.COMPANY_DESCRIPTION:
        setCompanyDescription(value);
        break;
      default:
        break;
    }
  };

  return { handleChange };
}
