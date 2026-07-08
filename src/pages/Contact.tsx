import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/site/Layout";
import { SectionHeader, FadeIn } from "@/components/site/Section";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 🔴 PLACE YOUR CONTACT LEADS GOOGLE SCRIPT WEBHOOK URL HERE
const CONTACT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzhDN-7f8NYM54JhhAc-q6flX6hCgYbnzy9bwZE3NKapirdpojvxNqzCN5AVpeT8Q0zgQ/exec";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  message: z.string().trim().min(5, "Please add a short message").max(800),
});

export default function Contact() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", city: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast({ title: "Please check the form", description: r.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);

    const payload = {
      name: r.data.name,
      phone: r.data.phone,
      city: r.data.city,
      message: r.data.message,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    try {
      if (CONTACT_WEBHOOK_URL && CONTACT_WEBHOOK_URL !== "YOUR_CONTACT_LEADS_WEBHOOK_URL") {
        await fetch(CONTACT_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      console.error("Submission to Google Sheets failed:", err);
    }
    
    setLoading(false);
    setForm({ name: "", phone: "", city: "", message: "" });
    navigate("/thank-you");
  };

  return (
    <Layout title="Contact · Swaraj Hardware" description="Visit, call or message Swaraj Hardware in Chandlodiya, Ahmedabad. Phone +91 87802 37347.">
      <section className="container-px section">
        <SectionHeader eyebrow="Contact" title="Let's Build Everything Premium" subtitle="Visit our Chandlodiya showroom or send us a message — we usually reply within hours." />

        <div className="grid lg:grid-cols-2 gap-8">
          <FadeIn>
            <div className="glass rounded-3xl p-10 h-full flex flex-col justify-between">
              <div className="space-y-10">
                {[
                  { icon: MapPin, title: "Address", value: "G-8,9,10 Silver Star Complex,\nChandlodiya, Ahmedabad, Gujarat" },
                  { icon: Phone, title: "Call Us", value: "+91 87802 37347", href: "tel:+918780237347" },
                  { icon: Mail, title: "WhatsApp", value: "+91 76000 02910 · Chat instantly", href: "https://wa.me/917600002910" },
                  { icon: Clock, title: "Working Hours", value: "Mon–Sat · 10:00 AM – 7:00 PM\nSunday: Closed" },
                ].map((i) => (
                  <div key={i.title} className="flex gap-4">
                    <div className="size-11 rounded-xl gold-bg grid place-items-center shrink-0 shadow-gold">
                      <i.icon className="size-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-1"> {i.title}</div>
                      {i.href ? (
                        <a href={i.href} className="text-xl font-bold text-[#083D52] hover:text-primary transition-colors whitespace-pre-line leading-snug">{i.value}</a>
                      ) : (
                        <div className="text-xl font-bold text-[#083D52] whitespace-pre-line leading-snug">{i.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border/40">
                <div className="text-[10px] uppercase tracking-[0.4em] text-primary/50 font-bold">Swaraj Hardware Studio · Ahmedabad</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={submit} className="glass rounded-3xl p-8 space-y-5">
              <div>
                <label className="text-sm uppercase tracking-[0.2em] text-primary font-black">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={80}
                  className="mt-2 w-full px-5 py-4 rounded-xl bg-white border-2 border-[#083D52]/20 focus:border-primary focus:outline-none transition-all font-extrabold text-[#083D52] placeholder:text-[#083D52]/70"
                  placeholder="Your full name"
                />
              </div>
              
              {/* Phone and City side-by-side (half-and-half) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm uppercase tracking-[0.2em] text-primary font-black">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    maxLength={20}
                    className="mt-2 w-full px-5 py-4 rounded-xl bg-white border-2 border-[#083D52]/20 focus:border-primary focus:outline-none transition-all font-extrabold text-[#083D52] placeholder:text-[#083D52]/70"
                    placeholder="+91 ..."
                  />
                </div>
                <div>
                  <label className="text-sm uppercase tracking-[0.2em] text-primary font-black">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    maxLength={80}
                    className="mt-2 w-full px-5 py-4 rounded-xl bg-white border-2 border-[#083D52]/20 focus:border-primary focus:outline-none transition-all font-extrabold text-[#083D52] placeholder:text-[#083D52]/70"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm uppercase tracking-[0.2em] text-primary font-black">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={800}
                  rows={5}
                  className="mt-2 w-full px-5 py-4 rounded-xl bg-white border-2 border-[#083D52]/20 focus:border-primary focus:outline-none transition-all resize-none font-extrabold text-[#083D52] placeholder:text-[#083D52]/70"
                  placeholder="Tell us what you're looking for..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl gold-bg text-primary-foreground font-semibold shadow-gold hover:shadow-glow transition-shadow disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-12 rounded-3xl overflow-hidden border border-border/60 shadow-elegant">
            <iframe
              title="Swaraj Hardware Location"
              src="https://www.google.com/maps?q=Silver+Star+Complex+Chandlodiya+Ahmedabad&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              className="grayscale-[20%] contrast-110"
              style={{ border: 0 }}
            />
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
}
