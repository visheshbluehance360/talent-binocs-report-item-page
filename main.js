addEventListener("load", () => {
  const printButton = document.querySelector("button.print");

  printButton.addEventListener("click", () => {
    window.print();
  });
});

function test() {
  const reportModulesContentCardBody =
    document.querySelector(".report-modules .content-card-body");

  const reportModuleComponent = new ReportModuleComponent();

  reportModulesContentCardBody.appendChild(reportModuleComponent.element);
}

class DetailItem {
  constructor(title = "", body = "") {
    this.title = title;
    this.body = body;
  }
}

async function getWixAccessToken() {
  const url = "https://www.wixapis.com/oauth2/token";
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({
    clientId: API_KEY,
    grantType: "anonymous",
  });

  try {
    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
}

async function queryWixData(accessToken) {
  if (!accessToken) {
    console.error("No access token provided.");
    return;
  }

  const url = "https://www.wixapis.com/wix-data/v2/items/query";
  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };
  const body = JSON.stringify({
    dataCollectionId: "Compartments",
    query: {},
  });

  try {
    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();
    console.log("Wix Data Response:", data);
  } catch (error) {
    console.error("Error querying Wix data:", error);
  }
}

async function main() {
  const accessToken = await getWixAccessToken();
  await queryWixData(accessToken);
}

main();
