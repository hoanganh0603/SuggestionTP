import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import mysql from 'mysql'

const secret = process.env.SECRET;

const pool  = mysql.createPool({
  //connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'auth'
})

export default async function (req, res) {
  const { username, password } = req.body;
  const { method, cookies } = req
  const jwt = cookies.OursiteJWT;
  

 //Login
  if(method === "POST"){

    // Get user information and Check in the database
      pool.getConnection((err, connection) => {
        if(err) throw err
        var adr = [username, password, "admin"];
        var sql = 'SELECT * FROM user_account WHERE username=?, password=?, role=?';
        connection.query('SELECT * FROM user_account WHERE username=? AND password=? AND role=?', [username, password, "admin"], (err, result) => {
            connection.release() // return the connection to pool
            console.log(result.length)
            if (!err) {
              if(result != 0 ){
                const token = sign(
                  {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1, // 30 days
                    username: username,
                  },
                  secret
                );
          
                const serialised = serialize("OursiteJWT", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
                });
          
              res.setHeader("Set-Cookie", serialised);
              res.status(200).json({ message: "Success!" });

              }else {
                res.json({ message: "Invalid credentials!" });
              }
            } 
            else {
                console.log(err)
            }
        })
    })

    // if a user with this username and password exists
      // if (username === "VNNGUYENGIAH" && password === "12345") {
      //   const token = sign(
      //     {
      //       exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1, // 30 days
      //       username: username,
      //     },
      //     secret
      //   );
    
      //   const serialised = serialize("OursiteJWT", token, {
      //     httpOnly: true,
      //     secure: process.env.NODE_ENV !== "development",
      //     sameSite: "strict",
      //     maxAge: 60 * 60 * 24 * 30,
      //     path: "/",
      //   });
    
      //   res.setHeader("Set-Cookie", serialised);
    
      //   res.status(200).json({ message: "Success!" });
      // } 
      // else {
      //   res.json({ message: "Invalid credentials!" });
      // }
  }



  if (method === "GET"){
      if (!jwt) {
        return res.json({ message: "Invalid token!" });
      }
    
      return res.json({ data: "Top secret data!" });
    }
 
}