export const localeCookieName = 'levelup_locale';
export const defaultLocale = 'zh-CN';

export type AppLocale = 'zh-CN' | 'en-US';

export const dictionaries = {
  'zh-CN': {
    meta: {
      title: 'LevelUp',
      description: '与你同行的一段成长路。',
    },
    app: {
      loginQuestion: '我该怎么称呼你？',
      loginPlaceholder: '名字或邮箱',
      loginHint: '回车继续',
      loginError: '暂时无法继续，请输入名字或邮箱。',
      loginContext: '副业 MVP',
      emptyChat: '开始说吧。我会记住你说过的话。',
      inputPlaceholder: '说说你今天推进了什么……',
    },
    commandBar: {
      label: '命令栏',
      empty: '没有结果',
      goalsHeading: '目标',
      actionsHeading: '操作',
      actions: {
        newGoal: '新建目标',
        retro: '每周回看',
        roadmap: '查看完整路径',
        archive: '归档当前目标',
      },
      footer: {
        navigate: '移动',
        select: '选择',
        close: '关闭',
      },
    },
    nightBanner: {
      prompt: '已经很晚了。切换到深色模式吗？',
      confirm: '切换',
      dismiss: '先不用',
    },
    scenesNav: {
      chat: '对话',
      onboarding: '引导',
      empty: '空状态',
      milestone: '里程碑',
      lost: '低潮',
      command: '⌘K',
      drawer: '抽屉',
      settings: '设置',
      roadmap: '路径',
      support: '支撑树',
    },
    sidebar: {
      goals: '目标',
      newGoal: '新建目标',
    },
    drawer: {
      progress: '进度',
      startedAt: '开始于 3 月 4 日',
      timeline: '已进行 38 天 · 剩余 27 天',
      path: '路径',
      implementationIntention: '实施意图',
      edit: '编辑',
      roadmap: '路径总览',
      roadmapSoon: '路径总览视图即将提供',
    },
    inlineCard: {
      next: '下一步',
      viewFullPath: '查看完整路径',
      yourPosition: '你的位置',
      milestone: '当前里程碑',
      lastAction: '最近动作',
      allActiveGoals: '全部进行中的目标',
      pastDays: '过去 {days} 天',
      milestoneComplete: '里程碑完成',
    },
    onboarding: {
      sceneSilence: '01 / 静场',
      sceneLight: '02 / 光',
      sceneQuestion: '03 / 第一个问题',
      sceneIdentification: '04 / 识别',
      sceneAnchor: '05 / 锚点',
      question: '我该怎么称呼你？',
      hello: '你好，{name}。',
      helloFallback: '朋友',
      line1: '我会陪你走过其中一小段路。',
      line2: '开始之前，我想先听清一件事。',
      line3: '现在你最想推进的一件事是什么？ ↵',
      goalQuestionWithName: '{name}，你现在在朝什么方向走？',
      goalQuestionWithoutName: '你现在在朝什么方向走？',
      creating: '正在创建……',
    },
    mock: {
      goals: {
        g1: { title: '副业 MVP', sub: '完成 MVP 文档' },
        g2: { title: '每天写 500 字', sub: '连续 12 天' },
        g3: { title: '一年读 24 本书', sub: '停滞 · 16 天' },
      },
      frame5: {
        a1: '你昨天提到的 PRD 写完了吗？',
        u1: '写了三段。然后卡在 scope 那里。',
        a2: '你卡住的是范围不清，还是只是累了？',
      },
      frame6: {
        a1: '昨天你说要写 scope 那一节。后来怎么样？',
        u1: '写出来了。但感觉还是太大了。我开始怀疑整件事。',
        a2: '当你觉得范围太大时，通常只是下一步还没有被压到足够小。\n\n对你来说，最小但依然诚实的版本是什么？',
      },
    },
    scenes: {
      cmd: {
        context: '副业 MVP',
        line1: '我能感觉到，你又开始绕着 scope 这个问题打转了。',
        line2: '没关系。我们再一起走一遍。',
      },
      drawer: {
        context: '副业 MVP',
        ask: '给我看看路径。',
        goalTitle: '副业 MVP',
        progress: '进度',
        startedAt: '开始于 3 月 4 日',
        timeline: '已进行 38 天 · 剩余 27 天',
        path: '路径',
        implementationIntention: '实施意图',
        intentionText: '当晚上 9 点我坐到桌前，\n我就打开 MVP 文档并补完 scope 那一节，\n直到 25 分钟计时结束。',
        stats: '7 天运行 · 兑现 5 次',
        edit: '编辑',
      },
      empty: {
        title: '开始说吧。',
        sub: '我会记住你说过的话。',
        open: '打开',
      },
      lost: {
        user: '我觉得自己可能并不适合做这件事。',
        pause: '2 秒',
        title: '我在。',
        follow: '你想说一说，还是先安静一会儿？',
      },
      milestone: {
        context: '副业 MVP',
        title: 'MVP 文档',
        complete: '里程碑完成',
        line1: '三周前你说过，你可能做不到。',
        line2: '你还是做到了。',
      },
      roadmap: {
        context: '路径',
        tag: '全局路径',
        title: '接下来的 120 天',
        legendActive: '进行中',
        legendDone: '已完成',
        legendAhead: '前方',
        months: ['4 月', '5 月', '6 月', '7 月', '8 月'],
        now: '现在 · 4 月 11 日',
        foot: '点任意节点都可以继续聊 · ⌘↵ 直接进入',
        preview: '阶段 2 预览',
      },
      settings: {
        context: '设置',
        title: '设置',
        subtitle: '产品会围绕你做调整。这里的一切都不是强制的。',
        profile: '个人资料',
        name: '名字',
        timezone: '时区',
        memory: '我记得的内容',
        memoryHint: '你可以删除这里的任何内容。删除会让我们的连续感变弱一些。',
        appearance: '外观',
        theme: '主题',
        sound: '声音',
        dark: '深色',
      },
      supportTree: {
        context: '支撑树',
        level0: '第 0 层 — 为什么',
        why: '建立一种由我自己决定做什么的生活。',
        level1: '第 1 层 — 年度目标',
        level2: '第 2 层 — 里程碑',
        level3: '第 3 层 — 本周',
        level4: '第 4 层 — 实施意图',
        binding: '绑定句',
        bindingText: '当晚上 9 点我坐到桌前，\n我就打开文档并补完 scope 那一节，\n直到 25 分钟计时结束。',
        readThis: '如何读这棵树',
        readThisLines: [
          '每一层都只是为了支撑上一层而存在。',
          '当下面一层沉默了，先确认上面那层还成立不成立。',
          '如果还成立，就重新落锚。',
          '如果不成立，我们就把整条分支一起改写。',
        ],
        foot: '你的路径，一眼看到。',
        preview: '阶段 2 预览',
      },
    },
    shared: {
      progressDone: '已完成 · 3 月 18 日',
      progressInFlight: '进行中 · 58%',
      week7: '第 7 周',
      week9: '第 9 周',
      discovery: '探索',
      mvpDocument: 'MVP 文档',
      shipToFive: '交给 5 个用户',
      iterate: '迭代',
      dailyWriting: '每天写 500 字',
      streak12: '连续 12 天',
      read24: '一年读 24 本书',
      stalled16: '停滞 · 16 天',
      path: '路径',
      sideProjectMvp: '副业 MVP',
    },
  },
  'en-US': {
    meta: {
      title: 'LevelUp',
      description: 'Your growth companion — one who walked the road with you.',
    },
    app: {
      loginQuestion: 'What should I call you?',
      loginPlaceholder: 'Name or email',
      loginHint: 'Press Enter',
      loginError: 'Could not continue. Try a name or email.',
      loginContext: 'Side Project MVP',
      emptyChat: "Start talking. I'll remember what you say.",
      inputPlaceholder: 'Tell me what you moved today…',
    },
    commandBar: {
      label: 'Command Bar',
      empty: 'No results',
      goalsHeading: 'GOALS',
      actionsHeading: 'ACTIONS',
      actions: {
        newGoal: 'New goal',
        retro: 'Weekly reflection',
        roadmap: 'Show full roadmap',
        archive: 'Archive current goal',
      },
      footer: {
        navigate: 'NAVIGATE',
        select: 'SELECT',
        close: 'CLOSE',
      },
    },
    nightBanner: {
      prompt: "It's late. Switch to dark mode?",
      confirm: 'Yes',
      dismiss: 'Not now',
    },
    scenesNav: {
      chat: 'Chat',
      onboarding: 'Onboard',
      empty: 'Empty',
      milestone: 'Milestone',
      lost: 'Lost',
      command: '⌘K',
      drawer: 'Drawer',
      settings: 'Settings',
      roadmap: 'Roadmap',
      support: 'Support',
    },
    sidebar: {
      goals: 'GOALS',
      newGoal: 'NEW GOAL',
    },
    drawer: {
      progress: 'PROGRESS',
      startedAt: 'Started Mar 4',
      timeline: '38 days in · 27 days left',
      path: 'PATH',
      implementationIntention: 'IMPLEMENTATION INTENTION',
      edit: 'EDIT',
      roadmap: 'Roadmap',
      roadmapSoon: 'Roadmap view coming soon',
    },
    inlineCard: {
      next: 'NEXT',
      viewFullPath: 'VIEW FULL PATH',
      yourPosition: 'YOUR POSITION',
      milestone: 'MILESTONE',
      lastAction: 'LAST ACTION',
      allActiveGoals: 'ALL ACTIVE GOALS',
      pastDays: 'PAST {days} DAYS',
      milestoneComplete: 'MILESTONE COMPLETE',
    },
    onboarding: {
      sceneSilence: '01 / SILENCE',
      sceneLight: '02 / LIGHT',
      sceneQuestion: '03 / FIRST QUESTION',
      sceneIdentification: '04 / IDENTIFICATION',
      sceneAnchor: '05 / ANCHOR',
      question: 'What should I call you?',
      hello: 'Hello, {name}.',
      helloFallback: 'friend',
      line1: "I'm here to walk one stretch of the road with you.",
      line2: 'Before we start, I need to hear one thing.',
      line3: "What's the one thing you're trying to move forward right now? ↵",
      goalQuestionWithName: '{name}, what are you working toward?',
      goalQuestionWithoutName: 'What are you working toward?',
      creating: 'Creating...',
    },
    mock: {
      goals: {
        g1: { title: 'Side Project MVP', sub: 'Finish MVP document' },
        g2: { title: 'Daily 500 words', sub: '12 days streak' },
        g3: { title: 'Read 24 books', sub: 'Stalled · 16 days' },
      },
      frame5: {
        a1: 'Did you finish the PRD you mentioned yesterday?',
        u1: 'Got three sections in. Then got stuck on the scope part.',
        a2: 'Where did you get stuck — was the scope unclear in your head, or were you just tired?',
      },
      frame6: {
        a1: "Yesterday you said you'd write the scope section. How did it go?",
        u1: "Wrote it. Feels too ambitious though. I'm second-guessing the whole thing.",
        a2: "The scope feeling too big usually means the next step isn't defined yet.\n\nWhat's the smallest version of this that still feels honest to you?",
      },
    },
    scenes: {
      cmd: {
        context: 'Side Project MVP',
        line1: "I can feel it — you're circling the scope question again.",
        line2: "That's fine. Let's walk through it once more.",
      },
      drawer: {
        context: 'Side Project MVP',
        ask: 'Show me the path.',
        goalTitle: 'Side Project MVP',
        progress: 'PROGRESS',
        startedAt: 'Started Mar 4',
        timeline: '38 days in · 27 days left',
        path: 'PATH',
        implementationIntention: 'IMPLEMENTATION INTENTION',
        intentionText: "When it's 9pm and I sit at my desk,\nI'll open the MVP doc and fill the scope section,\nuntil the 25-min timer runs out.",
        stats: '7-DAY RUN · 5 KEPT',
        edit: 'EDIT',
      },
      empty: {
        title: 'Start talking.',
        sub: "I'll remember what you say.",
        open: 'to open',
      },
      lost: {
        user: "I don't think I'm cut out for this.",
        pause: '2 SECONDS',
        title: "I'm here.",
        follow: 'Do you want to talk — or do you want silence for a bit?',
      },
      milestone: {
        context: 'Side Project MVP',
        title: 'MVP document',
        complete: 'MILESTONE COMPLETE',
        line1: 'You said three weeks ago you might not make it.',
        line2: 'You did.',
      },
      roadmap: {
        context: 'The Path',
        tag: 'GLOBAL ROADMAP',
        title: 'Next 120 days',
        legendActive: 'ACTIVE',
        legendDone: 'DONE',
        legendAhead: 'AHEAD',
        months: ['APR', 'MAY', 'JUN', 'JUL', 'AUG'],
        now: 'NOW · APR 11',
        foot: 'Tap any node to talk about it · ⌘↵ to jump in',
        preview: 'PHASE 2 PREVIEW',
      },
      settings: {
        context: 'Settings',
        title: 'Settings',
        subtitle: 'The product adjusts around you. Everything here is optional.',
        profile: 'PROFILE',
        name: 'Name',
        timezone: 'Timezone',
        memory: 'WHAT I REMEMBER',
        memoryHint: 'You can delete anything here. Deletions may soften the continuity of our conversation.',
        appearance: 'APPEARANCE',
        theme: 'Theme',
        sound: 'Sound',
        dark: 'Dark',
      },
      supportTree: {
        context: 'Support Tree',
        level0: 'LEVEL 0 — THE WHY',
        why: 'Build a life where I choose what I work on.',
        level1: 'LEVEL 1 — YEAR GOAL',
        level2: 'LEVEL 2 — MILESTONES',
        level3: 'LEVEL 3 — THIS WEEK',
        level4: 'LEVEL 4 — IMPLEMENTATION INTENTION',
        binding: 'THE BINDING',
        bindingText: "When it's 9pm and I sit at the desk,\nI open the doc and fill the scope section,\nuntil the 25-min timer runs out.",
        readThis: 'READ THIS TREE',
        readThisLines: [
          'Each level exists to serve the one above it.',
          'When a lower node goes silent, check if the one above still holds.',
          'If it does, re-anchor.',
          "If it doesn't, we rewrite the whole branch.",
        ],
        foot: 'Your path, one view.',
        preview: 'PHASE 2 PREVIEW',
      },
    },
    shared: {
      progressDone: 'DONE · MAR 18',
      progressInFlight: 'IN PROGRESS · 58%',
      week7: 'WEEK 7',
      week9: 'WEEK 9',
      discovery: 'Discovery',
      mvpDocument: 'MVP document',
      shipToFive: 'Ship to 5 users',
      iterate: 'Iterate',
      dailyWriting: 'Daily 500 words',
      streak12: '12-day streak',
      read24: 'Read 24 books',
      stalled16: 'Stalled · 16 days',
      path: 'The Path',
      sideProjectMvp: 'Side Project MVP',
    },
  },
} as const;

export type Messages = (typeof dictionaries)[AppLocale];

export function getMessages(locale: AppLocale): Messages {
  return dictionaries[locale];
}

export function normalizeLocale(raw?: string | null): AppLocale | null {
  if (!raw) return null;
  const value = raw.toLowerCase();
  if (value.startsWith('zh')) return 'zh-CN';
  if (value.startsWith('en')) return 'en-US';
  return null;
}

export function resolveLocale(cookieLocale?: string | null, acceptLanguage?: string | null): AppLocale {
  const fromCookie = normalizeLocale(cookieLocale);
  if (fromCookie) return fromCookie;

  if (acceptLanguage) {
    for (const segment of acceptLanguage.split(',')) {
      const fromHeader = normalizeLocale(segment.split(';')[0]?.trim() ?? null);
      if (fromHeader) return fromHeader;
    }
  }

  return defaultLocale;
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}
