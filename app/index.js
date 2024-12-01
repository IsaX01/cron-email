const { Client } = require('pg');
const nodemailer = require('nodemailer');

const dbConfig = {
  user: 'isax01',
  host: 'localhost',
  database: 'mail',
  password: 'isax',
  port: 5432,
};

const client = new Client(dbConfig);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'isaiastrabajosweb@gmail.com',
    pass: '010826',
  },
});

(async function checkAndSendEmails() {
  try {
    await client.connect();
    const res = await client.query(
      "SELECT id, email, message FROM notifications WHERE sent = FALSE"
    );
    for (const row of res.rows) {
      await transporter.sendMail({
        from: 'isaiastrabajosweb@gmail.com',
        to: row.email,
        subject: 'Notification',
        text: row.message,
      });

      await client.query("UPDATE notifications SET sent = TRUE WHERE id = $1", [
        row.id,
      ]);

      console.log(`Email sent to ${row.email}`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
})();
