addEventListener("load", () => {
  const printButton = document.querySelector("button.print");

  printButton.addEventListener("click", () => {
    window.print();
  });

  const body = document.querySelector("body");
  body.classList.add("loadingData");

  getPageData();
});

function getPageData() {
  const url = "https://rprochow.wixsite.com/themindsetiq/_functions/reportpagecontent/24ba886a-c45c-4228-9ad4-ee9606ebaa0f";

  fetch(url)
    .then(res => {
      if (res.headers.get('content-type')?.includes('application/json')) {
        return res.json();
      }
      return res.text().then(text => { throw new Error(text); });
    })
    .then(populateData)
    .catch(console.error)
    .finally(() => {
      const body = document.querySelector("body");
      body.classList.remove("loadingData");
    });
}