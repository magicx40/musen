const DEATH = 0;
const HEALTHY = 1;

const ATK = 10;
const SK1 = 11;
const SK2 = 12;
const SK3 = 13;
const SK4 = 14;
const SK5 = 15;
const SK6 = 16;

const HARM = 70; // 伤害型
const TREAT = 71; // 治疗型
const GAIN = 72; // 增益型
const GIVEN = 73; // 减益型
const CALL = 74; // 召唤型
const SINGLE = 0;
const GROUP = 1;

const SkillType = {
    HARM,
    TREAT,
    GAIN,
    GIVEN
};

const SkillScope = {
    SINGLE,
    GROUP
};

const HERO_POOL = ['黎志雄', '孔令会', '神秘大佬'];

const DEFAULT_SKILL = [
    {
        code: ATK,
        name: '普通攻击',
        type: HARM,
        scope: SINGLE
    }
];
const SKILLS = [
    {
        code: SK1,
        name: '千山折梅手',
        type: HARM,
        scope: SINGLE
    },
    {
        code: SK2,
        name: '妙手回春',
        type: TREAT,
        scope: GROUP
    },
    {
        code: SK3,
        name: '一夫当关',
        type: GIVEN,
        scope: GROUP
    },
    {
        code: SK4,
        name: '九阴真经',
        type: GAIN,
        scope: SINGLE
    },
    {
        code: SK5,
        name: '降龙十八掌',
        type: HARM,
        scope: GROUP
    },
    {
        code: SK6,
        name: '阴兵列阵',
        type: CALL,
        scope: GROUP
    }
];

const REWARD_EMPTY = 0;
const REWARD_HP_PLUS = 1; // +hp
const REWARD_HP_MINUS = 2; // -hp
const REWARD_ATK_PLUS = 3; // +atk
const REWARD_ATK_MINUS = 4; // -atk

const Reward = {
    REWARD_EMPTY,
    REWARD_HP_PLUS,
    REWARD_HP_MINUS,
    REWARD_ATK_PLUS,
    REWARD_ATK_MINUS
};

module.exports = {
    DEATH,
    HEALTHY,
    SKILLS,
    SkillType,
    SkillScope,
    HERO_POOL,
    Reward,
    DEFAULT_SKILL,
    ATK
};