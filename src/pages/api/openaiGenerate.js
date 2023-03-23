/* eslint-disable import/no-anonymous-default-export */
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_SECRET_KEY });
const openai = new OpenAIApi(config);

export default async function (req, res) {
  console.log("req.body", req.body.answer);
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.answer),
    temperature: 0.2,
  });

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(answer) {
  const { typeInput, optionalScope, description, body } = answer;

  return `  
  Please provide a commit name using the Conventional Commit style that includes information about a ${typeInput}, such as the ${description}, along with an ID number or an optional scope ${optionalScope}. Please do not provide any explanations or introductions in your answer.`;
}
