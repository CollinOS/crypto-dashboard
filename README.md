## Where my head is at (update at end of each session)

Next steps are:
- when a favorite coin is clicked in the portfolio, have it pull up a card with all trades for that coin
- Track portfolio balance based off trade, sells go into a wallet state and take from that for buys if exists, so if I sell 100 then 100 goes into the wallet state and still contributes to portfolio amount, then next buy will take from that wallet state until empty
- custom loading states for each thing that needs to load could be cool? kind of tedious though for a side project though
- if someone favorites a coin from a different device will localStorage update or will db & localStorage be out of sync?
  sessionStorage could solve this but causes favorites to refresh so need to get them loading faster if so.
- add login with GitHub

## High Level Description (Draft for now)

I have built a dashboard using Next.js to allow users to track the top 100 crytocurrency prices and data, log in to add favorites and track their portfolio, as well as NFTs. I use Server-Side Rendering to fetch the coins and Client-Side Rendering to fetch the users favorites once they are signed in. For styling I went with TailwindCSS. I had never used it before this project becuase I've previously liked to write my own CSS but I was really impressed with how seemless it felt. I will say it made my code somewhat more annoying to navigate at times but from talking with other devs its overall worth it for getting styes up quickly. For the database I decided to go with Supabase which is an opensource PostgreSQL database. It seemed similar to Firebase but I chose to go with Supabase becuase it's opensource and doesn't lock you in so I could migrate in the future if necessary. I also used ESLint with airbnb rules but I would typically run it every few days and make fixes as opposed to having it on constantly because it can be a little too strict while testing things in dev. 



## How to run

```bash
npm install
# then
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
