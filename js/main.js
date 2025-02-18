addEventListener("load", () => {
  const printButton = document.querySelector("button.print");

  printButton.addEventListener("click", () => {
    window.print();
  });

  test();

  getPageData();
});

function test() {
  const questionnaireDetailsBody = document.querySelector(
    ".questionnaire-details .content-card-body"
  );

  const detailItem1 = new DetailItemComponent(
    "Name", "Questionnaire Name"
  );
  questionnaireDetailsBody.appendChild(detailItem1.element);

  const detailItem3 = new DetailItemComponent(
    "Date:", "Date of Report"
  );
  questionnaireDetailsBody.appendChild(detailItem3.element);

  const reportModulesContentCardBody = document.querySelector(
    ".report-modules .content-card-body"
  );

  const reportModuleComponent = new ReportModuleComponent(
    "Personality",
    "60-80%",
    "Candidate scored 40-59% in personality, showing a mix of expressive and reserved communication with a balanced outlook.",
    "sampleImages/scoreGauge.png",
    "The candidate demonstrates a moderate level of friendliness and engagement, reflected in their score of 40-59%. Their communication style is a mix of expressive and reserved, which sometimes limits their ability to fully connect with customers. They maintain a balanced outlook, neither overly optimistic nor pessimistic, which can contribute to steady, if not highly engaging, customer interactions. To further enhance their friendly personality, the candidate should focus on developing a more consistently expressive communication style and fostering a more optimistic approach. Engaging in activities that boost social confidence and positivity can help them become more approachable and engaging. This improvement will enhance their effectiveness in impact roles, ensuring they create more positive and memorable customer experiences."
  );

  reportModulesContentCardBody.appendChild(reportModuleComponent.element);
}

async function getPageData() {
  const url = "https://rprochow.wixsite.com/talentbin/_functions/reportPageContent?questionnaireCandidateId=140bb09f-27ea-4518-a69a-38f20dbf0d54";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "*/*"
      }
    });

    response.json()
      .then(console.log);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
