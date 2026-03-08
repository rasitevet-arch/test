import { defineCollection, z } from "astro:content";

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

const cmsImage = z.object({
  url: z.string(),
  alt: z.string().default(""),
  width: z.number().default(0),
  height: z.number().default(0),
});

const cmsLink = z.object({
  label: z.string(),
  url: z.string(),
});

// ---------------------------------------------------------------------------
// Block schemas — one per visual component
// ---------------------------------------------------------------------------

const decorativeElement = z.object({
  image: z.string(),
  className: z.string().default(""),
});

const heroBlock = z.object({
  component: z.literal("hero"),
  title: z.string(),
  description: z.string(),
  ctaLink: z.string().default(""),
  ctaLabel: z.string().default(""),
  secondaryLink: z.string().default(""),
  secondaryLabel: z.string().default(""),
  decorativeElements: z.array(decorativeElement).default([]),
});

const clientsBlock = z.object({
  component: z.literal("clients"),
  title: z.string(),
  clients: z
    .array(
      z.object({
        image: z.string(),
        alt: z.string().default(""),
        width: z.number().default(0),
        height: z.number().default(0),
      }),
    )
    .default([]),
});

const featuresBlock = z.object({
  component: z.literal("features"),
  title: z.string(),
  paragraphs: z.array(z.string()).default([]),
  buttonLink: z.string().default(""),
  buttonLabel: z.string().default(""),
  image: cmsImage.default({ url: "", alt: "" }),
});

const statsBlock = z.object({
  component: z.literal("stats"),
  title: z.string(),
  facts: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .default([]),
});

const servicesBlock = z.object({
  component: z.literal("services"),
  title: z.string(),
  services: z
    .array(
      z.object({
        icon: z.string().default(""),
        name: z.string(),
        description: z.string(),
        link: z.string().default(""),
      }),
    )
    .default([]),
});

const testimonialsBlock = z.object({
  component: z.literal("testimonials"),
  title: z.string(),
  testimonials: z
    .array(
      z.object({
        quote: z.string(),
        name: z.string(),
        role: z.string().default(""),
        avatar: z.string().default(""),
      }),
    )
    .default([]),
});

const faqBlock = z.object({
  component: z.literal("faq"),
  title: z.string(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  hasBg: z.boolean().default(false),
});

const contactFormBlock = z.object({
  component: z.literal("contactForm"),
  title: z.string(),
  description: z.string().default(""),
  contactItems: z
    .array(
      z.object({
        icon: z.string().default(""),
        label: z.string(),
        value: z.string(),
        href: z.string().default(""),
      }),
    )
    .default([]),
});

const valuesBlock = z.object({
  component: z.literal("values"),
  title: z.string(),
  values: z
    .array(
      z.object({
        icon: z.string().default(""),
        iconAlt: z.string().default(""),
        iconWidth: z.number().default(0),
        iconHeight: z.number().default(0),
        name: z.string(),
        description: z.string(),
      }),
    )
    .default([]),
});

const aboutContentBlock = z.object({
  component: z.literal("aboutContent"),
  title: z.string(),
  description: z.string().default(""),
  image: z.string().default(""),
  stats: z
    .array(
      z.object({
        prefix: z.string().optional(),
        value: z.string(),
        suffix: z.string().default(""),
        label: z.string(),
      }),
    )
    .default([]),
  buttonLink: z.string().default(""),
  buttonLabel: z.string().default(""),
});

const teamBlock = z.object({
  component: z.literal("team"),
  title: z.string(),
  buttonLink: z.string().default(""),
  buttonLabel: z.string().default(""),
  members: z
    .array(
      z.object({
        image: z.string().default(""),
        name: z.string(),
        role: z.string().default(""),
        link: z.string().default(""),
      }),
    )
    .default([]),
});

const ctaBlock = z.object({
  component: z.literal("cta"),
  title: z.string(),
  buttonLink: z.string().default(""),
});

const contactInfoBlock = z.object({
  component: z.literal("contactInfo"),
  contactItems: z
    .array(
      z.object({
        icon: z.string().default(""),
        iconAlt: z.string().default(""),
        title: z.string(),
        content: z.string(),
      }),
    )
    .default([]),
  formAction: z.string().default(""),
});

const mapBlock = z.object({
  component: z.literal("map"),
  embedUrl: z.string(),
});

const serviceDescriptionBlock = z.object({
  component: z.literal("serviceDescription"),
  title: z.string(),
  description: z.string().default(""),
  image: z.string().default(""),
  approachTitle: z.string().default(""),
  approachDescription: z.string().default(""),
  strategyTitle: z.string().default(""),
  strategyDescription: z.string().default(""),
  checklist: z.array(z.string()).default([]),
});

const serviceApproachBlock = z.object({
  component: z.literal("serviceApproach"),
  title: z.string(),
  description: z.string().default(""),
  image: z.string().default(""),
  items: z
    .array(
      z.object({
        icon: z.string().default(""),
        iconAlt: z.string().default(""),
        title: z.string(),
        description: z.string(),
      }),
    )
    .default([]),
});

const marqueeBlock = z.object({
  component: z.literal("marquee"),
  items: z.array(z.string()).default([]),
});

// ---------------------------------------------------------------------------
// Discriminated union of all blocks
// ---------------------------------------------------------------------------

const blockSchema = z.discriminatedUnion("component", [
  heroBlock,
  clientsBlock,
  featuresBlock,
  statsBlock,
  servicesBlock,
  testimonialsBlock,
  faqBlock,
  contactFormBlock,
  valuesBlock,
  aboutContentBlock,
  teamBlock,
  ctaBlock,
  contactInfoBlock,
  mapBlock,
  serviceDescriptionBlock,
  serviceApproachBlock,
  marqueeBlock,
]);

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

const seoSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  })
  .optional();

// ---------------------------------------------------------------------------
// Breadcrumb path item
// ---------------------------------------------------------------------------

const breadcrumbPath = z.object({
  label: z.string(),
  url: z.string(),
});

// ---------------------------------------------------------------------------
// Shared page-level frontmatter
// ---------------------------------------------------------------------------

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  seo: seoSchema,
  isLanding: z.boolean().default(false),
  breadcrumbTitle: z.string().optional(),
  breadcrumbCurrent: z.string().optional(),
  breadcrumbPath: z.array(breadcrumbPath).default([]),
  blocks: z.array(blockSchema).default([]),
});

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

const pages = defineCollection({
  type: "data",
  schema: pageSchema,
});

const services = defineCollection({
  type: "data",
  schema: pageSchema,
});

export const collections = { pages, services };

// ---------------------------------------------------------------------------
// Re-export inferred types for use in components
// ---------------------------------------------------------------------------

export type Block = z.infer<typeof blockSchema>;
export type PageData = z.infer<typeof pageSchema>;
export type SeoData = z.infer<typeof seoSchema>;
