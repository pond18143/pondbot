// 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
const MailSent = "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";
const Mail = require("@sendgrid/mail");
// Mail.setApiKey(process.env.SENDGRID_API_KEY);
Mail.setApiKey(MailSent);
const message = {
    to: "siriya013@gmail.com",
    from: "po_nd02@hotmail.com",
    subject: "ลาป่วย",
    text: "ดิฉัน สิริญา(ผิงผิง) ขอลาป่วยเพราะเป็นไข้หวัด เป็นเวลา 2 วัน",
    html: "ดิฉัน สิริญา(ผิงผิง)<p>ขอลาป่วยเพราะเป็นไข้หวัด</p> \
    เป็นเวลา <font style='color:red;'>2 วัน</font> \
    <br><img src='https://2.bp.blogspot.com/-dvNEAPN_IDM/XDDzOeFzI8I/AAAAAAAAAJ0/btT51TZoEKkJpwHVm9uGUHmIxj8jR70oACLcBGAs/s1600/Steamworkshop_webupload_previewfile_332969030_preview.png' style='width:500px;height:300px;'> \
    <br><a href='https://2.bp.blogspot.com/-dvNEAPN_IDM/XDDzOeFzI8I/AAAAAAAAAJ0/btT51TZoEKkJpwHVm9uGUHmIxj8jR70oACLcBGAs/s1600/Steamworkshop_webupload_previewfile_332969030_preview.png'>See picture</a> \
    <br><table style='width:25%' border='1px'> \
        <tr> \
            <th>ผู้รับรอง</th> \
            <th>หมายเหตุ</th> \
        </tr> \
        <tr> \
            <td>แม่</td> \
            <td>รับรอง</td> \
        </tr> \
        <tr> \
            <td>คุณหมอ</td> \
            <td>รับรอง</td> \
        </tr> \
    </table>"
};
Mail.send(message);