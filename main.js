addEventListener("load", () => {
  const printButton = document.querySelector("button.print");

  printButton.addEventListener("click", () => {
    window.print();
  });

  test();
});

function test() {
  const reportModulesContentCardBody = document.querySelector(
    ".report-modules .content-card-body"
  );

  const reportModuleComponent = new ReportModuleComponent(
    "Personality",
    "60-80%",
    "Candidate scored 40-59% in personality, showing a mix of expressive and reserved communication with a balanced outlook.",
    "",
    "The candidate demonstrates a moderate level of friendliness and engagement, reflected in their score of 40-59%. Their communication style is a mix of expressive and reserved, which sometimes limits their ability to fully connect with customers. They maintain a balanced outlook, neither overly optimistic nor pessimistic, which can contribute to steady, if not highly engaging, customer interactions. To further enhance their friendly personality, the candidate should focus on developing a more consistently expressive communication style and fostering a more optimistic approach. Engaging in activities that boost social confidence and positivity can help them become more approachable and engaging. This improvement will enhance their effectiveness in impact roles, ensuring they create more positive and memorable customer experiences."
  );

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
