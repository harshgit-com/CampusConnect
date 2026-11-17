# CampusConnect

A premium, multi-campus student community platform. Built with React, Vite and Tailwind CSS.

## Product principles
- Students can join independently; no college approval workflow.
- College-specific communities and content are isolated by tenant.
- Only central CampusConnect platform administration handles platform safety and abuse.
- Responsive web-first experience.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Current implementation
The first frontend foundation includes the responsive workspace shell, overview dashboard, discover hub, notes library UI, notice board, study groups, search, notification panel and resource-upload interaction.

## Next engineering milestones
1. Add authentication and student onboarding.
2. Add FastAPI services and PostgreSQL schema with server-enforced college isolation.
3. Connect notes uploads to object storage and moderation/reporting workflows.
4. Implement notices, groups, doubt discussions and student profiles.
5. Add central platform administration, audit logs, rate limits and abuse controls.

No demo metrics or fake institutional affiliations are presented as real platform traction.