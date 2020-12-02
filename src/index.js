const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const { json } = require('express');
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
function validate(operation,num1,num2)
{
    //if((num1 != parseInt(num1)||num2 !=parseInt(num2))&&(num1 != parseFloat(num1)||num2 !=parseFloat(num2)))
    if(typeof(num1)=="string"||typeof(num2)=="string")
    {
        return ({status: "error",message:"Invalid data types"});
    }
    if(num1>1000000 ||num2>1000000||num1+num2>1000000 ||(operation=='mul' && num1*num2>1000000))
    {
        return({status: "error",message:"Overflow"});
    }
    if(num1<(-1000000) ||num2<(-1000000)||num1+num2<(-1000000)||(operation=='mul' && num1*num2<-1000000))
    {
        return ({status: "error",message:"Underflow"});
    }
    else{
        if(operation=='add')
        {
           /*if(num1==parseInt(num1)&&num2==parseInt(num2))
           {
            return({status: "success",message:"the sum of given two numbers",sum: parseInt(num1)+parseInt(num2)});
           }
           else{
            return({status: "success",message:"the sum of given two numbers",sum: parseFloat(num1)+parseFloat(num2)});
           }*/
           return({status: "success",message:"the sum of given two numbers",sum:(num1)+(num2)});
        }
        if(operation=='sub')
        {
            /*if(num1==parseInt(num1)&&num2==parseInt(num2))
            {
                return({status: "success",message:"the difference of given two numbers",difference: parseInt(num1)-parseInt(num2)});    
            }
            else{
            return({status: "success",message:"the difference of given two numbers",difference: parseFloat(num1)-parseFloat(num2)});
            }*/
            return({status: "success",message:"the difference of given two numbers",difference:(num1)-(num2)});
        }
        if(operation=='div')
        {
            if(num2==0)
            {
            return({status: "error",message:"Cannot divide by zero"});
            }
            else{
                /*if(num1==parseInt(num1)&&num2==parseInt(num2))
                {
                    return({status: "success",message:"The division of given numbers",result: parseInt(num1)/parseInt(num2)});
                }
                else{
                return({status: "success",message:"The division of given numbers",result: parseFloat(num1)/parseFloat(num2)});
                }*/
                return({status: "success",message:"The division of given numbers",result:(num1)/(num2)});
            }
        }
        if(operation=='mul')
        {
            /*if(num1==parseInt(num1)&&num2==parseInt(num2))
            {
                return({status: "success",message:"The product of given numbers",result: parseInt(num1)*parseInt(num2)});    
            }
            else{
            return({status: "success",message:"The product of given numbers",result: parseFloat(num1)*parseFloat(num2)});
            }*/
            return({status: "success",message:"The product of given numbers",result:(num1)*(num2)});
        }
        
    }
}
app.get('/',(req,res)=>{
    res.send('Hello world!');
})
app.post('/add',(req,res)=>{
    let x=req.params.num2;
    //res.send({s:x});
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