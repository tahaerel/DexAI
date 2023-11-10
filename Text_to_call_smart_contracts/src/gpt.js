import axios from 'axios'; // Axios'ı projenize dahil etmelisiniz.
import OpenAI from "openai";

const openai = new OpenAI();
function App() {
  const apiKey = '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';
  const endpoint = 'https://api.openai.com/v1/engines/gpt-3/completions'; // API'nin endpoint adresi
  console.log("appp ");
 
    console.log("use effect");
    const sendChatRequest = async () => {
      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: "You are a helpful assistant." }],
          model: "gpt-3.5-turbo",
        });
      
        console.log(completion.choices[0]);
      } catch (error) {
        console.error('Hata:', error);
      }
    };
  return (
    <div className="App">
      {/* Uygulama içeriği */}
    </div>
  );
}

export default App;
