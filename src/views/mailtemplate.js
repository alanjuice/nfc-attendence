const mailtemplate = (resetLink) => {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Password Reset Email</title>
            <style>
              .container {
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .email {
                width: 80%;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
              }
              .email-title {
                text-align: center;
                margin-bottom: 20px;
              }
              .reset-link {
                text-align: center;
                font-size: 16px;
                color: #007bff;
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <h2 class="email-title">You have opted for resetting your password</h2>
                <p class="reset-link"><a href="${resetLink}">Click to reset password</a></p>
              </div>
            </div>
          </body>
        </html>
      `;
};

module.exports = mailtemplate;
