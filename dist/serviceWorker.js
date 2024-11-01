(() => {
  "use strict";
  var e, n, t, r, o, s, a, c, i, E, l, u, _, S, h, d, m;
  !(function (e) {
    (e.SETUP = "setup"),
      (e.LOGIN = "login"),
      (e.USER = "user"),
      (e.COMPANY = "company"),
      (e.ERROR = "error"),
      (e.SOMETHING_WENT_WRONG = "somethingWentWrong"),
      (e.WRONG_PAGE = "wrongPage"),
      (e.SEARCH_PEOPLE_SCRAPE = "searchPeoplescrape"),
      (e.SEARCH_COMPANY_SCRAPE = "searchCompanyscrape"),
      (e.SALES_SEARCH_COMPANY_SCRAPE = "searchCompanyscrapesales"),
      (e.SALES_SEARCH_USER_SCRAPE = "searchUserscrapesales");
  })(e || (e = {})),
    (function (e) {
      (e.GOLD = "gold"),
        (e.BLUE = "blue"),
        (e.LOGOUT = "logout"),
        (e.RELOAD = "reload");
    })(n || (n = {})),
    (function (e) {
      (e.LINKEDIN = "https://www.linkedin.com/"),
        (e.SALES = "https://www.linkedin.com/sales/"),
        (e.COMPANY = "https://www.linkedin.com/company/"),
        (e.SALES_COMPANY = "https://www.linkedin.com/sales/company/"),
        (e.USER = "https://www.linkedin.com/in/"),
        (e.SALES_USER = "https://www.linkedin.com/sales/lead/"),
        (e.MICROSOFT_LOGIN = "https://login.microsoftonline.com/"),
        (e.CONTACT_INFO = "overlay/contact-info/"),
        (e.PEOPLE_SEARCH = "https://www.linkedin.com/search/results/people/"),
        (e.COMPANY_SEARCH =
          "https://www.linkedin.com/search/results/companies/"),
        (e.SALES_USER_SEARCH = "https://www.linkedin.com/sales/search/people"),
        (e.SALES_COMPANY_SEARCH =
          "https://www.linkedin.com/sales/search/company"),
        (e.USER_ABOUT_PROFILE = "/overlay/about-this-profile/");
    })(t || (t = {})),
    (function (e) {
      (e.EXIST = "exist"), (e.NOT_EXIST = "notExist"), (e.SELECT = "select");
    })(r || (r = {})),
    (function (e) {
      (e.NORMAL = "normal"),
        (e.WITH_LABEL = "withLabel"),
        (e.IN_TABLE = "inTable");
    })(o || (o = {})),
    (function (e) {
      (e.REFRESH = "refresh"), (e.BASIC = "basic");
    })(s || (s = {})),
    (function (e) {
      (e.SOMETHING_WENT_WRONG = "somethingWentWrong"),
        (e.TOKEN_EXPIRED = "refresh"),
        (e.ERROR_ACTION = "errorHappen"),
        (e.RELOAD_EXTENSION = "reloadExtension"),
        (e.TAB_UPDATED = "updateTabUrl"),
        (e.HANDLE_LOGIN_TRIGGERED = "handleLoginTriggered"),
        (e.ACCESS_TOKEN_GOES_BACK = "accessTokenGoesBack"),
        (e.REFRESS_TOKEN = "refresh"),
        (e.LOGOUT = "logout");
    })(a || (a = {})),
    (function (e) {
      (e.LOGIN = "login"), (e.ACTION = "action");
    })(c || (c = {})),
    (function (e) {
      (e.CLIENT_ID = "clientId"),
        (e.ACCESS_TOKEN = "accessToken"),
        (e.REFRESH_TOKEN = "refreshToken"),
        (e.REFRESH_TIME = "refressTime"),
        (e.AUTH_TOKEN = "authToken"),
        (e.TENANT_ID = "tenantId"),
        (e.CRM_URL = "crmUrl"),
        (e.CHALLENGE = "challenge");
    })(i || (i = {})),
    (function (e) {
      (e.COMPANY_NAME = "name"),
        (e.COMPANY_IMAGE = "companyImage"),
        (e.NUMBER_OF_EMPLOYEES = "numberofemployees"),
        (e.UDS_LINKEDIN_PROFILE_COMPANY = "uds_linkedinprofilecompanyurl"),
        (e.UDS_SALES_PROFILE_COMPANY = "uds_salesnavigatorcompanyurl"),
        (e.COMPANY_ADDRESS = "companyAddress1_name"),
        (e.COMPANY_SIZE = "companySize"),
        (e.COMPANY_WEBSITE_URL = "websiteurl"),
        (e.COMPANY_DESCRIPTION = "companyDescription");
    })(E || (E = {})),
    (function (e) {
      (e.FULLNAME = "fullname"),
        (e.USER_IMAGE = "userImage"),
        (e.CUSTOMER = "customer"),
        (e.UDS_LINKEDIN_PROFILE_USER = "uds_linkedin"),
        (e.UDS_SALES_PROFILE_USER = "uds_salesnavigatorcompanyurl"),
        (e.BIRTHDAY = "birthday"),
        (e.WORK_PHONE = "telephone1"),
        (e.MOBILE_PHONE = "mobilephone"),
        (e.PERSONAL_EMAIL = "emailaddress2"),
        (e.EMAIL = "emailaddress1"),
        (e.JOB_TITLE = "jobtitle"),
        (e.ADRESS = "userAddress1_name"),
        (e.DESCRIPTION = "description");
    })(l || (l = {})),
    (function (e) {
      (e.EMAIL = "email"),
        (e.STRING = "string"),
        (e.URL = "url"),
        (e.NUMBER = "number"),
        (e.DATE = "date");
    })(u || (u = {})),
    (function (e) {
      (e.NORMAL = "normal"), (e.IN_TABLE = "inTable");
    })(_ || (_ = {})),
    (function (e) {
      (e.COMPANY = "company"), (e.USER = "user");
    })(S || (S = {})),
    (function (e) {
      (e.INNER = "inner"), (e.OUTER = "outer");
    })(h || (h = {})),
    (function (e) {
      (e.SINGLE = "single"), (e.NOT_SINGLE = "notSingle");
    })(d || (d = {})),
    (function (e) {
      (e.CAPTURE_EXIST = "CAPTURE_EXIST"),
        (e.CAPTURE_NOEXIST = "CAPTURE_NOEXIST"),
        (e.LOGIN = "LOGIN"),
        (e.REDIRECT = "REDIRECT"),
        (e.QUICK = "QUICK"),
        (e.SEARCH = "SEARCH");
    })(m || (m = {}));
  chrome.webNavigation.onHistoryStateUpdated.addListener(
    function (e) {
      chrome.tabs.sendMessage(e.tabId, { url: e.url });
    },
    { url: [{ urlMatches: ".*" }] },
  ),
    chrome.runtime.onMessage.addListener(function (e, n, t) {
      if (e.type == a.HANDLE_LOGIN_TRIGGERED) {
        var r = e.options,
          o = r.clientId,
          s = r.crmUrl,
          c = r.tenantId,
          i = r.challenge;
        chrome.storage.sync.set({
          clientId: o,
          crmUrl: s,
          tenantId: c,
          challenge: i,
        });
        var E = "https://login.microsoftonline.com/"
          .concat(c, "/oauth2/v2.0/authorize?client_id=")
          .concat(
            o,
            "&response_type=code&redirect_uri=http://localhost:5678&response_mode=query&scope=",
          )
          .concat(s, "/.default&state=SrwhVCiM7ELA&code_challenge=")
          .concat(i, "&code_challenge_method=S256&prompt=login");
        chrome.identity.launchWebAuthFlow(
          { url: E, interactive: !0 },
          function () {},
        );
      }
      console.log("Received message from " + n + ": ", e), t({ received: !0 });
    }),
    chrome.tabs.onUpdated.addListener(function (e, n) {
      if (n.url) {
        chrome.tabs.sendMessage(e, { message: a.TAB_UPDATED });
        var t = new URLSearchParams(new URL(n.url).search),
          r = t.get("code");
        t.get("error") &&
          chrome.runtime.sendMessage({
            action: a.SOMETHING_WENT_WRONG,
            data: t.get("error_description"),
          }),
          r &&
            r.includes("0.AV") &&
            (chrome.tabs.query({}, function (e) {
              e.forEach(function (e) {
                chrome.tabs.sendMessage(e.id ? e.id : 123, {
                  message: a.ACCESS_TOKEN_GOES_BACK,
                  code: r,
                });
              });
            }),
            chrome.storage.sync.set({ refreshTime: "".concat(new Date()) }));
      }
    }),
    setInterval(function () {
      return (
        (e = void 0),
        (n = void 0),
        (r = function () {
          var e, n, t;
          return (function (e, n) {
            var t,
              r,
              o,
              s,
              a = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (s = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (s[Symbol.iterator] = function () {
                  return this;
                }),
              s
            );
            function c(c) {
              return function (i) {
                return (function (c) {
                  if (t) throw new TypeError("Generator is already executing.");
                  for (; s && ((s = 0), c[0] && (a = 0)), a; )
                    try {
                      if (
                        ((t = 1),
                        r &&
                          (o =
                            2 & c[0]
                              ? r.return
                              : c[0]
                                ? r.throw || ((o = r.return) && o.call(r), 0)
                                : r.next) &&
                          !(o = o.call(r, c[1])).done)
                      )
                        return o;
                      switch (((r = 0), o && (c = [2 & c[0], o.value]), c[0])) {
                        case 0:
                        case 1:
                          o = c;
                          break;
                        case 4:
                          return a.label++, { value: c[1], done: !1 };
                        case 5:
                          a.label++, (r = c[1]), (c = [0]);
                          continue;
                        case 7:
                          (c = a.ops.pop()), a.trys.pop();
                          continue;
                        default:
                          if (
                            !(
                              (o =
                                (o = a.trys).length > 0 && o[o.length - 1]) ||
                              (6 !== c[0] && 2 !== c[0])
                            )
                          ) {
                            a = 0;
                            continue;
                          }
                          if (
                            3 === c[0] &&
                            (!o || (c[1] > o[0] && c[1] < o[3]))
                          ) {
                            a.label = c[1];
                            break;
                          }
                          if (6 === c[0] && a.label < o[1]) {
                            (a.label = o[1]), (o = c);
                            break;
                          }
                          if (o && a.label < o[2]) {
                            (a.label = o[2]), a.ops.push(c);
                            break;
                          }
                          o[2] && a.ops.pop(), a.trys.pop();
                          continue;
                      }
                      c = n.call(e, a);
                    } catch (e) {
                      (c = [6, e]), (r = 0);
                    } finally {
                      t = o = 0;
                    }
                  if (5 & c[0]) throw c[1];
                  return { value: c[0] ? c[1] : void 0, done: !0 };
                })([c, i]);
              };
            }
          })(this, function (r) {
            switch (r.label) {
              case 0:
                return (
                  r.trys.push([0, 2, , 3]),
                  [4, chrome.storage.sync.get("refreshTime")]
                );
              case 1:
                return (
                  (e = r.sent()).refreshTime &&
                    ((o = new Date(e.refreshTime)),
                    (s = new Date()),
                    (n = Math.abs(s.getTime() - o.getTime()) / 36e5) >= 7 &&
                      chrome.tabs.query({}, function (e) {
                        e.forEach(function (e) {
                          chrome.tabs.sendMessage(e.id ? e.id : 123, {
                            message: a.LOGOUT,
                          });
                        });
                      }),
                    n > 2 &&
                      chrome.tabs.query({}, function (e) {
                        e.forEach(function (e) {
                          chrome.tabs.sendMessage(e.id ? e.id : 123, {
                            message: a.REFRESS_TOKEN,
                          });
                        });
                      })),
                  [3, 3]
                );
              case 2:
                return (
                  (t = r.sent()),
                  console.error(
                    "Error fetching refreshTime or sending message:",
                    t,
                  ),
                  [3, 3]
                );
              case 3:
                return [2];
            }
            var o, s;
          });
        }),
        new ((t = void 0) || (t = Promise))(function (o, s) {
          function a(e) {
            try {
              i(r.next(e));
            } catch (e) {
              s(e);
            }
          }
          function c(e) {
            try {
              i(r.throw(e));
            } catch (e) {
              s(e);
            }
          }
          function i(e) {
            var n;
            e.done
              ? o(e.value)
              : ((n = e.value),
                n instanceof t
                  ? n
                  : new t(function (e) {
                      e(n);
                    })).then(a, c);
          }
          i((r = r.apply(e, n || [])).next());
        })
      );
      var e, n, t, r;
    }, 36e4);
})();
