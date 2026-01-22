import forgotPasswordPage from "../support/pom/forgotPasswordPage";
import data from "../fixtures/orangehrmData.json";

describe('OrangeHRM - Forgot Password', () => {
  beforeEach(() => {
    //always start from login, then navigate to the forgot password page
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

  //the success flow depends on email and backend behavior, which is outside this UI test scope
  // it('TC-FP-003 - Reset password berhasil dengan username valid', () => {
  //   forgotPasswordPage.inputUsername(data.validUsername);
  //   forgotPasswordPage.clickReset();
  //   forgotPasswordPage.assertResetSuccess();
  // }); 
});
