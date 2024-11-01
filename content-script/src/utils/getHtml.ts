type HTMLDocumentCallback = (html: Document | null, url: string) => void;
export async function executeScriptAndParseHTML(
  callback: HTMLDocumentCallback,
): Promise<void> {
  const documentHTML = document.documentElement.outerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString(documentHTML, "text/html");

  callback(doc, window.location.href);
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   const currentTab = tabs[0];
  //   if (currentTab && currentTab.id) {
  //     setTimeout(() => {
  //       chrome.scripting.executeScript(
  //         {
  //           target: { tabId: currentTab.id ? currentTab.id : 0 },
  //           func: () => {
  //             return document.documentElement.outerHTML;
  //           },
  //         },
  //         (result) => {
  //           if (currentTab.url) {
  //             if (result && result[0].result) {
  //               const parser = new DOMParser();
  //               const html = parser.parseFromString(
  //                 result[0].result,
  //                 "text/html",
  //               );
  //               callback(html, currentTab.url);
  //             } else {
  //               callback(null, currentTab.url);
  //             }
  //           }
  //         },
  //       );
  //     }, 1000);
  //   }
  // });
}
