
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';

// Use the correct API endpoint (do NOT append /generate-content again)
const API_BASE = "https://content-generator-3.onrender.com/api/generate-content";

export default function IdeaGenerator() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('fashion');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      // FIX: Do not append /generate-content again
      const res = await axios.post(API_BASE, { topic, niche });
      setResult(res.data);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    }
    setLoading(false);
  };

  const handleExport = () => {
    window.open("https://content-generator-3.onrender.com/api/analytics/export", '_blank');
  };

  return (
    <Box maxWidth={500} mx="auto" mt={5}>
      <Typography variant="h4" align="center" gutterBottom>
        Content Idea Assistant
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              label="Enter topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              required
              fullWidth
            />
            <Select
              value={niche}
              label="Niche"
              onChange={e => setNiche(e.target.value)}
              fullWidth
            >
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="fitness">Fitness</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="food">Food & Cooking</MenuItem>
              <MenuItem value="beauty">Beauty & Skincare</MenuItem>
              <MenuItem value="lifestyle">Lifestyle</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="parenting">Parenting & Family</MenuItem>
            </Select>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Generate'}
            </Button>
          </form>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {result && (
            <Box mt={3} p={2} bgcolor="#f5f5f5" borderRadius={2}>
              <Typography variant="h6">Reel Idea:</Typography>
              <Typography>{result.reelIdea}</Typography>
              <Typography variant="subtitle1" mt={2}>Hook:</Typography>
              <Typography fontStyle="italic">{result.hook}</Typography>
              <Typography variant="subtitle1" mt={2}>Caption:</Typography>
              <Typography>{result.caption}</Typography>
              <Typography variant="subtitle1" mt={2}>Hashtags:</Typography>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {result.hashtags.map((tag, i) => (
                  <Chip key={i} label={tag.startsWith('#') ? tag : `#${tag}`} color="primary" variant="outlined" />
                ))}
              </Box>
            </Box>
          )}
          <Box mt={3} textAlign="center">
            <Button onClick={handleExport} variant="outlined" color="success">
              Export Analytics
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}







// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Chip,
//   Alert,
//   CircularProgress
// } from '@mui/material';

// // const API_BASE = process.env.REACT_APP_API_URL;

// // const API_BASE = "https://content-generator-3.onrender.com";
// const API_BASE = "https://content-generator-3.onrender.com/api/generate-content";



// export default function IdeaGenerator() {
//   const [topic, setTopic] = useState('');
//   const [niche, setNiche] = useState('fashion');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setResult(null);
//     try {
//       const res = await axios.post(`${API_BASE}/generate-content`, { topic, niche });
//       setResult(res.data);
//     } catch (err) {
//       setError('Failed to generate content. Please try again.');
//     }
//     setLoading(false);
//   };

//   const handleExport = () => {
//     window.open(`${API_BASE}/analytics/export`, '_blank');
//   };

//   return (
//     <Box maxWidth={500} mx="auto" mt={5}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Content Idea Assistant
//       </Typography>
//       <Card>
//         <CardContent>
//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             <TextField
//               label="Enter topic"
//               value={topic}
//               onChange={e => setTopic(e.target.value)}
//               required
//               fullWidth
//             />
//             <Select
//               value={niche}
//               label="Niche"
//               onChange={e => setNiche(e.target.value)}
//               fullWidth
//             >
//               <MenuItem value="fashion">Fashion</MenuItem>
// <MenuItem value="fitness">Fitness</MenuItem>
// <MenuItem value="finance">Finance</MenuItem>
// <MenuItem value="technology">Technology</MenuItem>
// <MenuItem value="travel">Travel</MenuItem>
// <MenuItem value="food">Food & Cooking</MenuItem>
// <MenuItem value="beauty">Beauty & Skincare</MenuItem>
// <MenuItem value="lifestyle">Lifestyle</MenuItem>
// <MenuItem value="education">Education</MenuItem>
// <MenuItem value="parenting">Parenting & Family</MenuItem>
//             </Select>
//             <Button type="submit" variant="contained" color="primary" disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : 'Generate'}
//             </Button>
//           </form>
//           {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
//           {result && (
//             <Box mt={3} p={2} bgcolor="#f5f5f5" borderRadius={2}>
//               <Typography variant="h6">Reel Idea:</Typography>
//               <Typography>{result.reelIdea}</Typography>
//               <Typography variant="subtitle1" mt={2}>Hook:</Typography>
//               <Typography fontStyle="italic">{result.hook}</Typography>
//               <Typography variant="subtitle1" mt={2}>Caption:</Typography>
//               <Typography>{result.caption}</Typography>
//               <Typography variant="subtitle1" mt={2}>Hashtags:</Typography>
//               <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
//                 {result.hashtags.map((tag, i) => (
//                   <Chip key={i} label={`#${tag}`} color="primary" variant="outlined" />
//                 ))}
//               </Box>
//             </Box>
//           )}
//           <Box mt={3} textAlign="center">
//             <Button onClick={handleExport} variant="outlined" color="success">
//               Export Analytics
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
