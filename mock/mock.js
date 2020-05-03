export default {
  'GET /api/401': (req, res) => {
    setTimeout(() => {
      res.status(401).send({
        code: 0,
        message: 'Unauthorized',
      });
    }, 1200);
  },
  'GET /api/403': (req, res) => {
    setTimeout(() => {
      res.status(403).send({
        code: 0,
        message: 'Forbidden',
      });
    }, 1200);
  },
  'GET /api/404': (req, res) => {
    setTimeout(() => {
      res.status(404).send({
        code: 0,
        message: 'Not Found',
      });
    }, 1200);
  },
  'GET /api/500': (req, res) => {
    setTimeout(() => {
      res.status(500).send({
        code: 0,
        message: 'Not Found',
      });
    }, 1200);
  },
  'POST /api/login': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: 'success',
        data: {
          token: 'tokenBear',
        },
      });
    }, 1200);
  },
  'GET /api/me': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: 'success',
        data: {
          username: 'zhengxiaoyuan',
          nickname: '郑晓媛',
          avatar: 'https://secure.gravatar.com/avatar/d99aea9fb2d3789b950b80483d37e37a?s=220&r=X&d=mm',
          role: 'admin',
        },
      });
    }, 1200);
  },
  'GET /api/projects': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: 'success',
        data: {
          list: [
            {
              name: '长城贴瓷砖',
              principal: '汪先生',
              area: '成都',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
              type: '专项债',
              industry: '水利',
              priority: 4,
            },
            {
              name: '长城贴瓷砖1',
              principal: '汪先生',
              area: '达州',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
              type: '专项债',
              industry: '高标准农田',
              priority: 4,
            },
            {
              name: '长城贴瓷砖2',
              principal: '鸡先生',
              area: '巴中',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
              type: '十四五规划',
              industry: '园区规划',
              priority: 2,
            },
            {
              name: '长城贴瓷砖3',
              principal: '汪先生',
              area: '资阳',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
              type: 'PPP项目',
              industry: '市政',
              priority: 3,
            },
            {
              name: '长城贴瓷砖4',
              principal: '汪先生',
              area: '乐山',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
              type: '中期评估项目',
              industry: '市政',
              priority: 1,
            },
            {
              name: '长城贴瓷砖5',
              principal: '汪先生',
              area: '绵阳',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
              type: '中期评估项目',
              industry: '市政',
              priority: 1,
            },
            {
              name: '长城贴瓷砖6',
              principal: '汪先生',
              area: '泸州',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
              type: '中期评估项目',
              industry: '水利',
              priority: 2,
            },
          ],
          pagination: {
            total: 68,
            current: 2,
            pageSize: 10,
          },
        },
      });
    }, 1200);
  },
  'GET /api/users': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: 'success',
        data: {
          list: [
            {
              username: 'jiyunsheng',
              name: 'Gee',
              role: '管理员',
              phone: '133888888990',
              email: 'jiyunsheng66@gmail.com',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
            },
            {
              username: 'dengqiyao',
              name: 'Jayden',
              role: '技术部',
              phone: '133888888990',
              email: 'jiyunsheng66@gmail.com',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
            },
            {
              username: 'huangtianci',
              name: '黄',
              role: '管理员',
              phone: '133888888990',
              email: 'jiyunsheng66@gmail.com',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
            },
            {
              username: 'yaofengjun',
              name: '姚凤军',
              role: '管理员',
              phone: '133888888990',
              email: 'jiyunsheng66@gmail.com',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
            },
            {
              username: 'wangyucheng',
              name: '汪兄',
              role: '管理员',
              phone: '133888888990',
              email: 'jiyunsheng66@gmail.com',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
            },
            {
              username: 'zhengxiaoyuan',
              name: '郑晓媛',
              role: '管理员',
              phone: '133888888990',
              email: 'jiyunsheng66@gmail.com',
              created_at: '2020-4-5',
              updated_at: '2020-4-5',
            },
          ],
          pagination: {
            total: 68,
            current: 2,
            pageSize: 10,
          },
        },
      });
    }, 1200);
  },
  'GET /api/customers': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: 'success',
        data: {
          list: [
            {
              contacts_name: '小习',
              sex: '男',
              company: '中南海',
              job: '租客',
              phone: '133888888990',
              email: 'WEINI@gmail.com',
              created_at: '2020-4-5',
            },
            {
              contacts_name: '哈哈',
              sex: '女',
              company: '秦城',
              job: '霸主',
              phone: '133888888990',
              email: 'haha@gmail.com',
              created_at: '2020-4-5',
            },
          ],
          pagination: {
            total: 23,
            current: 2,
            pageSize: 10,
          },
        },
      });
    }, 1200);
  },
  'GET /api/contractors': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: 'success',
        data: {
          list: [
            {
              contacts_name: '小习',
              sex: '男',
              company: '中南海',
              job: '租客',
              phone: '133888888990',
              email: 'WEINI@gmail.com',
              created_at: '2020-4-5',
            },
            {
              contacts_name: '哈哈',
              sex: '女',
              company: '秦城',
              job: '霸主',
              phone: '133888888990',
              email: 'haha@gmail.com',
              created_at: '2020-4-5',
            },
          ],
          pagination: {
            total: 23,
            current: 2,
            pageSize: 10,
          },
        },
      });
    }, 1200);
  },
};
