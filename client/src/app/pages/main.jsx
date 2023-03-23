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
      <div className="textcontainer">
        <h2>Привет!</h2>
        <div>
          Меня зовут Павел, и это моя дипломная работа. Данное приложение
          представляет собой книгу рецептов с указанием к какому времени приема
          пищи то или иное блюдо относится. В разработке frontend-части
          приложения использовались JShooks, React, Redux, Axios. Backend
          построен на Node.js, Express. Система авторизации разработана с
          помощью JsonWebTokens, bcryptjs. В качестве БД используется MongoDB. В
          проекте реализованы protected-routes, которые дают возможность
          редактировать и удалять элементы списка только авторизованным
          пользователям. Deployment производился через Docker.
        </div>
      </div>
      {token ? null : (
        <>
          <div className="textcontainer">
            Для возможности добавления рецептов необходимо войти или
            зарегистрироваться. <br />
            <span>
              {" "}
              Для редактирования/удаления рецептов необходимо войти как
              администратор (email: admin@mail.ru, password: 12345678)
            </span>
          </div>
          <div className="container">
            <div className="logincontainer">
              <LogIn />
            </div>
            <div className="signupcontainer">
              <Link to="/signup">Зарегистрироваться</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
