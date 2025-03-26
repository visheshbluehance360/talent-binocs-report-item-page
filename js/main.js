addEventListener("load", () => {
  const printButton = document.querySelector("button.print");

  printButton.addEventListener("click", () => {
    window.print();
  });

  const body = document.querySelector("body");
  body.classList.add("loading-data");

  getPageData();
});

function getPageData() {
  const siteMainUrl = "https://rprochow.wixsite.com/themindsetiq";
  const httpFunctionName = "reportpagecontent";
  const pageItemId = "e005e670-abd8-4555-a8b4-ff8f0e6f07c9";

  const url = `${siteMainUrl}/_functions/${httpFunctionName}/${pageItemId}`;

  const body = document.querySelector("body");

  fetch(url)
    .then(res => {
      if (res.headers.get('content-type')?.includes('application/json')) {
        return res.json();
      }
      return res.text().then(text => { throw new Error(text); });
    })
    .then(data => {
      if (!data || data.error) {
        body.classList.add("report-not-found");
      } else {
        populateData(data);
      }
    })
    .catch(console.error)
    .finally(() => {

      body.classList.remove("loading-data");
    });
}