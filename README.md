## Where my head is at (update at end of each session?)

Next steps are:
- It turns out that supabase just upgraded major versions recent so stuff I have used is a mix of v1 & v2. Need all v2
- Issues across the board with getting data from supabase
  - if I go straight to portfolio page before loading any other pages, error occors
  - if I refresh any pages with favorites, error occurs
  - if I go to coins page or update it, favorites load slow, and then if I return to coins page after visiting another page it loads favorites much slower
- Work on getFavorite throwing an error on refresh. Also favorites don't populate if I navigate to an coin/id page and return to coins page
- Have a card appear on click of each coin to add trades for that coin and store in trades table
- Break up portfolio page into seperate components?
- Only display coins in portfolio if user.id = userId


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
# then
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

