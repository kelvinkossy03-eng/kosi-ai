export type Mode = "chat" | "research" | "sports" | "video" | "image" | "voice" | "code" | "study" | "writer" | "business" | "documents" | "music" | "slides";

export type Reply = {
  title: string;
  body: string;
  bullets?: string[];
  note?: string;
};

type Intent = "plan" | "compare" | "explain" | "create" | "troubleshoot" | "decide" | "analyse" | "general";

type Analysis = {
  intent: Intent;
  subject: string;
  constraints: string[];
  audience: string | null;
  output: string;
};

const stopWords = new Set(["please", "help", "make", "want", "need", "with", "that", "this", "from", "into", "about", "what", "when", "where", "which", "could", "would", "should", "your", "have", "been", "them", "they", "then", "than", "just", "like", "give", "tell", "show", "build", "create", "write"]);

function clean(value: string): string {
  return value.replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");
}

function detectIntent(prompt: string): Intent {
  const p = prompt.toLowerCase();
  if (/\b(compare|versus|\bvs\b|difference|better than|pros and cons)\b/.test(p)) return "compare";
  if (/\b(step.?by.?step|roadmap|plan|strategy|schedule|how do i|how can i|launch)\b/.test(p)) return "plan";
  if (/\b(error|bug|not working|failed|fix|issue|problem|troubleshoot)\b/.test(p)) return "troubleshoot";
  if (/\b(should i|which should|recommend|choose|decision|worth it)\b/.test(p)) return "decide";
  if (/\b(analyse|analyze|analysis|review|evaluate|assess|break down|deep dive)\b/.test(p)) return "analyse";
  if (/\b(explain|meaning|what is|how does|why does|teach me)\b/.test(p)) return "explain";
  if (/\b(write|draft|design|generate|compose|script|story|caption|proposal|email)\b/.test(p)) return "create";
  return "general";
}

function extractConstraints(prompt: string): string[] {
  const found: string[] = [];
  const patterns: [RegExp, string][] = [
    [/\b(under|below|less than)\s+₦?([\d,.]+\s?(?:k|m|million|thousand)?)\b/i, "Budget: "],
    [/\b(within|in)\s+(\d+\s?(?:days?|weeks?|months?|years?))\b/i, "Timeline: "],
    [/\b(for|targeting)\s+(beginners|students|businesses|small businesses|professionals|children)\b/i, "Audience: "],
    [/\b(in|within)\s+(Nigeria|Lagos|Abuja|Ibadan|Africa)\b/i, "Location: "],
  ];
  for (const [pattern, label] of patterns) {
    const match = prompt.match(pattern);
    if (match) found.push(label + (match[2] ?? match[1]));
  }
  if (/\b(no api|without api|offline|local only)\b/i.test(prompt)) found.push("Preference: local / API-independent");
  if (/\b(low budget|low cost|cheap|affordable)\b/i.test(prompt)) found.push("Cost priority: keep it affordable");
  return [...new Set(found)];
}

function analyse(prompt: string): Analysis {
  const intent = detectIntent(prompt);
  const words = clean(prompt).split(" ").filter((word) => word.length > 2 && !stopWords.has(word.toLowerCase()));
  const subject = words.slice(0, 9).join(" ") || "your request";
  const audienceMatch = prompt.match(/\b(?:for|aimed at|targeting)\s+(students|beginners|customers|businesses|children|professionals)\b/i);
  const output = intent === "plan" ? "an actionable plan" : intent === "compare" ? "a side-by-side comparison" : intent === "troubleshoot" ? "a diagnostic checklist" : intent === "create" ? "a structured creative draft" : intent === "decide" ? "a decision framework" : intent === "explain" ? "a clear explanation" : intent === "analyse" ? "a structured analysis" : "a useful starting response";
  return { intent, subject, constraints: extractConstraints(prompt), audience: audienceMatch?.[1] ?? null, output };
}

