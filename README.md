# Matt's Prisma Challenge

Welcome to my take on the Prisma Challenge. Here you'll find a simple CRUD application built with Next.js, Shadcn UI, and Prisma.

## Demo

🚀 You can view a live demo of the application [here](https://prisma-x.vercel.app/).
## Setup

Nothing special here, just install the dependencies, rename the `.env.example` file to `.env` and start the development server.

```bash
# Install dependencies
pnpm install

# Rename .env.example to .env
mv .env.example .env

# Run dev
pnpm dev
```


## The repo

Okay, so let's talk about the repo, the decisions I made and a little bit about my process and the code.

### The core tech

#### **[Next.js 15](https://nextjs.org/)**  
I'm generally most comfortable with Next.js as I'm currently working with it in my current position. I'm using the latest version of [Next.js 15](https://nextjs.org/blog/next-15), the app router and server actions.

> **Note:** With the latest version of Next.js came a few breaking changes for example with async request APIs. These were very easy to fix so didnt cause any issues other than a few minutes fixing build errors.

#### **[Shadcn UI](https://ui.shadcn.com/)**
Given the time constraints, I wanted to build quickly without compromising on the design. Shadcn UI was the perfect choice as it allowed me to build the app quickly and provide a great looking UI. There is also a sprinkle of [MagicUI](https://magicui.design/) for example you'll notice i used the [DotPattern](https://magicui.design/docs/components/dot-pattern) to make the pages look a bit more interesting.

#### **[Prisma](https://prisma.io/)** 
Obviously i opted to use Prisma ORM to rapidly build my schema and queries. I also opted to use Prisma Postgres and wow, what a difference it made. The setup was super easy, no shadow databases to worry about, no migrations to run - very cool product! While working locally i ran Prisma Studio to view my data as i usually would.

### Responsive Design
So this is a very simple app with a simple design. As the Shadcn UI components are built with [Tailwind CSS](https://tailwindcss.com/) i opted to use Tailwind CSS out-the-box with my Next.js installation.

### Client/Server Component Separation

I try to use server side rendering best practices as much as possible, for example i used server actions to handle my form submissions. I've tried to maintain a separation between client and server components as much as possible with server components for pages and layouts while using client components for necessary UI components. I've atomised my actions so they're as focussed as possible and scalable with error handling.

> **Note:** I haven't taken full advantage of new hooks like `useFormStatus` and `useFormState` in this example, with more time i would try to clean up state where possible and improve my form handling with the new hooks for best practice.

### Parallel & Intercepting Routes

I've tried to demonstrate a slightly more advanced usage of Next.js router concepts such as [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) and [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) with modals. This is a development pattern that i currently really enjoy, i feel it has significant UX benefits for the user by keeping the user on the same page while performing certain actions (such as creating and editing users) and links are sharable.

### Type Safety

Shadcn UI uses [Zod](https://zod.dev/) for form validation and Prisma generates types for my db schema and when necessary i've delcared by types within the components.

> **Note:** For scalability i would probably export my interfaces and type definitions from a separate directory to keep things tidy and well organised if this project were to grow.

## Development Timeline

- `Friday 1st November`
  - Initialised the project and setup Prisma Postgres.
- `Saturday 2nd November`
  - Spent roughly 30 mins over the 5 hour mark to complete the majority of the project.
- `Sunday 3rd November`
  - Fixed a couple of build errors with Next.js 15 & React 19 and deployed directly to Vercel.
  - Tweaked a couple of styles i wasn't happy with.
  - Composed the README for submission.

--- 

# Thank you 🫶🏼

I'd like to thank you again for taking the time to review my submission, for having me in the process and for the opportunity. Working at Prisma has been a goal of mine for at least a year since i first started developing with the ORM. It's been a real pleasure to do this challenge.




