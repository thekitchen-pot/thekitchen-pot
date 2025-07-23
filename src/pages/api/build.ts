export async function get({ url }) {
 /* const token = new URL(url).searchParams.get('token');
  const expectedToken = process.env.BUILD_TRIGGER_TOKEN;
  if (token !== expectedToken) {
    return new Response('Unauthorized', { status: 403 });
  }*/
  const buildHookUrl = 'https://api.netlify.com/build_hooks/6880bad957933bba704c7d79';
  if (!buildHookUrl) {
    return new Response('Build hook URL not set', { status: 500 });
  }
  try {
    await fetch(buildHookUrl, {
      method: 'POST',
    });
    return new Response('Build triggered', { status: 200 });
  } catch (error) {
    return new Response('Failed to trigger build', { status: 500 });
  }
}