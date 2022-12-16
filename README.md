## Where my head is at (update at end of each session?)

Next steps are:
- Track portfolio balance based off trade, sells go into a wallet state and take from that for buys if exists, so if I sell 100 then 100 goes into the wallet state and still contributes to portfolio amount, then next buy will take from that wallet state until empty
- sidebar closes no matter where I click
- custom loading states for each thing that needs to load could be cool? kind of tedious though for a side thing
- Have a card appear on click of each coin to add trades for that coin and store in trades table (next priority + brainstorming)
- break up CoinList into header and row components (low priority)
- fix favorite.image from coin.id pages (low priority)
- redirect search to coin page (low priority)
- give account page a buff (low prio)
- if someone favorites a coin from a different device will localStorage update or will db & localStorage be out of sync?
  sessionStorage could solve this but causes favorites to refresh so need to get them loading faster if so.
- is return statements after functions not displaying anywhere a big deal?
- add login with GitHub (low)

- way in the future could be cool to boot up my old server and run sql off of it and just have all of my side projects use it.

For the slow loading of favorites? (might not need)
https://www.youtube.com/watch?v=MeRk-5U9XVc&list=PL4cUxeGkcC9hUb6sHthUEwG7r9VDPBMKO&index=9&ab_channel=TheNetNinja

## High Level Description (Draft for now)

I have built a dashboard using Next.js to allow users to track the top 100 crytocurrency prices and data, log in to add favorites and track their portfolio, as well as NFTs. I use Server-Side Rendering to fetch the coins and Client-Side Rendering to fetch the users favorites once they are signed in. For styling I went with TailwindCSS. I had never used it before this project becuase I've previously liked to write my own CSS but I was really impressed with how seemless it felt. I will say it made my code somewhat more annoying to navigate at times but from talking with other devs its overall worth it for getting styes up quickly. For the database I decided to go with Supabase which is an opensource PostgreSQL database. It seemed similar to Firebase but I chose to go with Supabase becuase it's opensource and doesn't lock you in so I could migrate in the future if necessary. I also used ESLint with airbnb rules but I would typically run it every few days and make fixes as opposed to having it on constantly because it can be a little too strict while testing things in dev. 


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

