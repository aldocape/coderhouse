import { twilioClient } from '../services/twilio';
import config from '../config';

export const sendMSG = async (
  message: string,
  dest: string,
  mediaurl: string = ''
) => {
  if (mediaurl) {
    const msg = {
      body: message,
      from: config.CEL,
      to: dest,
      mediaUrl: [mediaurl],
    };
    const response = await twilioClient.messages.create(msg);
    return response;
  } else {
    const plainMsg = {
      body: message,
      from: config.TWILIO_CELLPHONE,
      to: dest,
    };
    const res = await twilioClient.messages.create(plainMsg);
    return res;
  }
};
