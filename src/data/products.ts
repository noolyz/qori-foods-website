import { type Product, type ProductCategory } from "./types";
import { type Locale } from "@/i18n/routing";

/**
 * Product catalogue — single source of truth for both locales.
 * Imagery uses Unsplash placeholders; replace `image.src` with real product
 * photography before launch. Specs (calibers, packaging, seasonality) are
 * industry-typical starting points and should be confirmed by the client.
 * TODO: confirm all specs and swap placeholder imagery for real assets.
 */
export const products: Product[] = [
  {
    slug: "blueberries",
    name: { en: "Blueberries", es: "Arándanos" },
    category: "berry",
    featured: true,
    tagline: {
      en: "Our flagship crop, grown across 80 hectares in Caraz.",
      es: "Nuestro cultivo insignia, en 80 hectáreas en Caraz.",
    },
    summary: {
      en: "Firm, high-brix blueberries rich in anthocyanin antioxidants, grown in the acidic Andean soils of Caraz and available year-round.",
      es: "Arándanos firmes y de alto brix, ricos en antocianinas, cultivados en los suelos ácidos andinos de Caraz y disponibles todo el año.",
    },
    body: {
      en: [
        "Blueberries are the heart of Qori Foods. Cultivated on perennial bushes across 80 hectares in Caraz, they demand acidic soils and meticulous care — conditions the Callejón de Huaylas provides naturally.",
        "Rich in anthocyanins, our berries are selected for firmness, uniform caliber and shelf life, then cold-chained from field to port to protect quality on long-haul routes to North America, Europe and Asia.",
      ],
      es: [
        "El arándano es el corazón de Qori Foods. Cultivado en arbustos perennes a lo largo de 80 hectáreas en Caraz, requiere suelos ácidos y un cuidado meticuloso, condiciones que el Callejón de Huaylas ofrece de forma natural.",
        "Ricos en antocianinas, nuestros arándanos se seleccionan por firmeza, calibre uniforme y vida en anaquel, y se mantienen en cadena de frío del campo al puerto para proteger la calidad en rutas de larga distancia hacia Norteamérica, Europa y Asia.",
      ],
    },
    highlights: {
      en: ["High anthocyanin antioxidants", "Supports cardiovascular health", "Firm texture, long shelf life"],
      es: ["Alto contenido de antocianinas", "Favorece la salud cardiovascular", "Textura firme, larga vida en anaquel"],
    },
    varieties: {
      en: ["Ventura", "Biloxi", "Emerald"],
      es: ["Ventura", "Biloxi", "Emerald"],
    },
    packaging: {
      en: ["Clamshells 125 g / 4.4 oz", "Punnets 6 oz / 18 oz", "Bulk 1.5 kg cartons"],
      es: ["Clamshells 125 g / 4.4 oz", "Punnets 6 oz / 18 oz", "Cajas a granel 1.5 kg"],
    },
    region: { en: "Caraz, Áncash", es: "Caraz, Áncash" },
    availability: "year-round",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [8, 9, 10, 11],
    certifications: ["globalgap", "grasp", "brc", "haccp", "smeta"],
    image: {
      src: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Fresh blueberries", es: "Arándanos frescos" },
    },
  },
  {
    slug: "avocado",
    name: { en: "Hass Avocado", es: "Palta Hass" },
    category: "fruit",
    featured: true,
    tagline: {
      en: "Creamy Hass avocados with export-grade dry matter.",
      es: "Paltas Hass cremosas con materia seca de exportación.",
    },
    summary: {
      en: "Premium Hass avocados with high oil content and consistent caliber, harvested to meet the dry-matter standards of demanding import markets.",
      es: "Paltas Hass premium con alto contenido de aceite y calibre uniforme, cosechadas para cumplir los estándares de materia seca de mercados exigentes.",
    },
    body: {
      en: [
        "The Hass avocado is prized for its creamy texture and nutty flavor. We harvest by dry-matter maturity rather than calendar date, ensuring fruit that ripens evenly for retail and foodservice buyers.",
        "Graded by caliber and packed cold, our avocados travel reliably to Europe and North America during the Peruvian window that complements Northern Hemisphere supply gaps.",
      ],
      es: [
        "La palta Hass es apreciada por su textura cremosa y sabor a nuez. Cosechamos por madurez de materia seca y no por fecha de calendario, garantizando fruta que madura de forma uniforme para retail y foodservice.",
        "Clasificadas por calibre y empacadas en frío, nuestras paltas viajan de forma confiable a Europa y Norteamérica durante la ventana peruana que complementa la oferta del hemisferio norte.",
      ],
    },
    highlights: {
      en: ["Rich in heart-healthy fats", "High, consistent dry matter", "Source of potassium & fiber"],
      es: ["Rica en grasas saludables", "Materia seca alta y consistente", "Fuente de potasio y fibra"],
    },
    varieties: { en: ["Hass"], es: ["Hass"] },
    packaging: {
      en: ["4 kg / 10 kg cartons", "Calibers 12–30", "Loose or pre-conditioned"],
      es: ["Cajas 4 kg / 10 kg", "Calibres 12–30", "Suelta o preacondicionada"],
    },
    region: { en: "Coastal valleys, Perú", es: "Valles costeros, Perú" },
    availability: "seasonal",
    months: [3, 4, 5, 6, 7, 8, 9],
    peakMonths: [5, 6, 7],
    certifications: ["globalgap", "grasp", "haccp", "gmp"],
    image: {
      src: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Halved avocado", es: "Palta partida" },
    },
  },
  {
    slug: "snow-peas",
    name: { en: "Snow Peas & Sugar Snaps", es: "Arveja China" },
    category: "vegetable",
    featured: true,
    tagline: {
      en: "Crisp, tender pods harvested and cooled the same day.",
      es: "Vainas crujientes y tiernas, cosechadas y enfriadas el mismo día.",
    },
    summary: {
      en: "Hand-picked snow peas and sugar snaps with bright color and snap, cooled within hours of harvest for maximum freshness on arrival.",
      es: "Arveja china y sugar snaps cosechadas a mano, con color y textura crujiente, enfriadas pocas horas tras la cosecha para máxima frescura al llegar.",
    },
    body: {
      en: [
        "Snow peas (Snow Peas) and sugar snaps are labor-intensive, delicate crops. Our predominantly female field teams hand-select pods for size and tenderness, a level of care that machine harvesting cannot match.",
        "Rapid pre-cooling and a maintained cold chain preserve the crisp bite and vivid green that buyers expect for premium retail programs.",
      ],
      es: [
        "La arveja china y los sugar snaps son cultivos delicados e intensivos en mano de obra. Nuestros equipos de campo, mayoritariamente femeninos, seleccionan las vainas a mano por tamaño y ternura, un nivel de cuidado que la cosecha mecánica no logra.",
        "El preenfriado rápido y una cadena de frío constante preservan la textura crujiente y el verde intenso que los compradores esperan para programas premium de retail.",
      ],
    },
    highlights: {
      en: ["Low calorie, high fiber", "Source of vitamin C & K", "Same-day field cooling"],
      es: ["Bajo en calorías, alto en fibra", "Fuente de vitamina C y K", "Enfriado el mismo día"],
    },
    varieties: { en: ["Snow pea", "Sugar snap"], es: ["Arveja china", "Sugar snap"] },
    packaging: {
      en: ["200 g / 227 g bags", "5 kg bulk boxes", "Retail-ready trays"],
      es: ["Bolsas 200 g / 227 g", "Cajas a granel 5 kg", "Bandejas listas para retail"],
    },
    region: { en: "Andean highlands, Perú", es: "Sierra andina, Perú" },
    availability: "year-round",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [4, 5, 6, 7, 8],
    certifications: ["globalgap", "grasp", "haccp", "smeta"],
    image: {
      src: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Fresh green snow peas", es: "Arveja china fresca" },
    },
  },
  {
    slug: "ginger",
    name: { en: "Ginger", es: "Jengibre" },
    category: "specialty",
    featured: true,
    tagline: {
      en: "Aromatic, high-oleoresin ginger from Andean valleys.",
      es: "Jengibre aromático y de alta oleorresina de los valles andinos.",
    },
    summary: {
      en: "Pungent, fiber-controlled ginger rhizomes with strong aroma and shelf stability, well suited to organic and conventional programs alike.",
      es: "Rizomas de jengibre picantes y con fibra controlada, de fuerte aroma y estabilidad en anaquel, ideales para programas orgánicos y convencionales.",
    },
    body: {
      en: [
        "Zingiber officinale thrives in warm, humid Andean valleys. Our ginger is cured and graded for firmness and clean skin, delivering the aroma and heat that processors and retailers demand.",
        "We supply both mature and organic-eligible lots, packed to preserve moisture and minimize sprouting over long transit.",
      ],
      es: [
        "El Zingiber officinale prospera en valles andinos cálidos y húmedos. Nuestro jengibre se cura y clasifica por firmeza y piel limpia, entregando el aroma y picor que exigen procesadores y retailers.",
        "Suministramos lotes maduros y elegibles como orgánicos, empacados para preservar la humedad y minimizar el brotado en tránsitos largos.",
      ],
    },
    highlights: {
      en: ["High oleoresin & aroma", "Digestive & anti-inflammatory", "Organic lots available"],
      es: ["Alta oleorresina y aroma", "Digestivo y antiinflamatorio", "Lotes orgánicos disponibles"],
    },
    varieties: { en: ["Conventional", "Organic"], es: ["Convencional", "Orgánico"] },
    packaging: {
      en: ["13.6 kg cartons", "10 kg mesh bags", "Jumbo & select grades"],
      es: ["Cajas 13.6 kg", "Sacos de malla 10 kg", "Grados jumbo y select"],
    },
    region: { en: "Junín & central selva, Perú", es: "Junín y selva central, Perú" },
    availability: "seasonal",
    months: [5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [7, 8, 9, 10],
    certifications: ["globalgap", "haccp", "gmp"],
    image: {
      src: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Fresh ginger root", es: "Raíz de jengibre fresca" },
    },
  },
  {
    slug: "yellow-chili",
    name: { en: "Ají Amarillo", es: "Ají Amarillo" },
    category: "pepper",
    featured: false,
    tagline: {
      en: "The emblematic golden chili of Peruvian cuisine.",
      es: "El emblemático ají dorado de la cocina peruana.",
    },
    summary: {
      en: "Vibrant yellow-orange chilies with fruity heat, a cornerstone of Peruvian gastronomy, supplied fresh, frozen or as paste.",
      es: "Ajíes de intenso color amarillo-naranja con picor afrutado, pilar de la gastronomía peruana, disponibles frescos, congelados o en pasta.",
    },
    body: {
      en: [
        "Ají amarillo defines the flavor of Peruvian cooking. We grow and select fruit for color intensity and balanced heat, serving both retail and industrial customers.",
        "Beyond fresh, we can coordinate frozen and paste formats for buyers building authentic Peruvian product lines.",
      ],
      es: [
        "El ají amarillo define el sabor de la cocina peruana. Cultivamos y seleccionamos la fruta por intensidad de color y picor equilibrado, atendiendo a clientes de retail e industriales.",
        "Además de fresco, podemos coordinar formatos congelado y en pasta para compradores que desarrollan líneas de producto peruanas auténticas.",
      ],
    },
    highlights: {
      en: ["Fruity, balanced heat", "Rich in vitamin C", "Fresh, frozen or paste"],
      es: ["Picor afrutado y equilibrado", "Rico en vitamina C", "Fresco, congelado o en pasta"],
    },
    varieties: { en: ["Ají amarillo"], es: ["Ají amarillo"] },
    packaging: {
      en: ["5 kg boxes", "Frozen 10 kg", "Paste (on request)"],
      es: ["Cajas 5 kg", "Congelado 10 kg", "Pasta (a pedido)"],
    },
    region: { en: "Coastal Perú", es: "Costa del Perú" },
    availability: "year-round",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [11, 12, 1, 2],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1583119912267-cc97c911e416?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Yellow chili peppers", es: "Ajíes amarillos" },
    },
  },
  {
    slug: "rocoto",
    name: { en: "Rocoto", es: "Rocoto" },
    category: "pepper",
    featured: false,
    tagline: {
      en: "The bold Andean chili with unmistakable heat.",
      es: "El intenso ají andino de picor inconfundible.",
    },
    summary: {
      en: "Thick-walled Andean rocoto peppers with pronounced heat and apple-like body, popular for stuffing and sauces.",
      es: "Rocotos andinos de pared gruesa, picor pronunciado y cuerpo similar a la manzana, ideales para rellenar y salsas.",
    },
    body: {
      en: [
        "Native to the Peruvian Andes, rocoto stands apart with its thick flesh and intense heat. It is a signature ingredient in dishes such as rocoto relleno.",
        "We select fruit for wall thickness and uniform ripeness, packing carefully to protect this delicate, high-value pepper in transit.",
      ],
      es: [
        "Nativo de los Andes peruanos, el rocoto destaca por su pulpa gruesa y picor intenso. Es ingrediente emblemático de platos como el rocoto relleno.",
        "Seleccionamos la fruta por grosor de pared y madurez uniforme, empacando con cuidado para proteger este ají delicado y de alto valor en el tránsito.",
      ],
    },
    highlights: {
      en: ["Thick, meaty walls", "Intense signature heat", "Ideal for stuffing"],
      es: ["Paredes gruesas y carnosas", "Picor intenso característico", "Ideal para rellenar"],
    },
    varieties: { en: ["Rocoto"], es: ["Rocoto"] },
    packaging: { en: ["4 kg boxes", "Bulk on request"], es: ["Cajas 4 kg", "Granel a pedido"] },
    region: { en: "Andean valleys, Perú", es: "Valles andinos, Perú" },
    availability: "seasonal",
    months: [3, 4, 5, 6, 7, 8, 9, 10],
    peakMonths: [5, 6, 7, 8],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1526346698789-22fd84314424?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Red rocoto peppers", es: "Rocotos rojos" },
    },
  },
  {
    slug: "lime",
    name: { en: "Peruvian Lime", es: "Limón" },
    category: "fruit",
    featured: false,
    tagline: {
      en: "Aromatic, juicy limes with high acidity.",
      es: "Limones aromáticos y jugosos, de alta acidez.",
    },
    summary: {
      en: "Thin-skinned, juice-rich Peruvian limes with bright acidity, essential for beverages, ceviche and foodservice.",
      es: "Limones peruanos de cáscara fina y alto rendimiento de jugo, con acidez brillante, esenciales para bebidas, ceviche y foodservice.",
    },
    body: {
      en: [
        "Grown on coastal citrus trees, our limes offer intense aroma and high juice yield — the defining acidity behind Peru's most famous dishes.",
        "We grade by caliber and pack for durability, serving distributors and processors that need dependable, year-round supply.",
      ],
      es: [
        "Cultivados en árboles cítricos de la costa, nuestros limones ofrecen aroma intenso y alto rendimiento de jugo, la acidez que define los platos más famosos del Perú.",
        "Clasificamos por calibre y empacamos para durabilidad, atendiendo a distribuidores y procesadores que requieren un suministro confiable todo el año.",
      ],
    },
    highlights: {
      en: ["High juice yield", "Rich in vitamin C", "Bright, clean acidity"],
      es: ["Alto rendimiento de jugo", "Rico en vitamina C", "Acidez limpia e intensa"],
    },
    varieties: { en: ["Sutil / Key lime"], es: ["Limón sutil"] },
    packaging: { en: ["10 kg / 18 kg sacks", "Calibers by count"], es: ["Sacos 10 kg / 18 kg", "Calibres por conteo"] },
    region: { en: "Northern coast, Perú", es: "Costa norte, Perú" },
    availability: "year-round",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [12, 1, 2, 3],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1622957461168-202e611f2bb2?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Fresh limes", es: "Limones frescos" },
    },
  },
  {
    slug: "purple-corn",
    name: { en: "Purple Corn", es: "Maíz Morado" },
    category: "specialty",
    featured: false,
    tagline: {
      en: "Ancient Andean corn rich in natural pigments.",
      es: "Maíz andino ancestral, rico en pigmentos naturales.",
    },
    summary: {
      en: "Deep-purple Andean corn prized for its anthocyanin content, used for beverages (chicha morada), extracts and natural colorants.",
      es: "Maíz andino de intenso color púrpura, apreciado por su contenido de antocianinas, usado para bebidas (chicha morada), extractos y colorantes naturales.",
    },
    body: {
      en: [
        "Purple corn is one of Peru's most distinctive ancestral crops. Its striking pigment is driven by anthocyanins, a natural antioxidant sought by the beverage and nutraceutical industries.",
        "We supply whole cobs and can coordinate dried and processed formats for ingredient buyers.",
      ],
      es: [
        "El maíz morado es uno de los cultivos ancestrales más distintivos del Perú. Su llamativo pigmento proviene de las antocianinas, un antioxidante natural buscado por las industrias de bebidas y nutracéuticos.",
        "Suministramos mazorcas enteras y podemos coordinar formatos secos y procesados para compradores de ingredientes.",
      ],
    },
    highlights: {
      en: ["Natural anthocyanin pigment", "Antioxidant-rich", "Whole cob or processed"],
      es: ["Pigmento natural de antocianinas", "Rico en antioxidantes", "Mazorca entera o procesado"],
    },
    varieties: { en: ["Andean purple corn"], es: ["Maíz morado andino"] },
    packaging: { en: ["Cartons by weight", "Dried (on request)"], es: ["Cajas por peso", "Seco (a pedido)"] },
    region: { en: "Andean highlands, Perú", es: "Sierra andina, Perú" },
    availability: "seasonal",
    months: [4, 5, 6, 7, 8, 9],
    peakMonths: [5, 6, 7],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Purple corn cobs", es: "Mazorcas de maíz morado" },
    },
  },
  {
    slug: "sweet-corn",
    name: { en: "Andean Choclo", es: "Choclo" },
    category: "vegetable",
    featured: false,
    tagline: {
      en: "Large-kernel Andean corn with tender bite.",
      es: "Maíz andino de grano grande y textura tierna.",
    },
    summary: {
      en: "Choclo, the giant-kernel Andean corn with a mild, milky flavor and tender texture, a staple of highland cuisine.",
      es: "Choclo, el maíz andino de grano gigante con sabor suave y lechoso y textura tierna, básico de la cocina de altura.",
    },
    body: {
      en: [
        "Choclo's oversized, soft kernels set it apart from common sweet corn. It is a beloved companion to Andean dishes and cheeses.",
        "We harvest at optimal tenderness and cool promptly to preserve texture for fresh and frozen programs.",
      ],
      es: [
        "Los granos grandes y suaves del choclo lo diferencian del maíz dulce común. Es un acompañante querido de platos y quesos andinos.",
        "Cosechamos en el punto óptimo de ternura y enfriamos con prontitud para preservar la textura en programas frescos y congelados.",
      ],
    },
    highlights: {
      en: ["Large, tender kernels", "Mild, milky flavor", "Fresh or frozen"],
      es: ["Granos grandes y tiernos", "Sabor suave y lechoso", "Fresco o congelado"],
    },
    varieties: { en: ["Choclo serrano"], es: ["Choclo serrano"] },
    packaging: { en: ["Mesh sacks", "Frozen kernels"], es: ["Sacos de malla", "Granos congelados"] },
    region: { en: "Andean valleys, Perú", es: "Valles andinos, Perú" },
    availability: "seasonal",
    months: [3, 4, 5, 6, 7, 8, 9, 10],
    peakMonths: [5, 6, 7],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Andean corn", es: "Choclo andino" },
    },
  },
  {
    slug: "cherimoya",
    name: { en: "Cherimoya", es: "Chirimoya" },
    category: "fruit",
    featured: false,
    tagline: {
      en: "The custard-sweet jewel of Andean valleys.",
      es: "La joya dulce y cremosa de los valles andinos.",
    },
    summary: {
      en: "Fragrant cherimoya with creamy, custard-like flesh and a delicate sweet-tart flavor, a true specialty fruit for premium markets.",
      es: "Chirimoya fragante de pulpa cremosa tipo natilla y delicado sabor dulce-ácido, una auténtica fruta especial para mercados premium.",
    },
    body: {
      en: [
        "Native to the inter-Andean valleys, cherimoya is celebrated for its smooth, aromatic pulp. Its delicacy demands careful handling from harvest to shelf.",
        "We select for ripeness and appearance and pack to protect this high-value specialty fruit for discerning buyers.",
      ],
      es: [
        "Nativa de los valles interandinos, la chirimoya es célebre por su pulpa suave y aromática. Su delicadeza exige un manejo cuidadoso de la cosecha al anaquel.",
        "Seleccionamos por madurez y apariencia y empacamos para proteger esta fruta especial de alto valor para compradores exigentes.",
      ],
    },
    highlights: {
      en: ["Creamy, aromatic pulp", "Source of vitamin C & B6", "Premium specialty fruit"],
      es: ["Pulpa cremosa y aromática", "Fuente de vitamina C y B6", "Fruta especial premium"],
    },
    varieties: { en: ["Cumbe"], es: ["Cumbe"] },
    packaging: { en: ["Single-layer trays", "Cushioned cartons"], es: ["Bandejas de una capa", "Cajas acolchadas"] },
    region: { en: "Inter-Andean valleys, Perú", es: "Valles interandinos, Perú" },
    availability: "seasonal",
    months: [3, 4, 5, 6, 7, 8],
    peakMonths: [4, 5, 6],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1591208608924-3f4b3f8b8b3e?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Cherimoya fruit", es: "Chirimoya" },
    },
  },
  {
    slug: "fig",
    name: { en: "Fig", es: "Higo" },
    category: "fruit",
    featured: false,
    tagline: {
      en: "Sweet, delicate figs from coastal groves.",
      es: "Higos dulces y delicados de huertos costeros.",
    },
    summary: {
      en: "Soft, honey-sweet figs with tender skin, grown in Peru's coastal regions for fresh and processing markets.",
      es: "Higos suaves y dulces como la miel, de piel tierna, cultivados en las regiones costeras del Perú para mercados frescos y de procesamiento.",
    },
    body: {
      en: [
        "The fig, fruit of the higuera, thrives in Peru's coastal climate. Its delicate skin and short shelf life reward careful, rapid handling.",
        "We harvest at peak sweetness and pack in protective trays for fresh sale, with processing lots available for jams and dried products.",
      ],
      es: [
        "El higo, fruto de la higuera, prospera en el clima costero del Perú. Su piel delicada y su corta vida en anaquel recompensan un manejo cuidadoso y rápido.",
        "Cosechamos en el punto máximo de dulzor y empacamos en bandejas protectoras para venta fresca, con lotes de procesamiento disponibles para mermeladas y productos secos.",
      ],
    },
    highlights: {
      en: ["Naturally honey-sweet", "Source of fiber & minerals", "Fresh or for processing"],
      es: ["Dulzor natural como la miel", "Fuente de fibra y minerales", "Fresco o para procesamiento"],
    },
    varieties: { en: ["Black mission"], es: ["Negro / mission"] },
    packaging: { en: ["Single-layer trays", "Processing bulk"], es: ["Bandejas de una capa", "Granel para procesamiento"] },
    region: { en: "Coastal Perú", es: "Costa del Perú" },
    availability: "seasonal",
    months: [1, 2, 3, 12],
    peakMonths: [1, 2],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1601379329542-31c59d7b3f0d?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Fresh figs", es: "Higos frescos" },
    },
  },
  {
    slug: "prickly-pear",
    name: { en: "Prickly Pear (Tuna)", es: "Tuna" },
    category: "fruit",
    featured: false,
    tagline: {
      en: "Refreshing desert fruit with jewel-like flesh.",
      es: "Fruta refrescante del desierto, de pulpa como joya.",
    },
    summary: {
      en: "Sweet, juicy prickly pear from arid highlands, with vibrant flesh and refreshing flavor, ideal for fresh and juice markets.",
      es: "Tuna dulce y jugosa de zonas áridas de altura, con pulpa vibrante y sabor refrescante, ideal para mercados frescos y de jugo.",
    },
    body: {
      en: [
        "Tuna, the fruit of the nopal cactus, grows in arid and semi-arid highlands. Its refreshing, lightly floral flavor is gaining traction in export markets.",
        "We de-spine and pack carefully, protecting the fruit's delicate skin for fresh presentation.",
      ],
      es: [
        "La tuna, fruto del nopal, crece en zonas áridas y semiáridas de altura. Su sabor refrescante y ligeramente floral gana terreno en mercados de exportación.",
        "Retiramos las espinas y empacamos con cuidado, protegiendo la piel delicada de la fruta para una presentación fresca.",
      ],
    },
    highlights: {
      en: ["Hydrating & refreshing", "Source of vitamin C", "Fresh or juice"],
      es: ["Hidratante y refrescante", "Fuente de vitamina C", "Fresca o para jugo"],
    },
    varieties: { en: ["Green", "Red/purple"], es: ["Verde", "Roja/morada"] },
    packaging: { en: ["Single-layer trays", "Bulk cartons"], es: ["Bandejas de una capa", "Cajas a granel"] },
    region: { en: "Andean highlands, Perú", es: "Sierra andina, Perú" },
    availability: "seasonal",
    months: [11, 12, 1, 2, 3, 4],
    peakMonths: [12, 1, 2],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Prickly pear fruit", es: "Tuna" },
    },
  },
  {
    slug: "granadilla",
    name: { en: "Granadilla", es: "Granadilla" },
    category: "fruit",
    featured: false,
    tagline: {
      en: "Sweet passionfruit cousin with aromatic pulp.",
      es: "Prima dulce del maracuyá, de pulpa aromática.",
    },
    summary: {
      en: "Granadilla, a member of the passionflower family, with sweet, gelatinous pulp and crunchy edible seeds — a delicacy for premium fruit programs.",
      es: "Granadilla, de la familia de las pasifloras, con pulpa dulce y gelatinosa y semillas crocantes comestibles, una delicia para programas de fruta premium.",
    },
    body: {
      en: [
        "Granadilla is prized for its sweet, aromatic pulp and orange, brittle shell. It ships well when handled with care and offers strong appeal in specialty markets.",
        "We select for shell integrity and ripeness, packing to minimize cracking in transit.",
      ],
      es: [
        "La granadilla es apreciada por su pulpa dulce y aromática y su cáscara anaranjada y quebradiza. Viaja bien con un manejo cuidadoso y tiene gran atractivo en mercados especializados.",
        "Seleccionamos por integridad de cáscara y madurez, empacando para minimizar el agrietamiento en tránsito.",
      ],
    },
    highlights: {
      en: ["Sweet, aromatic pulp", "Source of vitamins A & C", "Premium specialty fruit"],
      es: ["Pulpa dulce y aromática", "Fuente de vitaminas A y C", "Fruta especial premium"],
    },
    varieties: { en: ["Granadilla"], es: ["Granadilla"] },
    packaging: { en: ["Trays by count", "Cushioned cartons"], es: ["Bandejas por conteo", "Cajas acolchadas"] },
    region: { en: "Andean valleys, Perú", es: "Valles andinos, Perú" },
    availability: "year-round",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [5, 6, 7, 8],
    certifications: ["globalgap", "haccp"],
    image: {
      src: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=1200&q=80",
      alt: { en: "Granadilla fruit", es: "Granadilla" },
    },
  },
];

export const productCategories: {
  id: ProductCategory;
  label: Record<Locale, string>;
}[] = [
  { id: "berry", label: { en: "Berries", es: "Berries" } },
  { id: "fruit", label: { en: "Fruits", es: "Frutas" } },
  { id: "vegetable", label: { en: "Vegetables", es: "Hortalizas" } },
  { id: "pepper", label: { en: "Peppers", es: "Ajíes" } },
  { id: "specialty", label: { en: "Specialty", es: "Especiales" } },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
