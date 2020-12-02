const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
function validate(operation,num1,num2)
{
    if(num1 != parseInt(num1)||num2 !=parseInt(num2))
    {
        return ({status: "error",message:"Invalid data types"});
    }
    if(num1<-1000000 ||num2<-1000000||num1+num2<-1000000||num1*num2<-1000000)
    {
        return ({status: "error",message:"Underflow"});
    }
    if(num1>1000000 ||num2>1000000||num1+num2>1000000||num1*num2>1000000)
    {
        return({status: "error",message:"Overflow"});
    }
    else{
        if(operation=='add')
        {
        return({status: "success",message:"the sum of given two numbers",sum: parseFloat(num1)+parseFloat(num2)});
        }
        if(operation=='sub')
        {
            return({status: "success",message:"the difference of given two numbers",difference: parseFloat(num1)-parseFloat(num2)});
        }
        if(operation=='div')
        {
            if(num2==0)
            {
            return({status: "error",message:"Cannot divide by zero"});
            }
            else{
                return({status: "success",message:"The division of given numbers",result: parseFloat(num1)/parseFloat(num2)});
            }
        }
        if(operation=='mul')
        {
            return({status: "success",message:"The product of given numbers",result: parseFloat(num1)*parseFloat(num2)});
        }
        
    }
}
app.get('/',(req,res)=>{
    res.send('Hello world!');
})
app.post('/add',(req,res)=>{
    res.send(validate("add",req.body.num1,req.body.num2));
})

app.post('/sub',(req,res)=>{
    res.send(validate("sub",req.body.num1,req.body.num2));
})
app.post('/multiply',(req,res)=>{
    res.send(validate("mul",req.body.num1,req.body.num2));
})
app.post('/divide',(req,res)=>{
    res.send(validate("div",req.body.num1,req.body.num2));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;