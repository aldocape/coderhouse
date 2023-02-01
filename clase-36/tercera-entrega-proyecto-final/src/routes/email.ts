import { Router } from 'express';
import { EmailService } from '../services/email';
const router = Router();

router.post('/send-email', async (req: any, res) => {
  const { body } = req;

  if (!body || !body.dest || !body.subject || !body.content)
    return res.status(400).json({
      msg: "Falta enviar en el body los siguientes datos: 'dest', 'subject' y 'content'",
      body,
    });

  const destination = body.dest;
  const subject = body.subject;
  const content = body.content;

  try {
    const response = await EmailService.sendEmail(
      destination,
      subject,
      content
    );

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
