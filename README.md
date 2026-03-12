# ✨ AutoCaption AI — Premium Social Media Caption/Hashtag Generator

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

AutoCaption AI is a high-performance, aesthetically stunning web application designed to automate the social media content creation workflow. By leveraging advanced Computer Vision and Natural Language Processing, it transforms raw images into engaging, platform-ready captions and optimized hashtags in seconds.

---

## 📂 Project Structure

```text
captionspark-ai/
├── public/              # Static assets (favicons, logos)
├── src/
│   ├── components/      # Reusable React components
│   │   ├── dashboard/   # Dashboard-specific UI (ImageUpload, ToneSelector)
│   │   ├── landing/     # Landing page sections (Hero, Features, Pricing)
│   │   ├── ui/          # Low-level shadcn/ui components
│   │   ├── Navbar.tsx   # Global navigation bar
│   │   └── Footer.tsx   # Global footer
│   ├── lib/             # Core logic and integrations
│   │   ├── supabase.ts  # Supabase client & auth config
│   │   ├── usageGate.ts # Credit logic & Pro status management
│   │   ├── razorpay.ts  # Payment gateway integration
│   │   ├── vision.ts    # AI image analysis logic
│   │   └── captionHistory.ts # Local history persistence
│   ├── pages/           # Application views/routes
│   │   ├── Index.tsx    # Landing page
│   │   ├── Dashboard.tsx# Main app interface
│   │   ├── Settings.tsx # Profile & Account management
│   │   ├── Login.tsx    # Authentication entry
│   │   └── Register.tsx # Sign-up & Pro activation
│   ├── App.tsx          # Main routing and provider setup
│   └── main.tsx         # Application entry point
├── package.json         # Dependencies & scripts
├── tailwind.config.ts   # Design system & styling configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Build tool configuration
```

---

## 🚀 Core Features

### 📸 AI-Powered Caption Generation
- **Image Intelligence**: Analyzes uploaded images to identify key objects, themes, and contexts using a Computer Vision integration.
- **Dynamic Tones**: Generate content tailored to your brand voice — choose from **Marketing**, **Inspirational**, **Funny**, or **Professional**.
- **Hashtag Optimization**: Automatically generates a curated list of relevant hashtags to maximize reach and engagement.

### 💳 Tiered Usage & Credit System
- **Guest Access**: New visitors can try the magic with **1 trial generation** directly on the landing page.
- **Free Accounts**: Registered users receive a lifetime allowance of **5 generations**, synchronized across their account.
- **Pro Membership**: Unlock **Unlimited Generations**, Priority Processing, and API Access.

### 🔐 Secure Authentication & Personalization
- **Supabase Integration**: Robust authentication supporting Email/Password and Google OAuth.
- **Profile Management**: Custom Display Names and Contact Emails synchronized with the Dashboard.
- **Personalized Dashboard**: A dedicated space to track usage, view generation history, and manage account settings.

### 🛠 Developer-First API
- **API Key Management**: Logged-in users can generate, view, and regenerate secure API keys.
- **Dynamic Documentation**: Interactive API documentation that includes real-time code examples pre-filled with the user's specific credentials.

### 💳 Premium Payments (Razorpay)
- **Seamless Upgrade**: Integrated Razorpay checkout flow for instant Pro plan activation.
- **One-Time Sync Logic**: Intelligent "pending activation" system that locks Pro status to the user account created or logged into immediately after payment.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript |
| **Styling** | Tailwind CSS, Lucide Icons, Framer Motion |
| **Backend/BaaS** | Supabase (Auth, Metadata, Edge Functions) |
| **Payments** | Razorpay SDK Integration |
| **UI Components** | shadcn-ui, Sonner (Toasts) |
| **State/Logic** | React Hooks, Custom Usage Gate Middleware |

---

## 🏗 Architecture Highlights

### The Usage Gate (`src/lib/usageGate.ts`)
A sophisticated middleware layer that handles all credit logic and Pro status verification.
- **Identity Scoping**: Usage data is keyed to specifically generated User IDs, ensuring multi-user isolation on shared devices.
- **Metadata Sync**: Pro status is permanently etched into Supabase `user_metadata`, ensuring your subscription follows your account across any device.

### Secure Account Isolation
- **Scoped Deletion**: When a user deletes their account from the Settings page, the application meticulously erases only their specific metadata and usage counts, preserving the data of other users who have logged in from the same browser.
- **Anti-Leakage Pro Logic**: Pro activation is a one-time "consumable" flag in the browser session that is destroyed immediately upon account synchronization, preventing subscription leakage.

---

## ⚙️ Environment Configuration

To run AutoCaption AI locally, create a `.env.local` file in the root directory and populate it with the following keys:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay Configuration (for Pro plan)
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 🏁 Getting Started

1. **Clone and Install**:
```bash
git clone <your-repo-url>
cd autocaption-ai
npm install
```

2. **Database Setup**:
- Ensure your Supabase project is active.
- Enabling Google OAuth is recommended for the best user experience.

3. **Run for Development**:
```bash
npm run dev
```

---

## 🎨 Design Philosophy
AutoCaption AI utilizes a **Premium Dark/Glassmorphism** aesthetic. The UI features:
- **Vibrant Gradients**: Carefully selected indigo-to-violet gradients for primary actions.
- **Micro-Animations**: Powered by Framer Motion for smooth transitions and hover states.
- **High Contrast**: Designed for readability and a modern "SaaS-ready" feeling.

---

## 🛡 Security Policy
- All credit and Pro plan checks are performed against cryptographically signed JWTs from Supabase.
- Local browser storage is used only for caching non-sensitive usage counts and guest limits.
- API keys are masked in the UI and can be revoked/rotated at any time.

---

## 📄 License
© 2026 AutoCaption AI. Developed by Pranav V P. All rights reserved. Built for creators, by creators.
