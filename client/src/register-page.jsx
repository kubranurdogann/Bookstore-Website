import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Libraryİmage from "./img/Library-img.png";

function RegisterPage() {
  const navigate = useNavigate();

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email zorunlu";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Geçersiz email adresi";
    }
    return error;
  }

  function validateUsername(value) {
    let error;
    if (!value) {
      error = "Kullanıcı adı zorunlu";
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
      error =
        "Sadece İngilizce harfler, rakamlar ve alt çizgi kullanılabilir (3-20 karakter)";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Şifre zorunlu";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)
    ) {
      error =
        "Şifre en az 8 karakter olmalı ve büyük harf, küçük harf, sayı, özel karakter içermelidir";
    }
    return error;
  }

  return (
    <div className="form-bodycolor">
      <div className="login-page">
        <div className="row">
          <div className="col-6">
            <div className="left-side">
              <div className="form-area">
                <div className="form-container">
                  <div className="text-center">
                    <h2 className="center mb-5 fw-lighter">Kayıt Ol</h2>
                  </div>
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      password: "",
                    }}
                    onSubmit={async (values, { resetForm }) => {
                      try {
                        const res = await fetch(
                          "http://localhost:3000/api/register",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values),
                          }
                        );

                        const data = await res.json();
                        if (res.ok) {
                          alert("Kayıt başarılı!");
                          navigate("/login", { state: data.user });
                          
                          resetForm();
                        } else {
                          alert("Hata: " + data.error);
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Sunucu hatası");
                      }
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div>
                          <div>
                            <Field name="name" validate={validateUsername}  placeholder="Kullanıcı adı" />
                            {errors.name && touched.name && (
                              <div className="error-text">{errors.name}</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div>
                            <Field name="email" validate={validateEmail} placeholder="Email" />
                            {errors.email && touched.email && (
                              <div className="error-text">{errors.email}</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div>
                            <Field
                              type="password"
                              name="password"
                              validate={validatePassword}
                               placeholder="Şifre"
                            />
                            {errors.password && touched.password && (
                              <div className="error-text">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>

                        <button className="submit-button mt-4" type="submit">Kaydol</button>
                        <span className="direct-button"><a href="/login">Hesabın var mı? Giriş Yap!</a></span>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="img-area">
              <img className="login-library-img" src={Libraryİmage} alt="" />
              <h1 className="login-library-text">
                Kitapların Büyüsüne Kapıl...
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
