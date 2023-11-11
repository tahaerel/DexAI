const OpenAI = require("openai") ;
const openai = new OpenAI({ apiKey: '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',dangerouslyAllowBrowser: true })

export async function gptfunction(data)  {

    const completion = await openai.chat.completions.create({
        messages: [
        
        { role: "system", content: "Blockchain contratları için chatbot yapıyorum.Sana verilen metinde şehir ismi geçiyorsa o şehir ismini çıktı olarak ver. Çıktı sadece şehir ismi olsun. Örneğin 'izmir', 'ankara', 'muğla'. Birden fazla şehir varsa metindeki ilk şehiri çıktı olarak ver. Çıktıların 1 kelime olmak zorunda. O da şehir adı. Tüm diller için çalış. " },
        
        { role: "user", content: data.toString()}],

        model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0].message.content);

      const text = completion.choices[0].message.content;
      console.log(text);

    
        return text;
    

    }
