import { checkUsernameAvailability } from "../apis/user";

export const validateEmails = (emails) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emails.filter((email) => !re.test(email) && email !== "");
};

export const checkUsername = async (username) => {
  var res = await checkUsernameAvailability({ username });
  console.log(res.data);
  return res.data;
};
