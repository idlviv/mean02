import { Mean02Page } from './app.po';

describe('mean02 App', () => {
  let page: Mean02Page;

  beforeEach(() => {
    page = new Mean02Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
