// //......................sendgrid........................
// const MailSent = "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"
// const Mail = require("@sendgrid/mail");
// Mail.setApiKey(MailSent);

const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();//libary in node js framework

const config = {
    channelAccessToken: 'EuztLcgzicM+DSpHCAivG7sxAvE/ZbViZmu/Fpxzua6YKcyMtDamhO/ImNx8rh7FzQ6yj5+ZNtornHl/YKtSO43tn/PiXhHveJTTyheu35xlqbqraCGtaPxCkeio2Y5GP0IU98KMinJeYYP/i3Y7iwdB04t89/1O/w1cDnyilFU=',//เวลาส่งมันจะส่งโทเค่นนี้ไปด้วย แล้วเอาไปเทียบ
    channelSecret: "974568fe6154f8eaeb19985e0847506c"//คีย์ดูว่ามันตรงกันไหมถึงจะตอบข้อความกลับไป เกิดขึ้นมากับตอนสร้าง
};

const client = new line.Client(config);//สร้างออบเจค โดย รับคีย์configเข้ามา
//post ข้อความอยู่หลังอ่านไม่ออก อยู่ในกล่องไม่มีใครเห็น
//get ข้อความแบบเห็นได้หมด
// middleware ด่านตรวจคนเข้าเมือง เอาโทเค่นที่เข้ามาไปเช็คว่าที่เข้ามามันตรงกันไหม คนที่ส่งข้อมูลมาต้องมาจากไลน์ที่เราสร้างเท่านั้น
app.post('/webhook', line.middleware(config), (req, res) => {//webhook ส่งแอคเซทโทเค่นมา
    Promise
        .all(req.body.events.map(handleEvent))//bodyคือข้อความ  eventของเราเป็นarrayอยู่ mapเป็นรูปย่อของlib เอาอาเรช่องแรกไปใช้
        .then((result) => res.json(result));
});
//ใช้postเพราะ ผู้ส่งไลน์ไม่ต้องการให้ใครเห็น
//ใช้เป็นตัวเช็ค
app.get('/pond', function (req,res){
    console.log('pond');
    res.send('pond1');
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {//ถ้าเป็นรูปหรือติ้กเกอร์ให้ออกข้างนอก
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}
//ถ้าส่งข้อความอื่นมาให้ตอบไปว่า สวัสดีครัช
function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    var eventText = event.message.text.toLowerCase();
    
//พิมพ์jonathanมาให้้ส่งเป็นรูปกลับไป
    if (eventText === 'jonathan') {
        image = "https://cdn-az.allevents.in/banners/f61431b914da8334156a58b5568061b4"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image
        }

        // const mailMessage = {
        //     to: "siriya013@gmail.com",
        //     from: "po_nd02@hotmail.com",
        //     subject: "ลาป่วย",
        //     text: "ดิฉัน สิริญา(ผิงผิง) ขอลาป่วยเพราะเป็นไข้หวัด เป็นเวลา 2 วัน",
        //     html: `ดิฉัน สิริญา(ผิงผิง)<p>ขอลาป่วยเพราะเป็นไข้หวัด</p> \
        //     เป็นเวลา <font style='color:red;'>2 วัน</font> \
        //     <br><img src= ${image} style='width:500px;height:300px;'> \
        //     <br><a href=${image}>See picture</a> \
        //     <br><table style='width:25%' border='1px'> \
        //         <tr> \
        //             <th>ผู้รับรอง</th> \
        //             <th>หมายเหตุ</th> \
        //         </tr> \
        //         <tr> \
        //             <td>แม่</td> \
        //             <td>รับรอง</td> \
        //         </tr> \
        //         <tr> \
        //             <td>คุณหมอ</td> \
        //             <td>รับรอง</td> \
        //         </tr> \
        //     </table>`
        // };
        // Mail.send(mailMessage);
    

//พิมqrมาให้ส่งเป็นรูปกลับไป
    }else if (eventText === 'qr') {

        image = "https://uppic.cc/d/5UEF"
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image
        }

        // const mailMessage = {
        //     to: "siriya013@gmail.com",
        //     from: "po_nd02@hotmail.com",
        //     subject: "ลาป่วย",
        //     text: "ดิฉัน สิริญา(ผิงผิง) ขอลาป่วยเพราะเป็นไข้หวัด เป็นเวลา 2 วัน",
        //     html: `ดิฉัน สิริญา(ผิงผิง)<p>ขอลาป่วยเพราะเป็นไข้หวัด</p> \
        //     เป็นเวลา <font style='color:red;'>2 วัน</font> \
        //     <br><img src= ${image} style='width:500px;height:300px;'> \
        //     <br><a href=${image}>See picture</a> \
        //     <br><table style='width:25%' border='1px'> \
        //         <tr> \
        //             <th>ผู้รับรอง</th> \
        //             <th>หมายเหตุ</th> \
        //         </tr> \
        //         <tr> \
        //             <td>แม่</td> \
        //             <td>รับรอง</td> \
        //         </tr> \
        //         <tr> \
        //             <td>คุณหมอ</td> \
        //             <td>รับรอง</td> \
        //         </tr> \
        //     </table>`
        // };
        // Mail.send(mailMessage);
    }else if (eventText === 'pond') {

        image = 'https://jediyuth.files.wordpress.com/2017/01/jojo-header.png'
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image
        }

        // const mailMessage = {
        //     to: "siriya013@gmail.com",
        //     from: "po_nd02@hotmail.com",
        //     subject: "ลาป่วย",
        //     text: "ดิฉัน สิริญา(ผิงผิง) ขอลาป่วยเพราะเป็นไข้หวัด เป็นเวลา 2 วัน",
        //     html: `ดิฉัน สิริญา(ผิงผิง)<p>ขอลาป่วยเพราะเป็นไข้หวัด</p> \
        //     เป็นเวลา <font style='color:red;'>2 วัน</font> \
        //     <br><img src= ${image} style='width:500px;height:300px;'> \
        //     <br><a href=${image}>See picture</a> \
        //     <br><table style='width:25%' border='1px'> \
        //         <tr> \
        //             <th>ผู้รับรอง</th> \
        //             <th>หมายเหตุ</th> \
        //         </tr> \
        //         <tr> \
        //             <td>แม่</td> \
        //             <td>รับรอง</td> \
        //         </tr> \
        //         <tr> \
        //             <td>คุณหมอ</td> \
        //             <td>รับรอง</td> \
        //         </tr> \
        //     </table>`
        // };
        // Mail.send(mailMessage);
    }else if (eventText === 'ping') {
        image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxxvClecR1ffyWulqcJtcfTih1aY5eRTNtDXzQHGPjtHZr_jIK&s'
        msg = {
            'type': 'image',
            'originalContentUrl': image,
            'previewImageUrl': image
        }

        // const mailMessage = {
        //     to: "siriya013@gmail.com",
        //     from: "po_nd02@hotmail.com",
        //     subject: "ลาป่วย",
        //     text: "ดิฉัน สิริญา(ผิงผิง) ขอลาป่วยเพราะเป็นไข้หวัด เป็นเวลา 2 วัน",
        //     html: `ดิฉัน สิริญา(ผิงผิง)<p>ขอลาป่วยเพราะเป็นไข้หวัด</p> \
        //     เป็นเวลา <font style='color:red;'>2 วัน</font> \
        //     <br><img src= ${image} style='width:500px;height:300px;'> \
        //     <br><a href=${image}>See picture</a> \
        //     <br><table style='width:25%' border='1px'> \
        //         <tr> \
        //             <th>ผู้รับรอง</th> \
        //             <th>หมายเหตุ</th> \
        //         </tr> \
        //         <tr> \
        //             <td>แม่</td> \
        //             <td>รับรอง</td> \
        //         </tr> \
        //         <tr> \
        //             <td>คุณหมอ</td> \
        //             <td>รับรอง</td> \
        //         </tr> \
        //     </table>`
        // };
        // Mail.send(mailMessage);
//ส่งที่อยู่ทีซ็ตไว้
    }else if (eventText === 'location') {
    msg = {
            "type": "location",
            "title": "my location",
            "address": "Sam Phran, Nakhon Pathom 73110, Thailand",
            "latitude": 13.702733,
            "longitude": 100.198928
        }
//สร้างtemplate button
    } else if (eventText === 'template button') {
        msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Menu",
                "text": "Please select",
                "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                }, {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                }, {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }]
            }
        }
