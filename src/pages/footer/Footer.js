export default function Footer() {
  return (
    <div className="footer">
      <div className="grid-container-footer">
        <div className="footer-row">
          <div className="medium-text-bold">Tours Online</div>
          <div>Book Tours online </div>
          <div>Book now with us and enjoy some days off</div>
          <div>Tax number: 000</div>
        </div>
        <div className="footer-row">
          <div>
            <a href="https://book-tour-frontend-production.up.railway.app/about">
              About Us
            </a>
          </div>

          <div>
            <a href="https://book-tour-frontend-production.up.railway.app/contact">
              Contact
            </a>
          </div>
          <div>
            <a href="https://book-tour-frontend-production.up.railway.app/help">
              FAQ Page
            </a>
          </div>
        </div>
        <div className="footer-row">
          <div>
            <a href="https://book-tour-frontend-production.up.railway.app/contact">
              Our Services
            </a>
          </div>

          <div>
            <a href="https://book-tour-frontend-production.up.railway.app/contact">
              Our branches
            </a>
          </div>
        </div>
        <div className="footer-row">
          <div>Download Our App</div>
          <img
            src={require(`./../../img/downloadapp/appGallery.webp`)}
            alt="offer2-three"
          />
          <img
            src={require(`./../../img/downloadapp/appStore.webp`)}
            alt="offer2-three"
          />
          <img
            src={require(`./../../img/downloadapp/googlePlay.webp`)}
            alt="offer2-three"
          />
        </div>
      </div>
    </div>
  );
}
