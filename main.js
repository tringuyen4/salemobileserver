var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const { Pool } = require('pg')

//MySQL connection
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'network'`1a
// });


var connectionString =
    'postgres://grxxpoarpiuavs:cfbac00262108211848f78f3234850233b3bb8cf46d21b15767edc15da9a8fd6@ec2-54-144-165-97.compute-1.amazonaws.com:5432/d9p69l7ts82ekg'

app.use(cors());


//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

// connection.connect(function (err) {
//     if (err) throw err
//     console.log('You are now connected...')
// })

const pool = new Pool({ connectionString,ssl: {
    rejectUnauthorized: false
  } })

module.exports = { pool }

//Body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//Create node.js Server
// var server = app.listen(3000, "127.0.0.1", function () {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)

// });

var server = app.listen(process.env.PORT || 3001);


//authen
app.post('/authen/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('select quyenhan from nguoidung where dienthoai = ($1) and matkhau = ($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//input user
app.post('/user/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO nguoidung VALUES ($1, $2, $3, $4)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//get all user
app.get('/getalluser/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select dienthoai, hoten, quyenhan from nguoidung', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});




//update user role
app.put('/updatepassword/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('UPDATE nguoidung SET matkhau=($1) where dienthoai=($2) AND matkhau=($3)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});




//reset password
app.put('/resetpassword/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('UPDATE nguoidung SET matkhau=($1) where dienthoai=($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});


//update user role
app.put('/updaterole/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('UPDATE nguoidung SET quyenhan=($1) where dienthoai=($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});





//get all order
app.get('/getallorder/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select madonhang, tennguoigui, diachinguoigui, sdtnguoigui, fbnguoigui, tennguoinhan, sdtnguoinhan, diachinguoinhan, phuongthucthanhtoan, thuho, tennhanvien, trongluong, giatien, phuthu, tongtien, dathanhtoan, ngaythang, ghichu, chuky from donhang', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//get all order
app.post('/getorder/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select madonhang, tennguoigui, diachinguoigui, sdtnguoigui, fbnguoigui, tennguoinhan, sdtnguoinhan, diachinguoinhan, phuongthucthanhtoan, thuho, tennhanvien, trongluong, giatien, phuthu, tongtien, dathanhtoan, ngaythang, ghichu, lichsudonhang, hinhthucvanchuyen, khachhangnhapthongtin, chitietdonhang, chuky from donhang where madonhang = $1', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});


app.post('/getuserorder/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select madonhang, tennguoigui, diachinguoigui, sdtnguoigui, fbnguoigui, tennguoinhan, sdtnguoinhan, diachinguoinhan, phuongthucthanhtoan, thuho, tennhanvien, trongluong, giatien, phuthu, tongtien, dathanhtoan, ngaythang, ghichu, lichsudonhang, hinhthucvanchuyen, khachhangnhapthongtin, chitietdonhang, chuky from donhang where sdtnguoigui = $1', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});


 app.put('/updatedonhang/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('UPDATE donhang SET tennguoigui =($1), diachinguoigui = ($2), sdtnguoigui = ($3), fbnguoigui = ($4), tennguoinhan = ($5), sdtnguoinhan = ($6), diachinguoinhan = ($7), phuongthucthanhtoan = ($8), thuho = ($9), tennhanvien = ($10), trongluong = ($11), giatien = ($12), phuthu = ($13), tongtien = ($14), dathanhtoan =($15), ngaythang = ($16), lichsudonhang = ($17), ghichu = ($18),khachhangnhapthongtin = ($19), giamgia = ($20),hinhthucvanchuyen = ($21), chitietdonhang = ($22), chuky = ($23) where madonhang=($24)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });
 
 
  app.put('/updatetrangthaidonhang/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('UPDATE donhang SET lichsudonhang = ($1) where madonhang=($2)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });


 app.put('/updatesodienthoai/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('UPDATE donhang SET sdtnguoigui=($1) where madonhang=($2)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });
 
 
  app.post('/deletedonhang/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('DELETE FROM donhang where madonhang=($1)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });
 

 app.post('/loaimay/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO loaimay VALUES ($1)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.post('/deleteloaimay/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('DELETE FROM loaimay where loaimay=($1)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });

 app.post('/doimay/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO doimay VALUES ($1)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.post('/deletedoimay/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('DELETE FROM doimay where doimay=($1)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });

 app.post('/manhinh/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO manhinh VALUES ($1)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.post('/deletemanhinh/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('DELETE FROM manhinh where manhinh=($1)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });

 app.post('/chip/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO chip VALUES ($1)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.post('/deletechip/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('DELETE FROM chip where chip=($1)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });

 app.post('/ram/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO ram VALUES ($1)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.post('/deleteram/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('DELETE FROM ram where ram=($1)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });

 app.post('/ocung/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO ocung VALUES ($1)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.post('/deleteocung/', function (req, res) {
     var postData = req.body;
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

     pool.query('DELETE FROM ocung where ocung=($1)', postData, function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results.rows));
     });
 });

app.post('/quanlymay/', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('INSERT INTO quanlymay VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.get('/getloaimay/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select loaimay from loaimay', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.get('/getdoimay/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select doimay from doimay', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.get('/getmanhinh/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select manhinh from manhinh', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.get('/getchip/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select chip from chip', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.get('/getram/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select ram from ram', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.get('/getocung/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select ocung from ocung', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.get('/getquanlymay/', function (req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    console.log(req);
    pool.query('select * from quanlymay', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});




















