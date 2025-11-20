export const validUser = {
  email: process.env.TEST_USER_EMAIL || "valid@mail.com",
  password: process.env.TEST_USER_PASSWORD || "Xenasd_1"
};
export const invalidPassword = "WrongPass123!";
export const invalidEmail = "validmail.com";