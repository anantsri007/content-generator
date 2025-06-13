// Fetch generated content from your backend API
export async function fetchContent({ topic, niche }) {
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, niche }),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch content');
    }
    return await res.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
