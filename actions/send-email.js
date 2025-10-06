import { Resend } from "resend"

// Sends an email using the Resend API.
// Accepts recipient, subject, and React content.
// Returns success status and data or error.
export const sendEmail = async ({ to, subject, react }) => {
    const resend = new Resend(process.env.RESEND_API_KEY || "");

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: '',
            subject: '',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
        });

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send email: ", error);
        return { success: false, error };
    }
}