export const site = {
  name: "Káro Coffee Bar",
  tagline: "Minimal space. Maximum flavour.",
  address: "Ground Floor, Plaza No A, 19, Lane 1-A, Sector F, DHA Phase 1, Rawalpindi",
  phone: "0336 5593330",
  phoneHref: "tel:+923365593330",
  hours: "Daily, 11:30 AM – 1:00 AM",
  rating: "4.7",
  reviewCount: "179",
  instagramHandle: "@karocoffeepk",
  instagramUrl: "https://www.instagram.com/karocoffeepk/",
};

const encodedAddress = encodeURIComponent(site.address);

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
