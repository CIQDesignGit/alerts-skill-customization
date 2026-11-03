export type NoticedInsight = {
  id: string;
  context: string;
  question: string;
  tone: "danger" | "warning";
};

export type QuestionColumn = {
  id: string;
  title: string;
  questions: string[];
};

export type ConversationPreview = {
  id: string;
  preview: string;
  timestamp: string;
};

export const ASK_ALLY_GREETING = "Hi Michelle, what would you like to work on today?";

export const NOTICED_THIS_WEEK: NoticedInsight[] = [
  {
    id: "gift-sets",
    context: "Gift sets -7.0% vs plan",
    question: "Which categories are behind plan this week?",
    tone: "danger",
  },
  {
    id: "buy-box",
    context: "Buy box loss up on 12 SKUs",
    question: "Which SKUs lost buy box in the last 7 days?",
    tone: "warning",
  },
  {
    id: "promo",
    context: "Promo display issues on 67 SKUs",
    question: "Where are we missing promo badges this week?",
    tone: "warning",
  },
];

export const QUESTION_COLUMNS: QuestionColumn[] = [
  {
    id: "store-walk",
    title: "Store walk",
    questions: [
      "Which 3P sellers have taken the buy box most often in the last 4 weeks?",
      "Which hero SKUs have the largest content score gaps vs competitors?",
      "Where are we losing search rank on top jar candle ASINs?",
    ],
  },
  {
    id: "gap-to-plan",
    title: "Gap to plan analysis",
    questions: [
      "How are jar candles doing against plan this week?",
      "Which brands are driving the portfolio gap vs plan?",
      "What is the OPS impact of OOS on top 10 SKUs?",
    ],
  },
  {
    id: "period-over-period",
    title: "Period-over-period analysis",
    questions: [
      "How is the overall portfolio doing this week vs last week?",
      "Which categories improved OPS vs the prior week?",
      "Where did conversion rate drop week over week?",
    ],
  },
];

export const RECENT_CONVERSATIONS: ConversationPreview[] = [
  {
    id: "c1",
    preview: "Which categories are behind plan this week?",
    timestamp: "Oct 8, 1:24 PM",
  },
  {
    id: "c2",
    preview: "How are jar candles doing against plan this week?",
    timestamp: "Oct 7, 4:10 PM",
  },
];
