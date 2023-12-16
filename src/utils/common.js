
// 前后台共用变量
export default {
  web_name: 'LGG配货管理系统',
  web_domain: '', // 访问域名
  name_reg: /^[a-z\u4e00-\u9fa5\d]{3,10}$/i, // 帐号验证
  name_txt: '3至10个英文或中文字符或数字', // 帐号规则
  pass_reg: /^[a-z\d]{6,12}$/i, // 密码验证
  defaultPassword: '88888888888a', // 默认密码：当修改用户信息时不更改密码的标识
  pass_txt: '6至12个数字或英文组成', // 密码规则
  email_reg: /^[a-z\d]+([-_.][a-z\d]+)*@([a-z\d]+[-.])+[a-z]{2,3}$/, // 邮箱正则表达式
  email_txt: '请输入正确邮箱地址',
  pic_reg: /^(https?:\/\/|\/upFile\/)/i,
  pic_txt: '头像地址不正确！',
  upFile_maxSize: 1024 * 1024 * 50, // 上传文件大小限制
  upFile_accept: /^image\//, // 上传文件格式限制
  baseImgUrl: 'http://172.168.50.50:9800/pic/skc-pic/', // 主图片地址的前缀
  modelBaseImgUrl: 'http://172.168.50.50:9800/pic/skc-pic/skc-model-pic/', // 模特图片地址前缀

  user_type: {
    0: '未审核用户',
    1: '超级管理员',
    2: '普通管理员',
    3: 'VIP用户',
    4: '普通用户'
  },
  // 默认系统配置
  sys_type: {
    1: 'lagogo',
    2: 'SeaToSky',
    3: 'Velwin',
    4: 'idole',
    5: 'escelav',
    6: 'unberhome'
  },

  deal_results: {
    lack: '#失败：参数错误！',
    nobody: '#失败：查无此用户！',
    errCode: '#失败：激活码错误！',
    failed: '#失败：更新数据异常！',
    success: '恭喜您#成功！可以登录了。'
  }

}
