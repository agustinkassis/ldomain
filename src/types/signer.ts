import { Event, EventTemplate } from "nostr-tools";

export interface Signer {
  getPublicKey: () => string;
  sign: (event: EventTemplate) => Promise<Event>;
}
