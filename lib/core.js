const say = require('./say');
const { mkHero: mkEnemy, gameover, colorFormat, Color, mkMe, enemyInfo, meInfo, isMeAttack, attack, isDeath, healing } = require('./helper');

let enemy;
let me = mkMe();

function main() {
    say(colorFormat(Color.BLUE), '----欢迎来到命令行Roguelike卡牌游戏----');
    say(colorFormat(Color.BLUE), '----你将扮演一位英雄，来向三国时期的人物发起挑战----');
    say(colorFormat(Color.BLUE), '----努力击败他们吧----');
    while (!gameover(me)) {
        say('------回合开始------');
        const isMeAtk = isMeAttack();
        if (!enemy || (enemy && isDeath(enemy))) {
            enemy = mkEnemy();
        };
        enemyInfo(enemy);
        meInfo(me);
        if (!isDeath(me) && !isDeath(enemy)) {
            attack(isMeAtk ? enemy : me, isMeAtk ? me : enemy);
        };
        if (!isDeath(me) && !isDeath(enemy)) {
            attack(isMeAtk ? me : enemy, isMeAtk ? enemy : me);
        };
        say('------回合结束------');
        if (isDeath(enemy)) {
            healing(me);
        };
        if (gameover(me)) {
            say(colorFormat(Color.BLUE), '----游戏结束, 欢迎再来!!!----');
        }
    }
}

main();