const {promisify} = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const packageManagement = require('./utils/packageManagement');
const {clone} = require('./download')
const open = require('open')

const spawn = async (...args) => {
  const {spawn} = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}
const log = content => console.log(chalk.green(content))

// let _packageManagement = packageManagement();
// let cmdInstall = _packageManagement === 'yarn' ? 'add -D ' : 'install -D ';

module.exports = async name => {
  // 打印欢迎界面
  clear()
  const data = await figlet('welcome vuer')
  log(data)

  log('🚀创建项目' + name)
  // await clone('github:phggg/vue-template', name)

  // 安装依赖
  log('安装依赖......')
  let _packageManagement = packageManagement();
  let cmdInstall = 'install';
  // await spawn(_packageManagement, [cmdInstall], {
  //   cwd: `./${name}`
  // })
  log(`
👌安装完成：
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
            `)
  // 打开浏览器
  let shell = _packageManagement === 'yarn' ? ['serve'] : ['run', 'serve'];
  open('http://localhost:8080')
  await spawn(_packageManagement, shell, {
    cwd: `./${name}`
  })
}