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
          <Auth
            supabaseClient={supabase}
            className="text-secondary"
            // appearance={{ theme: ThemeSupa, className: 'sidebar-button' }}
            // theme="dark"
          />
        ) : (
          <Account session={session} />
        )}
      </div>
    </main>
  );
}

export default Index;
