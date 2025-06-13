import 'dotenv/config';
import fetch from 'node-fetch';

export const analyzeSentiment = async (req, res) => {
  const { text } = req.body;
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('Google API key is missing in environment variables');
    }
    if (!text) {
      return res.status(400).json({ error: 'Text is required for sentiment analysis.' });
    }

    const response = await fetch(
      `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document: {
            type: 'PLAIN_TEXT',
            content: text,
          },
          encodingType: 'UTF8',
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Google API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    res.json({
      score: data.documentSentiment.score,
      magnitude: data.documentSentiment.magnitude,
    });
  } catch (error) {
    console.error('Google Language API Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
