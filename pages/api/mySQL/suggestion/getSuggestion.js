import mysql from 'mysql'

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'suggestion'
})

export default function handler(req, res)  {
    const { method } = req;

    if(method === "GET"){
      pool.getConnection((err, connection) => {
          if(err) throw err
          console.log('connected as id ' + connection.threadId)
          connection.query("SELECT * FROM raw_data", (err, result) => {
              connection.release() // return the connection to pool
  
              if (!err) {
                res.status(200).json({ data:result})
              } else {
                  console.log(err)
              }

          })
      })
  }

  if(method === "POST"){
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
       
        if(params.action==="pending"){
            connection.query('UPDATE raw_data SET comment=?, status=?, start_date=?, deadline=?, pic=?, next_action=? WHERE id = ?', 
                            [params.comment, params.status, params.startDate, params.deadline, params.pic, params.next_action, params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.status(200).json("update_success")
            } else {
                console.log(err)
            }
          })
        }

        else if(params.action==="update_status"){
          connection.query('UPDATE raw_data SET comment=?, status=? WHERE id = ?', 
                          [params.comment, params.status, params.id], (err, rows) => {
          connection.release() // return the connection to pool
          if (!err) {
              res.status(200).json("update_success")
          } else {
              console.log(err)
          }
        })
      }

      else if(params.action==="score"){
        connection.query('UPDATE raw_data SET score=? WHERE id = ?', 
                        [params.score, params.id], (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.status(200).json("update_success")
        } else {
            console.log(err)
        }
      })
    }
    else if(params.action==="best_suggestion"){
        connection.query('UPDATE raw_data SET status=? WHERE id = ?', 
                        [params.status, params.id], (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.status(200).json("update_success")
        } else {
            console.log(err)
        }
      })
    }
    else if (params.action==="insert_suggestion"){
        var sql = "INSERT INTO raw_data (owner, department, type_sug, machine, submit_date, title_sug, description, benefit) VALUES ?"
        var values = [[params.owner, params.department, params.typeSug, params.machine, params.submitDate, params.titleSug, params.description, params.benefit]]
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            res.status(200).json("insert_success")
            });
          }

          
        })
      }
    
  }