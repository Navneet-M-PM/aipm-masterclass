// ============================================================
// AI PM INTERVIEW DATA — Industry-Categorized Q&A
// ============================================================

export type Difficulty = "Junior" | "Mid-Level" | "Senior" | "Staff/Principal";
export type QuestionCategory =
  | "Product Sense"
  | "AI Technical"
  | "Execution & Metrics"
  | "Strategy"
  | "Leadership"
  | "Ethics & Responsible AI";

export type Industry =
  | "Tech & SaaS"
  | "FinTech & Banking"
  | "Healthcare & MedTech"
  | "E-commerce & Retail"
  | "Media & Entertainment"
  | "Enterprise & B2B";

export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  industries: Industry[];
  difficulty: Difficulty;
  question: string;
  framework: string;
  answer: string;
  followUps: string[];
  tags: string[];
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [

  // ─── TECH & SAAS ───────────────────────────────────────────

  {
    id: "ts-001",
    category: "Product Sense",
    industries: ["Tech & SaaS"],
    difficulty: "Mid-Level",
    question: "How would you prioritize features for an LLM-powered coding assistant like GitHub Copilot?",
    framework: "Use the RICE framework (Reach, Impact, Confidence, Effort) layered with AI-specific constraints: latency tolerance, accuracy requirements, and model capability ceilings.",
    answer: `Start by segmenting users: individual developers vs. enterprise engineering teams — these have fundamentally different needs. Individual devs want speed and code quality; enterprise buyers want security, audit trails, and IP protection.

**Step 1 — Identify the core value proposition:** Copilot's wedge is reducing context-switching. Every feature must be evaluated against this north star: does it reduce the friction between thinking and coding?

**Step 2 — Prioritize by job-to-be-done:**
- P0 (Must have): Code completion accuracy >85%, latency <300ms, context window utilization (understanding the full file, not just cursor line)
- P1 (High value): Multi-file context awareness, inline explanations, test generation
- P2 (Nice to have): PR summaries, documentation generation, security scanning

**Step 3 — Apply AI-specific constraints:**
- Features requiring high precision (security review) need human-in-the-loop — don't ship fully autonomous
- Context window limits mean you must choose what to include — prioritize open files and recent edits
- Latency is a UX killer for inline suggestions; anything >500ms drops acceptance rate by ~40%

**Data-backed trade-off:** GitHub data shows Copilot users complete tasks 55% faster (GitHub Productivity Study, 2024). But accuracy drops from 45% to 28% on complex multi-file refactors. This tells you where to invest: multi-file context is the highest-leverage engineering bet.

**B2B angle:** Enterprise customers need admin controls (block certain repos, audit what Copilot suggested). Without these, Fortune 500 deals stall at security review. Prioritize even if individual devs don't request it.`,
    followUps: [
      "How would you measure 'code quality improvement' from Copilot?",
      "A large enterprise customer says Copilot is leaking proprietary code — how do you respond?",
      "How would you decide when to upgrade the underlying model vs. improving the product layer?",
    ],
    tags: ["LLM", "developer tools", "prioritization", "RICE", "B2B"],
  },

  {
    id: "ts-002",
    category: "AI Technical",
    industries: ["Tech & SaaS"],
    difficulty: "Senior",
    question: "Your team is deciding between RAG and fine-tuning for a B2B SaaS knowledge base assistant. Walk me through your decision.",
    framework: "Use the RAG vs Fine-tune Decision Matrix: evaluate on data freshness, query diversity, infrastructure cost, and latency requirements.",
    answer: `This is one of the most common architectural decisions in AI product work. The right answer almost always starts with RAG, but let me explain the full decision tree.

**When RAG wins (most B2B SaaS scenarios):**
- Your knowledge base is updated frequently (product docs, pricing, policies)
- Queries are diverse and unpredictable — users ask anything
- You need source attribution (compliance, trust)
- Your team doesn't have ML expertise to manage training pipelines
- Cost: RAG costs ~$0.002/query; fine-tuning a model costs $50K–$500K upfront

**When fine-tuning wins:**
- Task is narrow and repetitive (e.g., always generating SQL from schema)
- You need consistent tone/format that can't be achieved with prompting
- Latency is critical and you can't afford retrieval overhead
- You have domain-specific language the base model doesn't understand (medical codes, financial jargon)

**The hybrid approach (production best practice):**
Most enterprise AI products end up using both: fine-tune for tone and format consistency, RAG for knowledge retrieval. Anthropic's Claude + a vector DB (Pinecone, Weaviate) is a common stack.

**B2B-specific considerations:**
- Tenant isolation: with RAG, each customer's data stays in separate namespaces. Fine-tuned models may bleed data across customers.
- Explainability: enterprise buyers want to know WHY the assistant said something. RAG lets you show sources. Fine-tuned models are black boxes.
- Model versioning: when OpenAI deprecates GPT-4, your RAG pipeline survives. A fine-tuned model needs retraining.

**Real numbers:** Andreessen Horowitz (2024) found 78% of production enterprise AI applications use RAG as the primary architecture. Only 15% use fine-tuning alone.`,
    followUps: [
      "How do you evaluate retrieval quality in a RAG system?",
      "What's your strategy for handling queries that fall outside the knowledge base?",
      "How do you prevent prompt injection attacks in a RAG-based assistant?",
    ],
    tags: ["RAG", "fine-tuning", "architecture", "B2B", "vector databases"],
  },

  {
    id: "ts-003",
    category: "Execution & Metrics",
    industries: ["Tech & SaaS"],
    difficulty: "Mid-Level",
    question: "How do you define success metrics for an AI feature that generates content suggestions for a SaaS marketing tool?",
    framework: "Layer metrics across three dimensions: AI quality (model-level), UX adoption (product-level), and business impact (company-level). Never let model metrics substitute for business metrics.",
    answer: `The classic mistake is optimizing for model accuracy when the real question is: are users getting value?

**AI Quality Metrics (measure weekly):**
- Suggestion acceptance rate: % of suggestions accepted without edits. Target: >35%. Below 20% means the model is off-base.
- Edit distance after acceptance: how much users modify the suggestion. High edit distance = accepted but not useful.
- Latency: p50 and p95 generation time. Users abandon after 3s on average.
- Hallucination rate: % of suggestions containing factually incorrect information (use spot-checking + LLM-as-judge).

**UX Adoption Metrics (measure monthly):**
- Feature adoption: % of eligible users who use the AI suggestion at least once per week
- Task completion rate: do users complete their content draft faster with AI?
- Return rate: do users who tried it come back? (Retention signal for feature value)

**Business Metrics (measure quarterly):**
- Time-to-publish: has AI reduced content creation time? Target 30% reduction.
- Upgrade rate: are free users upgrading to Pro after experiencing AI features?
- NPS delta: has overall product NPS improved among AI feature users vs. non-users?

**B2C vs B2B difference:**
- B2C (individual creators): acceptance rate and time-saved are primary. Speed matters more than perfection.
- B2B (marketing teams): brand voice consistency is critical. Add a "brand alignment score" metric.

**The metric hierarchy:** Don't let model metrics fool you. A 95% acceptance rate with declining NPS means users accept bad suggestions because they're lazy, not because the AI is good. Always triangulate.`,
    followUps: [
      "What's your plan if acceptance rate is high but NPS is declining?",
      "How would you A/B test a prompt change for this feature?",
      "How do you handle the cold-start problem when you have no usage data?",
    ],
    tags: ["metrics", "content AI", "SaaS", "measurement", "NPS"],
  },

  {
    id: "ts-004",
    category: "Strategy",
    industries: ["Tech & SaaS"],
    difficulty: "Senior",
    question: "OpenAI just released a new model that does 80% of what your AI product does, for free. What do you do?",
    framework: "Apply the Commoditization Response Framework: assess substitution risk, identify defensible layers, and pivot from model capability to product depth.",
    answer: `This is the existential risk question for every AI product company in 2024-2025. It happened to Jasper (OpenAI → ChatGPT), to Perplexity (Google SGE), and it will keep happening.

**Step 1: Honest assessment of substitution risk**
Ask: what percentage of your users' jobs-to-be-done can now be done with the new model for free? Be brutally honest. If it's >50%, you have a crisis. If it's <20%, you have a temporary advantage you need to expand.

**Step 2: Identify your defensible moat (the layers OpenAI can't commoditize):**
- **Data moat:** Do you have proprietary data the model doesn't have? (Customer-specific context, domain data, historical interactions)
- **Workflow moat:** Is your product deeply embedded in a workflow? (Switching cost)
- **Trust moat:** Do enterprise customers trust you specifically? (Security, compliance, SLA)
- **Integration moat:** Are you integrated into the customer's existing stack?

**Step 3: Strategic pivots available to you:**
1. Go vertical: become the best AI for one specific industry (not "AI writing" — "AI for legal contracts")
2. Go workflow: don't just provide output, own the full workflow (AI-generated content → approval workflow → publish pipeline)
3. Go enterprise: invest in compliance, security, admin controls that OpenAI won't prioritize
4. Go model-agnostic: position as the "interface layer" that can swap models as they improve

**Real example:** Jasper pivoted from "AI writing tool" to "brand voice management" platform with approval workflows. Their enterprise segment grew even as their SMB segment declined after ChatGPT launch.

**The honest answer:** If your only moat is "we use AI better than you can use ChatGPT," you're in trouble. The products that survive commoditization are the ones with data, workflow, and trust moats that matter to a specific customer segment.`,
    followUps: [
      "How do you communicate this risk to your board?",
      "How do you retain customers who are evaluating the free alternative?",
      "What does your pricing strategy look like in this scenario?",
    ],
    tags: ["strategy", "commoditization", "moat", "competitive", "OpenAI"],
  },

  // ─── FINTECH & BANKING ─────────────────────────────────────

  {
    id: "ft-001",
    category: "Ethics & Responsible AI",
    industries: ["FinTech & Banking"],
    difficulty: "Senior",
    question: "How would you build an AI-powered credit scoring system while ensuring fairness and regulatory compliance?",
    framework: "Use the 4-Layer Responsible AI Framework: Fairness Metrics → Explainability → Regulatory Compliance → Audit Trails.",
    answer: `Credit scoring with AI is one of the highest-stakes AI applications — a biased model can systematically deny loans to protected groups, which is both illegal and deeply harmful.

**The problem with traditional ML credit scoring:**
Legacy models trained on historical data inherit historical discrimination. If certain zip codes had less access to credit historically, a model trained on this data will perpetuate the pattern. This is disparate impact under the Equal Credit Opportunity Act (ECOA).

**Step 1: Define fairness before you build**
Fairness is not one thing — there are competing mathematical definitions:
- Demographic parity: equal approval rates across groups
- Equal opportunity: equal true positive rates across groups
- Calibration: when model says 70% probability, 70% of people in all groups actually repay

You cannot satisfy all three simultaneously (Arrow's Impossibility Theorem). Choose based on your legal requirements and values — and document this choice.

**Step 2: Model selection for explainability**
Neural networks achieve higher accuracy but fail explainability requirements. For regulated credit decisions, use:
- Gradient Boosting (XGBoost, LightGBM) with SHAP values for feature attribution
- Logically constrained models where required by regulators
- LLMs for narrative explanation generation (converting SHAP output to plain English reasons)

**Step 3: Regulatory requirements (US)**
- ECOA/Regulation B: must provide adverse action notices with specific reasons for denial
- Fair Housing Act: cannot use protected class proxies (zip code can be a proxy for race)
- CFPB guidance (2023): AI models must be "sufficiently explainable" to be legally defensible
- EU AI Act (2024): credit scoring is "high-risk" — requires conformity assessment, human oversight, right to explanation

**B2B vs B2C:**
- B2C (consumer loans): ECOA applies, must provide adverse action reasons in plain English
- B2B (business loans): less regulation, but enterprise buyers still demand explainability for internal governance

**The guardrail stack:**
1. Pre-training: audit training data for proxies and historical bias
2. In-training: constrain model on protected attributes
3. Post-training: run disparate impact analysis (80% rule: minority group approval rate must be ≥80% of majority)
4. Production: real-time monitoring for distribution shift across demographic groups`,
    followUps: [
      "If your model is 20% more accurate but has 5% demographic disparity, how do you decide?",
      "A regulator asks you to explain why a specific loan was denied. Walk me through your response.",
      "How do you handle the cold-start problem for underbanked populations?",
    ],
    tags: ["fairness", "bias", "regulation", "ECOA", "explainability", "credit"],
  },

  {
    id: "ft-002",
    category: "Product Sense",
    industries: ["FinTech & Banking"],
    difficulty: "Mid-Level",
    question: "Design an AI fraud detection system for a digital payments company. What are the key product decisions?",
    framework: "Structure around: Precision-Recall trade-off → Real-time vs. async → False positive UX → Feedback loop design.",
    answer: `Fraud detection is a perfect example where the PM's job is fundamentally about calibrating the precision-recall trade-off based on business economics, not just maximizing accuracy.

**The core tension:**
- High recall (catch more fraud) = more false positives = legitimate transactions blocked = angry customers = churn
- High precision (fewer false positives) = some fraud gets through = financial losses

Neither is free. Your job as a PM is to calculate which error is more expensive.

**Step 1: Know your economics**
- Average fraud transaction: $150 (Nilson Report, 2024)
- False positive cost: customer calls support (~$8 per call) + churn risk ($50-200 LTV hit)
- Industry benchmark: 1 false positive for every $130 in fraud prevented is considered acceptable
- If your false positive rate causes you to block more than 1% of legitimate transactions, churn becomes significant

**Step 2: Architecture decisions**
- Real-time decisioning (<100ms): needed at checkout. Must use lightweight models (logistic regression, decision trees, small gradient boosters)
- Async review (seconds to minutes): secondary model can be more complex. Flag for human review.
- Human-in-the-loop: cases with model confidence 40-60% — human agent makes final call
- Chargeback analysis: retrospective learning from confirmed fraud cases to update models

**Step 3: Feature categories**
- Transaction features: amount, merchant category, time of day, device fingerprint
- Behavioral features: velocity (5 transactions in 10 minutes is suspicious), location jump (NYC to Tokyo in 2 hours)
- Network features: is this merchant associated with fraud patterns? Is this device connected to known bad actors?

**B2C:** Focus on customer experience — wrong blocking kills trust. Offer instant appeal with selfie verification.
**B2B:** Focus on chargeback rates and fraud loss ratios — enterprise merchants care about SLA and dispute resolution time.

**Key metrics:** False positive rate, recall at threshold, model AUC-ROC, chargeback rate, detection latency.`,
    followUps: [
      "A new fraud ring is bypassing your model. What do you do in the next 24 hours?",
      "How do you handle the tension between privacy (collecting less data) and model accuracy?",
      "Your fraud model has 94% accuracy but your CEO wants 99%. What's your response?",
    ],
    tags: ["fraud detection", "precision-recall", "real-time ML", "payments", "risk"],
  },

  {
    id: "ft-003",
    category: "AI Technical",
    industries: ["FinTech & Banking"],
    difficulty: "Senior",
    question: "How would you evaluate an LLM for financial document summarization at a bank?",
    framework: "Build an eval suite across 5 dimensions: Accuracy, Hallucination Rate, Citation Fidelity, Regulatory Compliance, and Latency-Cost.",
    answer: `Evaluating LLMs for financial use cases requires a more rigorous eval framework than most other domains because errors have direct monetary and legal consequences.

**The 5-dimension eval framework:**

**1. Factual Accuracy (most important)**
Create a "Golden Set" of 200+ financial documents with human-verified summaries. Measure:
- Key fact extraction rate: does the summary capture all material numbers correctly?
- Date and party accuracy: wrong dates in financial summaries cause legal issues
- Numerical precision: $1.2M vs $12M is not a typo the model can get away with

**2. Hallucination Rate**
Financial documents are the worst domain for hallucinations. The model will confidently make up numbers.
- Test: provide documents with deliberately removed information and see if model fills it in
- Target: <0.5% hallucination rate for production (vs. 3-5% acceptable for general use)
- Use LLM-as-judge with another model checking for claims not grounded in the document

**3. Citation Fidelity**
For regulated use, every claim must map to a specific page/section of the source document.
- Evaluate: does the model's citation actually support the claim?
- Pattern: GPT-4 family tends to make up citations. Claude tends to cite accurately or decline.

**4. Regulatory Compliance**
- Does output avoid reproducing information that constitutes regulated advice?
- Does output include appropriate disclaimers?
- Test with adversarial prompts to check for jailbreaks that could produce inappropriate advice

**5. Latency and Cost**
- For a 100-page financial filing: GPT-4o = ~$0.80 at current pricing, latency ~15s
- For batch processing overnight (10K documents): cost becomes significant. Evaluate Claude Haiku or Llama 3.1 70B for cost reduction.
- Decision point: for human-reviewed workflows, slower/cheaper models are fine. For real-time, optimize for latency.

**Model benchmark for financial tasks (2025 data):**
| Model | Factual Accuracy | Cost/1M tokens | Latency |
|-------|----------------|----------------|---------|
| GPT-4o | 91% | $5-15 | Fast |
| Claude 3.5 Sonnet | 93% | $3-15 | Fast |
| Gemini 1.5 Pro | 88% | $3.5-10.5 | Medium |
| Llama 3.1 70B (self-hosted) | 84% | ~$0.80 | Variable |`,
    followUps: [
      "How do you build a continuous eval pipeline as models get updated?",
      "The model performs great in testing but struggles on a specific document type in production — what's your process?",
      "How do you handle a situation where no model passes your quality bar?",
    ],
    tags: ["evals", "LLM", "finance", "hallucination", "benchmarks", "compliance"],
  },

  // ─── HEALTHCARE & MEDTECH ──────────────────────────────────

  {
    id: "hc-001",
    category: "Product Sense",
    industries: ["Healthcare & MedTech"],
    difficulty: "Senior",
    question: "How would you design an AI diagnostic support tool for radiologists while maintaining clinical safety?",
    framework: "Use the Clinical AI Safety Framework: Human-in-the-Loop design → Performance Standards → Failure Mode analysis → Regulatory pathway.",
    answer: `Clinical AI is the highest-stakes domain in AI product management. A false negative in radiology can mean a missed cancer diagnosis. The PM's job is to build AI that makes clinicians better, not to replace them.

**The Human-in-the-Loop is non-negotiable:**
FDA 510(k) clearance for AI-assisted diagnostic tools requires that the AI is "decision support" — the radiologist makes the final call. Design for this explicitly. The AI should surface findings and confidence scores, not diagnoses.

**Step 1: Define what the AI does and doesn't do**
- Does: highlights regions of interest, ranks findings by likelihood, surfaces similar historical cases
- Does NOT: generate a final diagnosis, recommend treatment, communicate directly with patients
- Alert on uncertainty: when model confidence <70%, show a warning icon and escalate to senior radiologist

**Step 2: Performance standards (FDA expects these)**
- Sensitivity: % of true positives detected. For cancer screening, target ≥90% (missing cancer is unacceptable)
- Specificity: % of true negatives. Target ≥85% (too many false alarms cause alarm fatigue)
- Sub-group performance: model must perform equally across patient demographics. FDA will test this.
- Benchmark against board-certified radiologist performance

**Step 3: Failure mode analysis**
- What happens when imaging quality is poor? (AI should defer, not hallucinate findings)
- What happens with rare conditions not in training data? (Out-of-distribution detection)
- What happens when radiologist disagrees with AI? (Design a disagreement flagging workflow — valuable training data)

**Step 4: Regulatory pathway**
- FDA Class II medical device: requires 510(k) substantial equivalence to a predicate
- EU MDR: requires clinical evaluation and post-market surveillance
- Timeline: 12-18 months for 510(k), 24-36 months for full PMA

**B2B consideration:** The buyer is the hospital administrator, not the radiologist. They care about: liability protection, workflow integration (PACS systems), and cost reduction. Price by volume of scans processed.

**B2C consideration (consumer health apps):** FDA oversight is lighter for "wellness" positioning, but you lose clinical credibility. Choose your path deliberately.

**Real data:** An FDA analysis of AI-assisted mammography screening (2024) showed 14.5% reduction in radiologist workload with no change in cancer detection rates — a compelling clinical case.`,
    followUps: [
      "Your AI has 92% sensitivity but only 75% specificity — is it ready to ship?",
      "A radiologist disagrees with the AI's finding. How did you design this workflow?",
      "How would you handle a situation where the AI missed a finding that a radiologist then also missed?",
    ],
    tags: ["healthcare", "clinical AI", "FDA", "radiology", "human-in-the-loop"],
  },

  {
    id: "hc-002",
    category: "Ethics & Responsible AI",
    industries: ["Healthcare & MedTech"],
    difficulty: "Mid-Level",
    question: "How would you handle bias detection and mitigation in a clinical AI tool that recommends treatment protocols?",
    framework: "Apply the Clinical Bias Framework: data audit → subgroup analysis → active bias mitigation → continuous monitoring → clinical governance.",
    answer: `Healthcare AI bias has real-world life-and-death consequences. A landmark 2019 study (Obermeyer et al., Science) showed a widely-used healthcare algorithm systematically underestimated the health needs of Black patients because it used healthcare costs as a proxy for health — and Black patients historically had less access to care.

**The proxies problem:**
In healthcare, many seemingly neutral features are proxies for race, gender, or socioeconomic status:
- Zip code → race
- Insurance type → income
- Prior healthcare utilization → historical access disparities

If your model uses these as features, it may learn to discriminate even without explicit demographic data.

**Step 1: Data audit**
Before training, audit your dataset:
- Demographic representation: is your training data representative of the patient population you'll serve?
- Label quality: were historical diagnoses/treatments affected by bias? (Training on biased historical decisions perpetuates them)
- Proxy analysis: which features correlate with protected attributes at >0.7 correlation?

**Step 2: Subgroup performance testing (mandatory)**
- Don't report one aggregate accuracy. Report accuracy by: race, sex, age group, insurance type, BMI
- If performance varies by more than 5% across demographic groups, investigate before shipping
- FDA's AI/ML Action Plan (2023) explicitly requires demographic subgroup analysis

**Step 3: Mitigation strategies**
- Pre-processing: rebalance training data, remove biased proxies
- In-processing: adversarial debiasing (train a second model to predict protected attribute; penalize the main model when the second model succeeds)
- Post-processing: adjust decision thresholds per demographic group to equalize outcomes

**Step 4: Clinical governance**
AI in healthcare should have a clinical AI committee — clinicians, ethicists, data scientists, compliance — that reviews bias metrics quarterly and can suspend a model.

**Real example (B2B):** Epic's sepsis prediction model was found to underperform for Black patients (2021). Their response: retrain with stratified sampling, add demographic-specific model versions, establish quarterly bias audit process.`,
    followUps: [
      "If perfect demographic parity conflicts with highest aggregate accuracy, which do you choose and why?",
      "How do you communicate bias risks to a hospital administrator buying your product?",
      "What is your monitoring plan once the model is in production?",
    ],
    tags: ["bias", "healthcare", "ethics", "fairness", "clinical governance"],
  },

  // ─── E-COMMERCE & RETAIL ───────────────────────────────────

  {
    id: "ec-001",
    category: "Product Sense",
    industries: ["E-commerce & Retail"],
    difficulty: "Mid-Level",
    question: "Design an AI-powered product recommendation engine for a marketplace like Amazon or Etsy. What are the key decisions?",
    framework: "Structure around: recommendation algorithm choice → cold-start strategy → diversity vs. relevance trade-off → business objectives alignment.",
    answer: `Recommendation systems are one of the most economically important AI applications — Amazon attributes 35% of revenue to its recommendation engine (McKinsey, 2023).

**Step 1: Define the business objective clearly**
"Better recommendations" is not a metric. You need to choose:
- Click-through rate (CTR): maximize engagement but can optimize for clickbait
- Add-to-cart rate: stronger signal of purchase intent
- Purchase rate: ultimate business metric but harder to attribute to recommendations
- Revenue per user: accounts for item price, not just count of purchases
- Return rate: a recommendation that leads to a return is net negative

**Step 2: Algorithm architecture**
- Collaborative filtering (Amazon's original approach): "customers like you also bought..." Works well with dense data; fails with sparse data (new users/items)
- Content-based filtering: based on item attributes (category, price, brand). Works for cold-start.
- Hybrid (production best practice): use content-based for cold start → switch to collaborative as data accumulates
- LLM-enhanced (2024+): use embeddings to understand semantic similarity. "Users asking about 'morning skincare routine' should see SPF products even if they didn't search for SPF"

**Step 3: The cold-start problem**
- New user: use browsing behavior in session, location, time of day, device type
- New item: use item description embeddings; bootstrap with manual merchandiser placement
- New user + new item: fall back to curated "bestsellers in your category"

**Step 4: Diversity vs. relevance**
Pure relevance leads to filter bubbles. A user who bought one book on investing sees only investing books — good for short-term CTR, bad for long-term engagement. Netflix learned this: their 2024 recommendation overhaul added explicit diversity constraints.

**B2C (consumer marketplace):** Serendipity matters. Add a "surprise me" element. Diversify by category and price point.
**B2B (wholesale/procurement platform):** Relevance is everything. Buyers know what they need. Don't show distracting alternatives.

**Key metric to add:** Recommendation serendipity score — % of purchases from recommendations that are from a category the user hadn't previously explored.`,
    followUps: [
      "How do you prevent the recommendation engine from promoting only high-margin items?",
      "A/B testing shows your new model has higher CTR but lower purchase rate. What do you do?",
      "How do you handle recommendations for products with ethical concerns (e.g., heavily advertised junk food to children)?",
    ],
    tags: ["recommendations", "collaborative filtering", "cold-start", "e-commerce", "LLM embeddings"],
  },

  {
    id: "ec-002",
    category: "Execution & Metrics",
    industries: ["E-commerce & Retail"],
    difficulty: "Junior",
    question: "What metrics would you track for an AI-powered customer support chatbot on an e-commerce platform?",
    framework: "Use the three-tier metrics model: Bot Performance → Customer Experience → Business Impact. Never optimize just one tier.",
    answer: `Chatbot metrics are often measured poorly — teams focus on deflection rate while customer satisfaction craters. Here's the complete metrics framework.

**Tier 1: Bot Performance Metrics**
- Intent recognition accuracy: % of queries where the bot correctly identifies what the user wants. Target: >85%. Below 70% = severe UX problems.
- Resolution rate (no human handoff): % of conversations where user's issue is resolved without needing a human agent. Target: 60-70% for e-commerce (not 90% — complex issues need humans).
- False positive rate on escalation: % of times bot escalates when it could have handled it
- Latency: user waits >3 seconds → abandonment rate doubles

**Tier 2: Customer Experience Metrics**
- CSAT (post-chat survey): target >4.0/5.0. Key question: "Did the chatbot resolve your issue today?"
- Escalation quality: when handing to human, does the bot pass context correctly? (Measure % of handoffs where agent has full context)
- Self-service satisfaction: users who resolved through bot — do they rate their experience as well as phone support?
- Repeat contact rate: if a user contacts support again within 7 days for the same issue, the bot failed

**Tier 3: Business Impact Metrics**
- Cost per interaction: AI chatbot ~$0.10-0.50 vs. human agent ~$8-15. Track total cost savings.
- Handle time reduction: AI + agent hybrid vs. agent-only
- Agent satisfaction: are agents happier with fewer repetitive queries? (Retention impact)
- Revenue from support: are support conversations leading to upsells? (Often undertracked)

**B2C (individual shoppers):** CSAT and repeat contact rate are most important. Shoppers are impatient.
**B2B (business buyers):** Resolution accuracy on complex order/invoicing queries matters more than speed. These buyers will wait for a correct answer.

**The trap to avoid:** Deflection rate sounds great but is meaningless if users feel unheard. A 90% deflection rate with 2.0 CSAT is worse than a 50% deflection rate with 4.5 CSAT.`,
    followUps: [
      "Your chatbot resolves 80% of queries but CSAT is 3.1/5. What do you investigate?",
      "How would you decide which query types to handle with AI vs. route directly to humans?",
      "How do you measure the quality of AI-to-human handoffs?",
    ],
    tags: ["chatbot", "metrics", "customer support", "e-commerce", "CSAT"],
  },

  // ─── MEDIA & ENTERTAINMENT ─────────────────────────────────

  {
    id: "me-001",
    category: "Product Sense",
    industries: ["Media & Entertainment"],
    difficulty: "Senior",
    question: "Design a content moderation AI system for a social media platform with 100M+ users. What are the product decisions?",
    framework: "Use the Moderation Strategy Matrix: automation tier → human review design → appeals process → transparency → false positive cost analysis.",
    answer: `Content moderation is a uniquely hard AI problem — errors affect free speech, user safety, and platform liability simultaneously, and there's no ground truth.

**The core tension:**
- Under-moderation: harmful content stays up → user safety risk, advertiser boycotts, regulatory action (EU DSA fines up to 6% of global revenue)
- Over-moderation: legitimate content removed → free speech concerns, user trust erosion, appeals burden

**Step 1: Tiered automation strategy**

| Violation Type | Automation Level | Rationale |
|---|---|---|
| CSAM (child safety) | 99%+ automated removal | Zero tolerance, unambiguous |
| Spam / bot content | 90%+ automated | High volume, clear signals |
| Graphic violence | 70% automated, 30% human review | Context matters (news vs. shock) |
| Hate speech | 50% automated, 50% human review | Highly context-dependent |
| Misinformation | Mostly human review + labels | Cannot automate truth claims |
| Satire / criticism | Human review prioritized | AI fails at nuance |

**Step 2: False positive design**
At 100M users, even 1% false positive rate = 1M wrongly removed posts/day. Design the appeals process as a product feature, not an afterthought:
- Instant automated appeal for first-time violations
- Human review SLA: 24 hours for appeal
- Transparency: tell users exactly which policy was violated

**Step 3: Model architecture**
- Multimodal: text + image + video + audio models working in concert
- Context-aware: same words mean different things in different contexts (model needs post history, user graph, community norms)
- Language coverage: must perform equally in all supported languages — bias analysis required per language

**Step 4: Adversarial robustness**
Bad actors probe moderation systems systematically. Use:
- Continuous red-teaming: dedicated team trying to bypass the model
- Ensemble models: multiple model signals are harder to game than one
- Temporal features: timing patterns of adversarial accounts

**B2C metric (platform users):** Appeal acceptance rate, time to resolution, user trust score
**B2B metric (advertisers):** Brand safety score — what % of their ads appear next to appropriate content

**Data point:** Meta's content moderation AI catches 94% of violating content before it's reported (Meta Transparency Report, 2024). But their false positive rate for Arabic-language content is 3x higher than English — a known bias that required dedicated retraining.`,
    followUps: [
      "A political speech is borderline — within your policy but highly contested. What process do you use?",
      "Your AI is systematically removing posts from a specific ethnic minority community. What do you do?",
      "How do you handle content moderation in countries where local law conflicts with global free speech policies?",
    ],
    tags: ["content moderation", "trust & safety", "social media", "multimodal", "policy"],
  },

  {
    id: "me-002",
    category: "Strategy",
    industries: ["Media & Entertainment"],
    difficulty: "Senior",
    question: "How would you build a personalized content recommendation strategy for a streaming platform like Netflix or Spotify?",
    framework: "Apply the Recommendation Strategy Canvas: engagement objective → discovery vs. reinforcement balance → personalization depth → content diversity mandates.",
    answer: `Netflix's recommendation system is estimated to save them $1B/year in customer retention (2024 estimate). Spotify's Discover Weekly drives 40% of all streaming. These are high-stakes AI decisions that define the product.

**The strategic choice: Engagement or Discovery?**

Pure engagement optimization leads to addiction patterns — users stuck in comfort zones watching the same genre. Pure discovery optimization leads to irrelevant content — churn. The best systems optimize for "engaged discovery."

**Netflix's actual approach (from published research):**
- 80/20 rule: 80% of recommendations reinforce known preferences, 20% introduce new genres
- Thumb signal weight: thumbs down has 3x weight of thumbs up (strong negative signal is more reliable)
- Context-aware: recommendations change by time of day, device, and whether you're in a "relaxing" or "engaged" viewing mode
- Finish rate signal: a show started and abandoned is a strong negative signal, even without explicit rating

**Spotify's Discover Weekly (published engineering posts):**
- Collaborative filtering: finds "musical neighbors" — users with similar taste history
- Audio features: BPM, key, danceability (not just genre categories)
- Editorial signals: Spotify curators seed new artists into the model
- Release Radar: time-sensitive discoveries (new music from artists you follow)

**The AI PM decision points:**

1. **Implicit vs. explicit signals:** Should users rate content? Netflix removed star ratings because they create demand illusions (users say they want documentaries but watch reality TV). Implicit signals (watch time, completion rate) are more reliable.

2. **Serendipity injection:** How much "surprise" content to add. Spotify adds ~30% unfamiliar content in Discover Weekly. Netflix experiments with this number.

3. **Diversity mandates:** Platforms with social responsibility goals need to surface diverse creators. Pure engagement optimization will favor already-popular content. Require explicit representation constraints in the algorithm.

**B2C (consumer streaming):** User satisfaction and retention are primary. Long-form content (TV series) → optimize for completion and binge rate. Short-form (TikTok) → optimize for session length and return visits.
**B2B (content licensing platform selling to studios):** Recommendation data is a product — studios pay for analytics on how their content performs across audience segments.`,
    followUps: [
      "Your recommendation model maximizes 30-day retention but users report feeling 'addicted and unhappy.' What do you do?",
      "How would you measure whether your recommendations are helping or hurting creator diversity?",
      "Netflix is considering a 'mood-based' recommendation mode. How do you evaluate this?",
    ],
    tags: ["recommendations", "streaming", "personalization", "Netflix", "Spotify"],
  },

  // ─── ENTERPRISE & B2B ──────────────────────────────────────

  {
    id: "eb-001",
    category: "Product Sense",
    industries: ["Enterprise & B2B"],
    difficulty: "Senior",
    question: "How would you design an AI agent for enterprise sales teams that handles lead qualification and outreach?",
    framework: "Apply the Enterprise AI Agent Design Framework: human-in-loop checkpoints → data access permissions → output quality standards → ROI measurement → change management.",
    answer: `This is directly from real 2026 AI agent deployments. The HubSpot 2026 AI Agents Playbook documents that 54% of global companies now use conversational AI for sales functions, but success rates vary dramatically based on design decisions.

**The Agent Architecture:**

The enterprise sales agent should operate in stages, each with a defined human checkpoint:
1. **Lead ingestion** (automated): scrapes company website, LinkedIn, Crunchbase, news articles
2. **Lead scoring** (automated + human review): scores on fit (industry, company size, tech stack) and intent (hiring signals, funding rounds, relevant content downloads)
3. **Outreach draft generation** (automated → human approval): generates personalized first email. Human reviews and sends. Never fully autonomous on outreach.
4. **Follow-up sequences** (conditional automation): after human approval, subsequent follow-ups can be automated based on engagement signals
5. **Meeting prep brief** (automated): generates company summary, recent news, talking points before each call

**Key product decision: autonomy level**
The HubSpot playbook's framework: "Agents excel when they can connect to the tools you already use — your email, CRM, database." But for outreach specifically, keep humans in the loop for:
- First outreach message (brand voice, relationship stakes)
- Any negative signal response (angry or opted-out prospect)
- Strategic accounts (>$100K ACV)

**Data integration requirements (critical for enterprise):**
- CRM (Salesforce, HubSpot): source of truth for contact history
- Email inbox: context on past conversations
- LinkedIn Sales Navigator: enrichment data
- Company news APIs: real-time trigger events
- Calendar: scheduling integration

**The ROI case (what enterprise buyers need to see):**
- Sales reps spend 60% of their time on non-selling activities (Salesforce State of Sales, 2024)
- AI agent reduces prospecting + outreach prep from 4 hours/day to 45 minutes/day
- Result: 3-4 more meaningful conversations per rep per week
- At average B2B conversion rates (5%), that's ~$200K+ additional pipeline per rep/year

**Change management (the PM responsibility most forget):**
Sales reps fear AI will replace them. Your product must position as "making your reps 3x more effective" not "automating sales." The UX must make reps feel in control. Weekly "agent performance review" emails to each rep showing what the agent did on their behalf helps.`,
    followUps: [
      "A rep says the agent's outreach doesn't match their personal style and is hurting relationships. How do you fix this?",
      "How do you measure whether the AI agent is actually improving pipeline quality, not just volume?",
      "Your CRO wants the agent to operate fully autonomously for outreach to SMB accounts. Do you agree?",
    ],
    tags: ["AI agents", "enterprise", "sales", "automation", "B2B", "CRM"],
  },

  {
    id: "eb-002",
    category: "Leadership",
    industries: ["Enterprise & B2B"],
    difficulty: "Senior",
    question: "Your engineering team says the AI feature will take 6 months. Your sales team has promised it to a key customer in 3 months. How do you handle this?",
    framework: "Apply the Constraint Negotiation Framework: validate both constraints → scope reduction options → alternative solutions → stakeholder communication → decision escalation.",
    answer: `This is fundamentally a PM leadership and trust problem, not a technical problem.

**Step 1: Validate the constraints (don't assume)**
Before anything else, understand why each number is what it is:
- Engineering's 6 months: what's the bottleneck? Is it infrastructure, model selection, evals pipeline, security review, or resource constraints? Can any part be parallelized or contracted out?
- Sales' 3-month promise: what exactly was promised? An MVP with core functionality? Full feature? Could you ship a limited pilot to the key customer at 3 months that satisfies the sales commitment?

**Step 2: Generate options, not ultimatums**

Option A — Scope reduction: what is the smallest version of this feature that satisfies the customer's core use case? If the customer needs AI-powered search and full conversational AI takes 6 months, can you ship a semantic search MVP in 3 months?

Option B — Resource acceleration: can you add contractors or an AI vendor integration to compress the timeline? What does that cost vs. the value of the deal?

Option C — Promise renegotiation: go back to the customer with transparency. "We committed 3 months but we're now at 4 months. Here's what you get at each milestone." Most enterprise customers prefer honesty to surprises.

Option D — Decoupled delivery: ship the non-AI parts of the feature in 3 months. Add AI layer at 6 months. Customers often accept this if the non-AI version has value.

**Step 3: Facilitate the conversation, don't take sides**
Your job as PM is to bring both teams to a shared understanding of constraints and help them reach an agreement. Don't become an advocate for either engineering or sales — you're the information bridge.

**Step 4: Escalate with options, not problems**
If you need to escalate to leadership, bring 3 options with their trade-offs. Never escalate with "we have a problem and need you to decide." That's abdication. Come with: "Here are 3 paths. Here are the trade-offs. Here's my recommendation."

**The PM lesson:** This situation usually means the sales process didn't include PM early enough. The fix is process: establish a "technical feasibility review" for any AI feature commitment before it's promised to customers.`,
    followUps: [
      "The sales rep says 'I already told the customer, we can't change this.' What do you do?",
      "Engineering's 6-month estimate was based on using GPT-4. A new cheaper/faster model could cut it to 4 months. How do you evaluate switching?",
      "How do you prevent this from happening again?",
    ],
    tags: ["leadership", "stakeholder management", "trade-offs", "timeline", "scope"],
  },

  // ─── CROSS-INDUSTRY / GENERAL ──────────────────────────────

  {
    id: "gi-001",
    category: "AI Technical",
    industries: ["Tech & SaaS", "FinTech & Banking", "Healthcare & MedTech", "E-commerce & Retail", "Media & Entertainment", "Enterprise & B2B"],
    difficulty: "Junior",
    question: "Explain how you would explain LLMs to a non-technical executive stakeholder in 2 minutes.",
    framework: "Use the Analogy → Problem → Implication structure. Never use jargon. Ground in a business outcome they care about.",
    answer: `This is a core PM skill — translation between technical reality and business impact.

**The 2-minute explanation:**

"Think of an LLM like an extraordinarily well-read intern who has read the entire internet — every book, every website, every research paper. When you ask them a question, they don't look it up — they answer from memory, based on patterns they've absorbed.

This makes them incredibly fast and versatile. But it also means two important things: First, their knowledge has a cutoff date — they don't know about things that happened after they finished 'reading.' Second, they can be confidently wrong. Just like a very smart intern can give you a confident answer that's incorrect, LLMs can 'hallucinate' — generate plausible-sounding but wrong information.

For our business, this means we need to design our AI features with human oversight for high-stakes decisions, regularly update the knowledge the AI can access (that's what RAG does), and set the right expectations with customers about what the AI can and can't do.

The opportunity is real: [specific example relevant to their business]. The risk is manageable if we're thoughtful. My recommendation is..."

**Key principles:**
- Use an analogy they understand (intern, not algorithm)
- Name the limitations before they ask about them — it builds trust
- Connect to a specific business outcome or decision they need to make
- End with your recommendation, not just information

**What to avoid:**
- "Transformer architecture" — not helpful
- "Vector embeddings" — ditto
- "It's basically like..." (six different analogies confuse, one good one sticks)`,
    followUps: [
      "The executive asks: 'Can it be wrong?' How do you respond?",
      "They ask: 'How is this different from Google?' — what's your answer?",
      "They say: 'Let's just use ChatGPT.' How do you respond?",
    ],
    tags: ["communication", "stakeholder", "LLM basics", "non-technical", "explanation"],
  },

  {
    id: "gi-002",
    category: "Execution & Metrics",
    industries: ["Tech & SaaS", "FinTech & Banking", "Healthcare & MedTech", "E-commerce & Retail", "Media & Entertainment", "Enterprise & B2B"],
    difficulty: "Mid-Level",
    question: "How would you design an A/B test for a new LLM-powered feature?",
    framework: "LLM A/B tests have unique challenges: non-determinism, latency variance, and delayed outcomes. Apply the AI-Specific Experiment Framework.",
    answer: `A/B testing AI features requires adaptations beyond standard A/B testing because AI outputs are non-deterministic and outcomes are often delayed.

**The setup:**

**Define your primary metric first** (before running the experiment). For AI features, avoid vanity metrics. Common traps:
- Don't just measure "AI used" — measure "AI helped"
- Don't just measure "completion rate" — measure "quality of completion"

**Sample size calculation — AI-specific considerations:**
- AI outputs have higher variance than deterministic features → need larger sample sizes
- Rule of thumb: 2x your usual sample size for features with high output variance
- Use power analysis with your expected effect size. A 5% improvement in acceptance rate requires ~10,000 samples per variant at 80% power.

**The non-determinism problem:**
The same user getting different AI outputs in repeat visits is normal — but it means you can't rely on short-session metrics. Solutions:
- Session-level assignment (not user-level) for features with high within-session variance
- Run experiments for full weeks (not days) to account for day-of-week effects
- Measure p50 and p95, not just mean (AI output quality has a heavy tail)

**Guardrail metrics (always monitor these alongside your primary metric):**
- Latency: did the new model slow down response time?
- Error rate: more errors in treatment vs. control?
- User satisfaction (CSAT): even if primary metric improves, monitor for UX regression

**The delayed outcome problem:**
Some AI feature value only shows up 30-60 days later (e.g., a recommendation engine's impact on 60-day retention). Plan for this:
- Run a quick proxy metric experiment first (7 days, using leading indicators)
- Follow with a long-horizon holdout test (30+ days) to verify the proxy held

**B2B consideration:** With smaller enterprise user bases (<10K users), traditional A/B tests are underpowered. Use:
- Multi-armed bandits for faster learning
- Synthetic control groups using historical data
- Qualitative research to supplement quantitative signals`,
    followUps: [
      "Your A/B test is running but the treatment group's LLM is responding 200ms slower. Do you stop the test?",
      "After 2 weeks, treatment has higher click-through but lower 30-day retention. What do you do?",
      "How do you test a prompt change when you don't have enough users for statistical significance?",
    ],
    tags: ["A/B testing", "experimentation", "non-determinism", "LLM", "metrics"],
  },

  {
    id: "gi-003",
    category: "Ethics & Responsible AI",
    industries: ["Tech & SaaS", "FinTech & Banking", "Healthcare & MedTech", "E-commerce & Retail", "Media & Entertainment", "Enterprise & B2B"],
    difficulty: "Mid-Level",
    question: "Your AI product is producing outputs that are harmful to a specific user group. How do you handle this in the next 24 hours and the next 30 days?",
    framework: "Apply the AI Incident Response Framework: immediate containment → impact assessment → root cause analysis → remediation → communication → systemic fix.",
    answer: `AI incidents require a different response playbook than software bugs because the harm is often systematic and ongoing.

**In the first 24 hours:**

1. **Contain first, investigate second.** If you have confirmation of harm, disable or throttle the specific feature/model that's causing it. Don't wait for root cause analysis. Product experience degrades but harm stops.

2. **Document the incident.** Create an incident log: when discovered, what's happening, who is affected, what containment action was taken. This becomes your timeline for internal review and any regulatory reporting.

3. **Assess scope.** How many users were exposed? Is this ongoing or historical? Are there legal obligations to notify? (GDPR Article 33: data breach notification within 72 hours. EU AI Act has similar requirements for high-risk AI incidents.)

4. **Escalate to Legal, Policy, and Comms immediately.** This is not a decision a PM makes alone. Get cross-functional alignment on what will be communicated externally.

**In the next 30 days:**

5. **Root cause analysis.** Classify: Was this a data problem (biased training data)? A model problem (capability limitation exposed by edge case)? A product problem (wrong design of human oversight)? A deployment problem (model performing differently in production vs. test)?

6. **Remediation.** Based on root cause:
   - Data problem → retrain with corrected data, evaluate impact of retraining
   - Model problem → add guardrails, add human review for flagged cases, or remove feature
   - Product problem → redesign human-in-the-loop checkpoint
   - Deployment problem → improve eval suite to catch this class of error before deployment

7. **Affected user outreach.** Proactively contact affected users with: what happened, what actions you took, what you changed, and whether any remediation is being offered.

8. **Prevention.** Update your launch checklist. Add the failure mode that caused this incident as a required eval category for all future launches. Write a post-mortem and share internally.

**The communication principle:** "Sunlight is the best disinfectant." Transparency about AI failures, done early and honestly, rebuilds trust faster than silence or minimization.`,
    followUps: [
      "Your CEO says don't communicate to users until Legal clears it — Legal expects 2 weeks. What do you do?",
      "How do you decide whether to resume the feature after fixing the root cause?",
      "How do you prevent this pattern from recurring across your product portfolio?",
    ],
    tags: ["incident response", "ethics", "responsible AI", "communication", "trust"],
  },

  {
    id: "gi-004",
    category: "Strategy",
    industries: ["Tech & SaaS", "Enterprise & B2B"],
    difficulty: "Senior",
    question: "How do you decide when to build vs. buy vs. fine-tune an AI capability for your product?",
    framework: "Apply the Build-Buy-Fine-tune Decision Framework across 5 dimensions: differentiation, data, cost, time-to-market, and maintainability.",
    answer: `This is the most common strategic decision in AI product development, and the answer changes as the AI landscape evolves.

**The Framework:**

| Dimension | Build | Buy (API) | Fine-tune |
|---|---|---|---|
| Time to market | 6-18 months | Weeks | 2-4 months |
| Cost (Year 1) | $500K-$5M | Usage-based | $50-500K + inference |
| Differentiation | Maximum | Minimal | Medium |
| Data required | Large proprietary dataset | None | Medium domain dataset |
| Maintenance | High (your team) | Low (vendor manages) | Medium |
| Control | Full | Minimal | Medium |

**When to Buy (start here by default):**
- Your use case is not a core differentiator (customer support chatbot, summarization)
- You need to ship in <3 months
- You don't have a proprietary dataset
- OpenAI/Anthropic/Google already does it well
- 90% of AI products in 2024-2025 should start here

**When to Fine-tune:**
- Your domain has specialized language, format, or tone the base model doesn't have (medical codes, legal citations, brand voice)
- Latency is critical and you need a smaller, faster model
- Cost at scale: if you're making >1M API calls/month, the economics favor a fine-tuned smaller model
- Privacy: you can't send data to external APIs (healthcare, finance)

**When to Build from scratch:**
- Almost never, unless you're a foundation model company (OpenAI, Anthropic, Google)
- Even major enterprises (Microsoft, Adobe, Salesforce) are building on top of foundation models
- Exception: highly specialized modalities where foundation models don't exist (satellite imagery, specific industrial sensor data)

**The current best practice stack (2025):**
For most companies: Buy foundation model API + fine-tune for domain + RAG for knowledge retrieval + your application layer for UX and workflow.

**Cost benchmark:** Google Gemini Flash at $0.075/1M input tokens vs. GPT-4o at $5/1M input tokens — for high-volume use cases, model selection is a major cost decision, not just a quality decision.`,
    followUps: [
      "You built on GPT-4. OpenAI increases prices by 50%. What do you do?",
      "Your fine-tuned model is underperforming the base model after 3 months. Why might this happen?",
      "How do you present the build-buy decision to a CEO who wants to 'own our AI'?",
    ],
    tags: ["build vs buy", "fine-tuning", "strategy", "model selection", "cost"],
  },

  {
    id: "gi-005",
    category: "AI Technical",
    industries: ["Tech & SaaS", "FinTech & Banking", "Healthcare & MedTech", "E-commerce & Retail", "Media & Entertainment", "Enterprise & B2B"],
    difficulty: "Mid-Level",
    question: "How do you handle LLM hallucinations in a customer-facing AI product?",
    framework: "Apply the Hallucination Mitigation Stack: Detection → Prevention → UX Design → Monitoring → Continuous improvement.",
    answer: `Hallucinations are not a bug to be fixed — they're a fundamental characteristic of probabilistic systems. As a PM, your job is to design around them, not wait for them to disappear.

**Why LLMs hallucinate:**
LLMs don't "know" facts — they predict likely next tokens based on patterns. When asked about something uncertain, they generate a plausible-sounding response rather than saying "I don't know." The more confident the model sounds, the more dangerous this is.

**The Hallucination Mitigation Stack:**

**Layer 1: Prevention**
- RAG (Retrieval-Augmented Generation): ground the model in verified documents. The model can only answer based on what it retrieves. Dramatically reduces hallucination for factual queries.
- System prompt constraints: "Answer only based on the provided context. If the answer isn't in the context, say 'I don't know.'"
- Temperature reduction: lower temperature (0.0-0.2) makes the model less creative and more factual
- Few-shot examples: show the model examples of "I don't know" responses

**Layer 2: Detection**
- LLM-as-judge: use a second LLM to check the output of the first for factual claims
- Citation verification: for RAG outputs, check that cited passages actually exist and support the claim
- Confidence scoring: some models output logprobs (token probabilities) — low confidence = higher hallucination risk

**Layer 3: UX Design (the PM layer)**
- Transparency indicators: show users when AI is uncertain ("I'm not sure about this — please verify")
- Source citations: let users click through to verify the source
- Graceful decline: better to say "I can't answer this" than to hallucinate
- Human review trigger: for high-stakes outputs (medical, legal, financial), require human approval before displaying

**Layer 4: Monitoring**
- Sample-based human review: randomly review 1-2% of all outputs weekly
- User feedback loop: "Was this helpful / accurate?" thumbs up/down
- Hallucination rate tracking: track % of outputs flagged as factually incorrect in your weekly sample

**Real data:** Anthropic's research shows Claude 3.5 Sonnet hallucinates on factual questions 8% of the time; GPT-4o is at 6%; Gemini 1.5 Pro is at 9% (SimpleQA benchmark, 2024). Even the best models need mitigation design.`,
    followUps: [
      "A customer reports your AI gave them dangerous medical advice. What's your process?",
      "How do you explain to a non-technical stakeholder why hallucinations can't be eliminated?",
      "When would you accept a 5% hallucination rate? What use cases require <0.1%?",
    ],
    tags: ["hallucinations", "RAG", "trust", "UX design", "monitoring"],
  },

  {
    id: "gi-006",
    category: "Product Sense",
    industries: ["Tech & SaaS", "FinTech & Banking", "Healthcare & MedTech", "E-commerce & Retail", "Media & Entertainment", "Enterprise & B2B"],
    difficulty: "Junior",
    question: "Tell me about a time you used data to make a product decision. What was the outcome?",
    framework: "Use the STAR method (Situation, Task, Action, Result) with emphasis on the data quality and decision rigor, not just the outcome.",
    answer: `This behavioral question tests your analytical thinking AND your honesty about uncertainty. Interviewers are looking for rigor, not just success stories.

**What strong answers include:**
1. A specific metric that was declining or unclear (not "we wanted to improve things generally")
2. Your hypothesis about the cause — and whether it was right
3. The data sources you used and their limitations
4. A decision made under uncertainty (not perfect information)
5. The actual outcome — including what didn't go as expected
6. What you would do differently

**Example framework answer:**
"At [Company], our AI summarization feature had a 65% acceptance rate but the team believed this should be higher. My task was to understand why users weren't accepting suggestions.

I looked at three data sources: acceptance rate by document type, session recordings of users who rejected suggestions (using FullStory), and a user survey. The data showed a pattern I didn't expect: users were accepting summaries for internal memos (85% acceptance) but rejecting them for client-facing documents (40% acceptance). Session recordings showed users immediately copying the suggestion to edit it, suggesting the format was wrong, not the content.

My hypothesis was that the model wasn't matching the company's brand voice for external communications. To test this, I ran a 2-week experiment where users of the low-acceptance segment could provide examples of 'ideal' summaries for training. Acceptance rate in the treatment group went from 40% to 58% — a significant improvement but not as high as I expected.

What I would do differently: I should have done the user interview research before the experiment, not simultaneously. The data told me what was happening; I needed qualitative to understand why more precisely."

**Why interviewers love this type of answer:** It shows data literacy (multiple data sources, triangulation), intellectual honesty (didn't achieve 100% success), and PM maturity (learned from the experience).`,
    followUps: [
      "What if the data showed something that contradicted your intuition? How did you resolve it?",
      "How do you handle situations where data is absent or unreliable?",
      "Tell me about a data-driven decision that turned out to be wrong.",
    ],
    tags: ["behavioral", "data-driven", "STAR method", "analytics", "decision making"],
  },

  {
    id: "gi-007",
    category: "AI Technical",
    industries: ["Tech & SaaS", "Enterprise & B2B"],
    difficulty: "Junior",
    question: "What is the difference between a chatbot, an AI assistant, and an AI agent? Give examples of each.",
    framework: "Compare along 4 dimensions: goal type, memory, tool access, and autonomy. Use concrete product examples.",
    answer: `These three terms are often used interchangeably, but they represent meaningfully different product architectures.

| | Chatbot | AI Assistant | AI Agent |
|---|---|---|---|
| Goal | Respond to a question | Complete a task in conversation | Achieve an objective autonomously |
| Memory | Usually none (stateless) | Within-session context | Persistent memory across sessions |
| Tool access | None | Limited (search, calculator) | Full tool suite (CRM, email, calendar, database) |
| Autonomy | Zero | Low (requires prompts) | High (can execute multi-step plans) |
| Example | FAQ bot on a website | ChatGPT, Claude.ai | AutoGPT, Devin AI, Salesforce Einstein Agent |

**Chatbot (rule-based or LLM-powered):**
- A bank's website FAQ bot that answers "what are your hours?" questions
- Usually has a decision tree or intent classifier
- No persistent memory: forgets everything when conversation ends
- Cannot take actions in other systems

**AI Assistant (LLM with tools):**
- ChatGPT with web search enabled
- Has access to a small set of tools (search, code execution)
- Maintains context within a conversation
- Still requires human prompting for each task
- Human decides when to use the output

**AI Agent (autonomous, multi-tool, goal-directed):**
- An AI sales agent that receives a list of leads, researches each one online, drafts personalized emails, and schedules follow-ups — without human prompting for each step
- Has access to many tools (CRM, email, calendar, internet)
- Maintains memory across sessions
- Can execute multi-step plans
- Checks in with humans at pre-defined decision points (high-stakes actions)

**The PM insight:** Most companies are calling everything an "agent" in 2025-2026, but genuine agent behavior requires: persistent memory + tool access + multi-step reasoning + defined autonomy boundaries. Evaluate any "AI agent" claim against these criteria.`,
    followUps: [
      "When would you choose to build a chatbot vs. an agent for the same use case?",
      "What are the risks of giving an AI agent too much autonomy?",
      "How do you scope the 'autonomy level' of an agent for a specific enterprise use case?",
    ],
    tags: ["agents", "chatbot", "assistant", "autonomy", "architecture basics"],
  },

  {
    id: "gi-008",
    category: "Execution & Metrics",
    industries: ["Tech & SaaS", "FinTech & Banking", "Healthcare & MedTech", "E-commerce & Retail", "Media & Entertainment", "Enterprise & B2B"],
    difficulty: "Mid-Level",
    question: "How would you set up an evaluation framework for an LLM feature before it launches?",
    framework: "Apply the 4-Layer Eval Framework: Unit tests → Integration tests → Human eval → Adversarial testing.",
    answer: `Evaluation is the most underinvested area in AI PM work — and the one that causes the most production failures. The goal is to catch failure modes before users do.

**Layer 1: Automated unit tests (run on every code change)**
- Create a "Golden Dataset" of 100-500 input-output pairs where you know the correct answer
- For each input, run the model and compare output to expected answer
- Types: factual accuracy tests, format compliance tests, safety tests (jailbreak prompts), edge case tests
- Use LLM-as-judge for subjective outputs (quality, relevance, tone)
- Pass rate target: >95% on golden dataset before any deployment

**Layer 2: Integration tests (run before each major update)**
- End-to-end tests that simulate real user flows
- Include multi-turn conversation tests (not just single-turn)
- Test with production-like data (realistic queries from real users, not just ideal examples)
- Include negative tests: what happens with empty input, very long input, adversarial input?

**Layer 3: Human evaluation (run monthly or on major model changes)**
- Blind evaluation: evaluators compare two outputs without knowing which model/version produced them
- Rate on: accuracy, relevance, tone, helpfulness, safety (on a 1-5 scale)
- Use diverse evaluators to catch cultural and linguistic biases
- Aim for inter-rater reliability (Cohen's kappa >0.7)
- Track trends over time — is model quality stable or drifting?

**Layer 4: Adversarial testing (run before major launches)**
- Red-teaming: dedicated team tries to make the model produce harmful, biased, or incorrect outputs
- Jailbreak attempts: try to bypass safety guidelines
- Prompt injection: test for vulnerability to injected instructions in user inputs
- Category-specific: finance → test for unlicensed financial advice; healthcare → test for dangerous medical recommendations

**Launch readiness criteria:**
- Golden dataset pass rate: >95%
- Human eval average: >4.0/5.0
- No P0 safety failures in red-teaming
- Latency p95: within SLA
- Cost per query: within budget

**The post-launch eval loop:**
Evals don't stop at launch. Establish:
- Weekly: automated golden dataset tests (detect regressions from model updates)
- Monthly: sample-based human review (50-100 random outputs from production)
- Quarterly: full red-teaming cycle`,
    followUps: [
      "What's your process when eval scores drop after a model provider (e.g., OpenAI) updates their model?",
      "How do you evaluate a model for a task where there's no clear right answer?",
      "How do you prioritize which failure modes to test for when time is limited?",
    ],
    tags: ["evals", "testing", "golden dataset", "red-teaming", "launch readiness"],
  },
];

