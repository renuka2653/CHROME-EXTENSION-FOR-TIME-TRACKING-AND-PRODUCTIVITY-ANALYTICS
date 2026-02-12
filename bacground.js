let currentTab = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    trackTime(tab.url);
  }
});

function trackTime(url) {
  if (!url || !url.startsWith("http")) return;

  const endTime = Date.now();
  const timeSpent = Math.floor((endTime - startTime) / 1000);

  if (currentTab) {
    chrome.storage.local.get(["timeData"], (res) => {
      let data = res.timeData || {};
      data[currentTab] = (data[currentTab] || 0) + timeSpent;

      chrome.storage.local.set({ timeData: data });
    });
  }

  currentTab = new URL(url).hostname;
  startTime = Date.now();
}