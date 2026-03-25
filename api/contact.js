import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS Handling (in case of cross-origin requests, though usually unnecessary on Vercel same-domain)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Missing required configuration parameters.' });
  }

  const recipientEmail = process.env.EMAIL_USER;

  try {
    const { data, error } = await resend.emails.send({
      from: 'DevNest Form <onboarding@resend.dev>',
      to: recipientEmail, // The email you registered on Resend with
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
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ error: 'Failed to process transmission logs. System error.' });
    }

    return res.status(200).json({ success: true, message: 'Transmission successful.' });
  } catch (error) {
    console.error('Email Dispatch Error:', error);
    return res.status(500).json({ error: 'Failed to process transmission logs. System error.' });
  }
}
