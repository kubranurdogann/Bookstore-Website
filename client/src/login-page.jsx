import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Libraryİmage from "./img/Library-img.png";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function LoginPage() {
  const { setUser } = useContext(UserContext);
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
                    <h2 className="center mb-5 fw-lighter">Giriş Yap</h2>
                  </div>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    onSubmit={async (values, { resetForm }) => {
                      try {
                        const res = await fetch(
                          "http://localhost:3000/api/login",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values),
                          }
                        );

                        const data = await res.json();
                        console.log("Sunucudan gelen veri:", data);

                        if (res.ok) {
                          alert("Giriş başarılı!");
                          localStorage.setItem(
                            "user",
                            JSON.stringify(data.user)
                          );
                          setUser(data.user);
                          navigate("/", { state: data.user });
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
                            <Field
                              name="email"
                              validate={validateEmail}
                              placeholder="Email"
                            />
                            {errors.email && touched.email && (
                              <div className="error-text">{errors.email}</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div>
                            <Field
                              name="password"
                              type="password"
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
                        <div className="px-2">
                          <button type="submit" className="submit-button mt-4">
                            Gönder
                          </button>
                          <span className="direct-button">
                            <a href="/register">Hesabın yok mu? Kayıt ol!</a>
                          </span>
                        </div>
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

export default LoginPage;
