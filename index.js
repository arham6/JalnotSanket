/*


const express = require('express');
const app = express();
const port = 3000;
const { spawn } = require('child_process');

// Function to call the Python predict function
// async function callPythonPredict() {
    
// }

app.get('/',(req, res) => {
    try {
        const pythonProcess = spawn('python', ['virtualenvironment.py']); // Replace with the correct Python script name
        let pythonOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // console.log("this is pythonOutput",pythonOutput)
                // const jsonString = JSON.stringify({ result: pythonOutput });
                // // console.log(response);
                // // jsonString=`{"result":`${pythonOutput}`}`
                // const cleanedJsonString = jsonString.replace(/\r\n/g, '');
                // console.log(cleanedJsonString.result)
                res.send(pythonOutput)
                
            } else {
                console.error('Python script failed');
            }
        });
    } catch (error) {
        console.error('Error calling Python script:', error);
    }
    // const finalll=callPythonPredict(); // Call the Python predict function
    // res.send(finalll);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});


*/


const express = require('express');
const sharp = require('sharp');
const cors=require('cors')
const fs = require('fs');
const app = express();
const Result=require('./result')
const { spawn } = require('child_process');
const multer=require('multer');
const connectToMongo=require('./database')
require('dotenv').config()
const port=process.env.PORT || 3000
connectToMongo()


//to enable cross-origin resource sharing
app.use(cors())

//middleware to use req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'test_images')
    },
    filename:(req,file,cb)=>{
        //console.log(file);
        cb(null,file.originalname)
    }
    
})

const upload=multer({storage:storage})
// Function to call the Python predict function
// async function callPythonPredict() {
    
// }
//the key value of request body must be-- image
// app.post('/upload',upload.single("image"),(req,res)=>{
//     res.send('done');
// })

app.post('/upload',upload.single("image"),async(req, res) => {
    try {
        console.log('request has come');
        const fileBuffer = fs.readFileSync(req.file.path);
        
        //console.log(req.file)
        const pythonProcess = spawn('python', ['virtualenvironment.py']); // Replace with the correct Python script name
        let pythonOutput = '';

        pythonProcess.stdout.on('data',(data) => {
            pythonOutput += data.toString();
            //console.log(pythonOutput)
        });
        
        pythonProcess.on('close', async(code) => {
            if (code === 0) {
                //console.log(pythonOutput)
                await Result.create({
                    image:{
                        data:fileBuffer, // Store the image buffer
                        contentType: req.file.mimetype, // Store the content type
                    }, 
                    title:req.body.title,
                    description:req.body.description,
                    latitude:req.body.latitude,
                    longitude:req.body.longitude,
                    result:pythonOutput
                  });
                  fs.unlinkSync(req.file.path);

                  res.send("done")
                // console.log("this is pythonOutput",pythonOutput)
                // const jsonString = JSON.stringify({ result: pythonOutput });
                // // console.log(response);
                // // jsonString=`{"result":`${pythonOutput}`}`
                // const cleanedJsonString = jsonString.replace(/\r\n/g, '');
                // console.log(cleanedJsonString.result)

                // res.send({result:pythonOutput,label:"this is the image of a flood"})
                
            } 
            else {
                console.error('Python script failed');
            }
        });
    } 
    catch (error) {
        console.error('Error in running /upload', error);
    }
    // const finalll=callPythonPredict(); // Call the Python predict function
    // res.send(finalll);
});

/*
app.get('/userdata', async (req, res) => {
    try{
      
      const results = await Result.find();
      if (!results){
        return res.json({ message: 'data not found' });
      }
  
      // Send the image data as a response with the appropriate content type
      console.log(results.length)
      res.send(results);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
*/

app.get('/userdata', async (req, res) => {
    try{
      
      const results = await Result.find({}).select('title description latitude longitude result time -_id');
      //const results = JSON.parse(jsonData);
  
      if (!results){
        return res.json({ message: 'data not found' });
      }
    //   res.setHeader('Content-Type', "image/jpeg");
    //   results.forEach((element)=>{
    //     let changedtime = element.time
    //     console.log(typeof(changedtime))
    //     element.time=changedtime
       // delete element.image
        //console.log(element.image.data)
        //element.image="hello";
        //let base64val=element.image.data.data.toString('base64')
        // element.image.data=base64val
        //console.log(base64val)
        /*
        sharp(element.image.data.data)
        .toBuffer()
        .then((convertedBuffer) => {
            console.log(convertedBuffer)
            // Set the appropriate content type in the response header
            element.image.data=convertedBuffer;
            // Send the converted image data as a response
            // res.send(convertedBuffer);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
          });*/
    //   })
      res.send(results);
      // Send the image data as a response with the appropriate content type
    //   console.log(results.length)
    //   res.send("lol");
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});





