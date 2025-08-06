import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Créer le transporteur Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // rounders.pro@gmail.com
      pass: process.env.GMAIL_PASS  // Mot de passe d'application
    }
  });

  // Préparer l'email
  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    to: 'rounders.pro@gmail.com',
    replyTo: email,
    subject: `[Contact Rounders] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a2c38; border-bottom: 2px solid #4a9eff; padding-bottom: 10px;">
          Nouveau message du formulaire de contact
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Nom :</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Sujet :</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #1a2c38; margin-top: 0;">Message :</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #64748b; font-size: 12px;">
          <p>Cet email a été envoyé depuis le formulaire de contact de Rounders.pro</p>
        </div>
      </div>
    `
  };

  try {
    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    
    console.log('Email envoyé avec succès:', { name, email, subject });
    
    res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi du message',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}