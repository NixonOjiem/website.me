import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { from_name, from_email, message } = await request.json();

    // Basic validation
    if (!from_name || !from_email || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${from_name}" <${process.env.GMAIL_USER}>`,
      replyTo: from_email,
      to: process.env.GMAIL_RECIPIENT,
      subject: `New message from ${from_name}`,
      text: `Name: ${from_name}\nEmail: ${from_email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${from_name}</p>
             <p><strong>Email:</strong> <a href="mailto:${from_email}">${from_email}</a></p>
             <hr>
             <p>${message.replace(/\n/g, "<br>")}</p>`,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to send the message." }, { status: 500 });
  }
}