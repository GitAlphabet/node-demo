const express = require('express');
const path = require('path');

const stuUtils = require(path.resolve(__dirname, '../util/stu.js'));

const router = express.Router();

// 获取列表
router.get('/api/stu/list', (req, res) => {
  stuUtils.findAll(req, (err, data) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.send(data);
  });
});

// 编辑/新增
router.post('/api/stu/update', (req, res) => {
  stuUtils.newOrUpdateItem(req.body, (err, data) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.send(data);
  });
});

// 获取转账信息
router.get('/api/stu/getTransferInfo', (req, res) => {
  stuUtils.getTransferInfo(req.query.id, (err, data) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.send(data);
  });
});

// 开始转账
router.post('/api/stu/transferToOther', (req, res) => {
  stuUtils.transferToOther(req.body, (err, data) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.send(data);
  });
});

// 删除
router.get('/api/stu/del', (req, res) => {
  console.log(typeof req.query.id);
  const id = Number(req.query.id);
  stuUtils.deleteItem(id, (err, data) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.send(data);
  });
});

module.exports = router;
