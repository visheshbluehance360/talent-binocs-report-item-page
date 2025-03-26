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
  const pageItemId = "d2422e94-a655-4637-9756-8959edf91119";

  const url = `https://rprochow.wixsite.com/themindsetiq/_functions/reportpagecontent/${pageItemId}`;

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