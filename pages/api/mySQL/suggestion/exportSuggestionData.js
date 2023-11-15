import mysql from 'mysql'
const { Parser } = require('json2csv');
import { parse } from 'json2csv';

const excel = require("exceljs");

const XLSX = require('xlsx')

var data_exporter = require('json2csv').Parser;

const pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'suggestion',
  //charset: 'utf8mb4'
})


export default function handler(req, res){
const { method } = req;

if(method === "GET"){
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query("SELECT * FROM raw_data", (err, data) => {
            connection.release() // return the connection to pool

            if (!err) {
                var mysql_data = JSON.parse(JSON.stringify(data));
                
                var file_header = ['id', 'owner', 'department', 'type_sug', 'machine', 'submit_date',	'title_sug', 'description',	'benefit', 
                                    'status',	'pic', 'approved_date',	'start_date','deadline', 'next_action', 'picture', 'comment', 'score'];

                const data_sql = mysql_data.map(item =>{
                    return [item.id, item.owner, item.department, item.type_sug, item.machine, item.submit_date, item.title_sug, item.description, item.benefit,
                            item.status, item.pic, item.approved_date, item.start_date, item.deadline, item.next_action, item.picture, item.comment, item.score]
                })
                // const workBook = XLSX.utils.book_new();
                // const workSheetData = [file_header, ...data_sql];
                // const workSheet = XLSX.utils.aoa_to_sheet(workSheetData)
                // XLSX.utils.book_append_sheet(workBook, workSheet, "suggesstion_data")
                // XLSX.writeFile(workBook,"C:/HoangAnh/Python/Data_for_python/suggesstion_data.xlsx")
                
                let workbook = new excel.Workbook();
                let worksheet = workbook.addWorksheet("Data_Suggestion");

                worksheet.columns = [
                { header: "Id", key: "id" },
                { header: "Owner", key: "owner" },
                { header: "Department", key: "department" },
                { header: "Type_sug", key: "type_sug"},
                { header: "Machine", key: "machine"},
                { header: "Submit_date", key: "submit_date" },
                { header: "Title_sug", key: "title_sug"},
                { header: "Description", key: "description"},
                { header: "Benefit", key: "benefit"},
                { header: "Status", key: "status" },
                { header: "PIC", key: "pic"},
                { header: "Approved_date", key: "approved_date"},
                { header: "Start_date", key: "start_date"},
                { header: "Deadline", key: "deadline" },
                { header: "Next_action", key: "next_action"},
                { header: "Picture", key: "picture"},
                { header: "Comment", key: "comment"},
                { header: "Score", key: "score"},
                ];

                // Add Array Rows
                worksheet.addRows(data_sql);

                // res is a Stream object
                res.setHeader(
                    "Content-Type",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=" + "Data_Suggestion.xlsx");

                return workbook.xlsx.write(res).then(function () {
                    res.status(200).end();
                });

            } else {
                console.log(err)
            }

            // if (!err) {
            //     var mysql_data = JSON.parse(JSON.stringify(data));
            //     var file_header = ['id', 'owner', 'department', 'type_sug', 'machine', 'submit_date',	'title_sug', 'description',	'benefit', 
            //                         'status',	'pic', 'approved_date',	'start_date',	'deadline', 'next_action', 'picture', 'comment', 'score'];
            //     var json_data = new data_exporter({file_header});
            //     var csv_data = json_data.parse(mysql_data);
            //     res.setHeader("Content-Type", "text/csv");
            //     res.setHeader("Content-Disposition", "attachment; filename=suggesstion_data.csv");
            //     res.status(200).end(csv_data);
            // } else {
            //     console.log(err)
            // }

        })
    })
}  
}


