# Guía SEO — Qori Foods

Documento de referencia para entender el SEO implementado en el sitio y configurar todo correctamente después del deploy.

**Dominio de producción:** `https://www.qorifoods.com`  
**Stack:** Next.js 15 (App Router) · EN/ES con next-intl · 54 páginas estáticas

---

## Tabla de contenidos

1. [Resumen ejecutivo](#resumen-ejecutivo)
2. [Estado actual del SEO técnico](#estado-actual-del-seo-técnico)
3. [Sitelinks en Google (enlaces debajo del resultado)](#sitelinks-en-google-enlaces-debajo-del-resultado)
4. [Estrategia de keywords](#estrategia-de-keywords)
5. [Archivos clave del proyecto](#archivos-clave-del-proyecto)
6. [Datos estructurados (JSON-LD)](#datos-estructurados-json-ld)
7. [Checklist post-deploy](#checklist-post-deploy)
8. [Expectativas de posicionamiento](#expectativas-de-posicionamiento)
9. [Herramientas de verificación](#herramientas-de-verificación)
10. [Mantenimiento continuo](#mantenimiento-continuo)

---

## Resumen ejecutivo

El sitio tiene un **SEO técnico avanzado** implementado: meta tags por página, keywords extensos (EN/ES), canonical/hreflang, Open Graph, sitemap, robots.txt y datos estructurados Schema.org.

**Importante:** el SEO on-page maximiza las posibilidades de aparecer en Google, pero **posicionar #1** en búsquedas competitivas también depende de:

- Tiempo (Google tarda semanas/meses en indexar y posicionar)
- Autoridad del dominio y backlinks
- Google Search Console configurado
- Contenido fresco y señales externas (redes, directorios, etc.)

Para búsquedas de marca (**"QORI"**, **"Qori Foods"**), las probabilidades son altas una vez el dominio esté live e indexado.

---

## Estado actual del SEO técnico

| Área | Estado | Detalle |
|------|--------|---------|
| **Meta tags por página** | ✅ | Título, descripción y keywords en todas las páginas (EN/ES) |
| **Keywords globales** | ✅ | ~55 términos EN + ~55 ES fusionados en cada página |
| **Keywords por página** | ✅ | Home, About, Products, Contact, FAQ, etc. + auto-generados para los 13 productos |
| **Canonical + hreflang** | ✅ | Rutas `/en` y `/es` con alternates y `x-default` → `/en` |
| **Open Graph / Twitter** | ✅ | Imagen 1200×630, título y descripción por página |
| **robots.txt** | ✅ | Permite indexación + apunta al sitemap |
| **sitemap.xml** | ✅ | 54 URLs con alternates hreflang EN/ES |
| **JSON-LD estructurado** | ✅ | Organization, WebSite, SiteNavigationElement, WebPage, Breadcrumb, Product, ItemList, FAQPage |
| **Googlebot directives** | ✅ | `max-snippet: -1`, `max-image-preview: large` |
| **Geo tags** | ✅ | `geo.region: PE-LIM`, `geo.placename: Lima, Perú` |

---

## Sitelinks en Google (enlaces debajo del resultado)

Cuando buscas un sitio en Google y aparecen enlaces internos debajo del resultado principal (ej. *Productos*, *Contacto*, *Certificaciones*), esos son **sitelinks**.

### Lo que debes saber

- **Google los decide automáticamente** — no se pueden forzar al 100% desde el código.
- Aparecen cuando Google entiende bien la estructura del sitio y el dominio tiene autoridad.
- Suelen mostrarse para búsquedas de **marca** (ej. "Qori Foods") antes que para términos genéricos.

### Lo que ya está implementado para favorecerlos

1. **`SiteNavigationElement` en JSON-LD** — 7 enlaces principales declarados explícitamente:
   - Productos (`/products`)
   - Sobre Qori Foods (`/about`)
   - Certificaciones (`/certifications`)
   - Contacto y cotización (`/contact`)
   - Proceso de exportación (`/process`)
   - Sostenibilidad (`/sustainability`)
   - FAQ para compradores (`/faq`)

2. **`WebSite.hasPart`** — Google entiende la jerarquía del sitio como un grafo conectado.

3. **Navegación clara** — Header y footer con los mismos paths que los sitelinks candidatos.

4. **Anchor text descriptivo** — Etiquetas claras en inglés y español.

5. **Sitemap con prioridades** — Home = 1.0, productos = 0.8, resto = 0.6.

### Cómo influir en qué sitelinks aparecen

- Mantén la navegación principal estable (no cambies URLs a menudo).
- Usa títulos de página claros y únicos.
- En Search Console puedo **demote** sitelinks no deseados (no elegir cuáles aparecen, solo ocultar algunos).
- Asegúrate de que las páginas candidatas estén indexadas y sin errores.

---

## Estrategia de keywords

Cada página incluye una mezcla de keywords **globales** + **específicos de la página**.

### Clusters globales (presentes en todas las páginas)

**Marca:**
- Qori Foods, QORI, Qori, Qori Foods SAC, qorifoods.com, www.qorifoods.com

**Industria / B2B:**
- exportador peruano, proveedor B2B, productos frescos, cotización, MOQ, Incoterms, FOB, CIF

**Certificaciones:**
- GLOBALG.A.P., BRCGS, HACCP, GMP, GRASP, SMETA

**Geografía:**
- Caraz, Áncash, Callejón de Huaylas, Lima, Perú

**13 productos (EN y ES):**
- Blueberries / Arándanos
- Hass Avocado / Palta Hass
- Snow Peas / Arveja china
- Ginger / Jengibre
- Yellow Chili / Ají amarillo
- Rocoto
- Lime / Limón peruano
- Purple Corn / Maíz morado
- Sweet Corn / Choclo dulce
- Cherimoya
- Fig / Higo
- Prickly Pear / Tuna
- Granadilla / Maracuyá

### Keywords por página

| Ruta | Ejemplo de términos adicionales |
|------|----------------------------------|
| `/` | empresa productos frescos Perú, Qori Foods oficial |
| `/products` | catálogo frutas frescas, lista cultivos peruanos |
| `/products/[slug]` | Nombre del producto + tagline (auto-generado) |
| `/contact` | solicitar cotización, RFQ fresh produce |
| `/certifications` | certificaciones inocuidad, BRCGS |
| `/about` | historia Qori Foods, productor Caraz |
| `/process` | trazabilidad, cadena de frío, campo al puerto |
| `/sustainability` | agricultura sostenible, trabajo ético |
| `/faq` | MOQ Incoterms muestras, preguntas B2B |
| `/gallery` | fotos finca, galería productos |
| `/news` | noticias Qori Foods, insights exportación |
| `/privacy` | política privacidad, protección datos |

### Cómo editar keywords

Archivo principal: `src/lib/seo-config.ts`

```ts
// Keywords globales (todas las páginas)
export const globalKeywords: Record<Locale, string[]>

// Keywords extra por ruta
export const pageKeywords: Record<string, Record<Locale, string[]>>

// Sitelink candidates para JSON-LD
export const sitelinkNav: { path, name, description }[]
```

Los productos generan keywords automáticamente desde `src/data/products.ts` (nombre + tagline en EN/ES).

---

## Archivos clave del proyecto

```
src/lib/seo-config.ts           → Keywords globales, por página, sitelinks
src/lib/seo.ts                  → pageMetadata() — meta tags unificados
src/lib/site.ts                 → URL del sitio, contacto, navegación
src/components/seo/json-ld.tsx  → Datos estructurados Schema.org
src/components/seo/page-seo.tsx → WebPage + Breadcrumb JSON-LD por página
src/app/sitemap.ts              → Generación de sitemap.xml
src/app/robots.ts                 → Generación de robots.txt
src/app/[locale]/layout.tsx     → GlobalJsonLd + metadata base
messages/en.json                → Títulos y descripciones EN (namespace "meta")
messages/es.json                → Títulos y descripciones ES (namespace "meta")
```

### Meta tags principales (home)

Definidos en `messages/en.json` y `messages/es.json` bajo `"meta"`:

- `homeTitle` — Título optimizado de la página principal
- `homeDescription` — Descripción larga con keywords de marca y productos
- `titleDefault` — Título por defecto del layout
- `titleTemplate` — Plantilla `%s | Qori Foods` para páginas internas

---

## Datos estructurados (JSON-LD)

### Global (en cada página vía layout)

| Schema | Propósito |
|--------|-----------|
| **Organization** | Marca, dirección Lima, teléfono, email, redes, `alternateName: QORI` |
| **WebSite** | Identidad del sitio + `hasPart` con páginas principales |
| **SiteNavigationElement** | Candidatos a sitelinks (7 enlaces) |

### Por página

| Schema | Dónde |
|--------|-------|
| **WebPage** | Todas las páginas con `PageSeo` |
| **BreadcrumbList** | Todas las páginas con breadcrumbs |
| **Product** | Detalle de cada producto |
| **ItemList** | Índice de productos |
| **FAQPage** | Página FAQ |

---

## Checklist post-deploy

Usa esta lista cuando el sitio esté en producción (Vercel u otro hosting).

### 1. Deploy y variables de entorno

- [ ] Deploy en Vercel con dominio `www.qorifoods.com`
- [ ] Variables de entorno configuradas:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
- [ ] Formulario de contacto probado en producción
- [ ] Confirmar que `src/lib/site.ts` tiene la URL correcta: `https://www.qorifoods.com`

### 2. Google Search Console

1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar propiedad: `https://www.qorifoods.com`
3. Verificar dominio (DNS TXT o archivo HTML — Vercel facilita DNS)
4. Enviar sitemap: **`https://www.qorifoods.com/sitemap.xml`**
5. Solicitar indexación de la home (`/en` y `/es`)
6. Revisar semanalmente: Cobertura, Core Web Vitals, Errores de rastreo

### 3. Google Business Profile

- [ ] Crear perfil de empresa con dirección de Lima (Ca. Conde de la Monclova 315, San Isidro)
- [ ] Agregar teléfono, web, horarios y categoría (exportador agrícola / productos frescos)
- [ ] Subir fotos de productos y operaciones

### 4. Redes sociales y backlinks

- [ ] Actualizar URLs reales en `src/lib/site.ts` → `social` (LinkedIn, Instagram, Facebook)
- [ ] Publicar el sitio en perfiles de LinkedIn de la empresa
- [ ] Registrar en directorios B2B agroalimentarios relevantes
- [ ] Pedir menciones/enlaces desde clientes, cámaras de comercio, asociaciones del sector

### 5. Email (Resend)

- [ ] Verificar dominio `qorifoods.com` en Resend para enviar desde `comercial@qorifoods.com`
- [ ] **Rotar la API key** si alguna vez estuvo expuesta en `.env.example`
- [ ] Actualizar `CONTACT_FROM_EMAIL` en producción al dominio verificado

### 6. Contenido

- [ ] Reemplazar imágenes placeholder con fotos reales de Qori Foods
- [ ] Confirmar especificaciones de productos con el cliente
- [ ] Publicar artículos en `/news` periódicamente (Google premia sitios activos)

### 7. Validación técnica

- [ ] Probar [Rich Results Test](https://search.google.com/test/rich-results) con la URL de home
- [ ] Probar [Schema Validator](https://validator.schema.org/) con la URL de home
- [ ] Verificar hreflang: home EN y ES deben tener tags `link rel="alternate" hreflang=...`
- [ ] Lighthouse SEO score ≥ 90 en mobile

---

## Expectativas de posicionamiento

| Búsqueda | Probabilidad de #1 | Notas |
|----------|-------------------|-------|
| **"QORI"** | Alta | Marca propia, poca competencia directa |
| **"Qori Foods"** | Alta | Nombre exacto de la empresa |
| **"Qori Foods SAC"** | Muy alta | Variante legal del nombre |
| **"exportador arándanos Perú"** | Media-baja | Competencia fuerte en el sector |
| **"productos frescos exportación Perú"** | Baja | Término muy genérico y competitivo |
| **"GLOBALG.A.P. exportador Perú"** | Media | Nicho más específico, mejor oportunidad |

**Tiempo estimado:**
- Indexación inicial: 1–4 semanas después de Search Console
- Sitelinks de marca: 2–8 semanas (si el dominio es reconocido)
- Posicionamiento en keywords competitivos: 3–12+ meses

---

## Herramientas de verificación

| Herramienta | URL | Para qué |
|-------------|-----|----------|
| Google Search Console | https://search.google.com/search-console | Indexación, sitemap, errores, sitelinks |
| Rich Results Test | https://search.google.com/test/rich-results | Validar JSON-LD |
| Schema Markup Validator | https://validator.schema.org/ | Validar datos estructurados |
| PageSpeed Insights | https://pagespeed.web.dev/ | Performance + SEO básico |
| Lighthouse (Chrome DevTools) | F12 → Lighthouse | Auditoría completa local |

### URLs importantes en producción

```
https://www.qorifoods.com/sitemap.xml
https://www.qorifoods.com/robots.txt
https://www.qorifoods.com/en
https://www.qorifoods.com/es
https://www.qorifoods.com/en/products
https://www.qorifoods.com/en/contact
```

---

## Mantenimiento continuo

### Mensual

- Revisar Search Console: errores de rastreo, páginas no indexadas
- Publicar al menos 1 entrada en `/news` (cuando haya contenido real)
- Verificar que formulario de contacto sigue funcionando

### Al agregar productos

1. Agregar producto en `src/data/products.ts`
2. Keywords se generan automáticamente en `seo-config.ts`
3. Rebuild y redeploy — el sitemap incluye el nuevo slug automáticamente

### Al cambiar URLs o navegación

1. Actualizar `primaryNav` y `footerNav` en `src/lib/site.ts`
2. Actualizar `sitelinkNav` en `src/lib/seo-config.ts`
3. Configurar redirects 301 en Vercel si cambias slugs existentes
4. Re-enviar sitemap en Search Console

### Al cambiar dominio

1. Actualizar `siteConfig.url` en `src/lib/site.ts`
2. Reconfigurar Search Console con el nuevo dominio
3. Actualizar verificación de dominio en Resend

---

## Notas finales

- El meta tag `keywords` tiene **peso mínimo** en Google hoy en día; lo que más importa son **título**, **descripción**, **contenido de calidad**, **datos estructurados** y **autoridad externa**.
- Los sitelinks son un **bonus visual** en resultados de marca — el objetivo principal es indexación correcta y buen snippet (título + descripción).
- Este documento refleja el estado del SEO al momento del desarrollo. Actualízalo si se hacen cambios significativos en la estrategia.

---

*Qori Foods SAC · SEO Guide · qorifoods.com*
