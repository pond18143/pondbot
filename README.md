#สร้างChatbotline
ต้นแบบ (https://medium.com/@gie3d/ทดลองใช้-line-bot-sdk-บน-node-js-9f765945fa9e) 

ลง git clone (https://github.com/gie3d/nonglinebot.git)(พิมพ์ git clone url ในterminal) 

สร้างwebhook เลือกวิธีนึง

1.ลงngrok (https://medium.com/linedevth/linebot-ngrok-b319841a49d7) 
          ย้่ายngrokไปโฟลเดอร์เดียวกับdoccument cd Document/ไปที่ที่เก็บไฟล์  ละพิมพ์ path/to/ngrok http 5000 ในterminal
          (ngrok คือตัวที่ทำให้เครื่องอื่นสามารถเชื่อมเข้ามาสู้notebookเราซึ่งเป็นlocalhostได้)     
           เปิด terminalพิมพ์ ./ngrok http 5000 
		   
2.heroku เข้าเว็ป https://id.heroku.com/login
                สร้างappขึ้นมา ละเชื่อมกับgithubเรา
                Enable Automatic Deploys
                Deploy Branch
                create pipelin ข้างบนขึ้นมา

เข้า line develop สร้าง provider ขึ้นมา
ขั้นตอนการเซตข้อมูลในเว็ป
เข้าline developer >Messaging API >startnow >create newprovider>สร้างchanel>Use webhook:เลือกenabled>Webhook url ระบุเป็น https.ในterminal ngrok (ตามด้วย)/webhook >verifly >webhook url ใน webhook url เอาhttpในngrokมาใส่แล้วเติม 
เปลี่ยน    channelAccessToken: (process.env.channelAccessToken)เอาChannel access token (long-lived) ในline developมาใส่,     channelSecret: (process.env.channelSecret) เอาChannel secret ในline devekopมาใส่



เปลี่ยนออโต้ข้อความกลับมา เข้า line business >Greeting Message

สร้าง menu barด้านล่าง Rich Menu Maker สร้างรูปmenubarขึ้นมา(https://lineforbusiness.com/richmenumaker/?source=post_page-----6cf12b394f38----------------------)
 แล้วเข้าไปใน https://manager.line.biz/ รายการด้านซ้าย Rich menu
