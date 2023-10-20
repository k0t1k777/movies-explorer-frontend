export const validationPattern = {
  name: "^[a-zA-Zа-яА-ЯёЁ]{2,30}$",
  email: "^[^@]+@[^@]+.[a-zA-Z]{2,5}$",
  password: "(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.n])(?=.*[A-Z])(?=.*[a-z]).*",
}
