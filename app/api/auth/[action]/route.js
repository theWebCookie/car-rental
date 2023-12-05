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

    const res = await fetch('https://localhost:5010/users/login', {
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

    cookies().set('auth', 'true');

    return new Response(JSON.stringify({ message: 'Success' }));
  } else if (type === 'register') {
    const body = await request.json();

    const { name, email, password } = body;

    if (!name) {
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

    const res = await fetch('https://localhost:5010/users', {
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
    return Response.json(data);
  }
}
