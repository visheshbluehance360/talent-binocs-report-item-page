class DetailItemComponent {
  _title = "";
  _body = "";

  constructor(title = "", body = "") {
    this._title = title;
    this._body = body;

    this.titleElement = this.createTitleElement();
    this.bodyElement = this.createBodyElement();
    this.element = this.createElement();
  }

  createTitleElement() {
    const element = document.createElement("div");
    element.classList.add("title");
    element.textContent = this._title;
    return element;
  }

  createBodyElement() {
    const element = document.createElement("div");
    element.classList.add("body");
    element.textContent = this._body;
    return element;
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("detail-item");

    element.appendChild(this.titleElement);
    element.appendChild(this.bodyElement);

    return element;
  }

  set title(value) {
    this._title = value;

    this.titleElement.textContent = value;
  }

  get title() {
    return this._title;
  }

  set body(value) {
    this._body = value;

    this.bodyElement.textContent = value;
  }

  get body() {
    return this._body;
  }
}

class ReportModuleComponent {
  constructor(
    titleText = "",
    scoreText = "",
    summaryText = "",
    graphicUrl = "",
    comprehensiveReportText = ""
  ) {
    this.type = "ReportModuleComponent";
    this.titleText = titleText;
    this.scoreText = scoreText;
    this.summaryText = summaryText;
    this.graphicUrl = graphicUrl;
    this.comprehensiveReportText = comprehensiveReportText;
  }

  get element() {
    const element = document.createElement("div");
    element.classList.add("report-module-item", "header-body-item-card");

    const header = document.createElement("div");
    header.classList.add("header");

    if (this.titleText) {
      const title = document.createElement("div");
      title.classList.add("title");
      title.innerText = this.titleText;
      header.appendChild(title);
    }

    if (this.scoreText) {
      const headerRightText = document.createElement("div");
      headerRightText.classList.add("header-right-text");
      headerRightText.innerText = this.scoreText;
      header.appendChild(headerRightText);
    }

    element.appendChild(header);

    const body = document.createElement("div");
    body.classList.add("body");

    if (this.summaryText) {
      const textContent_Summary = new TextContentComponent(
        "Summary",
        this.summaryText
      );
      body.appendChild(textContent_Summary.element);
    }

    if (this.graphicUrl) {
      const scoreGraphic = document.createElement("img");
      scoreGraphic.classList.add("score-gauge");
      scoreGraphic.alt = "score gauge graphic";
      scoreGraphic.src = this.graphicUrl;
      scoreGraphic.loading = "lazy";
      body.appendChild(scoreGraphic);
    }

    if (this.comprehensiveReportText) {
      const textContent_ComprehensiveReport = new TextContentComponent(
        "Comprehensive Report",
        this.comprehensiveReportText
      );
      body.appendChild(textContent_ComprehensiveReport.element);
    }

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
    body.innerHTML = this.bodyText;

    element.appendChild(title);
    element.appendChild(body);

    return element;
  }
}

class HowToContentComponent {
  _title = '';
  _body = '';

  constructor(title = "", body = "") {
    this.type = "HowToContentComponent";
    this._title = title;
    this._body = body;

    this.titleElement = this.createTitleElement();
    this.bodyElement = this.createBodyElement();
    this.element = this.createElement();
  }

  createTitleElement() {
    const header = document.createElement("div");
    header.classList.add("header");

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerText = this._title;
    header.appendChild(title);

    return header;
  }

  createBodyElement() {
    const body = document.createElement("div");
    body.classList.add("body");

    const textContentBody = document.createElement("div");
    textContentBody.classList.add("text-content-body");
    textContentBody.innerHTML = this._body;
    
    body.appendChild(textContentBody);

    return body;
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("how-to-content-item", "header-body-item-card");

    element.appendChild(this.titleElement);
    element.appendChild(this.bodyElement);

    return element;
  }

  set title(value) {
    this._title = value;

    this.titleElement.textContent = value;
  }

  get title() {
    return this._title;
  }

  set body(value) {
    this._body = value;

    this.bodyElement.textContent = value;
  }

  get body() {
    return this._body;
  }
}
