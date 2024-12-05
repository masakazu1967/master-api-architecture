export const MessageFormat = {
  NOT_FOUND: `${1}の${0}は存在しません。値: ${2}`,
  POSITIVE: `${0}は正の数で入力して下さい。値: ${1}`,
  INTEGER: `${0}は整数で入力して下さい。値: ${1}`,
  LENGTH: `${0}は${1}文字で入力して下さい。`,
  STRING_TYPE: `${0}は${1}で入力してください。`,
  MIN: `${0}は${1}文字以上で入力して下さい。`,
  MAX: `${0}は${1}文字以下で入力して下さい。`,
} as const;

type MessageFormat = (typeof MessageFormat)[keyof typeof MessageFormat];
