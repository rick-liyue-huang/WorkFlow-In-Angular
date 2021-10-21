import {UserModal} from './user.modal';
import {ErrorModal} from './Error.modal';

export interface AuthModal {
  user?: UserModal;
  userId?: string;
  token?: string;
  err?: ErrorModal;
}
