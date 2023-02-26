import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogIn from "../components/logIn";

const Main = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <div>
      <div className="m-10 p-3 text-center text-lg">
        Привет! <br />
        Меня зовут Павел, и это моя дипломная работа. Данное приложение
        представляет собой книгу рецептов с указанием к какому времени приема
        пищи то или иное блюдо относится. В разработке frontend-части приложения
        использовались JShooks, React, Redux, Axios. Backend построен на
        Node.js, Express. Система авторизации разработана с помощью
        JsonWebTokens, bcryptjs. В качестве БД используется MongoDB. В проекте
        реализованы protected-routes, которые дают возможность редактировать и
        удалять элементы списка только авторизованным пользователям. Стилизация
        проекта выполнена с помощью Tailwindcss. Deployment производился через
        Docker.
      </div>
      {token ? (
        " "
      ) : (
        <>
          <div className=" text-center">
            Для возможности редактирования рецептов необходимо войти или
            зарегистрироваться
          </div>
          <div className="container flex justify-between">
            <div className="container flex m-3 ">
              <LogIn />
            </div>
            <div className="container m-auto p-auto text-center w-1/3">
              <Link
                to="/signup"
                className="border-b-2  hover:border-slate-500  transition delay-100"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
