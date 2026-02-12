const productiveSites = ["github.com", "stackoverflow.com", "leetcode.com"];
const unproductiveSites = ["facebook.com", "instagram.com", "youtube.com"];

chrome.storage.local.get(["timeData"], (res) => {
  const table = document.getElementById("data");
  const data = res.timeData || {};

  for (let site in data) {
    const minutes = Math.floor(data[site] / 60);
    let status = "Neutral";

    if (productiveSites.includes(site)) status = "Productive ✅";
    if (unproductiveSites.includes(site)) status = "Unproductive ❌";

    table.innerHTML += `
      <tr>
        <td>${site}</td>
        <td>${minutes}</td>
        <td>${status}</td>
      </tr>`;
  }
});