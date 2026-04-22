# 🚀 Guide Complet — Portfolio Charlie Corentin
## Déploiement sur Vercel (sans base de données)

---

## 📁 Architecture du Projet

```
charlie-portfolio/
├── index.html              ← Page principale (tout-en-un)
├── vercel.json             ← Config Vercel
├── public/
│   ├── cv.pdf              ← Votre CV (à ajouter)
│   ├── photo.jpg           ← Votre photo (à ajouter)
│   └── certifications/     ← Photos de vos certifs
│       ├── cert-react.jpg
│       ├── cert-laravel.jpg
│       └── ...
├── README.md
└── GUIDE.md (ce fichier)
```

---

## ⚙️ Fichier vercel.json

Créez ce fichier à la racine :

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

---

## 🛠️ Étapes de Déploiement

### 1. Préparer votre projet en local

```bash
# Créer le dossier
mkdir charlie-portfolio
cd charlie-portfolio

# Copier index.html dans ce dossier
# Créer vercel.json
# Créer le dossier public/

mkdir public
mkdir public/certifications
```

### 2. Initialiser Git

```bash
git init
git add .
git commit -m "🚀 Initial commit — Portfolio Charlie Corentin"
```

### 3. Pousser sur GitHub

```bash
# Sur GitHub : créer un repo "charlie-portfolio"
git remote add origin https://github.com/VOTRE-USERNAME/charlie-portfolio.git
git branch -M main
git push -u origin main
```

### 4. Déployer sur Vercel

1. Aller sur **vercel.com**
2. Cliquer **"New Project"**
3. Importer votre repo GitHub
4. Framework : **"Other"** (HTML statique)
5. Cliquer **"Deploy"** ✅

### 5. Configurer votre domaine

Dans Vercel → Settings → Domains :
- Ajouter votre domaine personnalisé
- Ou utiliser : `charlieagbayahoun.vercel.app`

---

## 🔑 Mot de passe Admin

Par défaut : **`charlie2025`**

Pour changer : dans `index.html`, chercher :
```javascript
if (pw === 'charlie2025') {
```
Et remplacer `charlie2025` par votre mot de passe.

---

## 📸 Ajouter votre Photo

Dans `index.html`, chercher :
```html
<div class="hero-photo-placeholder">
```

Remplacer par :
```html
<img src="/public/photo.jpg" alt="Charlie Corentin" style="width:100%;height:100%;object-fit:cover;" />
```

---

## 📄 Ajouter votre CV

1. Placer votre `CV_Charlie_Corentin.pdf` dans `/public/`
2. Dans `index.html`, chercher :
```javascript
function downloadCV() {
  alert('CV de Charlie...');
}
```
Remplacer par :
```javascript
function downloadCV() {
  const link = document.createElement('a');
  link.href = '/public/CV_Charlie_Corentin.pdf';
  link.download = 'CV_Charlie_Corentin_Developpeur_Fullstack.pdf';
  link.click();
}
```

---

## 🏆 Ajouter Photos de Certifications

1. Placer vos photos dans `/public/certifications/`
2. Dans `index.html`, chercher le tableau `const certs = [`
3. Ajouter `img` à chaque certification :

```javascript
const certs = [
  { 
    title: 'React Developer Certificate', 
    issuer: 'META / Facebook', 
    year: '2024', 
    emoji: '🏆',
    img: '/public/certifications/cert-react.jpg'  // ← ajouter
  },
  // ...
];
```

4. Dans `openCert()`, modifier :
```javascript
function openCert(i) {
  const c = certs[i];
  if (c.img) {
    document.getElementById('cert-modal-img').innerHTML = 
      `<img src="${c.img}" alt="${c.title}" />`;
  } else {
    document.getElementById('cert-modal-img').innerHTML = 
      `<span style="font-size:64px">${c.emoji}</span>`;
  }
  // ...
}
```

---

## 🛒 Configurer les Paiements Chariow

Pour chaque produit dans la boutique, remplacer le lien `#` par votre lien Chariow :

```html
<!-- Avant -->
<a href="#contact" class="btn-buy">Acheter →</a>

<!-- Après -->
<a href="https://chariow.com/votre-lien-produit" 
   target="_blank" 
   class="btn-buy">Acheter →</a>
```

---

## 📱 Contact & Réseaux Sociaux

Chercher dans `index.html` et remplacer :
- `charlie@creadigitalprod.com` → votre email
- `+229 XX XX XX XX` → votre numéro
- Les `href="#"` des boutons sociaux → vos liens réels

---

## 🤖 Personnaliser le Chatbot

Dans `const chatResponses`, ajouter/modifier les réponses :

```javascript
const chatResponses = {
  'bonjour': "Votre réponse personnalisée...",
  'prix': "Mes tarifs : sites web dès 150.000 FCFA...",
  // Ajouter vos propres mots-clés
  'devis': "Envoyez un email à charlie@... pour un devis.",
};
```

---

## 🔍 SEO — Optimisation Moteurs de Recherche

Le site inclut déjà :
- ✅ Balises title & meta description optimisées
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Schema.org JSON-LD (Person)
- ✅ Canonical URL
- ✅ Texte justifié et riche en mots-clés

**Pour aller plus loin :**

1. **Google Search Console** → Enregistrer votre site
2. **Sitemap** → Créer `/sitemap.xml` :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://charlieagbayahoun.vercel.app/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```
3. **robots.txt** :
```
User-agent: *
Allow: /
Sitemap: https://charlieagbayahoun.vercel.app/sitemap.xml
```

---

## 🎨 Personnalisation Visuelle

### Changer les couleurs principales :

Dans `:root` au début du CSS :
```css
--accent: #5b5bff;    /* Bleu principal → votre couleur */
--accent2: #00e5ff;   /* Cyan accent */
--accent3: #ff6b35;   /* Orange boutique */
```

### Changer les polices :

Remplacer dans le `<head>` :
```html
<link href="https://fonts.googleapis.com/css2?family=VOTRE_POLICE...">
```
Et dans `:root` :
```css
--font-display: 'VOTRE_POLICE', sans-serif;
```

---

## 📊 Analytics

Ajouter juste avant `</head>` :

**Google Analytics 4 :**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ Checklist Avant Mise en Ligne

- [ ] Remplacer le placeholder photo par votre vraie photo
- [ ] Ajouter votre CV PDF
- [ ] Mettre vos vrais coordonnées (email, téléphone)
- [ ] Ajouter vos liens réseaux sociaux
- [ ] Configurer les liens Chariow pour la boutique
- [ ] Ajouter les photos de certifications
- [ ] Changer le mot de passe admin
- [ ] Configurer Google Analytics
- [ ] Enregistrer sur Google Search Console
- [ ] Tester sur mobile, tablette, desktop
- [ ] Tester sur Chrome, Firefox, Safari, Edge

---

## 🆘 Support

Des questions ? Ouvrez une issue sur GitHub ou contactez :
**charlie@creadigitalprod.com**

---

*Portfolio créé avec ❤️ pour Charlie Corentin AGBAYAHOUN LOKOSSOU*
*Développeur Fullstack · Entrepreneur Tech · Formateur Digital*
*Cotonou, Bénin 🇧🇯*