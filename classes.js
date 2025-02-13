class ReportModuleComponent {
  constructor() {
    this.type = "ReportModuleComponent";
    this.titleText = "";
    this.scoreText = "";
    this.summaryText = "";
    this.graphicUrl = "";
    this.comprehensiveReportText = "";
  }

  get element() {
    const element = document.createElement("div");
    element.classList.add("report-module-item", "header-body-item-card");

    const header = document.createElement("div");
    header.classList.add("header");

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerText = this.titleText;

    const headerRightText = document.createElement("div");
    headerRightText.classList.add("header-right-text");
    headerRightText.innerText = this.scoreText;

    header.appendChild(title);
    header.appendChild(headerRightText);

    const body = document.createElement("div");
    body.classList.add("body");

    const textContent_Summary = new TextContentComponent(
      "Summary",
      this.summaryText
    );
    const textContent_ComprehensiveReport = new TextContentComponent(
      "Comprehensive Report",
      this.comprehensiveReportText
    );

    body.appendChild(textContent_Summary.element);
    body.appendChild(textContent_ComprehensiveReport.element);

    element.appendChild(header);
    element.appendChild(body);

    return element;
  }
}

class TextContentComponent {
  constructor(titleText = "", bodyText = "") {
    this.type = "TextContentComponent";
    this.titleText = titleText;
    this.bodyText = bodyText;
  }

  get element() {
    const element = document.createElement("div");
    element.classList.add("text-content");

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerText = this.titleText;

    const body = document.createElement("div");
    body.classList.add("body");
    body.innerText = this.bodyText;

    element.appendChild(title);
    element.appendChild(body);

    return element;
  }
}
