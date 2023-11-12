const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/metamask.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/public/upload.html');

});

app.post('/upload', upload.array('files[]'), async (req, res) => {
  const { createHelia } = await import('helia');
  const { unixfs } = await import('@helia/unixfs');
  const helia = await createHelia();
  const uploadedFiles = [];

  const files = req.files;

  if (files && files.length > 0) {
    

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.originalname;
      const fileBuffer = fs.readFileSync(file.path);
      const fsUnix = unixfs(helia);
      const cid = await fsUnix.addBytes(fileBuffer,helia.blockstore);
      uploadedFiles.push({ fileName, cid });
      fs.unlinkSync(file.path);
    }
  }
  res.json(JSON.stringify(uploadedFiles));
  console.log(uploadedFiles);


});

app.get('/delete', (req, res) => {
  res.sendFile(__dirname + '/public/delete.html');
});

app.listen(4200, () => {
  console.log('Server started on port 4200');
});
