// Update these with your real links and details
export const siteConfig = {
  brandName: 'Uniska Nails Studio',
  tagline: 'In-studio nail services & custom press-on sets',
  description:
    'Gel overlays, nail art, and manicures at our Kingsburgh studio — plus custom press-on sets you can order from home. Book in-person on Fresha or message on WhatsApp.',

  // WhatsApp: 082 887 1300
  whatsappNumber: '27828871300',
  whatsappMessage: "Hi! I'd love to book an appointment at Uniska Nails Studio.",

  // Replace with your Fresha booking profile URL
  freshaUrl: 'https://www.fresha.com/a/uniska-nail-studio-kingsburgh-35-beach-road-asobzpk9',
  freshaRating: 5.0,
  freshaReviewCount: 15,

  address: '35 Beach Road, Doonside, Kingsburgh',
  phoneDisplay: '082 887 1300',

  email: 'hello@uniskanails.com',

  // Replace with your real social profile URLs
  socials: {
    instagram: 'https://www.instagram.com/uniskanailstudio',
    facebook: 'https://www.facebook.com/people/Uniska-Nails-Studio/61558095437654/',
    tiktok: 'https://www.tiktok.com/@niska.nails3',
  },
}

// Update with your latest prices — edit items below anytime
export const priceList = {
  lastUpdated: 'June 2026',
  quote: 'Nail art is a form of self-love. Wear your confidence on your nails.',
  footerNote: 'Thank you for supporting my small business.',
  categories: [
    {
      name: 'Nail Treatment',
      description: 'In-studio nail services — book via Fresha or WhatsApp.',
      items: [
        { name: 'Gel Overlay', price: 'R 250' },
        { name: 'Polygel Overlay', price: 'R 300' },
        { name: 'Gel Tips', price: 'R 300' },
        { name: 'Polygel Tips', price: 'R 350' },
        { name: 'Manicure (clear gel)', price: 'R 220' },
      ],
    },
    {
      name: 'Foot Treatment',
      items: [
        { name: 'Gel Toes', price: 'R 180' },
      ],
    },
    {
      name: 'Extra Services',
      items: [
        { name: 'Soak off', price: 'R 80' },
      ],
    },
    {
      name: 'Add Ons',
      items: [
        { name: 'Nail Repair', price: 'R 20' },
        { name: 'French Tips', price: 'R 50' },
        { name: 'Ombre', price: 'R 70' },
        { name: 'Basic Nail Art', price: 'R 5' },
      ],
    },
    {
      name: 'Nail Art Designs',
      items: [
        { name: 'Plain / One colour', price: 'R 0' },
        { name: 'French', price: 'R 30' },
        { name: 'Ombre', price: 'R 40' },
        { name: 'Chrome / Cat Eye', price: 'R 50' },
        { name: 'Simple Nail Art (per nail)', price: 'R 10' },
        { name: 'Detailed Nail Art (per nail)', price: 'R 20' },
      ],
    },
  ],
}

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappMessage)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
}
