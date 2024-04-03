const say = require('./say');
const { HEALTHY, DEATH, ME } = require('./const');
let heroesAppeared = [];
let heroNamesPool = ['刘备', '关羽', '张飞', '曹操', '孙权', '孙策', '司马懿', '诸葛亮', '周瑜', '赵云', '马超', '黄忠', '魏延', '吕布', '董卓', '袁绍', '袁术', '甘宁', '钟会', '郭嘉'];

const Color = {
    RED: 'red',
    GREEN: 'green',
    YELLOW: 'yellow',
    BLUE: 'blue',
    PURPLE: 'purple',
    CYAN: 'cyan'
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
    return heroNamesPool[getRandomInt(0, heroNamesPool.length - 1)];
}

function mkHero() {
    let hero = {
        name: getRandomName(),
        hp: getRandomInt(1, 10),
        atk: getRandomInt(1, 3),
        stauts: HEALTHY
    };
    if (!heroesAppeared.includes(hero.name)) {
        return hero;
    };
    return mkHero();
}

function gameover(me) {
    return heroNamesPool.length === heroesAppeared.length || me.status === DEATH;
}

function killEnemy(enemy) {
    enemy.status = DEATH;
    if (typeof enemy === 'string') {
        heroesAppeared.push(enemy);
    } else if (enemy && enemy.name) {
        heroesAppeared.push(enemy.name);
    };
    if (heroesAppeared.length === heroNamesPool.length) {
        say(colorFormat(Color.CYAN), '恭喜少侠击败所有敌人,游戏胜利!!!');
    };
}

function terminalColor(color) {
    if (!color) return '\x1b[0m';
    let colors = new Map([
        [Color.RED, '\x1b[31m'],
        [Color.GREEN, '\x1b[32m'],
        [Color.YELLOW, '\x1b[33m'],
        [Color.BLUE, '\x1b[34m'],
        [Color.PURPLE, '\x1b[35m'],
        [Color.CYAN, '\x1b[36m']
    ]);
    return colors.get(color);
}

function attack(hero, enemy) {
    hero.hp -= enemy.atk;
    say(`${hero.name === ME ? '我方英雄' : '敌方英雄'}${hero.name}受到${enemy.atk}点攻击, 剩余${hero.hp <= 0 ? 0 : hero.hp}点生命值`);
    if (hero.name === ME) {
        if (hero.hp <= 0) {
            hero.status = DEATH;
            say('我方英雄死亡!!!');
            say('少侠请重新来过!!!');
        }
    } else {
        if (hero.hp <= 0) {
            say('敌方英雄死亡, 恭喜少侠!!!');
            killEnemy(hero);
        }
    };
}

function healing(hero) {
    const healHp = getRandomInt(1, 2);
    hero.hp += healHp;
    say(colorFormat(Color.PURPLE), `${hero.name === ME ? '我方英雄' : '敌方英雄'}${hero.name}回复${healHp}点生命值, 剩余${hero.hp}点生命值`);
}

function isDeath(hero) {
    return hero.status === DEATH;
}

function mkMe() {
    return {
        name: ME,
        hp: getRandomInt(1, 10),
        atk: getRandomInt(1, 3),
        status: HEALTHY
    }
}

function colorFormat(color) {
    return `${terminalColor(color)}%s${terminalColor()}`;
}

function enemyInfo(enemy) {
    say(colorFormat(Color.RED), '敌方英雄:', enemy.name, '生命值:', enemy.hp, '攻击力:', enemy.atk);
}

function meInfo(me) {
    say(colorFormat(Color.GREEN), '我方英雄:', me.name, '生命值:', me.hp, '攻击力:', me.atk);
}

function isMeAttack() {
    return getRandomInt(0, 1) === 0;
}

module.exports = {
    gameover,
    killEnemy,
    mkHero,
    terminalColor,
    Color,
    colorFormat,
    mkMe,
    enemyInfo,
    meInfo,
    isMeAttack,
    attack,
    isDeath,
    healing
}