export const INDUSTRIES: Industry[] = [
  "Tech & SaaS",
  "FinTech & Banking",
  "Healthcare & MedTech",
  "E-commerce & Retail",
  "Media & Entertainment",
  "Enterprise & B2B",
];

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  "Product Sense",
  "AI Technical",
  "Execution & Metrics",
  "Strategy",
  "Leadership",
  "Ethics & Responsible AI",
];

export const DIFFICULTIES: Difficulty[] = [
  "Junior",
  "Mid-Level",
  "Senior",
  "Staff/Principal",
];

export const INDUSTRY_INFO: Record<Industry, { emoji: string; description: string; color: string }> = {
  "Tech & SaaS": {
    emoji: "💻",
    description: "Software companies, developer tools, productivity apps, and cloud platforms",
    color: "blue",
  },
  "FinTech & Banking": {
    emoji: "🏦",
    description: "Digital payments, lending, insurance, wealth management, and banking",
    color: "emerald",
  },
  "Healthcare & MedTech": {
    emoji: "🏥",
    description: "Clinical AI, digital health, medical devices, and biotech platforms",
    color: "rose",
  },
  "E-commerce & Retail": {
    emoji: "🛒",
    description: "Online marketplaces, D2C brands, retail tech, and supply chain",
    color: "amber",
  },
  "Media & Entertainment": {
    emoji: "🎬",
    description: "Streaming, social platforms, gaming, content creation, and publishing",
    color: "violet",
  },
  "Enterprise & B2B": {
    emoji: "🏢",
    description: "Enterprise software, SaaS platforms, professional services, and B2B tools",
    color: "cyan",
  },
};
