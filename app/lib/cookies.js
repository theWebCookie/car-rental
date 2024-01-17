'use server';

import { cookies } from 'next/headers';

export async function getCookies() {
  const cookieStore = cookies();
  return cookieStore.getAll();
}

export async function removeCookies() {
  const cookieStore = cookies();
  cookieStore.delete('userId');
  cookieStore.delete('token');
}
