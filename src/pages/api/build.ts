export const prerender = false;
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  // Extract token from request URL
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const expectedToken = 'dev';

  // Validate token
  if (token !== expectedToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Use environment variable for build hook URL
  const buildHookUrl = `https://api.netlify.com/build_hooks/6880bad957933bba704c7d79?token="dev"` // import.meta.env.NETLIFY_BUILD_HOOK_URL || 'https://api.netlify.com/build_hooks/6880bad957933bba704c7d79';

  // Check if build hook URL exists
  if (!buildHookUrl) {
    return new Response(JSON.stringify({ error: 'Build hook URL not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Make POST request to trigger build
    const response = await fetch(buildHookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`Netlify API responded with status ${response.status}`);
    }

    return new Response(JSON.stringify({ message: 'Build triggered successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Log error for debugging
    console.error('Build trigger failed:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to trigger build',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};