const { google } = require("googleapis");

const {
  GMAIL_USER,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_REDIRECT_URI,
  EMAIL_FROM_NAME,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const sendEmail = async (to, subject, html) => {
  try {
    const gmail = google.gmail({
      version: "v1",
      auth: oAuth2Client,
    });

    const fromName = EMAIL_FROM_NAME || "My App";

    const mimeLines = [
      `From: "${fromName}" <${GMAIL_USER}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      'Content-Type: text/html; charset="UTF-8"',
      "",
      html || "",
    ];

    const raw = mimeLines.join("\n");

    const encodedMessage = Buffer.from(raw)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

    return response.data;
  } catch (error) {
    console.error("Gmail API Error:", error.response?.data || error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
