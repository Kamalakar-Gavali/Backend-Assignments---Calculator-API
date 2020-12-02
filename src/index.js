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
        return ({status: "failure",message:"Invalid data types"});
    }
    if(num1<-1000000 ||num2<-1000000||num1+num2<-1000000||num1*num2<-1000000)
    {
        return ({status: "failure",message:"Underflow"});
    }
    if(num1>1000000 ||num2>1000000||num1+num2>1000000||num1*num2>1000000)
    {
        return({status: "failure",message:"Overflow"});
    }
    else{
        if(operation=='add')
        {
        return({status: "success",message:"the sum of given two numbers",result: parseInt(num1)+parseInt(num2)});
        }
        if(operation=='sub')
        {
            return({status: "success",message:"the difference of given two numbers",result: parseInt(num1)-parseInt(num2)});
        }
        if(operation=='div')
        {
            if(num2==0)
            {
            return({status: "error",message:"Cannot divide by zero"});
            }
            else{
                return({status: "success",message:"The division of given numbers",result: parseInt(num1)/parseInt(num2)});
            }
        }
        if(operation=='mul')
        {
            return({status: "success",message:"The product of given numbers",result: parseInt(num1)*parseInt(num2)});
        }
        
    }
}
app.get('/',(req,res)=>{
    res.send('Hello world!');
})
app.get('/add/:num1/:num2',(req,res)=>{
    res.send(validate(req.params.num1,req.params.num2));
})

app.get('/sub/:num1/:num2',(req,res)=>{
    res.send(validate("sub",req.params.num1,req.params.num2));
})
app.get('/multiply/:num1/:num2',(req,res)=>{
    res.send(validate("mul",req.params.num1,req.params.num2));
})
app.get('/divide/:num1/:num2',(req,res)=>{
    res.send(validate("div",req.params.num1,req.params.num2));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;