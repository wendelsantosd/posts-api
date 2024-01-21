export enum StrengthPassword {
  strong,
  medium,
  weak,
}

export const strengthPasswordCheck = (password: string): StrengthPassword => {
  const strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
  );
  const mediumPassword = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
  );

  if (strongPassword.test(password)) {
    return StrengthPassword.strong;
  } else if (mediumPassword.test(password)) {
    return StrengthPassword.medium;
  } else {
    return StrengthPassword.weak;
  }
};
