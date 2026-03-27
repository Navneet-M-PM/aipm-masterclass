import { useState, useEffect } from "react";
import { setUserId } from "@workspace/api-client-react";

export interface UserProfile {
  userId: string;
  name: string;
  role: string;
  onboarded: boolean;
}

const STORAGE_KEY = "aipm_user_profile";

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function useUser() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = loadProfile();
    if (existing) {
      setProfile(existing);
      setUserId(existing.userId);
    } else {
      const newProfile: UserProfile = {
        userId: generateId(),
        name: "",
        role: "",
        onboarded: false,
      };
      saveProfile(newProfile);
      setProfile(newProfile);
      setUserId(newProfile.userId);
    }
    setLoading(false);
  }, []);

  const updateProfile = (updates: Partial<Omit<UserProfile, "userId">>) => {
    setProfile(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      saveProfile(updated);
      return updated;
    });
  };

  const completeOnboarding = (name: string, role: string) => {
    updateProfile({ name, role, onboarded: true });
  };

  return { profile, loading, updateProfile, completeOnboarding };
}
