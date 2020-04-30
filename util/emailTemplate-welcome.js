exports.welcomeTemplate = (url) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Welcome to Movie Map</title>
      <style>
        @media only screen and (max-width: 620px) {
          table[class="body"] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
          table[class="body"] p,
          table[class="body"] ul,
          table[class="body"] ol,
          table[class="body"] td,
          table[class="body"] span,
          table[class="body"] a {
            font-size: 16px !important;
          }
          table[class="body"] .wrapper,
          table[class="body"] .article {
            padding: 10px !important;
          }
          table[class="body"] .content {
            padding: 0 !important;
          }
          table[class="body"] .container {
            padding: 0 !important;
            width: 100% !important;
          }
          table[class="body"] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
          table[class="body"] .btn table {
            width: 100% !important;
          }
          table[class="body"] .btn a {
            width: 100% !important;
          }
          table[class="body"] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }

        /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
          .btn-primary table td:hover {
            background-color: #34495e !important;
          }
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important;
          }
        }
      </style>
    </head>
    <body
      class=""
      style="
        background-color: #f6f6f6;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="body"
        style="
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%;
          background-color: #f6f6f6;
        "
      >
        <tr>
          <td
            style="font-family: sans-serif; font-size: 14px; vertical-align: top;"
          >
            &nbsp;
          </td>
          <td
            class="container"
            style="
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px;
              width: 580px;
            "
          >
            <div
              class="content"
              style="
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px;
              "
            >
              <!-- START CENTERED WHITE CONTAINER -->
              <span
                class="preheader"
                style="
                  color: transparent;
                  display: none;
                  height: 0;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                  mso-hide: all;
                  visibility: hidden;
                  width: 0;
                "
                >Welcome to Movie Map!</span
              >
              <table
                class="main"
                style="
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  width: 100%;
                  background: #ffffff;
                  border-radius: 3px;
                "
              >
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td
                    class="wrapper"
                    style="
                      font-family: sans-serif;
                      font-size: 14px;
                      vertical-align: top;
                      box-sizing: border-box;
                      padding: 20px;
                    "
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        border-collapse: separate;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        width: 100%;
                      "
                    >
                      <tr>
                        <td>
                          <img
                            style="width: 100%;"
                            src="https://raw.githubusercontent.com/bluerainmango/imgs/master/email-img3.jpg"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            vertical-align: top;
                          "
                        >
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 16px;
                              font-weight: bolder;
                              color: #3498db;
                              margin: 0;
                              margin-top: 10px;
                              margin-bottom: 15px;
                            "
                          >
                            Welcome, and thank you for becoming a Movie Map
                            member!
                          </p>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                              margin-bottom: 15px;
                            "
                          >
                            I'm happy you joined our ever-growing network of film
                            enthusiasts. Enjoy and share all the movies you love
                            in a single app with other passionate cinephiles.
                          </p>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                              margin-bottom: 15px;
                            "
                          >
                            As a new member, here are some of the perks you'll
                            receive:
                          </p>
                          <ul
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                              margin-bottom: 15px;
                            "
                          >
                            <li>Ability to save your favorite films</li>
                            <li>Additional personalized film recommendations</li>
                            <li>Added capability to customize your account</li>
                          </ul>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="btn btn-primary"
                            style="
                              border-collapse: separate;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              width: 100%;
                              box-sizing: border-box;
                            "
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="left"
                                  style="
                                    font-family: sans-serif;
                                    font-size: 14px;
                                    vertical-align: top;
                                    padding-bottom: 15px;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      border-collapse: separate;
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      width: auto;
                                    "
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            font-family: sans-serif;
                                            font-size: 14px;
                                            vertical-align: top;
                                            background-color: #3498db;
                                            border-radius: 5px;
                                            text-align: center;
                                          "
                                        >
                                          <a
                                            href="https://movie-map.herokuapp.com/"
                                            target="_blank"
                                            style="
                                              display: inline-block;
                                              color: #ffffff;
                                              background-color: #3498db;
                                              border: solid 1px #3498db;
                                              border-radius: 5px;
                                              box-sizing: border-box;
                                              cursor: pointer;
                                              text-decoration: none;
                                              font-size: 14px;
                                              font-weight: bold;
                                              margin: 0;
                                              padding: 12px 25px;
                                              text-transform: capitalize;
                                              border-color: #3498db;
                                            "
                                            >Get Started</a
                                          >
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                              margin-bottom: 15px;
                              font-weight: bolder;
                            "
                          >
                            Learn more about the creators!
                          </p>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                            "
                          >
                            Emily Yu
                            <a
                              target="_blank"
                              href="https://emily-yu-portfolio.herokuapp.com/"
                              >Portfolio</a
                            >
                            <a
                              target="_blank"
                              href="https://www.linkedin.com/in/bluerainmango/"
                              >LinkedIn</a
                            >
                          </p>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                            "
                          >
                            Fabiola Guzman
                            <a target="_blank" href="https://github.com/fguzmanrs"
                              >Github</a
                            >
                            <a
                              target="_blank"
                              href="https://www.linkedin.com/in/fabiola-guzman-reyes-88a119133/"
                              >LinkedIn</a
                            >
                          </p>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                            "
                          >
                            Francisco Ortiz
                            <a
                              target="_blank"
                              href="https://ffortizn.github.io/portfolio.html"
                              >Portfolio</a
                            >
                            <a
                              target="_blank"
                              href="https://www.linkedin.com/in/ffortizn/"
                              >LinkedIn</a
                            >
                          </p>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                              margin-bottom: 15px;
                            "
                          >
                            Hayden Cross
                            <a
                              target="_blank"
                              href="https://hcross28.github.io/2nd-Profile-Update/index.html"
                              >Portfolio</a
                            >
                            <a
                              target="_blank"
                              href="https://www.linkedin.com/in/hayden-cross-86803a19a/"
                              >LinkedIn</a
                            >
                          </p>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                            "
                          >
                            Thank you for your interest!
                          </p>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                              margin-bottom: 15px;
                            "
                          >
                            The Movie Map Team
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- END MAIN CONTENT AREA -->
              </table>

              <!-- START FOOTER -->
              <div
                class="footer"
                style="
                  clear: both;
                  margin-top: 10px;
                  text-align: center;
                  width: 100%;
                "
              >
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%;
                  "
                >
                  <tr>
                    <td
                      class="content-block"
                      style="
                        font-family: sans-serif;
                        vertical-align: top;
                        padding-bottom: 10px;
                        padding-top: 10px;
                        font-size: 12px;
                        color: #999999;
                        text-align: center;
                      "
                    >
                      <span
                        class="apple-link"
                        style="
                          color: #999999;
                          font-size: 12px;
                          text-align: center;
                        "
                        >UCR Extension Coding Bootcamp</span
                      >
                      <br />
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->

              <!-- END CENTERED WHITE CONTAINER -->
            </div>
          </td>
          <td
            style="font-family: sans-serif; font-size: 14px; vertical-align: top;"
          >
            &nbsp;
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
