// ---------------------------------------------------------------
// Fill these in and the matching sections switch on automatically.
// Anything left empty stays hidden, so nothing on the page is invented.
// ---------------------------------------------------------------

export const PROGRAM = {
  name: "The Client Engine",
  kind: "Handhold Program",
  price: 30000,
  regular: 75000,
};

// WhatsApp number in international format, digits only, e.g. "2348012345678".
// When set: "Ask a question on WhatsApp" buttons appear in the hero, FAQ and sticky bar.
export const WHATSAPP = "918299584008";
export const WHATSAPP_MESSAGE = "Hi! I saw The Client Engine Handhold Program. I have a question before I join.";

// Your mentor. When set: a "Meet your mentor" section appears (huge trust boost for cold buyers).
// photo: put the image in /public/v2/ and write e.g. "/v2/mentor.webp".
export const MENTOR: null | {
  name: string;
  role: string;
  photo: string; // "" = show initials until a real photo of the mentor is added
  bio: string;
  proof: string[];
  ledBy?: string; // optional "Program led by …" line
} = {
  name: "Rahila Nimer",
  role: "Your mentor · AVADA design team",
  photo: "/v2/rahila.webp",
  bio: "I help interior designers and architects get clients who pay well. I'll guide you step by step, and help you 1-on-1 when you're stuck.",
  proof: ["Your mentor on WhatsApp", "1-on-1 help sessions", "7-day refund guarantee"],
  ledBy: "Program led by Mahina Saasta, Interior Design Business Manager",
};

// Money-back guarantee in days (e.g. 7). 0 = hidden. Only set this if you will honour it.
export const GUARANTEE_DAYS = 7;

export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");
export const waLink = () => (WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : "");

// Footer details (shown when set). A real name + contact builds trust and helps Meta ad review.
export const BUSINESS_NAME = "The Client Engine";
export const SUPPORT_EMAIL = "support@avadalearn.com";
export const INSTAGRAM = "avadaspace";
