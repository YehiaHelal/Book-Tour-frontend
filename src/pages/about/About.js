import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Footer from "../footer/Footer";

export default function About() {
  const [user, setUser] = useState("mario");
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <div className="article-main">
        <div className="about">
          {name && <p>Hi, {name}!</p>}

          <h2>About Us</h2>
          <p>
            Tours Online is amet consectetur adipisicing elit. Qui provident
            consequuntur vel omnis quisquam rem harum, maxime expedita, ullam ut
            dolore! Distinctio eos minima voluptatum totam id hic! Sapiente
            debitis quia illum officia obcaecati provident nulla odio molestiae
            suscipit quasi.
          </p>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </div>
  );
}
