import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Initialize GoogleGenAI client lazily or safely with User-Agent header
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. AI Onboarding Assistant
app.post("/api/ai/onboard", async (req, res) => {
  try {
    const { history, userResponse } = req.body;
    const ai = getAIClient();

    const systemInstruction = `You are AetherAI, an empathetic and intelligent Learning Operating System Onboarding Coach. 
Your goal is to converse naturally with a student to learn about:
- Course, Branch, Semester/Year (e.g., B.Tech CSE 3rd Year, MBBS, LLB, Class 12 NEET, CA Final)
- Weak subjects & Strong subjects
- Daily routine, study hours, sleep schedule
- Goals & Competitive exams (Placement prep, GATE, NEET, JEE, UPSC, etc.)
- Preferred learning style (Visual, Concise, Deep-dive, Hands-on coding)

Ask one or two thoughtful, engaging questions at a time. Be warm, motivating, and crisp.
If enough info has been gathered (or if user asks to finish), respond with a JSON block at the very end wrapped in \`\`\`json { "isComplete": true, "profile": { ... } } \`\`\`.`;

    const promptMessages = history ? history.map((h: any) => `${h.role}: ${h.text}`).join("\n") : "";
    const fullPrompt = `${promptMessages}\nUser: ${userResponse || "Hello! Help me get set up."}\nAI:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.error("Error in /api/ai/onboard:", err);
    res.status(500).json({ error: err.message || "Failed to process onboarding" });
  }
});

// 2. Smart AI Timetable Generator
app.post("/api/ai/timetable", async (req, res) => {
  try {
    const { profile, customEvents, examDates } = req.body;
    const ai = getAIClient();

    const prompt = `Generate an optimized personalized daily & weekly timetable for a student with this profile:
${JSON.stringify(profile, null, 2)}
Custom Events / Schedule constraint: ${JSON.stringify(customEvents || [])}
Exam Dates: ${JSON.stringify(examDates || [])}

Include buffer days, active recall slots, spaced repetition for weak subjects, rest windows, and mock test dates.

Return response strictly as a JSON object with this schema:
{
  "weeklySchedule": [
    {
      "day": "Monday",
      "slots": [
        { "time": "07:00 AM - 08:30 AM", "subject": "DBMS", "type": "Deep Focus", "notes": "Spaced repetition on Normalization" },
        { "time": "09:00 AM - 01:00 PM", "subject": "College / Classes", "type": "Fixed", "notes": "Attend lectures" },
        { "time": "04:00 PM - 05:30 PM", "subject": "Operating Systems", "type": "Practice & Quiz", "notes": "Memory Management exercises" },
        { "time": "08:00 PM - 09:00 PM", "subject": "DSA / Placement Prep", "type": "Coding", "notes": "Two Pointers problem set" }
      ]
    }
  ],
  "bufferDays": ["Saturday"],
  "insights": "Allocated 3x more focus time on DBMS and OS during morning peak alertness hours."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (err: any) {
    console.error("Error in /api/ai/timetable:", err);
    res.status(500).json({ error: err.message || "Failed to generate timetable" });
  }
});

// 3. AI Study Assistant (Multi-modal Explanations, Mind Maps, Quizzes)
app.post("/api/ai/assistant", async (req, res) => {
  try {
    const { topic, mode, detailLevel, userProfile } = req.body;
    const ai = getAIClient();

    const prompt = `You are the AI Study Assistant inside AetherLearn OS.
Student Profile: ${JSON.stringify(userProfile || {})}
Topic / Query: "${topic}"
Requested Action: ${mode} (Options: "explain", "mnemonic", "mindmap", "summary", "coding", "quiz")
Detail Level: ${detailLevel || "beginner"} (Options: "beginner", "intermediate", "advanced")

Provide a helpful response tailored to the action:
- If action is "explain": give simple, analogy-rich explanations with clear headings, key formulas or concepts, and a real-world example.
- If action is "mnemonic": create memorable acronyms or stories to remember the topic easily.
- If action is "mindmap": return a hierarchical structured breakdown (JSON tree with root node and subnodes).
- If action is "summary": summarize in 5 high-yield bullet points with core key points.
- If action is "coding": give problem statement, algorithmic breakdown, dry run, and clean code implementation (Python / C++ / JS).
- If action is "quiz": generate 3 quick conceptual practice questions with options, correct answer, and explanation.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
      },
    });

    res.json({ content: response.text });
  } catch (err: any) {
    console.error("Error in /api/ai/assistant:", err);
    res.status(500).json({ error: err.message || "Failed to generate study assistance" });
  }
});

// 4. AI Study Twin Proactive Nudges & Memory Retention Engine
app.post("/api/ai/twin-insights", async (req, res) => {
  try {
    const { userProfile, recentPerformance, studyHistory } = req.body;
    const ai = getAIClient();

    const prompt = `You are the student's personal AI Study Twin. You observe learning habits over time.
User Profile: ${JSON.stringify(userProfile || {})}
Recent Performance & Log: ${JSON.stringify(recentPerformance || {})}
Study History: ${JSON.stringify(studyHistory || {})}

Generate 3 proactive, highly personalized, empathetic, data-driven study twin nudges.
For example:
- "You usually retain Operating Systems concepts 35% better when revised in morning sessions."
- "Spaced Repetition Warning: You haven't reviewed DBMS Normalization in 5 days. Retention decay predicted."
- "Peak Alertness Detected: Your quiz accuracy jumps to 92% between 8 AM and 11 AM."

Return JSON:
{
  "twinName": "Aether Twin v3.2",
  "focusAlert": "High cognitive energy window active now.",
  "nudges": [
    { "type": "retention", "title": "Revision Alert", "message": "...", "action": "Start 5-min Spaced Recall" },
    { "type": "habit", "title": "Peak Productivity", "message": "...", "action": "Schedule DBMS" },
    { "type": "streak", "title": "Streak Booster", "message": "...", "action": "Complete Today's Quiz (+150 XP)" }
  ],
  "retentionScore": 84,
  "concentrationLevel": "Optimal (89%)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (err: any) {
    console.error("Error in /api/ai/twin-insights:", err);
    res.status(500).json({ error: err.message || "Failed to generate twin insights" });
  }
});

// 5. AI Quiz Engine (Nightly adaptive quizzes)
app.post("/api/ai/quiz-generator", async (req, res) => {
  try {
    const { subject, topic, questionCount, difficulty } = req.body;
    const ai = getAIClient();

    const prompt = `Generate a gamified interactive quiz on ${subject} - ${topic || "General Concepts"}.
Number of questions: ${questionCount || 4}
Difficulty: ${difficulty || "Medium"}

Include a mix of MCQs, True/False, Fill in the Blanks, and a Coding/Analytical question if relevant.

Return JSON matching this format:
{
  "title": "${subject}: ${topic} Mastery Quiz",
  "totalXp": 250,
  "totalCoins": 40,
  "questions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "What is the primary key constraint in relational databases?",
      "options": ["Allows duplicate values", "Uniquely identifies each row and cannot be null", "Used only for foreign keys", "Improves UI design"],
      "correctIndex": 1,
      "explanation": "Primary keys enforce entity integrity by requiring unique, non-null values for each record."
    },
    {
      "id": 2,
      "type": "true_false",
      "question": "ACID properties in DBMS stand for Atomicity, Consistency, Isolation, and Durability.",
      "options": ["True", "False"],
      "correctIndex": 0,
      "explanation": "Correct! ACID ensures reliable database transaction processing."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (err: any) {
    console.error("Error in /api/ai/quiz-generator:", err);
    res.status(500).json({ error: err.message || "Failed to generate quiz" });
  }
});

// 6. AI Mental Wellness & Burnout Detector
app.post("/api/ai/wellness", async (req, res) => {
  try {
    const { studyHoursToday, streakDays, quizAccuracy, stressLevel } = req.body;
    const ai = getAIClient();

    const prompt = `You are a warm, empathetic mental wellness companion inside a student learning app.
Current stats:
- Study Hours Today: ${studyHoursToday || 6} hrs
- Streak: ${streakDays || 7} days
- Recent Quiz Accuracy: ${quizAccuracy || 70}%
- Self-reported Stress: ${stressLevel || "Moderate"}

Provide a calming, supportive check-in with:
1. Burnout risk assessment (Low, Medium, High)
2. 3 actionable micro-wellness recommendations (e.g. 4-7-8 breathing technique, 5-min stretch break, soothing music, sleep tip)
3. A motivational, stress-relieving quote tailored for students.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
      },
    });

    res.json({ advice: response.text });
  } catch (err: any) {
    console.error("Error in /api/ai/wellness:", err);
    res.status(500).json({ error: err.message || "Failed to generate wellness advice" });
  }
});

