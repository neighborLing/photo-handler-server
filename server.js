const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
  }));

// 启用文件上传中间件
app.use(fileUpload());

// 文件上传接口
// 文件上传接口
app.post('/upload', (req, res) => {
    if (!req.files) {
      return res.status(400).send('未选择上传文件');
    }
  
    // 随机文件名
    const fileName = Math.random().toString(36).substr(2) + Date.now();
    const file = req.files.file;
    const uploadPath = path.join(__dirname, 'uploads', fileName);
  
    file.mv(uploadPath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('上传文件失败');
      }
  
      const filePath = '/files/' + fileName; // 文件路径
      res.send(filePath); // 返回文件路径
    });
  });
  

// 文件访问接口
app.get('/files/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).send('文件未找到');
    }
  });
});

app.listen(3000, () => {
  console.log('文件上传和访问服务已启动，端口号为3000');
});
