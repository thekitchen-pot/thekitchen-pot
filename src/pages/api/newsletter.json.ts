import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

// Helper to read existing subscribers
async function readSubscribers() {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}

// Helper to validate email
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const data = await request.json();
    const { email } = data;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please provide a valid email address'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Read existing subscribers
    const subscribers = await readSubscribers();

    // Check if email already exists
    if (subscribers.some((sub: { email: string }) => sub.email === email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'This email is already subscribed'
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Add new subscriber with timestamp
    subscribers.push({
      email,
      subscribed_at: new Date().toISOString()
    });

    // Ensure directory exists
    await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });

    // Save updated subscribers list
    await fs.writeFile(
      SUBSCRIBERS_FILE,
      JSON.stringify(subscribers, null, 2),
      'utf-8'
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully subscribed to newsletter'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing your request'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
