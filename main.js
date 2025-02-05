addEventListener('load', () => {
  console.log('page loaded');
});

class DetailItem {
  constructor(title = '', body = '') {
    this.title = title;
    this.body = body;
  }
}
