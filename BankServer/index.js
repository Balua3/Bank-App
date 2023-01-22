//Server Creation

//1 Import express
const express = require('express')

//import 
const jwt = require('jsonwebtoken');

//import cors
const cors = require('cors')

const dataService = require('./Services/dataService')
//2 Create an App using the express
const app = express()

//give command to share data via cors
app.use(express.json())

app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:8080']
}))

//3 Create a port number 
app.listen(3000,()=>{
    console.log('listening on port 3000');
})

//application specific middleware
const appMiddleware=(req,res,next)=>{
    console.log('application specific middleware');
    next();
}
app.use(appMiddleware)

//Router specific middleware 
const jwtRouterMiddleware = (req,res,next)=>{
    try{
    console.log('Router specific middleware');
    // const token=req.body.token;
    const token=req.headers['x-access-token'];
    const data=jwt.verify(token,'superkey2023')
    console.log(data);
    next();
}
catch{
    //422 - unprocessable entity
    res.status(422).json({
        statusCode:422,
        status:false,
        message:'Please Login first'
    })
}
}
//4 Resolving http requests
// app.get('/',(req,res)=>{
//     res.send('Get http request')
// })

// app.post('/',(req,res)=>{
//     res.send('post http request')
// })

// app.put('/',(req,res)=>{
//     res.send('put http request')
// })

// app.patch('/',(req,res)=>{
//     res.send('patch http request')
// })

// app.delete('/',(req,res)=>{
//     res.send('delete http request')
// })


//Api Calls
//Register request
app.post('/register',(req,res)=>{
    dataService.register(req.body.acno,req.body.username,req.body.password).then(
                                        //(1000,anoop,1000)
        result=>{
            res.status(result.statusCode).json(result)
        }
    ) 

    
    // if (result) {
    //     res.send('register successful')
    //     console.log(req.body);
    // }
    // else{
    //     res.send('register failed')
    // }

})

//login request
app.post('/login',(req,res)=>{
    dataService.login(req.body.acno,req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result)})
        }
    )

//deposit request
app.post('/deposit',jwtRouterMiddleware,(req,res)=>{
    dataService.deposit(req.body.acno,req.body.password,req.body.amount).then(
        result=>{
            res.status(result.statusCode).json(result)})
        }
    )

//withdraw request
app.post('/withdraw',jwtRouterMiddleware,(req,res)=>{
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount).then(
        result=>{
            res.status(result.statusCode).json(result)})
        }
    )

//transaction request
app.post('/transaction',jwtRouterMiddleware,(req,res)=>{
    dataService.getTransaction(req.body.acno).then(
        result=>{
        res.json(result)
        }
    )
})

//delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
})