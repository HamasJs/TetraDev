/** All contact and future demo links live here. Booking takes precedence over email. */
export const siteConfig = {
  bookingUrl: "", // Example: https://cal.com/your-team/discovery
  contactEmail: "tetradev371@gmail.com",
  whatsappNumber: "+966553064813", // International format; link strips punctuation.
  whatsappDisplay: "+966 55 306 4813",
  demoUrl: "", // Replace static demos with a real demo when ready.
  domain: "https://tetradev.ai",
  logo: "/tetradev-logo.png",
};
export function getContact(
  config: { bookingUrl: string; contactEmail: string } = siteConfig,
) {
  if (config.bookingUrl.trim())
    return { href: config.bookingUrl, label: "Book a discovery call" };
  if (config.contactEmail.trim())
    return {
      href: `mailto:${config.contactEmail}`,
      label: "Email us about your project",
    };
  return { href: null, label: "Contact details coming soon" };
}
