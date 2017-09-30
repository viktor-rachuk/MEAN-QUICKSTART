import { CcportalPage } from './app.po';

describe('ccportal App', () => {
  let page: CcportalPage;

  beforeEach(() => {
    page = new CcportalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
