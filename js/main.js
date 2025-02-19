addEventListener("load", () => {
  const printButton = document.querySelector("button.print");

  printButton.addEventListener("click", () => {
    window.print();
  });

  getPageData();
});

function getPageData() {
  const url = "https://rprochow.wixsite.com/themindsetiq/_functions/reportpagecontent/b85d9e20-b127-42cb-afff-1206bcacec64";

  fetch(url)
    .then(res => {
      if (res.headers.get('content-type')?.includes('application/json')) {
        return res.json();
      }
      return res.text().then(text => { throw new Error(text); });
    })
    .then(populateData)
    .catch(console.error);
}