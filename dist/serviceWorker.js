(() => {
  "use strict";
  var e, n, t, r, o, i, a, s, c, l, u, d, E, m, h, f, p;
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
    })(i || (i = {})),
    (function (e) {
      (e.SOMETHING_WENT_WRONG = "somethingWentWrong"),
        (e.TOKEN_EXPIRED = "refresh"),
        (e.ERROR_ACTION = "errorHappen"),
        (e.RELOAD_EXTENSION = "reloadExtension"),
        (e.TAB_UPDATED = "updateTabUrl"),
        (e.HANDLE_LOGIN_TRIGGERED = "handleLoginTriggered"),
        (e.ACCESS_TOKEN_GOES_BACK = "accessTokenGoesBack"),
        (e.REFRESS_TOKEN = "refresh"),
        (e.LOGOUT = "logout"),
        (e.CREDENTIALS = "CREDENTIALS");
    })(a || (a = {})),
    (function (e) {
      (e.LOGIN = "login"), (e.ACTION = "action");
    })(s || (s = {})),
    (function (e) {
      (e.CLIENT_ID = "clientId"),
        (e.ACCESS_TOKEN = "accessToken"),
        (e.REFRESH_TOKEN = "refreshToken"),
        (e.REFRESH_TIME = "refressTime"),
        (e.AUTH_TOKEN = "authToken"),
        (e.TENANT_ID = "tenantId"),
        (e.CRM_URL = "crmUrl"),
        (e.CHALLENGE = "challenge");
    })(c || (c = {})),
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
    })(l || (l = {})),
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
    })(u || (u = {})),
    (function (e) {
      (e.EMAIL = "email"),
        (e.STRING = "string"),
        (e.URL = "url"),
        (e.NUMBER = "number"),
        (e.DATE = "date");
    })(d || (d = {})),
    (function (e) {
      (e.NORMAL = "normal"), (e.IN_TABLE = "inTable");
    })(E || (E = {})),
    (function (e) {
      (e.COMPANY = "company"), (e.USER = "user");
    })(m || (m = {})),
    (function (e) {
      (e.INNER = "inner"), (e.OUTER = "outer");
    })(h || (h = {})),
    (function (e) {
      (e.SINGLE = "single"), (e.NOT_SINGLE = "notSingle");
    })(f || (f = {})),
    (function (e) {
      (e.CAPTURE_EXIST = "CAPTURE_EXIST"),
        (e.CAPTURE_NOEXIST = "CAPTURE_NOEXIST"),
        (e.LOGIN = "LOGIN"),
        (e.REDIRECT = "REDIRECT"),
        (e.QUICK = "QUICK"),
        (e.SEARCH = "SEARCH");
    })(p || (p = {}));
  var _ = function (e, n, t, r) {
      return new (t || (t = Promise))(function (o, i) {
        function a(e) {
          try {
            c(r.next(e));
          } catch (e) {
            i(e);
          }
        }
        function s(e) {
          try {
            c(r.throw(e));
          } catch (e) {
            i(e);
          }
        }
        function c(e) {
          var n;
          e.done
            ? o(e.value)
            : ((n = e.value),
              n instanceof t
                ? n
                : new t(function (e) {
                    e(n);
                  })).then(a, s);
        }
        c((r = r.apply(e, n || [])).next());
      });
    },
    R = function (e, n) {
      var t,
        r,
        o,
        i,
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
        (i = { next: s(0), throw: s(1), return: s(2) }),
        "function" == typeof Symbol &&
          (i[Symbol.iterator] = function () {
            return this;
          }),
        i
      );
      function s(s) {
        return function (c) {
          return (function (s) {
            if (t) throw new TypeError("Generator is already executing.");
            for (; i && ((i = 0), s[0] && (a = 0)), a; )
              try {
                if (
                  ((t = 1),
                  r &&
                    (o =
                      2 & s[0]
                        ? r.return
                        : s[0]
                          ? r.throw || ((o = r.return) && o.call(r), 0)
                          : r.next) &&
                    !(o = o.call(r, s[1])).done)
                )
                  return o;
                switch (((r = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                  case 0:
                  case 1:
                    o = s;
                    break;
                  case 4:
                    return a.label++, { value: s[1], done: !1 };
                  case 5:
                    a.label++, (r = s[1]), (s = [0]);
                    continue;
                  case 7:
                    (s = a.ops.pop()), a.trys.pop();
                    continue;
                  default:
                    if (
                      !(
                        (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                        (6 !== s[0] && 2 !== s[0])
                      )
                    ) {
                      a = 0;
                      continue;
                    }
                    if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                      a.label = s[1];
                      break;
                    }
                    if (6 === s[0] && a.label < o[1]) {
                      (a.label = o[1]), (o = s);
                      break;
                    }
                    if (o && a.label < o[2]) {
                      (a.label = o[2]), a.ops.push(s);
                      break;
                    }
                    o[2] && a.ops.pop(), a.trys.pop();
                    continue;
                }
                s = n.call(e, a);
              } catch (e) {
                (s = [6, e]), (r = 0);
              } finally {
                t = o = 0;
              }
            if (5 & s[0]) throw s[1];
            return { value: s[0] ? s[1] : void 0, done: !0 };
          })([s, c]);
        };
      }
    };
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
          i = r.crmUrl,
          s = r.tenantId,
          c = r.challenge;
        chrome.storage.sync.set({
          clientId: o,
          crmUrl: i,
          tenantId: s,
          challenge: c,
        });
        var l = "https://login.microsoftonline.com/"
          .concat(s, "/oauth2/v2.0/authorize?client_id=")
          .concat(
            o,
            "&response_type=code&redirect_uri=http://localhost:5678&response_mode=query&scope=",
          )
          .concat(i, "/.default&state=SrwhVCiM7ELA&code_challenge=")
          .concat(c, "&code_challenge_method=S256&prompt=login");
        chrome.identity.launchWebAuthFlow(
          { url: l, interactive: !0 },
          function () {},
        );
      }
      console.log("Received message from " + n + ": ", e), t({ received: !0 });
    }),
    chrome.tabs.onUpdated.addListener(function (e, n) {
      return _(void 0, void 0, void 0, function () {
        var t, r;
        return R(this, function (o) {
          return (
            n.url &&
              (chrome.tabs.sendMessage(e, { message: a.TAB_UPDATED }),
              (t = new URLSearchParams(new URL(n.url).search)),
              (r = t.get("code")),
              t.get("error") &&
                chrome.runtime.sendMessage({
                  action: a.SOMETHING_WENT_WRONG,
                  data: t.get("error_description"),
                }),
              r &&
                r.includes(".AV") &&
                (chrome.tabs.query({}, function (e) {
                  e.forEach(function (e) {
                    chrome.tabs.sendMessage(e.id ? e.id : 123, {
                      message: a.ACCESS_TOKEN_GOES_BACK,
                      code: r,
                    });
                  });
                }),
                chrome.storage.sync.set({
                  refreshTime: "".concat(new Date()),
                }))),
            [2]
          );
        });
      });
    }),
    setInterval(function () {
      return _(void 0, void 0, void 0, function () {
        var e, n, t;
        return R(this, function (r) {
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
                  (i = new Date()),
                  (n = Math.abs(i.getTime() - o.getTime()) / 36e5) >= 7 &&
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
          var o, i;
        });
      });
    }, 36e4),
    chrome.webNavigation.onHistoryStateUpdated.addListener(
      function (e) {
        return _(void 0, void 0, void 0, function () {
          return R(this, function (n) {
            return (
              chrome.tabs.sendMessage(e.tabId, { type: "PAGE_UPDATED" }), [2]
            );
          });
        });
      },
      { url: [{ urlMatches: ".*" }] },
    );
  var A = new ((function () {
    function e() {}
    return (
      (e.prototype.getCookiesFromTab = function (e) {
        return _(this, void 0, void 0, function () {
          return R(this, function (e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  chrome.cookies.getAll({ url: "https://www.linkedin.com" }),
                ];
              case 1:
                return [
                  2,
                  e.sent().reduce(function (e, n) {
                    return (e[n.name] = n.value), e;
                  }, {}),
                ];
            }
          });
        });
      }),
      (e.prototype.getHeaders = function (e, n) {
        return new Headers({
          accept: "application/vnd.linkedin.normalized+json+2.1",
          "csrf-token": e,
          "x-li-lang": "en_US",
          "x-restli-protocol-version": "2.0.0",
          "x-li-track": '{"clientVersion":"1.12","mpVersion":"1.12"}',
          cookie: this.formatCookies(n),
        });
      }),
      (e.prototype.formatCookies = function (e) {
        return Object.entries(e)
          .map(function (e) {
            var n = e[0],
              t = e[1];
            return "".concat(n, "=").concat(t);
          })
          .join("; ");
      }),
      (e.prototype.makeRequest = function (e, n) {
        return _(this, void 0, void 0, function () {
          var t;
          return R(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, fetch(e, { headers: n, credentials: "include" })];
              case 1:
                if (!(t = r.sent()).ok)
                  throw new Error("LinkedIn API Error: ".concat(t.status));
                return [2, t.json()];
            }
          });
        });
      }),
      (e.prototype.fetchProfileData = function (e, n) {
        var t;
        return _(this, void 0, void 0, function () {
          var r, o, i, a, s, c, l, u;
          return R(this, function (d) {
            switch (d.label) {
              case 0:
                return d.trys.push([0, 4, , 5]), [4, this.getCookiesFromTab(n)];
              case 1:
                if (
                  ((r = d.sent()),
                  !(o =
                    null === (t = r.JSESSIONID) || void 0 === t
                      ? void 0
                      : t.replace(/"/g, "")))
                )
                  throw new Error(
                    "CSRF token not found. Please make sure you are logged into LinkedIn.",
                  );
                return (
                  (i = this.getHeaders(o, r)),
                  (a =
                    "https://www.linkedin.com/voyager/api/identity/profiles/".concat(
                      e,
                      "/profileView",
                    )),
                  [4, this.makeRequest(a, i)]
                );
              case 2:
                return (
                  (s = d.sent()),
                  (c =
                    "https://www.linkedin.com/voyager/api/identity/profiles/".concat(
                      e,
                      "/profileContactInfo",
                    )),
                  [4, this.makeRequest(c, i)]
                );
              case 3:
                return (l = d.sent()), [2, this.processAPIResponse(s, l)];
              case 4:
                throw (
                  ((u = d.sent()),
                  console.error("Error fetching LinkedIn data:", u),
                  u)
                );
              case 5:
                return [2];
            }
          });
        });
      }),
      (e.prototype.processAPIResponse = function (e, n) {
        for (
          var t = e.included || [],
            r = n.data || [],
            o = {
              adress: "",
              birthDate: "",
              company: "",
              summary: "",
              email: "",
              firstName: "",
              headline: "",
              lastName: "",
              publicIdentifier: "",
            },
            i = 0,
            a = t;
          i < a.length;
          i++
        )
          (l = a[i]).firstName && (o.firstName = l.firstName),
            l.lastName && (o.lastName = l.lastName),
            l.headline && (o.headline = l.headline),
            l.address
              ? (o.adress = l.adress)
              : l.locationName && (o.adress = l.locationName),
            l.summary && (o.summary = l.summary),
            l.birthDate &&
              (o.birthDate = ""
                .concat(l.birthDate.day, "/")
                .concat(l.birthDate.month)),
            ("miniCompany" in l || "*miniCompany" in l) &&
              "0" === l.entityUrn.split(",")[1].split(")")[0] &&
              ((o.company = l.name),
              (o.companyId = l["*miniCompany"].match(/\d+$/)[0])),
            l.publicIdentifier && (o.publicIdentifier = l.publicIdentifier);
        if (r.phoneNumbers && 0 !== r.phoneNumbers.lenght)
          for (var s = 0, c = r.phoneNumbers; s < c.length; s++) {
            var l;
            o[(l = c[s]).type] = l.number;
          }
        return r.emailAddress && (o.email = r.emailAddress), o;
      }),
      e
    );
  })())();
  chrome.runtime.onMessage.addListener(function (e, n, t) {
    var r, o;
    if (
      "FETCH_PROFILE" === e.type &&
      (null === (r = n.tab) || void 0 === r ? void 0 : r.id)
    ) {
      var i = n.tab.id,
        a = e.profileId;
      return (
        A.fetchProfileData(a, i)
          .then(function (e) {
            chrome.tabs.sendMessage(i, {
              message: "PROFILE_DATA_RESULT",
              data: e,
            });
          })
          .catch(function (e) {
            chrome.tabs.sendMessage(i, {
              type: "PROFILE_DATA_ERROR",
              error: e.message,
            });
          }),
        !0
      );
    }
    if (
      "FETCH_PROFILE_SEARCH" === e.type &&
      (null === (o = n.tab) || void 0 === o ? void 0 : o.id)
    ) {
      var s = n.tab.id;
      return (
        (a = e.profileId),
        A.fetchProfileData(a, s)
          .then(function (e) {
            chrome.tabs.sendMessage(s, {
              type: "SEARCH_PROFILE_DATA_RESULT",
              data: e,
            });
          })
          .catch(function (e) {
            chrome.tabs.sendMessage(s, {
              type: "PROFILE_DATA_ERROR",
              error: e.message,
            });
          }),
        !0
      );
    }
  }),
    chrome.tabs.onUpdated.addListener(function (e, n, t) {
      var r, o;
      if (
        "complete" === n.status &&
        (null === (r = t.url) || void 0 === r
          ? void 0
          : r.includes("linkedin.com/in/"))
      ) {
        var i =
          null === (o = t.url.match(/\/in\/([^/]+)/)) || void 0 === o
            ? void 0
            : o[1];
        i &&
          A.fetchProfileData(i, e)
            .then(function (n) {
              chrome.tabs.sendMessage(e, {
                type: "PROFILE_DATA_RESULT",
                data: n,
              });
            })
            .catch(function (n) {
              chrome.tabs.sendMessage(e, {
                type: "PROFILE_DATA_ERROR",
                error: n.message,
              });
            });
      }
    });
})();
