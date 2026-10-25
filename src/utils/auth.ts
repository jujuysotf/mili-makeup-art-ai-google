import { ClientUser } from '../types';

const STORAGE_KEY = 'milimakeupart_client_user';

export function getStoredClientUser(): ClientUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.provider === 'google' || parsed?.provider === 'guest') {
      return parsed as ClientUser;
    }
    if (typeof parsed?.isGuest === 'boolean' && parsed?.name) {
      return {
        id: parsed.isGuest ? 'guest-legacy' : 'google-legacy',
        name: parsed.name,
        email: parsed.email || '',
        avatar: parsed.picture,
        phone: parsed.phone,
        provider: parsed.isGuest ? 'guest' : 'google',
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveClientUser(user: ClientUser): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.warn('Could not save user to localStorage', err);
  }
}

export function removeClientUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Could not clear user', err);
  }
}

export function createGoogleClientUser(profile: {
  name: string;
  email: string;
  picture?: string;
  sub?: string;
}): ClientUser {
  const previous = getStoredClientUser();
  const user: ClientUser = {
    id: profile.sub || 'google-' + Date.now(),
    name: profile.name,
    email: profile.email,
    avatar: profile.picture,
    phone: previous?.phone,
    provider: 'google',
  };
  saveClientUser(user);
  return user;
}

export function createGuestClientUser(name: string = 'Invitada', email: string = '', phone: string = ''): ClientUser {
  const user: ClientUser = {
    id: 'guest-' + Date.now(),
    name: name.trim() || 'Invitada',
    email: email.trim(),
    phone: phone.trim() || undefined,
    provider: 'guest',
  };
  saveClientUser(user);
  return user;
}
