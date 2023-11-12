const OpenAI = require("openai") ;
const openai = new OpenAI({ apiKey: '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',dangerouslyAllowBrowser: true })

export async function gptfunction(data)  {

    const completion = await openai.chat.completions.create({
        messages: [
        
        { role: "system", content: "I am making a chatbot for blockchain contracts. If the city name is mentioned in the text given to you, give that city name as output. Let the output be only the city name. For example 'izmir', 'ankara', 'muğla'. If there is more than one city, output the first city in the text. Your outputs must be 1 word. That is the city name. Work for all languages." },
        
        { role: "user", content: data.toString()}],

        model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0].message.content);

      const text = completion.choices[0].message.content;
      console.log(text);

    
        return text;
    

    }
