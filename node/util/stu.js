const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '47.96.236.204',
  user: 'root',
  password: 'alphabet',
  database: 'stu_list',
  multipleStatements: true, // 开始多条查询语句
});
connection.connect();

// 查找所有
exports.findAll = (req, callback) => {
  const { pageNo, pageSize, name = '' } = req.query;
  const sql =
    'SELECT * FROM stu_list,stu_pos  WHERE stu_list.id = stu_pos.stu_id AND stu_list.name LIKE ? limit ?,?;SELECT COUNT(*) as total FROM stu_list,stu_pos WHERE stu_list.name LIKE ? AND stu_list.id = stu_pos.stu_id;';
  connection.query(
    sql,
    [`%${name}%`, (pageNo - 1) * pageSize, Number(pageSize), `%${name}%`],
    (error, results) => {
      if (error) throw error;
      callback(null, {
        data: {
          list: results[0],
          total: results[1][0].total,
          pageSize,
          pageNo,
        },
        success: true,
        msg: null,
      });
    }
  );
};

// 新增/编辑
exports.newOrUpdateItem = (item, callback) => {
  const { id, name, age, gender, nickname, hobbies, pos_name, level } = item;
  let sql = '',
    params = [];
  if (id) {
    sql =
      'UPDATE stu_list SET name= ?,gender=?,nickname=?,age=?,hobbies=? where id= ?;UPDATE stu_pos SET pos_name= ?,level=? where stu_id= ?;';
    params = [name, gender, nickname, age, hobbies, id, pos_name, level, id];
  } else {
    sql =
      'INSERT INTO stu_list (name,gender,nickname,age,hobbies) VALUES (?,?,?,?,?); INSERT INTO stu_pos (pos_name,level,stu_id) VALUES (?,?,LAST_INSERT_ID());';
    params = [name, gender, nickname, age, hobbies, pos_name, level];
  }

  connection.query(sql, params, (error) => {
    if (error) throw error;
    callback(null, { success: true, data: null, msg: null });
  });
};

// 删除指定的数据
exports.deleteItem = (id, callback) => {
  const sql =
    'DELETE FROM stu_list WHERE id = ?;DELETE FROM stu_pos WHERE stu_id = ?;';
  connection.query(sql, [id, id], (error) => {
    if (error) throw error;
    callback(null, { success: true, data: null, msg: '删除成功' });
  });
};

// 获取转账信息
exports.getTransferInfo = (id, callback) => {
  const sql =
    'SELECT id,name FROM stu_list WHERE id <> ?;SELECT balance FROM stu_list WHERE id = ?;';
  connection.query(sql, [id, id], (error, results) => {
    if (error) throw error;
    callback(null, {
      success: true,
      data: {
        list: results[0],
        balance: results[1][0].balance,
      },
      msg: null,
    });
  });
};

// 开始转账
exports.transferToOther = (params, callback) => {
  const sql =
    'UPDATE stu_list SET balance = balance - ? WHERE id = ?; UPDATE stu_list SET balance = balance + ? WHERE id = ?;';

  connection.beginTransaction((err) => {
    if (err) throw err;
    connection.query(
      sql,
      [params.balance, params.id, params.balance, params.debit],
      (error) => {
        if (error) {
          return connection.rollback(() => {
            // 失败回滚
            callback(error, {
              success: false,
              data: null,
              msg: '转账失败',
            });
          });
        } else {
          connection.commit((error1) => {
            if (error1) throw error;
            callback(null, {
              success: true,
              data: null,
              msg: '转账成功',
            });
          });
        }
      }
    );
  });
};
