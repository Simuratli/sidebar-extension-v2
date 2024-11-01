import { create } from "zustand";

import { PageState, usePageState } from "./page";
import { CredentialsState, useCredentialState } from "./credentials";
import { ChallengeState, useChallengeState } from "./challenge";
import { TokensState, useTokenState } from "./tokens";
import { CompanyState, useCompanyState } from "./company";
import { LoaderStateType, useLoadingState } from "./loader";
import { ErrorStateType, useErrorState } from "./error";
import { CompanyInnerState, useCompanyInnerState } from "./companyInner";
import { UserStoreType, useUserStore } from "./user";
import { UserInnerState, useUserInnerState } from "./userInner";
import { useUserErrorState, userErrorState } from "./userErrorState";
import { companyErrorState, useCompanyErrorState } from "./companyError";
import { SearchControlState, useSearchControl } from "./searchControl";
import { SidebarStateType, useSidebarOpen } from "./sidebarOpening";
import {
  SearchControlCompanyState,
  useSearchControlCompany,
} from "./searchControlCompany";

export const useStore = create<
  PageState &
    CredentialsState &
    ChallengeState &
    TokensState &
    CompanyState &
    LoaderStateType &
    ErrorStateType &
    CompanyInnerState &
    UserStoreType &
    UserInnerState &
    userErrorState &
    companyErrorState &
    SearchControlCompanyState &
    SearchControlState &
    SidebarStateType
>()((...a) => ({
  ...useSearchControl(...a),
  ...usePageState(...a),
  ...useCredentialState(...a),
  ...useChallengeState(...a),
  ...useTokenState(...a),
  ...useCompanyState(...a),
  ...useLoadingState(...a),
  ...useErrorState(...a),
  ...useCompanyInnerState(...a),
  ...useUserStore(...a),
  ...useUserInnerState(...a),
  ...useUserErrorState(...a),
  ...useCompanyErrorState(...a),
  ...useSearchControlCompany(...a),
  ...useSidebarOpen(...a),
}));
