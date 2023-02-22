import twilio from 'twilio';
import config from '../config';

export const twilioClient = twilio(config.SID, config.TOKEN);