// 7. Career Mode & Placement AI Coach
app.post("/api/ai/career-coach", async (req, res) => {
  try {
    const { stream, semester, cgpa, targetRole, skills } = req.body;
    const ai = getAIClient();

    const prompt = `You are a Senior Career Coach and Placement Strategist for university students.
Student Details:
- Stream/Branch: ${stream || "Computer Science"}
- Semester: ${semester || "6th Semester"}
- CGPA: ${cgpa || "8.5"}
- Target Goal/Role: ${targetRole || "Full Stack SDE / AI Engineer"}
- Current Skills: ${skills ? JSON.stringify(skills) : "C++, Java, React"}

Generate a personalized Career Mode Roadmap containing:
1. Target Skill Gaps to bridge
2. 3 High-Impact Resume Project Ideas with descriptions
3. Top 5 DSA / Core Subject interview questions to master this week
4. Recommended Internship & Placement Milestones for this semester.

Return response as markdown formatted text.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
      },
    });

    res.json({ roadmap: response.text });
  } catch (err: any) {
    console.error("Error in /api/ai/career-coach:", err);
    res.status(500).json({ error: err.message || "Failed to generate career coach advice" });
  }
});

// 8. Text To Speech Generator using gemini-3.1-flash-tts-preview
app.post("/api/ai/speech", async (req, res) => {
  try {
    const { text, voice } = req.body;
    const ai = getAIClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Say warmly and clearly: ${text}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice || "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ audioBase64: base64Audio, mimeType: "audio/pcm" });
    } else {
      res.status(400).json({ error: "No audio generated" });
    }
  } catch (err: any) {
    console.error("Error in /api/ai/speech:", err);
    res.status(500).json({ error: err.message || "Failed to generate speech audio" });
  }
});

// Start Express + Vite Dev or Prod Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 AetherLearn Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
