chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  const tabId = activeTab.id;
  console.log(tabId);

  chrome.storage.local.get([`tabStartTime_${tabId}`], (result) => {
    if (result[`tabStartTime_${tabId}`]) {
      let startTime = new Date(result[`tabStartTime_${tabId}`]);

      const paragraph = document.getElementById("openTime");

      if (paragraph) {
        paragraph.textContent =
          paragraph.textContent + ` ${formatTime(startTime)}`;
      }

      const updateTimer = () => {
        let currTime = new Date();

        let timeDiff = currTime - startTime;

        let seconds = Math.floor(timeDiff / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds = seconds % 60;
        minutes = minutes % 60;

        if (hours == 0 && minutes == 0) {
          return `${seconds} ${seconds == 1 ? "second" : "seconds"}`;
        } else if (hours == 0) {
          return `${minutes} ${
            minutes == 1 ? "minute" : "minutes"
          } and ${seconds} ${seconds == 1 ? "second" : "seconds"}`;
        }
        return `${hours} hours ${minutes} ${
          minutes == 1 ? "minute" : "minutes"
        } and ${seconds} ${seconds == 1 ? "second" : "seconds"}`;
      };

      const updateDisplay = () => {
        const paragraph = document.getElementById("timerDisplay");

        if (paragraph) {
          paragraph.textContent = updateTimer();
        }
      };

      updateDisplay(); // initial display update

      setInterval(updateDisplay, 1000);
    } else {
      console.log("no tab start time found :(");
    }
  });
});

const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const isPM = hours >= 12;

  hours = hours % 12;
  hours = hours ? hours : 12;

  let minutesStr = minutes.toString().padStart(2, "0");

  let period = isPM ? "P.M." : "A.M.";

  return `${hours}:${minutesStr} ${period}`;
};
