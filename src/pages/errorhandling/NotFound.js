import { NavLink } from "react-router-dom";
import Footer from "../footer/Footer";

export default function NotFound() {
  return (
    <div>
      <div className="article-main">
        <div className="NotFound">
          <h2>Page not found!</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            alias cupiditate ad nostrum doloribus iste tempora quisquam
            excepturi repellat, fugit cumque dolore magni possimus inventore
            neque provident! Sunt, quo eos?
          </p>

          <p>
            Go to the <NavLink to="/">Homepage</NavLink>.
          </p>
          <p></p>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </div>
  );
}
