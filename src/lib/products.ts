export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "Fleece" | "T-Shirts" | "Headwear" | "Accessories";
  price: string;
  img: string;
  description: string;
}

export const products: Product[] = [
  { 
    id: "1", 
    slug: "hoodie-black-vinyl",
    name: "Pandgaea Signature Black Hoodie", 
    category: "Fleece", 
    price: "$65", 
    img: "/images/transparent_black hoodie white vinyl logo.png",
    description: "Heavyweight premium fleece. Features a crisp white vinyl Pandgaea logo on the left chest. Cut and sewn for a perfect oversized fit."
  },
  { 
    id: "2", 
    slug: "tee-white-black",
    name: "Classic White Logo Tee", 
    category: "T-Shirts", 
    price: "$35", 
    img: "/images/transparent_white tee black logo..png",
    description: "Soft cotton and bamboo blend. Built for everyday wear with a premium hand feel and bold black chest logo."
  },
  { 
    id: "3", 
    slug: "hat-black-dad",
    name: "Embroidered Black Dad Hat", 
    category: "Headwear", 
    price: "$28", 
    img: "/images/transparent_black dad hat.png",
    description: "Low-profile, unstructured dad hat. Features clean, minimal embroidery stitched directly in our live workshop."
  },
  { 
    id: "4", 
    slug: "patch-panda",
    name: "Custom 8\" Patch", 
    category: "Accessories", 
    price: "$20", 
    img: "/images/transparent_patch.png",
    description: "Standalone custom 8-inch patch. High-quality threads, iron-on ready, or sew it yourself onto your favorite jacket."
  },
  { 
    id: "5", 
    slug: "hoodie-white-vinyl",
    name: "White Signature Hoodie", 
    category: "Fleece", 
    price: "$65", 
    img: "/images/transparent_white hoodie black vinyl logo.png",
    description: "The white counterpart to our signature heavyweight fleece. Features a sharp black vinyl chest logo."
  },
  { 
    id: "6", 
    slug: "tee-black-vinyl",
    name: "Black Logo Tee", 
    category: "T-Shirts", 
    price: "$35", 
    img: "/images/transparent_black tee vinly logo.png",
    description: "Our classic bamboo blend tee in stealth black. Subtle, premium, and built to last."
  },
  { 
    id: "7", 
    slug: "beanie-cream-wool",
    name: "Cream Wool Beanie", 
    category: "Headwear", 
    price: "$24", 
    img: "/images/transparent_cream wool beanie.png",
    description: "Thick knit cream wool beanie for cold nights. Features the Pandgaea Yin-Yang bear logo."
  },
  { 
    id: "8", 
    slug: "hat-white-dad",
    name: "White Dad Hat", 
    category: "Headwear", 
    price: "$28", 
    img: "/images/transparent_white dad hat.png",
    description: "Clean white dad hat with our signature embroidered logo on the front."
  },
  { 
    id: "9", 
    slug: "hoodie-black-embroidered",
    name: "Pandgaea Direct Embroidered Hoodie", 
    category: "Fleece", 
    price: "$75", 
    img: "/images/transparent_embroidered black hoodie.png",
    description: "Heavyweight 450 GSM fleece with direct high-density 3D puff embroidery. Hand-stitched in our live workshop."
  },
  { 
    id: "10", 
    slug: "beanie-black-stealth",
    name: "Stealth Knit Black Beanie", 
    category: "Headwear", 
    price: "$24", 
    img: "/images/transparent_black beanie.png",
    description: "Dense ribbed acrylic knit beanie with embroidered monochrome Pandgaea Yin-Yang patch."
  },
  { 
    id: "11", 
    slug: "tee-white-minimalist",
    name: "Minimalist Pocket-Print White Tee", 
    category: "T-Shirts", 
    price: "$32", 
    img: "/images/transparent_white tee small logo.png",
    description: "Heavy cotton combed tee featuring clean left-chest panda branding for everyday streetwear style."
  }
];
