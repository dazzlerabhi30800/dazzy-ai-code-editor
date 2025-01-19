# Dazzy - AI Code Automater

### Dazzy uses cutting-edge AI technology to streamline the app development process like never before. From automating setup to managing your development environment and deployment, Dazzy makes building apps not only faster but also smoother and more flexible than ever.

## Tech Stack

- React OAuth Google:- for Google Authentication
- Google Generative AI:- to generate prompt from user input
- TailwindCSS :- for CSS
- Shadcn :- for UI Library
- Convex :- for backend
- dedent :- to properly format string
- Nanoid :- to generate random Id string
- React Paypal :- for paypal payment gateway
- SandPack React :- for Code Editor/Preview

## How to run Locally

1. First fork or clone the repo then inside root folder run `npm install` to install the dependencies.
2. Then make a .env.local file in root dir & initialize variables. Grab your secret & publishable key from Stripe Dashboard & make two variables.
   - CONVEX_DEPLOYMENT :- get it from Convex Website
   - NEXT_PUBLIC_CONVEX_URL:- get it from Convex Website.
   - NEXT_PUBLIC_GOOGLE_AUTH_KEY:- get it from Google Cloud API's & Services.
   - NEXT_PUBLIC_GEMINI_API_KEY:- get it from Google Ai Studio.
   - NEXT_PUBLIC_PAYPAL_CLIENT_ID:- get it from Paypal Developer Website .
3. You are done & ready to run inside the root folder run the command `npm run dev`.

**You can view the live site _[Dazzy - AI Code Buddy](https://dazzy-ai-coder.netlify.app/)_**

### Dazzy UI

### Home Page

![HomePage](/public/home.png)

### Workspace

![Workspace Preview](/public/workspace.png)
