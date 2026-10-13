// Catálogo LUNA MODA — precios en ARS
const PRODUCTS = [
  { id: 1,  name: "Floral Summer Dress",   cat: "vestidos",  price: 24999, old: 34999, rating: 4.8, reviews: 214, best: true,  img: "https://images.unsplash.com/photo-1499939667766-4afceb292d05?auto=format&fit=crop&w=800&q=80", desc: "Lightweight midi dress with floral print. Perfect for sunny days." },
  { id: 2,  name: "Elegant Black Dress",     cat: "vestidos",  price: 29999, old: 39999, rating: 4.9, reviews: 186, best: true,  img: "https://images.pexels.com/photos/17056567/pexels-photo-17056567/free-photo-of-portrait-of-a-woman-wearing-a-black-dress.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "The classic that never fails: midi cut, V-neckline and perfect drape." },
  { id: 3,  name: "Printed Midi Dress",     cat: "vestidos",  price: 27499, old: null,  rating: 4.7, reviews: 98,  best: false, img: "https://images.pexels.com/photos/26835803/pexels-photo-26835803/free-photo-of-portrait-of-a-woman-in-a-floral-dress.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "Exclusive seasonal print, defined waist and natural flow." },
  { id: 4,  name: "Classic White Shirt",      cat: "blusas",    price: 16999, old: 21999, rating: 4.8, reviews: 342, best: true,  img: "https://images.pexels.com/photos/7945660/pexels-photo-7945660.jpeg?auto=compress&cs=tinysrgb&w=750", desc: "Premium cotton shirt, relaxed fit. An essential basic." },
  { id: 5,  name: "Blue Satin Blouse",   cat: "blusas",    price: 18999, old: null,  rating: 4.6, reviews: 121, best: false, img: "https://silksilky.com/cdn/shop/files/f6d3d46a84ee03a454aaaeb2cd0739ed.jpg?v=1747459175&width=660", desc: "Soft blue satin with subtle sheen, perfect for the evening." },
  { id: 6,  name: "Ribbed Strap Top",        cat: "blusas",    price: 9999,  old: null,  rating: 4.5, reviews: 267, best: false, img: "https://images.unsplash.com/photo-1729727897698-49aa9de604a0?auto=format&fit=crop&w=800&q=80", desc: "Fitted ribbed top, goes with everything." },
  { id: 7,  name: "Pleated Midi Skirt",         cat: "faldas",    price: 19999, old: 25999, rating: 4.7, reviews: 143, best: true,  img: "https://images.pexels.com/photos/4663319/pexels-photo-4663319.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "Fine pleats and elastic waist. Movement and comfort." },
  { id: 8,  name: "Gold Chain Necklace",    cat: "joyeria",   price: 12999, old: null,  rating: 4.9, reviews: 198, best: true,  img: "https://nyaara.com.au/cdn/shop/files/natalie-sysko-0IOY1_3d-r0-unsplash.jpg?v=1747831435&width=800", desc: "18k gold-plated chain necklace, hypoallergenic." },
  { id: 9,  name: "Gold Drop Earrings",     cat: "joyeria",   price: 7999,  old: null,  rating: 4.8, reviews: 176, best: false, img: "https://images.pexels.com/photos/9132562/pexels-photo-9132562.jpeg?w=600", desc: "Lightweight earrings with artisanal design, secure clasp." },
  { id: 10, name: "Heart Charm Bracelet",      cat: "joyeria",   price: 6999,  old: 9999,  rating: 4.6, reviews: 89,  best: false, img: "https://images.pexels.com/photos/20724559/pexels-photo-20724559/free-photo-of-golden-bracelets-on-woman-arm.jpeg?auto=compress&cs=tinysrgb&w=600", desc: "Adjustable bracelet with heart charm. A delicate touch." },
  { id: 11, name: "Natural Straw Hat",   cat: "sombreros", price: 14999, old: null,  rating: 4.7, reviews: 112, best: true,  img: "https://images.pexels.com/photos/32135195/pexels-photo-32135195/free-photo-of-smiling-woman-in-straw-hat-enjoying-sunny-day.jpeg?auto=compress&w=600", desc: "Toquilla straw hat with black ribbon. Protection with style." },
  { id: 12, name: "Knitted Wool Scarf",     cat: "bufandas",  price: 11999, old: null,  rating: 4.8, reviews: 134, best: false, img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&h=800&q=80", desc: "Soft, warm wool in neutral tones. Made to last." },
  { id: 13, name: "Printed Silk Scarf",  cat: "bufandas",  price: 8999,  old: 12999, rating: 4.6, reviews: 77,  best: false, img: "https://images.pexels.com/photos/34225140/pexels-photo-34225140/free-photo-of-stylish-woman-in-floral-scarf-and-black-dress.jpeg?auto=compress&cs=tinysrgb&w=600&loading=lazy", desc: "100% silk with exclusive print. Wear it many ways." },
  { id: 14, name: "Leather Crossbody Bag",    cat: "carteras",  price: 32999, old: null,  rating: 4.9, reviews: 203, best: true,  img: "https://images.pexels.com/photos/27174569/pexels-photo-27174569/free-photo-of-woman-sitting-with-leather-bag.jpeg?auto=compress&w=1260&h=750&dpr=1", desc: "Premium eco-leather, adjustable strap and inner lining." },
];

const CATEGORIES = [
  { key: "vestidos",  label: "Dresses",  img: "" },
  { key: "blusas",    label: "Blouses",    img: "" },
  { key: "faldas",    label: "Skirts",    img: "" },
  { key: "joyeria",   label: "Jewelry",   img: "" },
  { key: "sombreros", label: "Hats", img: "" },
  { key: "bufandas",  label: "Scarves",  img: "" },
];

const HERO_IMG = "https://images.unsplash.com/photo-1635913640742-6c49c7d2ce8c?auto=format&fit=crop&w=1600&q=80";
const PROMO_IMG = "https://images.pexels.com/photos/7679794/pexels-photo-7679794.jpeg?auto=compress&cs=tinysrgb&w=600&loading=lazy";

const WHATSAPP = "541157457773";
