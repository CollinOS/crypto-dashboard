import React, { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      return ('Profile updated!');
    } catch (error) {
      return ('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label className="text-sm" htmlFor="email">
          Email:
          <br />
          <input className="w-[250px] sm:w-96" id="email" type="text" value={session.user.email} disabled />
        </label>
      </div>
      <div className="p-1" />
      <div>
        <label className="text-sm" htmlFor="username">
          Username:
          <br />
          <input
            className="w-[250px] sm:w-96"
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div className="p-1" />
      <div>
        <button
          className="button primary block w-[250px]"
          onClick={() => updateProfile({ username })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div className="p-1" />
      <div onClick={() => window.localStorage.clear()}>
        <button className="button block w-[250px]" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
