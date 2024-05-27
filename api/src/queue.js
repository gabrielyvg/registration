import 'dotenv/config';
import RegistrationMail from './app/jobs/RegistrationMail';
import Queue from './app/lib/Queue';

Queue.process(RegistrationMail.handle);