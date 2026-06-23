import Layout from "@/components/site/Layout";
import { SectionHeader, FadeIn } from "@/components/site/Section";
import { Truck, Sofa, ShoppingBag, LayoutDashboard, Fingerprint, HardHat, Palette } from "lucide-react";

interface ServiceItem {
  icon: any;
  title: string;
  subtitle?: string;
  tags: string[];
  desc: string;
}

const services: ServiceItem[] = [
  {
    icon: LayoutDashboard,
    title: "Wide Hardware Display Gallery For Selection",
    tags: [
      "500+ Furniture Handles",
      "500+ Mortice Handles",
      "100+ Pull Handles",
      "20+ Bathroom Accessories",
      "10+ CP Fittings",
      "10+ Mirrors",
      "3 Kitchen Gallery Displays",
      "Wardrobe Display",
      "Wardrobe & Kitchen Profiles",
    ],
    desc: "Walk into our Chandlodiya showroom and explore thousands of curated SKUs from the best India's Brands.",
  },
  {
    icon: Fingerprint,
    title: "Digital Solution For Your Routine Needs",
    tags: [
      "20+ Digital Locks",
      "20+ Cabinet Digital Locks",
      "20+ Home Lockers",
      "Video Door Phone",
    ],
    desc: "Personalised guidance from our sales experts to choose the perfect fittings for your home, office, hotels and more.",
  },
  {
    icon: HardHat,
    title: "Build Your Project Without The Headache",
    tags: [
      "Digital Home Solutions",
      "Modular Kitchen",
      "Modular Wardrobe",
      "Profile Shutters",
      "Turnkey Projects",
    ],
    desc: "Special pricing, dedicated account management and on-time delivery for builders, contractors and designers.",
  },
  {
    icon: Palette,
    title: "Decorative Collection For Every Space",
    tags: [
      "100+ Laminates",
      "100+ Louvres & Charcoal",
      "100+ Acrylic Laminates",
      "Moulding Panels",
      "Fluted MDF",
      "Zula Fittings",
      "Plywood Options",
    ],
    desc: "Premium display hardware and showroom fitting solutions — designed to showcase your space beautifully and professionally.",
  },
  {
    icon: Truck,
    title: "Customise Delivery Option",
    tags: [
      "Citywide Delivery",
      "On-time Dispatch",
      "Bulk Order Handling",
      "Project-wise Scheduling",
    ],
    desc: "Dispatch across Ahmedabad so your projects never stop waiting on hardware fittings.",
  },
  {
    icon: Sofa,
    title: "Interior Hardware",
    tags: [
      "Handles & Hinges",
      "Channels & Slides",
      "Decorative Fittings",
      "Cabinet Accessories",
      "Door Hardware",
    ],
    desc: "Complete range of interior hardware including handles, hinges, channels, and decorative fittings to elevate every room.",
  },
  {
    icon: ShoppingBag,
    title: "Hardware Sales",
    tags: [
      "Trusted Global Brands",
      "All Project Sizes",
      "Wide SKU Range",
      "Competitive Pricing",
    ],
    desc: "Wide selection of quality hardware products at competitive prices — sourced from trusted brands for every project size.",
  },
];

export default function Services() {
  return (
    <Layout
      title="Services · Swaraj Hardware"
      description="Retail sales, interior hardware consultation, bulk supply for builders and fast delivery in Ahmedabad."
    >
      <section className="container-px section">
        <SectionHeader
          eyebrow="Services"
          title="More Than A Hardware Store"
          subtitle="Whether you're outfitting a single home or a hundred apartments, we make the process effortless."
        />

        <div className="grid sm:grid-cols-2 gap-6 items-stretch">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.07}>
              <div className="group glass rounded-3xl p-8 h-full flex flex-col hover:shadow-gold transition-all hover:-translate-y-1 duration-500">
                {/* Icon + Title row */}
                <div className="flex items-center gap-4 mb-1">
                  <div className="size-14 shrink-0 rounded-2xl gold-bg grid place-items-center shadow-gold">
                    <s.icon className="size-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl leading-tight">{s.title}</h3>
                    {s.subtitle && (
                      <p className="text-sm text-muted-foreground italic mt-0.5">{s.subtitle}</p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border my-4" />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border/80 bg-background/90 text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description pushed to bottom */}
                <p className="text-muted-foreground leading-relaxed text-sm mt-auto">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </Layout>
  );
}
