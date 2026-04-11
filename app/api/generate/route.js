import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const apiKey = 'AIzaSyBKv8iiU3uRBrdsBF_9EGZgqvjf1ch9pgU'; // provided by user

// Initialize the GoogleGenAI client
const ai = new GoogleGenAI({ apiKey });

export async function POST(req) {
  try {
    const body = await req.json();
    
    // We expect body to contain name, role, phone, email, address, skills, languages, experience array, education array
    // We send these to the AI to expand into a fully formed resume JSON.

    const prompt = `You are a professional resume writer AI. Please generate a highly convincing, ATS-optimized JSON object containing a completely flushed out resume based on the following raw information provided by the user:

Name: ${body.name}
Target Role: ${body.role}
Phone: ${body.phone}
Email: ${body.email}
Address: ${body.address}
Skills: ${body.skills}
Languages: ${body.languages}

Experience Data:
${JSON.stringify(body.experience, null, 2)}

Education Data:
${JSON.stringify(body.education, null, 2)}

INSTRUCTIONS:
1. Preserve the user's Name, Phone, Email, Address, and Education details exactly as provided.
2. For the "about" section, write a strong, keyword-rich professional summary (about 3-4 sentences) that highlights their target role and skills.
3. For the "skills", split the raw string into an array of individual strings, and add a few highly relevant ATS keywords for their target role.
4. For the "languages", split the string into an array.
5. For the "experience", rewrite the "raw_desc" provided by the user into a highly professional, metric-rich paragraph or set of strong sentences suitable for a resume payload. Emphasize accomplishments. Remove "raw_desc" and replace it with "desc". Keep the title, company, and years exactly the same.
6. Return purely valid JSON matching this exact structure, with NO markdown formatting around it (just the raw JSON string):

{
  "name": "...",
  "role": "...",
  "phone": "...",
  "email": "...",
  "address": "...",
  "about": "Expanded summary...",
  "skills": ["...", "..."],
  "rewards": ["Relevant generic award if applicable or leave empty array"],
  "languages": ["..."],
  "experience": [
    { 
      "title": "...", 
      "company": "...", 
      "years": "...", 
      "desc": "Expanded professional description..." 
    }
  ],
  "education": [
    { 
      "degree": "...", 
      "college": "...", 
      "years": "...", 
      "desc": "Studied core coursework relevant to the role." 
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const data = JSON.parse(response.text);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error generating AI resume:', error);
    return NextResponse.json(
      { success: false, error: error.message || String(error) },
      { status: 500 }
    );
  }
}
