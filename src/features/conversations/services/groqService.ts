import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const getGroqCompletion = async (messages: any[]) => {
    return groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
    });
};
