







import 'dotenv/config';
import fetch from 'node-fetch';
import Content from '../models/Content.js'; // <-- Import your model

export const generateContent = async (req, res) => {
  try {
    const { topic, niche } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;

    const prompt = topic && niche
      ? `As a content strategist, suggest one trending Instagram reel idea about ${topic} for ${niche} niche. Include:
        - A catchy caption (under 200 characters)
        - 5 relevant hashtags
        - A strong opening hook
        Format response as JSON with keys: reelIdea, caption, hashtags, hook. Respond ONLY with the JSON object, no Markdown or code block.`
      : "Explain how AI works in a few words";

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    console.log('Gemini API raw response:', data);

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status} - ${JSON.stringify(data)}`);
    }

    // Extract generated text (Gemini format)
    const generatedText =
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0].text
        ? data.candidates[0].content.parts[0].text
        : null;

    let content = {};
    if (generatedText) {
      // Robustly extract JSON between first '{' and last '}'
      let cleaned = generatedText;
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        cleaned = cleaned.substring(start, end + 1);
      }
      cleaned = cleaned.trim();
      try {
        content = JSON.parse(cleaned);
      } catch {
        content = { generatedText }; // fallback if parsing fails
      }
    }

    // --- Save to MongoDB ---
    if (content.reelIdea || content.caption || content.hook || content.hashtags) {
      await Content.create({
        topic,
        niche,
        reelIdea: content.reelIdea,
        caption: content.caption,
        hashtags: content.hashtags,
        hook: content.hook
      });
    }

    // Always send all expected fields to frontend
    res.json({
      reelIdea: content.reelIdea || '',
      hook: content.hook || '',
      caption: content.caption || '',
      hashtags: Array.isArray(content.hashtags) ? content.hashtags : [],
    });
  } catch (error) {
    console.error('Content Generation Error:', error.message);
    res.status(500).json({ error: 'Content generation failed', details: error.message });
  }
};


















// import 'dotenv/config';
// import fetch from 'node-fetch';
// import Content from '../models/Content.js'; // <-- Import your model

// export const generateContent = async (req, res) => {
//   try {
//     const { topic, niche } = req.body;
//     const apiKey = process.env.GOOGLE_API_KEY;

//     const prompt = topic && niche
//       ? `As a content strategist, suggest one trending Instagram reel idea about ${topic} for ${niche} niche. Include:
//         - A catchy caption (under 200 characters)
//         - 5 relevant hashtags
//         - A strong opening hook
//         Format response as JSON with keys: reelIdea, caption, hashtags, hook. Respond ONLY with the JSON object, no Markdown or code block.`
//       : "Explain how AI works in a few words";

//     const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//     const response = await fetch(endpoint, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               { text: prompt }
//             ]
//           }
//         ]
//       })
//     });

//     const data = await response.json();
//     console.log('Gemini API raw response:', data);

//     if (!response.ok) {
//       throw new Error(`Google API error: ${response.status} - ${JSON.stringify(data)}`);
//     }

//     // Extract generated text (Gemini format)
//     const generatedText =
//       data.candidates &&
//       data.candidates[0] &&
//       data.candidates[0].content &&
//       data.candidates[0].content.parts &&
//       data.candidates[0].content.parts[0].text
//         ? data.candidates[0].content.parts[0].text
//         : null;

//     let content = {};
//     if (generatedText) {
//       // Robustly extract JSON between first '{' and last '}'
//       let cleaned = generatedText;
//       const start = cleaned.indexOf('{');
//       const end = cleaned.lastIndexOf('}');
//       if (start !== -1 && end !== -1 && end > start) {
//         cleaned = cleaned.substring(start, end + 1);
//       }
//       cleaned = cleaned.trim();
//       try {
//         content = JSON.parse(cleaned);
//       } catch {
//         content = { generatedText }; // fallback if parsing fails
//       }
//     }

//     // --- Normalize hashtags to array ---
//     if (content.hashtags && typeof content.hashtags === 'string') {
//       content.hashtags = content.hashtags
//         .split(/[\s,]+/)
//         .map(tag => tag.replace(/^#/, '').trim())
//         .filter(Boolean);
//     }

//     // --- Save to MongoDB only if all required fields are present ---
//     if (
//       topic &&
//       niche &&
//       content.reelIdea &&
//       content.caption &&
//       content.hook &&
//       Array.isArray(content.hashtags) &&
//       content.hashtags.length > 0
//     ) {
//       try {
//         await Content.create({
//           topic,
//           niche,
//           reelIdea: content.reelIdea,
//           caption: content.caption,
//           hashtags: content.hashtags,
//           hook: content.hook
//         });
//         console.log('Content saved to MongoDB');
//       } catch (err) {
//         console.error('Error saving content to MongoDB:', err.message);
//       }
//     } else {
//       console.warn('Incomplete content, not saving:', { topic, niche, ...content });
//     }

//     // Always send all expected fields to frontend
//     res.json({
//       reelIdea: content.reelIdea || '',
//       hook: content.hook || '',
//       caption: content.caption || '',
//       hashtags: Array.isArray(content.hashtags) ? content.hashtags : [],
//     });
//   } catch (error) {
//     console.error('Content Generation Error:', error.message);
//     res.status(500).json({ error: 'Content generation failed', details: error.message });
//   }
// };
