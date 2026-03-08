interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
  relative_time_description: string;
}

interface GooglePlaceDetailsResponse {
  result?: {
    name?: string;
    rating?: number;
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  rating: number;
  avatar: string;
}

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John Doe",
    rating: 5,
    avatar: "https://placehold.co/55x55",
  },
  {
    quote:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    name: "Jane Smith",
    rating: 5,
    avatar: "https://placehold.co/55x55",
  },
  {
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    name: "Bob Wilson",
    rating: 4,
    avatar: "https://placehold.co/55x55",
  },
];

/**
 * Fetches the top 5 most relevant Google Reviews for our business via the
 * Places API and maps them to the shape our Testimonials component expects.
 *
 * Falls back to placeholder data when credentials are missing or the API
 * request fails, so the page always renders.
 */
export async function getGoogleReviews(limit = 5): Promise<Testimonial[]> {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn(
      "[google-reviews] GOOGLE_PLACES_API_KEY or PUBLIC_GOOGLE_PLACE_ID is not set — using placeholder testimonials.",
    );
    return PLACEHOLDER_TESTIMONIALS;
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "name,rating,reviews");
    url.searchParams.set("reviews_sort", "most_relevant");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url);

    if (!res.ok) {
      console.error(`[google-reviews] HTTP ${res.status}: ${res.statusText}`);
      return PLACEHOLDER_TESTIMONIALS;
    }

    const data: GooglePlaceDetailsResponse = await res.json();

    if (data.status !== "OK") {
      console.error(
        `[google-reviews] API status ${data.status}: ${data.error_message ?? "unknown error"}`,
      );
      return PLACEHOLDER_TESTIMONIALS;
    }

    const reviews = data.result?.reviews ?? [];

    return reviews.slice(0, limit).map((r) => ({
      quote: r.text,
      name: r.author_name,
      rating: r.rating,
      avatar: r.profile_photo_url,
    }));
  } catch (err) {
    console.error("[google-reviews] Fetch failed:", err);
    return PLACEHOLDER_TESTIMONIALS;
  }
}
