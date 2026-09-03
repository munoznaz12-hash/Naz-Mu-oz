import { UserProfile, UserType } from '../types';

const ACTIVE_USER_STORAGE_KEY = 'vianova_active_user';
const REGISTERED_USERS_STORAGE_KEY = 'vianova_registered_users';

export interface StoredUserAccount {
  profile: UserProfile;
  password?: string;
  createdAt: string;
}

// List of legacy demo names to purge from browser storage so only real user names appear
const LEGACY_NAMES_TO_PURGE = [
  'valentina ríos',
  'valentina rios',
  'carlos morales',
  'mateo gómez',
  'mateo gomez',
  'lucía fernández',
  'lucia fernandez',
  'felipe torres'
];

function isLegacyDemoName(name?: string): boolean {
  if (!name) return false;
  return LEGACY_NAMES_TO_PURGE.includes(name.trim().toLowerCase());
}

/**
 * Retrieves all registered users from localStorage.
 */
export function getRegisteredUsers(): StoredUserAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Filter out any legacy dummy demo accounts
      const cleanUsers = parsed.filter(u => u?.profile?.name && !isLegacyDemoName(u.profile.name));
      return cleanUsers;
    }
    return [];
  } catch (error) {
    console.warn('Error reading registered users from localStorage:', error);
    return [];
  }
}

/**
 * Saves a new user or updates an existing one in the registered users list.
 * For new users, defaults primer_ingreso = true if not specified.
 */
export function saveRegisteredUser(profile: UserProfile, password?: string): StoredUserAccount {
  const users = getRegisteredUsers();
  const normalizedEmail = profile.email.trim().toLowerCase();
  const existingIdx = users.findIndex(u => u.profile.email.trim().toLowerCase() === normalizedEmail);

  let storedAccount: StoredUserAccount;

  if (existingIdx >= 0) {
    const existing = users[existingIdx];
    const primerIngresoValue = profile.primer_ingreso !== undefined 
      ? profile.primer_ingreso 
      : (existing.profile.primer_ingreso !== undefined ? existing.profile.primer_ingreso : false);

    storedAccount = {
      ...existing,
      profile: {
        ...existing.profile,
        ...profile,
        primer_ingreso: primerIngresoValue,
      },
      password: password || existing.password
    };
    users[existingIdx] = storedAccount;
  } else {
    // New user default: primer_ingreso = true (unless explicitly set to false)
    const isFirstTime = profile.primer_ingreso !== undefined ? profile.primer_ingreso : true;
    storedAccount = {
      profile: {
        ...profile,
        primer_ingreso: isFirstTime,
      },
      password: password || '',
      createdAt: new Date().toISOString()
    };
    users.push(storedAccount);
  }

  try {
    localStorage.setItem(REGISTERED_USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving registered users to localStorage:', error);
  }

  return storedAccount;
}

/**
 * Completes the first-time onboarding for a user:
 * - Marks primer_ingreso = false (in user profile and stored registered list)
 * - Marks emailVerified = true
 * - Sets termsAccepted = true
 * - Updates phone, secure password, and profile fields
 */
export function completeUserFirstTimeOnboarding(
  email: string, 
  updatedData: Partial<UserProfile>, 
  newPassword?: string
): UserProfile | null {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getRegisteredUsers();
  const existingIdx = users.findIndex(u => u.profile.email.trim().toLowerCase() === normalizedEmail);

  if (existingIdx < 0) return null;

  const current = users[existingIdx];
  const finalProfile: UserProfile = {
    ...current.profile,
    ...updatedData,
    email: normalizedEmail,
    primer_ingreso: false, // Explicitly saved as false
    emailVerified: true,
    termsAccepted: true,
  };

  users[existingIdx] = {
    ...current,
    profile: finalProfile,
    password: newPassword || current.password,
  };

  try {
    localStorage.setItem(REGISTERED_USERS_STORAGE_KEY, JSON.stringify(users));
    // Also update active session
    setActiveUserSession(finalProfile);
  } catch (error) {
    console.error('Error completing onboarding in localStorage:', error);
  }

  return finalProfile;
}

/**
 * Finds a registered user by email (case-insensitive).
 */
export function findRegisteredUserByEmail(email: string): StoredUserAccount | null {
  const users = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const found = users.find(u => u.profile.email.trim().toLowerCase() === normalizedEmail);
  return found || null;
}

/**
 * Formats a clean display name from an email address if no explicit name was provided.
 */
export function formatNameFromEmail(email: string): string {
  if (!email) return 'Usuario ViaNova';
  const localPart = email.split('@')[0].trim();
  if (!localPart) return 'Usuario ViaNova';

  // Replace dots, underscores, hyphens with spaces and capitalize each word
  const words = localPart
    .replace(/[._\-+]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1));

  return words.length > 0 ? words.join(' ') : localPart;
}

/**
 * Retrieves the currently active authenticated user session from localStorage.
 * If no session is active or user explicitly logged out, returns null.
 */
export function getActiveUserSession(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.id && parsed.email) {
      // If the cached session contains an old dummy demo name like Valentina Ríos, clear it
      if (isLegacyDemoName(parsed.name)) {
        localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
        return null;
      }
      return parsed as UserProfile;
    }
    return null;
  } catch (error) {
    console.warn('Error reading active user session from localStorage:', error);
    return null;
  }
}

/**
 * Persists the active authenticated user session to localStorage.
 */
export function setActiveUserSession(user: UserProfile | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      // Don't save legacy demo names
      if (isLegacyDemoName(user.name)) {
        return;
      }
      localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(user));
      // Also sync user profile into registered users list
      saveRegisteredUser(user);
    } else {
      localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error updating active user session in localStorage:', error);
  }
}

/**
 * Logs out the user by destroying the active session in localStorage.
 */
export function clearActiveUserSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing active user session:', error);
  }
}
