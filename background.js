chrome.tabs.onCreated.addListener((tab) => {
  const tabId = tab.id;
  const startTime = new Date().toString();

  chrome.storage.local.set({ [`tabStartTime_${tabId}`]: startTime });
});
