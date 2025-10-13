import React from "react";
import "./RegistrationForm.css";
import { useForm } from "react-hook-form";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";

import logo from "../assets/logo.png"
import bg from "../assets/promo-bg.png"

type FormValues = {
  email: string;
  password: string;
  age: string;
  rules: string;
};

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const hasMinLength = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  const isPasswordValid = hasMinLength && hasLower && hasNumber && hasSpecial;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Дані форми:", data);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordRegister = register("password", {
    required: "Введіть пароль",
    minLength: {
      value: 8,
      message: "Мінімум 8 символів",
    },
    pattern: {
      value: /^(?=.*\d)(?=.*[!@#$%^&*])/,
      message: "Пароль має містити хоча б 1 цифру і спецсимвол",
    },
  });

  return (
    <div className="page">
      <div className="page__container">
        <form
          className="page__registration registration"
          onSubmit={handleSubmit(onSubmit)}
        >
          {" "}
          <div className="page__logo">
            <a href="#">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <h2 className="registration__title">Реєстрація</h2>
          <div className="registration__sign-on">
            Вже з нами? <a href="#">Увійдіть</a>{" "}
          </div>
          <div className="registration__email email">
            <label htmlFor="email" className="email__label">
              Електронна пошта:
            </label>

            <div className="email__wrapper">
              <RiMailLine className="email__icon" />
              <input
                type="text"
                id="email"
                className={`email__input ${errors.email ? "input--error" : ""}`}
                placeholder="name@example.com"
                {...register("email", {
                  required: "Це поле обов’язкове",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Невірний формат email",
                  },
                })}
              />
            </div>
            {!errors.email ? (
              <span>
                Будь ласка, введіть дійсний email. Він буде використан для входу
                та відновлення пароля.
              </span>
            ) : (
              <span className="error-text">{String(errors.email.message)}</span>
            )}
          </div>
          <div className="registration__password password">
            <label htmlFor="password" className="password__label">
              Пароль:
            </label>

            <div className="password__wrapper">
              <RiLockPasswordLine
                style={{ position: "absolute", left: "10px" }}
              />

              <input
                type={showPassword ? "text" : "password"}
                className={`password__input ${
                  errors.password ? "input--error" : ""
                }`}
                id="password"
                placeholder="password"
                {...passwordRegister}
                onChange={(e) => {
                  passwordRegister.onChange(e), setPassword(e.target.value);
                }}
              />

              <button
                type="button"
                className="password__toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
              </button>

              {password && (
                <ul
                  className={`password-checklist ${
                    isPasswordValid ? "hidden" : ""
                  }`}
                >
                  <li className={hasMinLength ? "valid" : "invalid"}>
                    Не менше 8 символів
                  </li>
                  <li className={hasLower ? "valid" : "invalid"}>
                    Принаймні одна мала літера
                  </li>
                  <li className={hasNumber ? "valid" : "invalid"}>
                    Принаймні одна цифра
                  </li>
                  <li className={hasSpecial ? "valid" : "invalid"}>
                    Принаймні один спецсимвол
                  </li>
                </ul>
              )}
            </div>

            {!errors.password ? (
              <span>Мінімум 8 символів, цифра та спецсимвол.</span>
            ) : (
              <span className="error-text">
                {String(errors.password.message)}
              </span>
            )}
          </div>
          <div className="confirmation">
            <div className="confirmation__rules">
              <input
                type="checkbox"
                id="acceptRules"
                {...register("rules", {
                  required: "Потрібно прийняти умови використання",
                })}
              />
              <label htmlFor="acceptRules">
                Я підтверджую, що приймаю <a href="#">умови використання.</a>
              </label>
              <br />
              {!errors.rules ? (
                <span>Прийняття умов є обов’язковим для реєстрації</span>
              ) : (
                <span className="error-text">
                  {String(errors.rules.message)}
                </span>
              )}
            </div>

            <div className="confirmation__age">
              <input
                type="checkbox"
                id="ageConfirm"
                {...register("age", {
                  required: "Ви повинні підтвердити свій вік.",
                })}
              />
              <label htmlFor="ageConfirm">
                Я підтверджую, що мені є 21 рік.
              </label>
              <br />

              {!errors.age ? (
                <span>Реєстрація дозволена особам, які досягли 21 року.</span>
              ) : (
                <span className="error-text">{String(errors.age.message)}</span>
              )}
            </div>

            <div className="confirmation__promo">
              <input type="checkbox" id="promoAgree" />
              <label htmlFor="promoAgree">
                Я погоджуюсь отримувати акційні пропозиції, новини та бонуси
              </label>
              <br />
              <span>Будьте в курсі останніх акцій та бонусів!</span>
            </div>
          </div>
          <button type="submit" className="registration__btn">
            Зареєструватися
          </button>
        </form>
        <div className="page__discount discount">
          <h3 className="discount__title">
            Реєструйся та отримуй знижку 10% на перше бронювання
          </h3>
          <div className="discount__img">
            <img src={bg} alt="world-map" />
          </div>
        </div>
      </div>
    </div>
  );
};
