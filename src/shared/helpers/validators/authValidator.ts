export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) return "Email обов'язковий";
  if (email.length > 100) return "Максимум 100 символів";
  if (!emailRegex.test(email)) return "Невірний формат email";

  return null; // Помилок немає
};

export const validateName = (name: string): string | null => {
  if (!name) return "Ім'я обов'язкове";
  if (name.length < 2) return "Мінімум 2 символи";
  if (name.length > 100) return "Максимум 100 символів";

  return null;
};

export const validatePassword = (password: string): string | null => {
  // Регулярний вираз: латина, мінімум одна буква і одна цифра
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,16}$/;

  if (!password) return "Пароль обов'язковий";
  if (password.length < 5 || password.length > 16) {
    return "Довжина пароля має бути 5-16 символів";
  }
  if (!passwordRegex.test(password)) {
    return "Пароль має містити 5–16 символів, латинські літери та цифри.";
  }

  return null;
};
