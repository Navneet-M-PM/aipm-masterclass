// Mock Data for the application

export const COURSE_PHASES = [
  { id: "p1", title: "Phase 1: Foundations", weeks: ["w1", "w2"] },
  { id: "p2", title: "Phase 2: Product Design", weeks: ["w3", "w4", "w5"] },
  { id: "p3", title: "Phase 3: Building", weeks: ["w6", "w7", "w8"] },
  { id: "p4", title: "Phase 4: Scaling", weeks: ["w9", "w10", "w11"] },
  { id: "p5", title: "Phase 5: Capstone", weeks: ["w12"] },
];

export const COURSE_WEEKS: Record<string, any> = {
  "w1": { id: "w1", title: "Week 1: Intro to AI & LLMs", description: "Understand the fundamental shift from traditional software to AI products.", lessons: ["l1", "l2", "l3"] },
  "w2": { id: "w2", title: "Week 2: The AI Product Lifecycle", description: "How building AI products differs from traditional agile workflows.", lessons: ["l4"] },
  "w3": { id: "w3", title: "Week 3: AI Product Strategy", description: "Finding the right problems to solve with AI.", lessons: ["l5", "l6"] },
  "w4": { id: "w4", title: "Week 4: Designing AI Experiences", description: "UX/UI patterns for generative AI applications.", lessons: ["l7"] },
  "w5": { id: "w5", title: "Week 5: RAG Architecture Explained", description: "Deep dive into Retrieval-Augmented Generation.", lessons: ["l8"] },
  "w6": { id: "w6", title: "Week 6: Prompt Engineering for PMs", description: "Writing robust prompts as a form of initial logic.", lessons: ["l9"] },
  "w7": { id: "w7", title: "Week 7: Build a Chatbot Step-by-Step", description: "Hands-on technical implementation overview.", lessons: ["l10"] },
  "w8": { id: "w8", title: "Week 8: Fine-tuning vs RAG", description: "Making the right architectural decisions.", lessons: ["l11"] },
  "w9": { id: "w9", title: "Week 9: AI Metrics & Evals", description: "How to measure non-deterministic features.", lessons: ["l12"] },
  "w10": { id: "w10", title: "Week 10: Guardrails & Safety", description: "Keeping your AI products safe and compliant.", lessons: ["l13"] },
  "w11": { id: "w11", title: "Week 11: Go-to-Market for AI", description: "Pricing, positioning, and launching AI features.", lessons: ["l14"] },
  "w12": { id: "w12", title: "Week 12: Capstone Project", description: "Finalize your AI Product Architecture & Pitch.", lessons: ["l15"] },
};

export const COURSE_LESSONS: Record<string, any> = {
  "l1": { id: "l1", weekId: "w1", title: "Intro to AI", time: 15, content: "Artificial Intelligence is shifting from descriptive (predicting the future based on past data) to generative (creating net new text, images, and logic). As a PM, your job is no longer just defining user flows, but defining the boundaries of what the AI is allowed to do." },
  "l2": { id: "l2", weekId: "w1", title: "How LLMs Work", time: 20, content: "Large Language Models predict the next token based on context. They do not 'think'—they match patterns at a massive scale. Understanding attention mechanisms helps you realize why context windows are the most precious resource in AI development." },
  "l3": { id: "l3", weekId: "w1", title: "AI vs Traditional Software", time: 25, content: "Traditional software is deterministic: Input A always yields Output B. AI software is probabilistic: Input A yields Output B 85% of the time, Output C 10% of the time, and hallucinates 5% of the time. You must build UX to handle this gracefully." },
  "l5": { id: "l5", weekId: "w3", title: "AI Product Strategy", time: 30, content: "Start with the user problem, not the model. Don't build an 'AI feature'—solve a problem where generative capabilities offer a 10x improvement over traditional UI." },
  "l6": { id: "l6", weekId: "w3", title: "Case Study: ChatGPT", time: 20, content: "ChatGPT wasn't a breakthrough in underlying models (GPT-3 existed before it), it was a breakthrough in UX (the chat interface) and alignment (RLHF)." },
  "l8": { id: "l8", weekId: "w5", title: "RAG Architecture Explained", time: 35, content: "RAG (Retrieval-Augmented Generation) is the process of fetching relevant documents from a database and inserting them into the LLM prompt. It solves the hallucination problem by grounding the model in truth." },
  "l10": { id: "l10", weekId: "w7", title: "Build a Chatbot - Step by Step", time: 45, content: "We will look at the exact stack needed: Vercel for hosting, OpenAI for the model, Pinecone for vector storage, and LangChain for orchestration." },
};

// Fallback for lessons without content
Object.keys(COURSE_WEEKS).forEach(weekId => {
  const week = COURSE_WEEKS[weekId];
  week.lessons.forEach((lessonId: string) => {
    if (!COURSE_LESSONS[lessonId]) {
      COURSE_LESSONS[lessonId] = { id: lessonId, weekId, title: `Placeholder Lesson ${lessonId}`, time: 10, content: "Content coming soon." };
    }
  });
});

export const TEMPLATES_DATA = [
  { id: "t1", title: "AI Problem Framing", desc: "A 5-point checklist to determine if a problem actually needs AI.", type: "Framework" },
  { id: "t2", title: "RAG vs Fine-tuning", desc: "Decision tree to help you choose the right architectural approach.", type: "Architecture" },
  { id: "t3", title: "AI Eval Framework", desc: "Template for creating Golden Datasets and defining success metrics.", type: "Evaluation" },
  { id: "t4", title: "Prompt Cheatsheet", desc: "The definitive guide to few-shot, chain-of-thought, and system prompts.", type: "Engineering" },
];

export const TOOLS_DATA = [
  { id: "tool1", name: "OpenAI API", useCase: "General Purpose LLM", pmNotes: "Your default starting point for any generative text feature. Prioritize GPT-4o for complex reasoning, 4o-mini for speed." },
  { id: "tool2", name: "Pinecone", useCase: "Vector Database", pmNotes: "Used for RAG. It stores chunks of text as numbers (embeddings) so you can quickly search by 'meaning' rather than exact keywords." },
  { id: "tool3", name: "LangChain", useCase: "Orchestration Framework", pmNotes: "The glue code. Use it to chain together multiple prompts, API calls, and tools into one seamless workflow." },
  { id: "tool4", name: "HuggingFace", useCase: "Model Repository", pmNotes: "The 'GitHub of AI'. Go here to find specialized, open-source models if OpenAI is too expensive or you have privacy constraints." },
];
