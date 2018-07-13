import { SunwingContactManagerPage } from './app.po';

describe('SunwingContactManager App', () => {
  let page: SunwingContactManagerPage;

  beforeEach(() => {
    page = new SunwingContactManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Angular: Getting Started!!');
  });
});
