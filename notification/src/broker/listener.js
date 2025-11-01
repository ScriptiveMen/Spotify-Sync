import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";

function startListeners() {
    subscribeToQueue("USER_CREATED", async (msg) => {
        const {
            email,
            role,
            fullName: { firstName, lastName },
        } = msg;

        const template = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h1 style="color: #1DB954; text-align: center;">Welcome to <span style="color: #000;">Spotify Sync</span></h1>
            <p>Hi <strong>${firstName} ${lastName}</strong>,</p>
            
            <p>We’re thrilled to have you join <strong>Spotify Sync</strong>! Your account has been successfully created, and you’re now ready to explore our features.</p>
            
            <p><strong>Your role:</strong> ${role}</p>
            
            <p>At Spotify Sync, we’re committed to delivering a seamless and personalized experience that connects you to your favorite music like never before.</p>
            
            <p>If you have any questions or feedback, feel free to reach out to our support team at <a href="mailto:support@spotifysync.com" style="color: #1DB954; text-decoration: none;">support@spotifysync.com</a>.</p>
            
            <br/>
            <p>Warm regards,</p>
            <p><strong>The Spotify Sync Team</strong></p>
        </div>
        `;

        await sendEmail(
            email,
            "Welcome to Spotify Sync!",
            "Your Spotify Sync account is ready",
            template
        );
    });
}

export default startListeners;
