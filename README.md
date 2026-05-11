# Oracle — لاعبون & ممثلون

تطبيق Next.js 14 لاختيار شخصيات عشوائية من لاعبي كرة القدم الأسطوريين والممثلين المصريين.

## 🚀 التشغيل المحلي

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 📦 البناء الثابت (Static Export)

```bash
npm run build
```

سيتم إنشاء الملفات الثابتة في مجلد `dist` جاهزة للرفع على GitHub Pages أو أي استضافة ثابتة.

## 🏗️ التقنيات

- **Next.js 14** — App Router
- **React 18** — Server & Client Components
- **TypeScript** — Type Safety
- **Tailwind CSS** — Styling

## 📁 هيكل المشروع

```
app/
├── layout.tsx          # Root layout (RTL, Arabic)
├── page.tsx            # Main page with screen router
└── globals.css         # Global styles & animations
components/
├── Landing.tsx         # Home screen with category selection
├── FootballScreen.tsx  # Random football player picker
├── ActorsScreen.tsx    # Random Egyptian actor picker
├── Shirt.tsx           # SVG shirt icon
├── Clapper.tsx         # Clapperboard icon
└── Box.tsx             # Info box component
data/
├── players.ts          # Football players data
└── actors.ts           # Egyptian actors data
types/
└── index.ts            # TypeScript interfaces
```

## 📝 License

MIT
