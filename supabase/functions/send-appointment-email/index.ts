import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AppointmentRequest {
  type: 'consultation' | 'treatment';
  date: string;
  time: string;
  services?: string[];
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message?: string;
  };
}


const escapeHtml = (value: unknown): string =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]!));

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

// Valide et échappe tout ce qui vient du formulaire avant de l'insérer dans un
// email HTML : sans cela, n'importe qui pouvait envoyer depuis l'adresse du
// cabinet un email au contenu arbitraire à n'importe quelle adresse.
function sanitize(input: AppointmentRequest): AppointmentRequest {
  const p = input?.personalInfo ?? ({} as AppointmentRequest['personalInfo']);
  const email = String(p.email ?? '').trim();
  if (!EMAIL_RE.test(email) || email.length > 254) throw new Error('Adresse email invalide');
  if (!p.firstName || !p.lastName || !p.phone) throw new Error('Champs obligatoires manquants');
  const cut = (v: unknown, n: number) => escapeHtml(String(v ?? '').slice(0, n));
  return {
    type: input.type === 'treatment' ? 'treatment' : 'consultation',
    date: cut(input.date, 80),
    time: cut(input.time, 20),
    services: Array.isArray(input.services) ? input.services.slice(0, 12).map((x) => cut(x, 120)) : [],
    personalInfo: {
      firstName: cut(p.firstName, 80),
      lastName: cut(p.lastName, 80),
      email,
      phone: cut(p.phone, 40),
      message: p.message ? cut(p.message, 2000).replace(/\n/g, '<br>') : '',
    },
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: config, error: configError } = await supabase
      .from('brevo_config')
      .select('api_key, sender_email')
      .eq('id', 1)
      .single();

    if (configError || !config) {
      throw new Error('Failed to load Brevo configuration');
    }

    const BREVO_API_KEY = config.api_key;
    const BREVO_SENDER_EMAIL = config.sender_email;
    const DOCTOR_EMAIL = 'doc.jofassotte@proximus.be';

    const appointmentData = sanitize(await req.json());

    const appointmentType = appointmentData.type === 'consultation' 
      ? 'Première consultation (30 min)' 
      : 'Traitement';

    const servicesText = appointmentData.services && appointmentData.services.length > 0
      ? `<p><strong>Services demandés:</strong></p><ul>${appointmentData.services.map(s => `<li>${s}</li>`).join('')}</ul>`
      : '';

    const contactData = {
      email: appointmentData.personalInfo.email,
      attributes: {
        PRENOM: appointmentData.personalInfo.firstName,
        NOM: appointmentData.personalInfo.lastName,
        TELEPHONE: appointmentData.personalInfo.phone
      },
      listIds: [],
      updateEnabled: true
    };


    const createContactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(contactData)
    });

    const contactResponseText = await createContactResponse.text();
    console.log('Brevo contact response status:', createContactResponse.status);

    if (!createContactResponse.ok && createContactResponse.status !== 400) {
      console.error('Failed to create/update contact in Brevo CRM, status', createContactResponse.status);
    } else {
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d4a574 0%, #e8c8a0 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-block { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #d4a574; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          h1 { margin: 0; font-size: 24px; }
          h2 { color: #d4a574; font-size: 18px; margin-top: 0; }
          strong { color: #d4a574; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Nouvelle Demande de Rendez-vous</h1>
          </div>
          <div class="content">
            <div class="info-block">
              <h2>Détails du rendez-vous</h2>
              <p><strong>Type:</strong> ${appointmentType}</p>
              <p><strong>Date souhaitée:</strong> ${appointmentData.date}</p>
              <p><strong>Heure souhaitée:</strong> ${appointmentData.time}</p>
              ${servicesText}
            </div>
            
            <div class="info-block">
              <h2>Informations du patient</h2>
              <p><strong>Nom:</strong> ${appointmentData.personalInfo.lastName}</p>
              <p><strong>Prénom:</strong> ${appointmentData.personalInfo.firstName}</p>
              <p><strong>Email:</strong> <a href="mailto:${appointmentData.personalInfo.email}">${appointmentData.personalInfo.email}</a></p>
              <p><strong>Téléphone:</strong> <a href="tel:${appointmentData.personalInfo.phone}">${appointmentData.personalInfo.phone}</a></p>
            </div>
            
            ${appointmentData.personalInfo.message ? `
            <div class="info-block">
              <h2>Message</h2>
              <p>${appointmentData.personalInfo.message}</p>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Cabinet Médical Dre Jocelyne Fassotte<br>
            Rue Edouard Sarlet 31, 4051 Vaux-sous-Chèvremont</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailToDoctor = {
      sender: {
        name: 'Site Web Cabinet Fassotte',
        email: BREVO_SENDER_EMAIL
      },
      to: [
        {
          email: DOCTOR_EMAIL,
          name: 'Dre Jocelyne Fassotte'
        },
        {
          email: 'valeriematrige@gmail.com',
          name: 'Valérie Matrige'
        }
      ],
      subject: `Nouvelle demande de rendez-vous - ${appointmentData.personalInfo.firstName} ${appointmentData.personalInfo.lastName}`,
      htmlContent: emailHtml
    };

    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d4a574 0%, #e8c8a0 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-block { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          h1 { margin: 0; font-size: 24px; }
          h2 { color: #d4a574; font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Demande de rendez-vous bien reçue</h1>
          </div>
          <div class="content">
            <p>Chère/Cher <strong>${appointmentData.personalInfo.firstName} ${appointmentData.personalInfo.lastName}</strong>,</p>
            
            <p>Nous avons bien reçu votre demande de rendez-vous et vous en remercions.</p>
            
            <div class="info-block">
              <h2>Récapitulatif de votre demande</h2>
              <p><strong>Type:</strong> ${appointmentType}</p>
              <p><strong>Date souhaitée:</strong> ${appointmentData.date}</p>
              <p><strong>Heure souhaitée:</strong> ${appointmentData.time}</p>
              ${servicesText}
            </div>
            
            <p>La Docteure Fassotte ou son équipe vous contactera dans les plus brefs délais pour confirmer votre rendez-vous.</p>
            
            <p>Si vous avez des questions, n'hésitez pas à nous contacter :</p>
            <p><strong>Téléphone:</strong> +32 495 28 09 76<br>
            <strong>Email:</strong> doc.jofassotte@proximus.be</p>
            
            <p>Nous nous réjouissons de vous accueillir prochainement.</p>
            
            <p>Bien cordialement,<br>
            <strong>Cabinet Médical Dre Jocelyne Fassotte</strong></p>
          </div>
          <div class="footer">
            <p>Cabinet Médical Dre Jocelyne Fassotte<br>
            Rue Edouard Sarlet 31, 4051 Vaux-sous-Chèvremont, Liège<br>
            Tél: +32 495 28 09 76 | Email: doc.jofassotte@proximus.be</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const confirmationEmail = {
      sender: {
        name: 'Cabinet Dre Jocelyne Fassotte',
        email: BREVO_SENDER_EMAIL
      },
      to: [
        {
          email: appointmentData.personalInfo.email,
          name: `${appointmentData.personalInfo.firstName} ${appointmentData.personalInfo.lastName}`
        }
      ],
      subject: 'Confirmation de votre demande de rendez-vous',
      htmlContent: confirmationEmailHtml
    };

    console.log('=== SENDING EMAIL TO DOCTOR ===');

    const brevoResponse1 = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(emailToDoctor)
    });

    const doctorResponseText = await brevoResponse1.text();
    console.log('Doctor email response status:', brevoResponse1.status);

    if (!brevoResponse1.ok) {
      console.error('Failed to send doctor email, status', brevoResponse1.status);
      throw new Error('Brevo API error (doctor email)');
    }
    console.log('✅ Doctor email sent successfully');

    console.log('=== SENDING CONFIRMATION EMAIL TO PATIENT ===');

    const brevoResponse2 = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(confirmationEmail)
    });

    const patientResponseText = await brevoResponse2.text();
    console.log('Patient email response status:', brevoResponse2.status);

    if (!brevoResponse2.ok) {
      console.error('Failed to send confirmation email, status', brevoResponse2.status);
    } else {
      console.log('✅ Confirmation email sent successfully');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully'
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error && /invalide|manquants/.test(error.message) ? error.message : 'Envoi impossible'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});