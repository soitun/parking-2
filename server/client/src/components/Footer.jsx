import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer grey lighten-4">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h6>About</h6>
            <p>
              List your own parking spot for others to rent during the hours you
              don't need it. You can also search for other people's listings
              around the city!
            </p>
            <p>
              Built with <span role="img">🖤</span> in Miami, FL
            </p>
          </div>

          <div className="col l4 offset-l2 s12">
            <h6>Connect</h6>
            <ul className="footer-links">
              <li>
                <a href="https://medium.com/@visionpoint">Medium</a>
              </li>
              <li>
                <a href="https://github.com/visionpoint">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/visionpoint/">LinkedIn</a>
              </li>
              <li>
                <a href="https://twitter.com/LarxMedia">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          © 2017 PocketPark
          <a className="right" href="https://github.com/visionpoint/parking">
            View Project on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
