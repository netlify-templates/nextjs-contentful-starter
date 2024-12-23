'use server'

import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req) {
  await sendgrid.send({
    to: "glosch00@gmail.com",
    from: "glosch00@gmail.com",
    subject: 'Losch Guitars website inquiry',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <title>Losch Guitars Inquiry</title>
    </head>

    <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
      </div>
        <div class="container" style="margin-left: 20px;margin-right: 20px;">
          <h3>
            Inquiry from ${req.firstName} ${req.lastName}<br/>
            Respond to: ✉️${req.email}
          </h3>
          <div style="font-size: 16px;">
            <p>Message:</p>
            <p>${req.message}</p>
            <br>
          </div>
        </div>
      </div>
    </body>
    </html>`,
  });
}

export default sendEmail;
