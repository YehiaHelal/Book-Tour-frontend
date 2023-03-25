import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

export default function Contact() {
  const data = useActionData();
  const navTo = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof data === "object") {
      setShowPopup(true);
      setTimeout(() => {
        navTo("/");
      }, 2000);
    }
  }, [data]);

  return (
    <>
      <div className="article-main">
        <div className="grid-container-contact">
          <div className="">
            <h3>Contact Us</h3>
            <Form method="post" action="/contact">
              <label>
                <span>Your email:</span>
                <input type="email" name="email" required />
              </label>
              <label>
                <span>Your message:</span>
                <textarea name="message" required></textarea>
              </label>
              <button>Submit</button>
              {showPopup && (
                <p>Sumbit was Successful, redirecting in 1sec ..</p>
              )}
            </Form>
          </div>
          <div>
            <h3>Mobile: 01010101010 / Mobile : 01010101020</h3>
            <p>
              Our Branches: Lorem ipsum dolor sit amet, consectetur adipiscing
            </p>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </>
  );
}

export const contactAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    message: data.get("message"),
  };

  // send your post request

  if (submission.message.length < 1) {
    return { error: "Message must be over 10 chars long." };
  }

  // redirect the user
  return submission;
};
