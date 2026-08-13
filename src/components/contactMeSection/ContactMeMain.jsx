import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "../../utils/gsapAnimations";
import { initTextSplitReveal, initFadeUp, initMagneticHover } from "../../utils/gsapAnimations";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const ContactMeMain = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const socialRef1 = useRef(null);
  const socialRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initTextSplitReveal(headingRef.current);
      initFadeUp(sectionRef.current.querySelectorAll(".reveal-contact"), {
        trigger: sectionRef.current,
        start: "top 80%",
        stagger: 0.15,
      });

      const cleanup1 = initMagneticHover(socialRef1.current, 0.4);
      const cleanup2 = initMagneticHover(socialRef2.current, 0.4);
      return () => {
        cleanup1();
        cleanup2();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    emailjs
      .sendForm("service_ko3hmpt", "template_ahbmmqd", formRef.current, {
        publicKey: "I6HAT5mUZH7WHabGE",
      })
      .then(
        () => {
          setLoading(false);
          setStatus({
            type: "success",
            msg: "Thank you! Your message has been sent successfully.",
          });
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setStatus({
            type: "error",
            msg: "Failed to send message. Please email me directly at adityamayank708@gmail.com",
          });
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <section id="contact" ref={sectionRef} className="section contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="reveal-contact">
            <h2 ref={headingRef} style={{ marginBottom: "1.5rem" }}>
              Let's Build Something Great
            </h2>
            <p style={{ marginBottom: "2rem" }}>
              Have an idea, project, or inquiry? Feel free to reach out directly.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="from_name"
                  id="name"
                  placeholder=" "
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Your Name</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="from_email"
                  id="email"
                  placeholder=" "
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Your Email</label>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  placeholder=" "
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
                <label htmlFor="message">Your Message</label>
              </div>

              {status.msg && (
                <div
                  className="form-success"
                  style={{ color: status.type === "error" ? "#ef4444" : "#22c55e" }}
                >
                  {status.msg}
                </div>
              )}

              <button
                type="submit"
                className="form-submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Column: Information & Links */}
          <div className="contact-info reveal-contact">
            <div className="contact-details">
              <div className="contact-detail-item">
                <HiOutlineMail />
                <a href="mailto:adityamayank708@gmail.com">
                  adityamayank708@gmail.com
                </a>
              </div>

              <div className="contact-detail-item">
                <FiPhone />
                <a href="tel:+919643354240">+91 9643354240</a>
              </div>

              <div className="contact-detail-item">
                <IoLocationOutline />
                <span>Ghaziabad, India</span>
              </div>
            </div>

            <div style={{ marginTop: "auto" }}>
              <p style={{ fontSize: "var(--text-sm)", marginBottom: "1rem" }}>
                CONNECT ON SOCIAL
              </p>
              <div className="contact-socials">
                <a
                  ref={socialRef1}
                  href="https://www.linkedin.com/in/adityamayanksinha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin />
                </a>
                <a
                  ref={socialRef2}
                  href="https://github.com/AdityaMayank05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="GitHub Profile"
                >
                  <FiGithub />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMeMain;
