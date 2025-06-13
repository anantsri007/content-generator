// // Fetch analytics data from your backend API
// export async function fetchAnalytics() {
//   try {
//     const res = await fetch('/api/analytics');
//     if (!res.ok) {
//       throw new Error('Failed to fetch analytics data');
//     }
//     return await res.json();
//   } catch (error) {
//     console.error('API error:', error);
//     throw error;
//   }
// }




/**
 * Fetches analytics data from the backend API using a full URL.
 * Adjust the port if your backend runs on a different port.
 */
export async function fetchAnalytics() {
  try {
    const res = await fetch('http://localhost:5000/api/analytics');
    if (!res.ok) {
      throw new Error(`Failed to fetch analytics data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    // Optional: Validate expected fields
    if (
      !data ||
      !Array.isArray(data.followers) ||
      !Array.isArray(data.engagement) ||
      typeof data.bestPostTime !== 'string'
    ) {
      throw new Error('Analytics data format is invalid');
    }

    return data;
  } catch (error) {
    console.error('API error in fetchAnalytics:', error);
    throw error;
  }
}
