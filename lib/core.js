const say = require('./say');
const chalk = require('chalk');
const { HEALTHY, DEATH, HERO_POOL, Reward, DEFAULT_SKILL, SKILLS, SkillType, ATK } = require('./const');
const { ui_select } = require('./prompt');
let heroesAppeared = [];
let heroNamesPool = ['刘备', '关羽', '张飞', '曹操', '孙权', '孙策', '司马懿', '诸葛亮', '周瑜', '赵云', '马超', '黄忠', '魏延', '吕布', '董卓', '袁绍', '袁术', '甘宁', '钟会', '郭嘉'];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
    return heroNamesPool[getRandomInt(0, heroNamesPool.length - 1)];
}

function getRandomSkill() {
    return SKILLS[getRandomInt(0, SKILLS.length - 1)];
}

function mkHero() {
    let hero = {
        name: getRandomName(),
        hp: getRandomInt(1, 10),
        atk: getRandomInt(1, 3),
        stauts: HEALTHY,
        sk: DEFAULT_SKILL.concat(getRandomSkill())
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
        say(chalk.cyan('恭喜少侠击败所有敌人,游戏胜利!!!'));
    };
}

function attack(hero, enemy) {
    hero.hp -= enemy.atk;
    say(`${hero.isMe ? '我方英雄' : '敌方英雄'}${hero.name}受到${enemy.atk}点攻击, 剩余${hero.hp <= 0 ? 0 : hero.hp}点生命值`);
    if (hero.isMe) {
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
    say(`${hero.isMe ? chalk.rgb(128, 0, 128)('我方英雄') : chalk.rgb(128, 0, 128)('敌方英雄')}${chalk.rgb(128, 0, 128)(hero.name + '回复')}${chalk.yellow(healHp)}${chalk.rgb(128, 0, 128)('点生命值, 剩余')}${chalk.yellow(hero.hp)}${chalk.rgb(128, 0, 128)('点生命值')}`);
}

function isDeath(hero) {
    return hero.status === DEATH;
}

function reward(entity) {
    const rewards = [Reward.REWARD_EMPTY, Reward.REWARD_HP_PLUS, Reward.REWARD_HP_MINUS, Reward.REWARD_ATK_PLUS, Reward.REWARD_ATK_MINUS];
    const radio = [3, 1, 2, 2, 5];
    const r = mixedArrayByRatio(rewards, radio)[getRandomInt(0, 12)];
    const colorFunc = entity.isMe ? chalk.green : chalk.red;
    switch (r) {
        case Reward.REWARD_HP_PLUS:
            const h = getRandomInt(1, 2);
            entity.hp += h;
            say(colorFunc(`当前${entity.isMe ? '我方英雄' : '敌方英雄'}随机奖励是+${h}点生命值`));
            break;
        case Reward.REWARD_HP_PLUS:
            const atk = getRandomInt(1, 2);
            entity.atk += atk;
            say(colorFunc(`当前${entity.isMe ? '我方英雄' : '敌方英雄'}随机奖励是+${h}点攻击力`));
            break;
        default:
            say(colorFunc(`当前${entity.isMe ? '我方英雄' : '敌方英雄'}随机奖励为空，运气太差啦～～～`));
            break;
    }

}

function mkMe(name) {
    return {
        name: name,
        hp: getRandomInt(1, 10),
        atk: getRandomInt(1, 3),
        status: HEALTHY,
        isMe: true,
        sk: DEFAULT_SKILL.concat(getRandomSkill())
    }
}

function enemyInfo(enemy) {
    say(`${chalk.red('敌方英雄: ' + enemy.name + ' 生命值: ')}${chalk.yellow(enemy.hp)} ${chalk.red('攻击力: ')}${chalk.yellow(enemy.atk)}`);
}

function meInfo(me) {
    say(`${chalk.green('我方英雄: ' + me.name + ' 生命值: ')}${chalk.yellow(me.hp)} ${chalk.green('攻击力: ')}${chalk.yellow(me.atk)}`);
}

function isMeAttack() {
    return getRandomInt(0, 1) === 0;
}

async function selectHero() {
    const choice = await ui_select('请选择心仪的武将', HERO_POOL, (answer) => answer.length !== 1 ? '请选择1位武将' : true);
    return choice;
}

async function attackBySkill(victim, attacker) {
    const choice = await ui_select('少侠请出招', attacker.sk, (answer) => answer.length !== 1 ? '请选择1项技能' : true);
    const sk = attacker.sk.find((item) => item.name === choice[0]);
    if (sk && sk.type === SkillType.HARM) {
        const atk = attacker.atk + (sk.code === ATK ? 0 : getRandomInt(1, 3));
        victim.hp -= atk;
        say(`${victim.isMe ? '我方英雄' : '敌方英雄'}${victim.name}受到${atk}点攻击, 剩余${victim.hp <= 0 ? 0 : victim.hp}点生命值`);
        if (victim.isMe) {
            if (victim.hp <= 0) {
                victim.status = DEATH;
                say('我方英雄死亡!!!');
                say('少侠请重新来过!!!');
            };
        } else {
            if (victim.hp <= 0) {
                say('敌方英雄死亡, 恭喜少侠!!!');
                killEnemy(victim);
            }
        };
    } else if (sk && sk.type === SkillType.TREAT) {
        const rhp = getRandomInt(0, 2);
        attacker.hp += rhp;
        say(`${attacker.isMe ? '我方英雄' : '敌方英雄'}${attacker.name}回复${rhp}点生命值, 剩余${attacker.hp <= 0 ? 0 : attacker.hp}点生命值`);
    }
}

function mixedArrayByRatio(initialArray, ratios) {
    let result = [];
    for (let i = 0; i < initialArray.length; i++) {
        let array = new Array(ratios[i]).fill(initialArray[i]);
        result = result.concat(array);
    }
    return result;
}

module.exports = {
    gameover,
    killEnemy,
    mkHero,
    mkMe,
    enemyInfo,
    meInfo,
    isMeAttack,
    attack,
    isDeath,
    healing,
    selectHero,
    reward,
    attackBySkill
};
