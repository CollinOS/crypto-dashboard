import React from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '../../components/Account';

function Index() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <main>
      <div className="page-center h-[90vh]">
        {!session ? (
          <>
            <Auth
              supabaseClient={supabase}
              // appearance={{ theme: ThemeSupa, className: 'sidebar-button' }}
              // theme="dark"
            />
            <p className='pt-8 text-center'>
            <span className='font-semibold'>Testing account for people who just want to check out the site. </span><br/>
            Email: <span className='text-purple'>testingcointrack@gmail.com</span><br/>
            Password: <span className='text-purple'>password</span>
            </p>
          </>
        ) : (
          <Account session={session} />
        )}
      </div>
    </main>
  );
}

export default Index;
