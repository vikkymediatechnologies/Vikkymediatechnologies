import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();

    // ✅ Validate fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ Save to Supabase
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          service,
          message,
          status: 'new',
        },
      ])
      .select();

    if (error) throw error;

    // ✅ Send Email Notification
    // ✅ Send Email Notification (Gmail Reliable Setup)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT),
    //   secure: true,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });

    // await transporter.sendMail({
    //   from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
    //   to: "vikkymediatechnologies@gmail.com",
    //   subject: `📩 New Contact Message from ${name}`,
    //   html: `
    //     <h2>New Contact Request</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Service:</strong> ${service}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });


    
await transporter.sendMail({
  from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
  to: "vikkymediatechnologies@gmail.com",
  subject: `📩 New Contact Message from ${name}`,
  html: `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});

    return NextResponse.json(
      { success: true, message: "Message received and email sent!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact API Error:", err);

    return NextResponse.json(
      { error: "Something went wrong. Try again later." },
      { status: 500 }
    );
  }
}
