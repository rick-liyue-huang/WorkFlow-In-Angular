import {AuthModal, QuoteModal, UserModal} from '../domain';

export interface AppState {
  quote: QuoteModal;
  user: UserModal;
  auth: AuthModal;
}

