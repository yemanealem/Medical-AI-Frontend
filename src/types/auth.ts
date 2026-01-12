export type Gender = "male" | "female" | "other" | "prefer_not_to_say" | "";

export interface SignupForm {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  age: string;
  gender: Gender;
}

export interface LoginForm {
  username: string;
  password: string;
}
