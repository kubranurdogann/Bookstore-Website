import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./navbar";
import Footer from "./footer";

function ContactPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      company: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Geçerli bir email girin").required("Email gerekli"),
      company: Yup.string().required("Şirket adı gerekli"),
      message: Yup.string().required("Mesaj boş bırakılamaz"),
    }),
    
    onSubmit: async (values, { resetForm }) => {
  console.log("Gönderilecek değerler:", values); 

  try {
    const response = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      alert("Mesaj başarıyla gönderildi!");
      resetForm();
    } else {
      alert("Bir hata oluştu.");
    }
  } catch (error) {
    console.error("Hata:", error);
    alert("Sunucuya bağlanılamadı.");
  }
}


  });

  return (
    <>
      <Navbar />

      <div className="paddingx py-4">
        <div className="contact-page-header py-4">
          <h3 className="fw-light">Contact Us</h3>
          <h6 className="fw-light">Let's keep in touch</h6>
        </div>

        <div className="form px-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-light">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Example@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                  <div id="emailHelp" className="form-text fw-light">
                    We'll never share your email with anyone else.
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="company" className="form-label fw-light">
                    Your Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="Company Name"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.company && formik.errors.company && (
                    <div className="text-danger">{formik.errors.company}</div>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="message" className="form-label fw-light">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    className="form-control message-box"
                    placeholder="Leave a comment here"
                    rows="4"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="text-danger">{formik.errors.message}</div>
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        {/* İletişim Bilgileri */}
        <div className="contact-boxes">
          <div className="row">
            <div className="col-md-4 p-5">
              <div className="c-box">
                <i className="fa-solid fa-phone-volume"></i>
                <strong className="fw-light">0777 777 7777</strong>
              </div>
            </div>
            <div className="col-md-4 p-5">
              <div className="c-box">
                <i className="fa-solid fa-location-dot"></i>
                <strong className="fw-light">Ankara / TURKIYE</strong>
              </div>
            </div>
            <div className="col-md-4 p-5">
              <div className="c-box">
                <i className="fa-solid fa-envelope"></i>
                <strong className="fw-light">example@gmail.com</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