const modeGuidance: Record<Mode, { title: string; lens: string; steps: string[]; note: string }> = {
  chat: { title: "Let's make progress on this.", lens: "Kosi has organised your message into a working brief. Use the outline below to move from a broad question to a useful result.", steps: ["Clarify the outcome you want", "Separate known facts from assumptions", "Choose the next action and check the result"], note: "This is Kosi's local reasoning script, not a generative language model. It does not invent facts or browse the web." },
  research: { title: "Research brief prepared", lens: "A good investigation starts with a precise question and a standard for evidence. Use this brief to guide source collection and verification.", steps: ["Write one focused research question", "Collect primary sources before commentary", "Cross-check dates, figures and conflicting claims", "Record citations and unresolved gaps"], note: "No live sources have been searched. Verify findings against original sources before relying on them." },
  sports: { title: "Match analysis framework", lens: "A disciplined sports assessment should separate measurable evidence from opinion. Do not treat a team name or recent score alone as a prediction.", steps: ["Confirm fixture, competition and kick-off time", "Compare recent home and away performance", "Check injuries, suspensions and likely line-ups", "Review referee tendencies and relevant market statistics", "Estimate uncertainty before considering a selection"], note: "No live fixtures, injuries, referee appointments or bookmaker odds are connected. This is an analysis checklist, not a verified prediction." },
  video: { title: "Video production brief", lens: "Turn the idea into a production-ready concept before spending time on editing or generation.", steps: ["Define the audience and one key message", "Choose format, aspect ratio and duration", "Write a hook, scene sequence and closing action", "Specify visual style, sound and on-screen text"], note: "This prepares a production brief only. It does not render or export a video." },
  image: { title: "Visual direction prepared", lens: "A strong image brief describes the subject, composition and intended use—not just an art style.", steps: ["Name the main subject and setting", "Choose composition, lighting and colour direction", "Specify aspect ratio and where the image will appear", "List details to include and elements to avoid"], note: "This is prompt planning. Image generation is not connected in this local build." },
  voice: { title: "Voice workflow mapped", lens: "A voice experience needs a clear interaction and consent-aware recording flow.", steps: ["Choose live conversation, transcription or narration", "Define language, tone and speaking pace", "Confirm when recording starts and stops", "Provide a transcript or playback review step"], note: "Microphone access and speech services are not connected." },
  code: { title: "Engineering task structured", lens: "Treat the request as a reproducible engineering task. Preserve existing behaviour and verify the fix rather than changing unrelated code.", steps: ["Capture the exact error and reproduction steps", "Identify the affected file, component or API boundary", "Make the smallest safe change", "Run type checks, tests and a production build"], note: "No repository has been inspected and no code has been executed from this prompt." },
  study: { title: "Learning path prepared", lens: "Build understanding in layers: first the concept, then worked examples, then retrieval practice.", steps: ["List what you already know", "Learn one concept at a time", "Practise with questions without looking at notes", "Review mistakes and revisit weak areas"], note: "This is a study structure, not a generated lesson or a verified syllabus." },
  writer: { title: "Writing brief prepared", lens: "Good writing begins with a reader, a purpose and a clear action. The final voice should fit the audience.", steps: ["Define who will read it", "State the one message they should remember", "Choose tone, length and format", "Edit for clarity, evidence and a specific call to action"], note: "A full draft still requires a connected language model or user-supplied source material." },
  business: { title: "Business opportunity brief", lens: "Evaluate the customer problem before committing money. A business idea is stronger when the buyer, distribution and unit economics are clear.", steps: ["Identify a painful, frequent customer problem", "Name the buyer and how they currently solve it", "Estimate price, direct cost and gross margin", "Test demand with a small pilot before scaling"], note: "Market size, competitor details and current Nigerian prices have not been independently verified." },
  documents: { title: "Document review workflow", lens: "A reliable document review should preserve source context and distinguish quoted facts from interpretation.", steps: ["Identify the document type and date", "Extract key claims, figures and obligations", "Flag missing pages, ambiguous terms and inconsistencies", "Create a summary with page references"], note: "No document has been uploaded or processed in this local build." },
  music: { title: "Original music concept", lens: "Develop a distinct musical direction from mood, story and arrangement rather than copying an existing recording.", steps: ["Choose the theme and emotional arc", "Define tempo, energy and instrumentation", "Map verse, chorus and bridge progression", "Specify an original vocal and production direction"], note: "This is a creative brief only; no audio is generated." },
  slides: { title: "Presentation story mapped", lens: "A strong deck makes one argument. Each slide should move the audience toward a decision or understanding.", steps: ["Define the audience and desired decision", "Open with the problem or opportunity", "Support the argument with evidence and examples", "Close with a clear recommendation and next step"], note: "No slide file has been generated or exported." },
};

function formatIntent(intent: Intent): string {
  const names: Record<Intent, string> = { plan: "Planning", compare: "Comparison", explain: "Explanation", create: "Creation", troubleshoot: "Troubleshooting", decide: "Decision support", analyse: "Analysis", general: "Exploration" };
  return names[intent];
}

export function getModeReply(mode: Mode, prompt: string): Reply {
  const cleanPrompt = clean(prompt);
  if (!cleanPrompt) {
    const guide = modeGuidance[mode];
    return { title: guide.title, body: guide.lens, bullets: guide.steps, note: guide.note };
  }
  const brief = analyse(cleanPrompt);
  const guide = modeGuidance[mode];
  const constraints = brief.constraints.length ? " Detected context: " + brief.constraints.join("; ") + "." : "";
  const audience = brief.audience ? " Intended audience: " + brief.audience + "." : "";
  return {
    title: guide.title,
    body: "Request captured: “" + cleanPrompt + "”. Kosi classifies this as " + formatIntent(brief.intent).toLowerCase() + " and has prepared " + brief.output + " for " + brief.subject + "." + audience + constraints + " " + guide.lens,
    bullets: guide.steps,
    note: guide.note,
  };
}
