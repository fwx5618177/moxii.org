import nodemailer from "nodemailer";

const sendEmail = async (recipientEmail, subject, content) => {
  // 创建一个SMTP客户端配置
  let transporter = nodemailer.createTransport({
    host: "smtp.yourserver.com", // 你的SMTP服务器地址
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "your_email@yourserver.com", // 你的邮箱账号
      pass: "your_email_password", // 你的邮箱密码
    },
  });

  // 设置邮件内容
  let mailOptions = {
    from: '"Your Name" <your_email@yourserver.com>', // 发送者显示名称和邮箱
    to: recipientEmail, // 接收者的邮箱
    subject: subject, // 邮件主题
    text: content, // 纯文本内容
    html: `<p>${content}</p>`, // HTML内容
  };

  // 发送邮件
  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};
