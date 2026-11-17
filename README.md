# CampusConnect

A premium, responsive, multi-campus student community platform. Built with React, Vite and Tailwind CSS.

## Product principles
- Students can register independently; no college approval workflow.
- College-specific communities and content will be isolated by tenant.
- Only central CampusConnect platform administration handles platform safety and abuse.
- Responsive web-first experience across phones, tablets, laptops and desktops.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Firebase Authentication setup
1. Create a Firebase project and register a Web app in Firebase Console.
2. Open **Authentication → Sign-in method** and enable **Email/Password** and **Google**.
3. In **Authentication → Settings → Authorized domains**, add the production domain and local development host if needed.
4. Copy the Web app configuration into `.env.local` using the keys shown in `.env.example`.
5. Restart the Vite dev server after changing environment variables.

The app currently supports Google popup sign-in, email/password registration and login, password reset email, auth-state persistence through Firebase, and sign-out. Firebase project credentials are intentionally not committed to Git.

## Brand asset
Place the approved CampusConnect logo file at `public/campusconnect-logo.png`. The app references this exact path in its brand components. The approved logo file was not present in the repository at the time this foundation was committed; do not replace it with an invented logo.

## Build
```bash
npm run build
```

## Current implementation
The frontend includes a responsive workspace shell, overview dashboard, discover hub, notes library UI, notice board, study groups, search, notification panel, resource-upload interaction, and Firebase authentication screens.

## Engineering milestones
1. Complete Firebase project configuration and verify sign-in on the deployed domain.
2. Build student onboarding and profile persistence.
3. Add FastAPI services and PostgreSQL schema with server-enforced college isolation.
4. Connect notes uploads to object storage and moderation/reporting workflows.
5. Implement notices, groups, doubt discussions and student profiles.
6. Add central platform administration, audit logs, rate limits and abuse controls.

No demo metrics or fake institutional affiliations are presented as real platform traction.
