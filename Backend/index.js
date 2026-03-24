const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  family: 4,
  // Force IPv4 to bypass Render's ENETUNREACH IPv6 routing errors
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Health check route
app.get('/', (req, res) => {
  res.send('DevNest Contact API Operational');
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Missing required configuration parameters.' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `[DevNest Lead] New Project Initiation from ${fullName}`,
      html: `
        <div style="font-family: monospace; background-color: #06070F; color: #FFFFFF; padding: 40px; border-radius: 8px;">
          <h2 style="color: #63D2FF; margin-bottom: 24px;">DEVNEST SYSTEM NOTIFICATION</h2>
          
          <div style="background-color: #0D1117; border: 1px solid rgba(0, 229, 255, 0.2); padding: 24px; border-radius: 4px;">
            <p style="color: #64748B; font-size: 12px; margin-bottom: 8px;">// DESIGNATION</p>
            <p style="font-size: 18px; margin-top: 0;">${fullName}</p>
            
            <p style="color: #64748B; font-size: 12px; margin-bottom: 8px; margin-top: 24px;">// COMM_CHANNEL</p>
            <p style="font-size: 16px; margin-top: 0; color: #FFAB40;">
              <a href="mailto:${email}" style="color: #FFAB40; text-decoration: none;">${email}</a>
            </p>
            
            <p style="color: #64748B; font-size: 12px; margin-bottom: 8px; margin-top: 24px;">// PROJECT_PARAMETERS (SCOPE)</p>
            <p style="font-size: 16px; margin-top: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 32px; font-size: 12px; color: #64748B;">
            <p>Automated dispatch from DevNest HQ.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Transmission successful.' });
  } catch (error) {
    console.error('Email Dispatch Error:', error);
    res.status(500).json({ error: 'Failed to process transmission logs. System error.' });
  }
});

app.listen(PORT, () => {
  console.log(`[DevNest API] Online and listening on port ${PORT}`);
});
