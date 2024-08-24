import {Resend} from "resend";

const nodemailer = require('nodemailer');   

export const sendPasswordResetEmail = async (email: string, token: string) => {
    // const resetLink = `http://localhost:3000/new-password?token=${token}`;
    const resetLink = `https://authify-three.vercel.app/new-password?token=${token}`;

//     const resend = new Resend(process.env.RESEND_API_KEY as string);
  
//     await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: email,
//       subject: "Reset your password",
//       html: `
//       <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
//     <table align="center" width="600" style="border: 1px solid #cccccc; border-collapse: collapse; background-color: #ffffff;">
//         <tr>
//             <td align="center" style="padding: 20px; background-color: #0073e6; color: #ffffff;">
//                 <h2 style="margin: 0;">Password Reset Request</h2>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 20px;">
//                 <p style="margin: 0 0 15px;">Good Day,</p>
//                 <p style="margin: 0 0 15px;">We received a request to reset the password associated with your account. If you made this request, please click the button below to reset your password:</p>
//                 <p style="text-align: center; margin: 0 0 30px;">
//                     <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #0073e6; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
//                 </p>
//                 <p style="margin: 0 0 15px;">If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
//             </td>
//         </tr>
//         <tr>
//             <td align="center" style="padding: 20px; background-color: #f4f4f4; color: #666666;">
//                 <p style="margin: 0;">Thank you for using Authify!</p>
//                 <p style="margin: 0;">The Authify Team</p>
//             </td>
//         </tr>
//     </table>
// </body>
//       `,
//     });

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
      user : "kanoahsf@gmail.com",
      pass : process.env.GMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false //Remove when in development
    }
  })

  const info = await transporter.sendMail({
    from: 'Authify', // sender address
    to: email, // list of receivers
    subject: "Reset your password",
    html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <table align="center" width="600" style="border: 1px solid #cccccc; border-collapse: collapse; background-color: #ffffff;">
            <tr>
                <td align="center" style="padding: 20px; background-color: #0073e6; color: #ffffff;">
                    <h2 style="margin: 0;">Password Reset Request</h2>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="margin: 0 0 15px;">Good Day,</p>
                    <p style="margin: 0 0 15px;">We received a request to reset the password associated with your account. If you made this request, please click the button below to reset your password:</p>
                    <p style="text-align: center; margin: 0 0 30px;">
                        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #0073e6; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    </p>
                    <p style="margin: 0 0 15px;">If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 20px; background-color: #f4f4f4; color: #666666;">
                    <p style="margin: 0;">Thank you for using Authify!</p>
                    <p style="margin: 0;">The Authify Team</p>
                </td>
            </tr>
        </table>
    </body>
        `,
  });

  console.log("Message sent: %s", info.messageId);
  };
  

//   <a href="${resetLink}">Password Reset Link</a>