//พิมhelloมาจะมีช่องขึ้นให้เลือก 
    } else if (eventText === 'hello') {
        msg = {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "Say Hello",
                "actions": [{
                    "type": "message",
                    "label": "สวัสดีครับ",
                    "text": "สวัสดีครับ"
                }, {
                    "type": "message",
                    "label": "สวัสดีค่ะ",
                    "text": "สวัสดีค่ะ"
                }]
            }
        }
//ทำสไลด์
    } else if (eventText === 'slide') {
        msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://obs.line-scdn.net/0hMTvHoUsjEntLMTj4h5VtLHFnERR4XQF4LwdDeBdfTE80VVB_dwBfFWhkTUk2AFUlJQBeGmo1CUo2AlR5fgNf/w644",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "test1",
                                "data": "action=buy&itemid=111"
                            },
                            {
                                "type": "postback",
                                "label": "test2",
                                "data": "action=add&itemid=111"
                            },
                            {
                                "type": "uri",
                                "label": "test3",
                                "uri": "http://example.com/page/111"
                            }
                        ]
                    },
                    {
                        "thumbnailImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLA2gqpVUZA85YI6TQ9XemSBIB3gE32aoTy2j5HgP8mIt4BvmTsQ&s",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "test4",
                                "data": "action=buy&itemid=222"
                            },
                            {
                                "type": "postback",
                                "label": "test5",
                                "data": "action=add&itemid=222"
                            },
                            {
                                "type": "uri",
                                "label": "test6",
                                "uri": "http://example.com/page/222"
                            }
                        ]
                    }
                ]
            }
        }
    }

    return client.replyMessage(event.replyToken, msg);//client คือบอทที่จะตอบกลับไปข้อความตามข้างบน
}
//เลือกportไม่เกิน2ล้าน
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});