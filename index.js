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

function handleEvent(event){

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {//เช็คข้อความtext
        handleMessageText(event);
        
    } else if (event.type === 'message' && event.message.type === 'image'){//เช็ครูป
        handleMessageImage(event)
    }else {
        return Promise.resolve(null);//ถ้าไม่ใช่ทั้งคู่ให้null
    }
}

function handleMessageImage(event) {//ถ้าส่งเป็นรูป จะขึ้นquick location
    console.log("handleMessageImage")
        var msg =[
            {
             "type": "text",
             "text": "Location Quick Reply!",
             "quickReply": {
              "items": [
               {
                "type": "action",
                "action": {
                 "type":"location",
                 "label":"Location"
                }
               }
              ]
             }
            }
           ]
    
    return client.replyMessage(event.replyToken, msg)
}
//ถ้าส่งข้อความอื่นมาให้ตอบไปว่า สวัสดีครัช
function handleMessageText(event) {
    var msg = {
        type: 'text',
        text: 'please choose -> qr for coupon,samphran location,template button,slide,quickreply,website,gal,pb,day,capture,location,hello,buy,sookjai,melon,coupon'
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
    }else if (eventText === 'qr for coupon') {//qrcoupon

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
    }else if (eventText === 'samphran location') {//ที่อยู่สามพราน
    msg = {
            "type": "location",
            "title": "my location",
            "address": "Sam Phran, Nakhon Pathom 73110, Thailand",
            "latitude": 13.702733,
            "longitude": 100.198928
        }
//สร้างtemplate button
    } else if (eventText === 'template button') {//template
        msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://images.ctfassets.net/cnu0m8re1exe/1W7vPV9bGZLMd1KQlLqhVU/d25e44ecf793111881f1907ea4804d9d/FruitColors.jpg?w=650&h=433&fit=fill",
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
    } else if (eventText === 'hello') {//hi
        msg = {
            "type": "text",
            "altText": "Hello Quick reply",
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
    } else if (eventText === 'slide') {//slide
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
                                "label": "Vegetable1",
                                "data": "action=buy&itemid=111"
                            },
                            {
                                "type": "postback",
                                "label": "Vegetable2",
                                "data": "action=add&itemid=111"
                            },
                            {
                                "type": "uri",
                                "label": "Vegetable3",
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
                                "label": "Vegetable4",
                                "data": "action=buy&itemid=222"
                            },
                            {
                                "type": "postback",
                                "label": "Vegetable5",
                                "data": "action=add&itemid=222"
                            },
                            {
                                "type": "uri",
                                "label": "Vegetable6",
                                "uri": "http://example.com/page/222"
                            }
                        ]
                    }
                ]
            }
        }
    } else if (eventText === 'quickreply'){//quickreply
        msg = {
        "type": "text",
        "text": "Quick Reply!",
        "quickReply": {
          "items": [
            {
              "type": "action",
              "action": {
                "type": "cameraRoll",
                "label": "Camera Roll"
              }
            },
            {
              "type": "action",
              "action": {
                "type": "camera",
                "label": "Camera"
              }
            },
            {
              "type": "action",
              "action": {
                "type": "location",
                "label": "Location"
              }
            },
            {
              "type": "action",
              "imageUrl": "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png",
              "action": {
                "type": "message",
                "label": "Message",
                "text": "Hello World!"
              }
              },
            {
              "type": "action",
              "action": {
                "type": "postback",
                "label": "Postback",
                "data": "action=buy&itemid=123",
                "displayText": "Buy"
              }
              },
            {
              "type": "action",
              "imageUrl": "https://icla.org/wp-content/uploads/2018/02/blue-calendar-icon.png",
              "action": {
                "type": "datetimepicker",
                "label": "Datetime Picker",
                "data": "storeId=12345",
                "mode": "datetime",
                "initial": "2019-12-01T00:00",
                "max": "2029-12-31T23:59",
                "min": "2001-01-01T00:00"
              }
            }
          ]
        }
      }
    } else if (eventText === 'website'){//flex
        msg = [{
            "type": "flex",
            "altText": "This is a Flex Message",
            "contents": {
             "type": "bubble",
             "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
               {
                "type": "button",
                "style": "primary",
                "height": "sm",
                "action": {
                 "type": "uri",
                 "label": "Web site",
                 "uri": "http://thaiorganicplatform.com/#/home"
                }
               }
              ]
             }
            }
           }]
    } else if (eventText === 'gal'){//gallary
        msg = [
            {
             "type": "text",
             "text": "Gal Quick Reply!",
             "quickReply": {
              "items": [
               {
                "type": "action",
                "action": {
                 "type":"cameraRoll",
                 "label":"Gallery"
                }
               }
              ]
             }
            }
           ]
    } else if (eventText === 'pb'){//postback
        msg = [
            {
             "type": "text",
             "text": "post back Quick Reply!",
             "quickReply": {
              "items": [
               {
                "type": "action",
                "action": {
                 "type": "postback",
                 "label": "Postback",
                 "data": "action=buy&itemid=123"
                }
               }
              ]
             }
            }
            ]
    } else if (eventText === 'day'){//date
        msg = [
            {
             "type": "text",
             "text": "date Quick Reply!",
             "quickReply": {
              "items": [
               {
                "type": "action",
                "action": {
                 "type": "datetimepicker",
                 "label": "Datetime Picker",
                 "data": "storeId=12345",
                 "mode": "datetime",
                 "initial": "2019-12-01T00:00",
                 "max": "2029-12-31T23:59",
                 "min": "2001-01-01T00:00"
                }
               }
              ]
             }
            }
           ]
    } else if (eventText === 'capture'){//camera
        msg = [
            {
             "type": "text",
             "text": "CMR Quick Reply!",
             "quickReply": {
              "items": [
               {
                "type": "action",
                "action": {
                 "type":"camera",
                 "label":"Camera"
                }
               }
              ]
             }
            }
           ]
    } else if (eventText === 'location'){//location
        msg =[
            {
             "type": "text",
             "text": "Location Quick Reply!",
             "quickReply": {
              "items": [
               {
                "type": "action",
                "action": {
                 "type":"location",
                 "label":"Location"
                }
               }
              ]
             }
            }
           ]
    } else if (eventText === 'buy') {//flex avocado
        msg = {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
              "type": "carousel",
              "contents": [
                {
                  "type": "bubble",
                  "hero": {
                    "type": "image",
                    "url": "https://admin-api.thaiorganicplatform.com/public/upload/product/product-5dc05fdfebcbf3.64054314.png",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover"
                  },
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "Avocado",
                        "size": "xl",
                        "weight": "bold",
                        "wrap": true
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "text",
                            "text": "$9",
                            "flex": 0,
                            "size": "xl",
                            "weight": "bold",
                            "wrap": true
                          },
                          {
                            "type": "text",
                            "text": ".99",
                            "flex": 0,
                            "size": "sm",
                            "weight": "bold",
                            "wrap": true
                          }
                        ]
                      }
                    ]
                  },
                  "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "Add to Cart",
                          "uri": "https://linecorp.com"
                        },
                        "style": "primary"
                      },
                      {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "Add to whishlist",
                          "uri": "https://linecorp.com"
                        }
                      }
                    ]
                  }
                },
                {
                  "type": "bubble",
                  "hero": {
                    "type": "image",
                    "url": "https://admin-api.thaiorganicplatform.com/public/upload/product/product-5dc05fdff0f093.27849305.png",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover"
                  },
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "Bad avocado",
                        "size": "xl",
                        "weight": "bold",
                        "wrap": true
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "flex": 1,
                        "contents": [
                          {
                            "type": "text",
                            "text": "$5",
                            "flex": 0,
                            "size": "xl",
                            "weight": "bold",
                            "wrap": true
                          },
                          {
                            "type": "text",
                            "text": ".99",
                            "flex": 0,
                            "size": "sm",
                            "weight": "bold",
                            "wrap": true
                          }
                        ]
                      },
                      {
                        "type": "text",
                        "text": "Temporarily out of stock",
                        "flex": 0,
                        "margin": "md",
                        "size": "xxs",
                        "color": "#FF5551",
                        "wrap": true
                      }
                    ]
                  },
                  "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "Add to Cart",
                          "uri": "https://linecorp.com"
                        },
                        "flex": 2,
                        "color": "#AAAAAA",
                        "style": "primary"
                      },
                      {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "Add to wish list",
                          "uri": "https://linecorp.com"
                        }
                      }
                    ]
                  }
                },
                {
                  "type": "bubble",
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "See more",
                          "uri": "https://linecorp.com"
                        },
                        "flex": 1,
                        "gravity": "center"
                      }
                    ]
                  }
                }
              ]
            }
          }
        }else if (eventText === 'sookjai'){
            msg = {
                "type": "flex",
                "altText": "Flex Message",
                "contents": {
                  "type": "bubble",
                  "hero": {
                    "type": "image",
                    "url": "https://img.ryt9.com/img/files/20191112/iqf4b31bb9578d434d0baf97e9fc552bbb-0.jpg",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                      "type": "uri",
                      "label": "Line",
                      "uri": "https://linecorp.com/"
                    }
                  },
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "fram sookjai",
                        "size": "xl",
                        "weight": "bold"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "margin": "md",
                        "contents": [
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "text",
                            "text": "4.0",
                            "flex": 0,
                            "margin": "md",
                            "size": "sm",
                            "color": "#999999"
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "margin": "lg",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "Place",
                                "flex": 1,
                                "size": "sm",
                                "color": "#AAAAAA"
                              },
                              {
                                "type": "text",
                                "text": "samphran, Thailand",
                                "flex": 5,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                              }
                            ]
                          },
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "Time",
                                "flex": 1,
                                "size": "sm",
                                "color": "#AAAAAA"
                              },
                              {
                                "type": "text",
                                "text": "9:00 - 19:00",
                                "flex": 5,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "flex": 0,
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "CALL",
                          "uri": "https://linecorp.com"
                        },
                        "height": "sm",
                        "style": "link"
                      },
                      {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "WEBSITE",
                          "uri": "https://linecorp.com"
                        },
                        "height": "sm",
                        "style": "link"
                      },
                      {
                        "type": "spacer",
                        "size": "sm"
                      }
                    ]
                  }
                }
              }
        }else if (eventText === 'melon'){
            msg = {
                "type": "flex",
                "altText": "Flex Message",
                "contents": {
                  "type": "bubble",
                  "hero": {
                    "type": "image",
                    "url": "https://www.bltbangkok.com/public/core/uploaded/article/thumb/874378feadce02992df6cee5d8ccdf1c.jpg",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                      "type": "uri",
                      "label": "Action",
                      "uri": "https://linecorp.com"
                    }
                  },
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "md",
                    "action": {
                      "type": "uri",
                      "label": "Action",
                      "uri": "https://linecorp.com"
                    },
                    "contents": [
                      {
                        "type": "text",
                        "text": "Melon",
                        "size": "xl",
                        "weight": "bold"
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "baseline",
                            "contents": [
                              {
                                "type": "icon",
                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_regular_32.png"
                              },
                              {
                                "type": "text",
                                "text": "$6.5",
                                "flex": 0,
                                "margin": "sm",
                                "weight": "bold"
                              },
                              {
                                "type": "text",
                                "text": "10kcl",
                                "size": "sm",
                                "align": "end",
                                "color": "#AAAAAA"
                              }
                            ]
                          },
                          {
                            "type": "box",
                            "layout": "baseline",
                            "contents": [
                              {
                                "type": "icon",
                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_large_32.png"
                              },
                              {
                                "type": "text",
                                "text": "$8.9",
                                "flex": 0,
                                "margin": "sm",
                                "weight": "bold"
                              },
                              {
                                "type": "text",
                                "text": "5kcl",
                                "size": "sm",
                                "align": "end",
                                "color": "#AAAAAA"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "text",
                        "text": "Sauce, Melon",
                        "size": "xxs",
                        "color": "#AAAAAA",
                        "wrap": true
                      }
                    ]
                  },
                  "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "spacer",
                        "size": "xxl"
                      },
                      {
                        "type": "button",
                        "action": {
                          "type": "uri",
                          "label": "Add to Cart",
                          "uri": "https://linecorp.com"
                        },
                        "color": "#905C44",
                        "style": "primary"
                      }
                    ]
                  }
                }
              }
        }else if (eventText === 'coupon'){
            msg = {
                "type": "flex",
                "altText": "Flex Message",
                "contents": {
                  "type": "bubble",
                  "hero": {
                    "type": "image",
                    "url": "https://png.pngtree.com/png-clipart/20190611/original/pngtree-scan-qr-code-png-image_2048910.jpg",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                      "type": "uri",
                      "label": "Action",
                      "uri": "https://linecorp.com/"
                    }
                  },
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "md",
                    "contents": [
                      {
                        "type": "text",
                        "text": "THAI ORGANIC PLATFORM",
                        "size": "xl",
                        "gravity": "center",
                        "weight": "bold",
                        "wrap": true
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "margin": "md",
                        "contents": [
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                            "size": "sm"
                          },
                          {
                            "type": "text",
                            "text": "4.0",
                            "flex": 0,
                            "margin": "md",
                            "size": "sm",
                            "color": "#999999"
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "margin": "lg",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "Date",
                                "flex": 1,
                                "size": "sm",
                                "color": "#AAAAAA"
                              },
                              {
                                "type": "text",
                                "text": "Monday 25, 9:00PM",
                                "flex": 4,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                              }
                            ]
                          },
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "Place",
                                "flex": 1,
                                "size": "sm",
                                "color": "#AAAAAA"
                              },
                              {
                                "type": "text",
                                "text": "7 Floor, No.3",
                                "flex": 4,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                              }
                            ]
                          },
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "Seats",
                                "flex": 1,
                                "size": "sm",
                                "color": "#AAAAAA"
                              },
                              {
                                "type": "text",
                                "text": "C Row, 18 Seat",
                                "flex": 4,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                              }
                            ]
                          },
                          {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "xxl",
                            "contents": [
                              {
                                "type": "spacer"
                              },
                              {
                                "type": "image",
                                "url": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.15752-9/80191121_2624391554320068_7598581880098652160_n.png?_nc_cat=106&_nc_oc=AQkqVEvglT9pkrdFLbPiHW-pbH_cOCvzy3geQniNus6a4u2iZ5VkQff3wYYWL9SmvqU&_nc_ht=scontent.fbkk2-7.fna&oh=690865022d2e4dee099ddf3956f3d181&oe=5E6CFABC",
                                "size": "xl",
                                "aspectMode": "cover"
                              },
                              {
                                "type": "text",
                                "text": "You can enter the theater by using this code instead of a ticket",
                                "margin": "xxl",
                                "size": "xs",
                                "color": "#AAAAAA",
                                "wrap": true
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
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