import { InnobookClientPage } from './app.po';

describe('innobook-client App', () => {
  let page: InnobookClientPage;

  beforeEach(() => {
    page = new InnobookClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
