import { cookies } from 'next/headers';

export async function POST(request, { params }) {
  const type = params.action;
  if (type === 'login') {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ message: 'Invalid email!' }), {
        status: 422,
      });
    }

    if (!password || password.trim().length < 7) {
      return new Response(JSON.stringify({ message: 'Invalid input - password should be at least 7 characters long!' }), {
        status: 422,
      });
    }

    const res = await fetch('http://localhost:5046/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(JSON.stringify({ message: errorData.message || 'User login failed.' }), {
        status: 409,
      });
    }

    const data = await res.json();
    cookies().set('userId', data.userId);
    cookies().set('token', data.token);
    return new Response(JSON.stringify({ message: 'Success!' }));
  } else if (type === 'register') {
    const body = await request.json();

    const { firstName, seccondName, email, password } = body;

    if (!firstName || !seccondName) {
      return new Response(JSON.stringify({ message: 'Invalid name!' }), {
        status: 422,
      });
    }

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ message: 'Invalid email!' }), {
        status: 422,
      });
    }

    if (!password || password.trim().length < 7) {
      return new Response(JSON.stringify({ message: 'Invalid input - password should be at least 7 characters long!' }), {
        status: 422,
      });
    }

    const res = await fetch('http://localhost:5046/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(JSON.stringify({ message: errorData.message || 'User registration failed.' }), {
        status: 409,
      });
    }

    const data = await res.json();
    cookies().set('userId', data.userId);
    cookies().set('token', data.token);
    return new Response(JSON.stringify({ message: 'Success!' }));
  }
}
