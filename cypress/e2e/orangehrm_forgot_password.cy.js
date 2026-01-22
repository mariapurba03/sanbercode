import forgotPasswordPage from "../support/pom/forgotPasswordPage";
import data from "../fixtures/orangehrmData.json";

describe('OrangeHRM - Forgot Password', () => {
  beforeEach(() => {
    forgotPasswordPage.visitLogin();
    forgotPasswordPage.openForgotPasswordPage();
  });

  it('TC-FP-001 – Password reset should fail when the username field is empty', () => {
    forgotPasswordPage.clickReset();
    forgotPasswordPage.assertRequired();
  });

  it('TC-FP-002 – User can cancel the password reset process', () => {
    forgotPasswordPage.clickCancel();
    forgotPasswordPage.assertBackToLogin();
  });

  // it('TC-FP-003 - Reset password berhasil dengan username valid', () => {
  //   forgotPasswordPage.inputUsername(data.validUsername);
  //   forgotPasswordPage.clickReset();
  //   forgotPasswordPage.assertResetSuccess();
  // }); 
});
