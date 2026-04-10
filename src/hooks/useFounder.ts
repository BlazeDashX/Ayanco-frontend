// hooks/useFounder.ts
// ─────────────────────────────────────────────────────────────
// Re-exports typed data from founderData.ts so components
// import from one place.  Swap body of each hook for a
// Supabase fetch (useQuery/SWR) without touching components.
// ─────────────────────────────────────────────────────────────
import {
  founderMeta,
  founderBio,
  companyStats,
  catalogLinks,
  milestones,
  eventSlides,
  galleryItems,
  affiliations,
  contactInfo,
  socialLinks,
  footerText,
} from "@/data/founderData";

export function useFounderMeta() {
  return founderMeta;
}

export function useFounderBio() {
  return founderBio;
}

export function useCompanyStats() {
  return companyStats;
}

export function useCatalogLinks() {
  return catalogLinks;
}

export function useMilestones() {
  return milestones;
}

export function useEventSlides() {
  return eventSlides;
}

export function useGalleryItems() {
  return galleryItems;
}

export function useAffiliations() {
  return affiliations;
}

export function useContactInfo() {
  return contactInfo;
}

export function useSocialLinks() {
  return socialLinks;
}

export function useFooterText() {
  return footerText;
}