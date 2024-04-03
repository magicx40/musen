const say = require('./say');
const chalk = require('chalk');
const { mkHero: mkEnemy, gameover, mkMe, enemyInfo, meInfo, attack, isDeath, healing, selectHero, reward, attackBySkill } = require('./core');

let enemy, me;

async function main() {
    say(chalk.blue('----滚滚长江东逝水，浪花淘尽英雄----'));
    say(chalk.blue('----是非成败转头空----'));
    say(chalk.blue('----青山依旧在，几度夕阳红----'));
    say(chalk.blue('----白发渔樵江渚上，惯看秋月春风----'));
    say(chalk.blue('----一壶浊酒喜相逢----'));
    say(chalk.blue('----古今多少事，都付笑谈中----'));
    say('----------------------------------------------');
    say(chalk.blue('----欢迎来到命令行Roguelike卡牌游戏----'));
    say(chalk.blue('----你将扮演一位英雄，来向三国时期的人物发起挑战----'));
    say(chalk.blue('----努力击败他们吧----'));
    say('------选择英雄------');
    const selectedHero = await selectHero();
    me = mkMe(selectedHero[0]);
    say('------英雄选择结束------');
    while (!gameover(me)) {
        say('---------回合开始---------');
        if (!enemy || (enemy && isDeath(enemy))) {
            enemy = mkEnemy();
        };
        say(chalk.yellow('------英雄信息------'));
        enemyInfo(enemy);
        meInfo(me);
        say(chalk.yellow('------英雄信息------'));
        if (!isDeath(me) && !isDeath(enemy)) {
            attack(me, enemy);
        };
        if (!isDeath(me) && !isDeath(enemy)) {
            await attackBySkill(enemy, me);
        };
        say('---------回合结束---------');
        if (isDeath(enemy)) {
            healing(me);
        };
        if (!gameover(me)) {
            say('---------随机奖励---------');
            !isDeath(enemy) && reward(enemy);
            !isDeath(me) && reward(me);
            say('---------随机奖励结束---------');
        };
        if (gameover(me)) {
            say(chalk.blue('----游戏结束, 欢迎再来!!!----'));
        };
    }
}

main();