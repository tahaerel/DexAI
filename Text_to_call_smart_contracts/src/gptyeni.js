//Merhaba güzellik, canım çok sıkıldı. Bu yüzden 0x3334234 adresine bnb ağından 5 usdt göndermek isterim. bana yardım etsene.

const OpenAI = require("openai") ;
const openai = new OpenAI({ apiKey: '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',dangerouslyAllowBrowser: true })

export async function gptfunction(data) {

    const completion = await openai.chat.completions.create({
        messages: [
        
        { role: "system", content: "Blockchain contratları için chatbot yapıyorum. Sana verdiğim textlerdeki hedef adres, miktar, ağ ve para birimini çıkart. Değerleri şu şekilde yanyana yaz. Sadece cevabı ver. Eğer kullanıcı sayılar arasında virgül koymuşsa o virgülü noktaya çevir. Eğer ilgili veriyi bulamadıysan null yaz. Noktalama işaretleri kullanmadan, yanyana tam şu formatta yaz: Hedef adres: value1 para birimi: value2 ağ: value3 miktar: value4" },
        
        { role: "user", content: data.toString() }],

        model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0].message.content);

      const text = completion.choices[0].message.content;

      const addressMatch = text.match(/Hedef adres: (.*?) para birimi: (.*?) ağ: (.*?) miktar: ([\d.]+)/);

      if (addressMatch) {
        const address = addressMatch[1].trim();
        const parabirim = addressMatch[2].trim();
        const network = addressMatch[3].trim();
        const value = addressMatch[4];
        
        console.log("adres:", address);
        console.log("parabirim:", parabirim);
        console.log("asdnetwork:", network);
        console.log("value:", value);
        return[address, parabirim, network, value];
      } else {
        console.log("Veriler ayrıştırılamadı.");
        return "NULL"
      }
 
    }
