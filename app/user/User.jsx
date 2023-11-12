"use client";

import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);
}
