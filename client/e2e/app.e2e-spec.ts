import { StartPage } from './app.po';

describe('start App', () => {
  let page: StartPage;

  beforeEach(() => {
    page = new StartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
