const DEATH = 0;
const HEALTHY = 1;
const ME = 'Me';

const ATK = 10;
const SK1 = 11;
const SK2 = 12;
const SK3 = 13;
const SK4 = 14;
const SK5 = 15;

const HARM = 70; //伤害型
const TREAT = 71; // 治疗型
const GAIN = 72; // 增益型
const GIVEN = 73; // 减益型
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

// 技能格式: code|type|scope|name|value; 例如: `${ATK}|${HARM}|${SINGLE}|${'普通攻击'}|value`
const SKILLS = [
    {
        code: ATK,
        name: '普通攻击',
        type: HARM,
        scope: SINGLE
    },
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
    }
];

module.exports = {
    DEATH,
    HEALTHY,
    ME,
    SKILLS,
    SkillType,
    SkillScope
}