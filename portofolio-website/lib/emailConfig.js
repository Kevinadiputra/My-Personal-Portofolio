// EmailJS Configuration
// Untuk setup EmailJS:
// 1. Daftar di https://www.emailjs.com/
// 2. Buat service (Gmail/Outlook/etc)
// 3. Buat email template
// 4. Dapatkan public key, service ID, dan template ID
// 5. Replace values di bawah ini

export const emailConfig = {
    publicKey: "YOUR_PUBLIC_KEY", // Dapatkan dari EmailJS Dashboard -> Account -> API Keys -> Public Key
    serviceId: "YOUR_SERVICE_ID", // Dapatkan dari EmailJS Dashboard -> Email Services -> Service ID
    templateId: "YOUR_TEMPLATE_ID", // Dapatkan dari EmailJS Dashboard -> Email Templates -> Template ID
};

// Contoh Email Template untuk EmailJS:
/*
Subject: New Message from {{from_name}} - {{subject}}

Hi {{to_name}},

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Kevin Adiputra Portfolio
Reply to: {{reply_to}}
*/