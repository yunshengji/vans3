module.exports = {
  USER_LEVEL: [
    { name: '普通权限', code: 1 },
    { name: '主管权限', code: 2 },
    { name: '管理员', code: 9 },
  ],

  LAWS_LABELS: [
    { label: '专项债', value: '专项债' },
    {
      label: 'PPP项目', value: 'PPP项目',
      children: [
        { label: 'PPP项目法律法规', value: 'PPP项目法律法规' },
        { label: '两评价一方案相关', value: '两评价一方案相关' },
        { label: '中期评价', value: '中期评价' },
      ],
    },
    { label: '平台公司转型', value: '平台公司转型' },
    {
      label: '可研编制相关', value: '可研编制相关',
      children: [
        { label: '可研报告法律法规', value: '可研报告法律法规' },
        { label: '相关建设规范', value: '相关建设规范' },
      ],
    },
    { label: '财政支出绩效评价', value: '财政支出绩效评价' },
    { label: '行政事业单位内部控制规范建设', value: '行政事业单位内部控制规范建设' },
    { label: '相关收费标准', value: '相关收费标准' },
    {
      label: '招投标和政府采购', value: '招投标和政府采购',
      children: [
        { label: '住建', value: '住建' },
        { label: '发改', value: '发改' },
        { label: '财政', value: '财政' },
        { label: '交通', value: '交通' },
        { label: '水利', value: '水利' },
        { label: '国务院', value: '国务院' },
        { label: '四川省人民政府', value: '四川省人民政府' },
        { label: '其他', value: '其他' },
      ],
    },
    { label: '其他', value: '其他' },
  ],

  TABLE_FOR_MAKING_PROJECT_CATEGORIES: ['PPP项目咨询服务', '平台公司资产重组、转型发展咨询', '五年规划编制咨询服务', '企业十四五规划编制服务', '专项债券咨询服务', '乡村振兴规划编制咨询', '政府采购、招标代理服务', '可研报告', '其他'],

  TABLE_FOR_MAKING_PROJECT_RECORD_TEAMS: ['独立业务经理', '事业部', '营销专员', '其他部门员工'],
  TABLE_FOR_MAKING_PROJECT_RECORD_LEVEL: ['科股长级', '副局级', '局级', '副县级', '县级及以上'],

  TABLE_FOR_MAKING_PROJECT_SERVICE_TEAMS: ['独立业务经理', '事业部', '营销专员', '其他部门员工'],
  TABLE_FOR_MAKING_PROJECT_SERVICE_LEVEL: ['科股长级', '副局级', '局级', '副县级', '县级及以上'],
  TABLE_FOR_MAKING_PROJECT_SERVICE_DEMANDS: ['中期评估', '实施绩效评价', '产生专项债需求', '产生其他需求'],

  TABLE_FOR_MAKING_PROJECT_EXECUTE_TEAMS: ['独立业务经理', '事业部', '营销专员', '其他部门员工'],
  TABLE_FOR_MAKING_PROJECT_EXECUTE_LEVEL: ['科股长级', '副局级', '局级', '副县级', '县级及以上'],

  PAMPHLET_CATEGORIES: ['PPP项目咨询服务', '平台公司资产重组、转型发展咨询', '五年规划编制咨询服务', '企业十四五规划编制服务', '专项债券咨询服务', '乡村振兴规划编制咨询', '政府采购、招标代理服务', '可研报告', '其他'],
  PERFORMANCE_CATEGORIES: ['PPP项目咨询服务', '平台公司资产重组、转型发展咨询', '五年规划编制咨询服务', '企业十四五规划编制服务', '专项债券咨询服务', '乡村振兴规划编制咨询', '政府采购、招标代理服务', '可研报告', '其他'],

  SPECIAL_DEBT_FILE_TYPE: [
    { field: 'wj_a', name: '规划许可（项目选址意见书）' },
    { field: 'wj_b', name: '立项批复' },
    { field: 'wj_c', name: '可研批复' },
    { field: 'wj_d', name: '用地手续（用地预审意见）' },
    { field: 'wj_e', name: '环评手续' },
    { field: 'wj_f', name: '收入测算说明' },
    { field: 'wj_g', name: '资本金落实情况说明' },
    { field: 'wj_h', name: '环境局关于环评的说明' },
    { field: 'wj_i', name: '自然资源局关于用地手续的说明' },
    { field: 'wj_j', name: '其他文件' },
    { field: 'wj_k', name: '可行性研究报告' },
    { field: 'wj_l', name: '城市总规' },
    { field: 'wj_m', name: '项目红线图（详规）' },
    { field: 'wj_n', name: '实施方案' },
    { field: 'wj_o', name: '财评报告' },
    { field: 'wj_p', name: '财评报告底稿' },
    { field: 'wj_q', name: '法律意见书' },
    { field: 'wj_r', name: '法律意见书底稿' },
    { field: 'wj_s', name: '银行授信函' },
    { field: 'wj_t', name: '业主单位法人证明或营业执照' },
    { field: 'wj_u', name: '审核人员文件' },
  ],
};
