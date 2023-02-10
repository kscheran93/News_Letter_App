const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.get('/',(req, res)=>{
     res.sendFile(__dirname + '/signUp.html')
})

app.post('/',(req, res)=>{
     const firstName = req.body.firstName
     const lastName = req.body.lastName
     const email = req.body.email

     const data ={
        members:[
            {
                email_address:email,
                status:'subscribed',
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
     } 
     
     const postData = JSON.stringify(data);

     let url = 'https://us10.api.mailchimp.com/3.0/lists/1db6bd7374';
     const options = {
       method:"POST",
       auth:"saicharan:fb0b710586f9536a5e3e5ebe2e316c83-us10"
       
     }

     const request = https.request(url,options,(response)=>{

        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        } else {
            res.send(__dirname + '/error.html')
        }

         response.on('data', function(data){
          console.log(JSON.parse(data))
         })
     })
     request.write(postData)
     request.end()
    })
      
 app.get('/failure', function(req, res) {
       res.redirect('/')
 })   

const port = 5000;

app.listen(process.env.PORT || port, ()=>{
    console.log('Server listening on port:' + port);
})



