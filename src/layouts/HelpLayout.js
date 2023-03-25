import { NavLink, Outlet } from "react-router-dom";
import Footer from "../pages/footer/Footer";

export default function HelpLayout() {
  return (
    <>
      <div>
        <div className="article-main">
          <div className="help-layout">
            <h2>Website Help</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
              quas debitis quibusdam deserunt repellat hic molestias ipsum
              commodi aut odit!
            </p>

            <nav>
              <NavLink to="faq">View the FAQ</NavLink>
              <NavLink to="https://book-tour-frontend-production.up.railway.app/contact">
                Contact Us
              </NavLink>
            </nav>

            <Outlet />
          </div>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </>
  );
}
