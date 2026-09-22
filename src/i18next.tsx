import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLanguage = localStorage.getItem('app_language') || 'en';

const resources = {
  en: {
    translation: {
      brand: "Riwaq",

      nav: {
        feed: "Feed",
        discover: "Discover Mentors",
        points: "Points Store",
        chats: "Active Chats",
        leaderboard: "Leaderboard",
      },

      footer: {
        codeOfConduct: "Code of Conduct",
        protocols: "Skill Verification Protocols",
      },

      actions: {
        switchLang: "AR",
        toggleTheme: "Toggle theme",
      },

      auth: {
        zeroPayProtocol: "ZERO-PAY PROTOCOL",
        decentralizedExchange: "Decentralized Peer Exchange",
        heroTitlePrefix: "Master skills through",
        heroTitleHighlight: "direct peer exchange",
        heroSubtitle: "Trade your expertise in engineering, product, and design for verified 1-on-1 mentorship. Real humans, real craft, zero cash transactions.",
        activeExchanges: "Active Exchanges",
        testimonialQuote: "“Traded 3 hours of Next.js architecture for high-conversion design systems. Pure value.”",
        realTimeMatches: "429 Real-Time Matches in Progress",
        avgResponseTime: "Average response time: 3.4 mins",
        fulfillmentRate: "99.4% Bilateral Fulfillment Rate",

        tabs: {
          login: "Log In",
          signup: "Sign Up",
        },

        titles: {
          login: "Access Peer Network",
          signup: "Create Peer Account",
        },

        subtitles: {
          login: "Authenticate your credentials to continue active exchanges",
          signup: "Join thousands of peer mentors and start swapping skills",
        },

        orContinueWith: "Or continue with",

        labels: {
          email: "Work or Academic Email",
          password: "Password",
          fullName: "Full Name",
          keepSignedIn: "Keep me signed in on this device",
          agreeTerms: "I agree to the Knowledge Exchange Charter",
          forgotPassword: "Forgot?",
        },

        placeholders: {
          email: "peer@domain.com",
          password: "••••••••••••",
          registerPassword: "At least 8 characters",
          fullName: "Tasneem Jarrar",
        },

        accessibility: {
          showPassword: "Show password",
          hidePassword: "Hide password",
        },

        buttons: {
          loginSubmit: "Continue to Setup",
          signupSubmit: "Create Account",
        },

        charterText: "By authenticating, you accept our",
        charterLink: "Knowledge Exchange Charter",

        badges: {
          zeroPay: "ZERO-PAY PEER PROTOCOL",
          encrypted: "ENCRYPTED LEDGER",
        },

        footer: {
          status: "Network Operational",
          privacy: "Privacy",
          protocol: "Peer Protocol",
          audit: "Audit Ledger",
        },
      },

      common: {
        close: "Close",
        remove: "Remove",
      },

      onboarding: {
        algorithmBadge: "Personalized Knowledge Matching",
        heading: "Build your knowledge exchange profile",
        subheading: "Tell us what you can teach and what you want to learn so we can connect you with the right people.",

        pairingVelocity: {
          label: "Matching",
          value: "Personalized",
        },

        learningMethod: {
          title: "How do you want to learn?",
          description: "Choose your preferred learning method first. This helps us show you the skills that fit your learning style.",
          loading: "Loading learning methods...",
          error: "We couldn't load the learning methods. Please try again.",
          continue: "Continue",
          saving: "Saving...",
        },

        teach: {
          title: "Skills I Can Teach",
          description: "Add skills you are confident sharing with other members.",
          selected: "{{count}} selected",
          searchPlaceholder: "Search skills you can teach...",
          currentOfferings: "Your skills",
          availableSkills: "Available skills",
        },

        learn: {
          title: "Skills I Want to Learn",
          description: "Choose the skills you want to develop through knowledge exchange.",
          goals: "{{count}} goals",
          searchPlaceholder: "Search skills you want to learn...",
          targetDisciplines: "Your learning goals",
          availableSkills: "Available skills",
        },

        noSkillsFound: "No skills found.",

        proficiency: {
          title: "Set your proficiency",
          description: "Choose the level that best describes your current ability in this skill.",
          confirm: "Add Skill",

          levels: {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
            expert: "Expert",
          },

          descriptions: {
            beginner: "I know the basics and am still learning.",
            intermediate: "I can use this skill independently.",
            advanced: "I have strong practical experience.",
            expert: "I have deep expertise and can mentor others.",
          },
        },

        weeklyCommitment: {
          title: "Weekly Commitment",
          recommended: "Recommended: {{hours}} hours per week",
          hours: "{{hours}} hr",
        },

        skillVerification: {
          label: "Skill Verification",
          description: "Verification can help build trust between peers.",
          tier: "Available",
        },

        synergy: {
          title: "Knowledge Match",
          badge: "Smart Matching",
          description: "Your {{skills}} skills can help us find relevant knowledge exchange opportunities.",
        },

        actions: {
          skip: "Skip for now",
          karma: "+{{points}} Karma",
          complete: "Continue to Riwaq",
        },
      },

      points: {
        status: "Points Synced",
        exchangeRules: "Exchange Rules",
        teachToEarn: "Teach to Earn",
        heading: "Points & Mentor Requests",
        subheading: "Turn the points you earn from teaching into extra mentor connection requests.",

        balance: {
          label: "Available Balance",
          unit: "PTS",
          earnHint: "Earn +100 points for every completed mentoring session",
          quotaLabel: "Requests Used This Month",
          quotaValue: "{{used}}/{{total}} Left",
          quotaReset: "Resets in {{days}} days",
        },

        stats: {
          lifetimeEarned: "Lifetime Earned",
          lifetimeGrowth: "+{{percent}}% this month",
          pointsRedeemed: "Points Redeemed",
          redeemedCount: "{{count}} requests",
          exchangeRatio: "Points Per Request",
          exchangeRatioValue: "{{points}} pts = 1 request",
        },

        howItWorks: {
          title: "How Points Work",
          step1Title: "Teach skills to peers",
          step1Desc: "Deliver a verified 45-minute coaching session",
          step2Title: "Earn verified points",
          step2Desc: "+100 points added to your balance",
          step3Title: "Unlock extra requests",
          step3Desc: "Skip the waitlist for popular mentors",
          free: "Always free — no purchases",
          learnMore: "Learn more",
        },

        exchange: {
          title: "Exchange Your Points",
          subtitle: "Use your points instantly to add extra requests to your monthly quota.",
          selectTier: "Select a tier below",
          recommended: "RECOMMENDED • SAVE {{points}} PTS",

          tiers: {
            starter: {
              tag: "Entry",
              name: "Starter Pack",
              description: "Add one extra request to your monthly quota, instantly.",
              requests: "1 Extra Request",
              features: ["Never expires", "Message mentors directly"],
              notIncluded: "No priority matching",
              cta: "Exchange for {{points}} Pts",
            },

            momentum: {
              tag: "Most Popular",
              name: "Progress Sprint",
              description: "Our most popular pack for learners who want to move faster.",
              requests: "3 Extra Requests",
              features: [
                "Works with every mentor category",
                "Matched during your active hours",
                "Includes 1 guaranteed match",
              ],
              cta: "Exchange for {{points}} Pts",
            },

            mastery: {
              tag: "Best Value • Save {{points}} Pts",
              name: "Mastery Pack",
              description: "Best for serious learners. Unlocks priority matching.",
              requests: "5 Extra Requests",
              features: [
                "Priority matching queue",
                "Mentors respond within 24 hours",
                "Access to exclusive study groups",
              ],
              cta: "Exchange for {{points}} Pts",
            },
          },
        },

        activity: {
          title: "Recent Activity",
          subtitle: "Your recent points earned and spent.",
          filters: {
            all: "All",
            earned: "Earned",
            spent: "Spent",
          },
          showing: "Showing {{shown}} of {{total}}",
          download: "Download Activity History (CSV)",
        },

        earnMore: {
          title: "Earn More Points",
          subtitle: "Open requests matching your skills. Help out and earn points instantly.",
          accept: "Accept",
          trustScore: "Trust Score: {{percent}}%",
          trustSubtitle: "Top {{percent}}% of mentor satisfaction",
        },
      },

      seo: {
        login: {
          title: "Log In | Riwaq",
          description: "Log in to Riwaq and continue exchanging skills and knowledge with your peers.",
        },

        signup: {
          title: "Create Account | Riwaq",
          description: "Create your Riwaq account and start exchanging skills and knowledge with peers.",
        },

        onboarding: {
          title: "Build Your Profile | Riwaq",
          description: "Tell Riwaq what you can teach and what you want to learn to find meaningful knowledge exchanges.",
        },

        feed: {
          title: "Feed | Riwaq",
          description: "Explore knowledge exchange opportunities and connect with peers on Riwaq.",
        },

        discover: {
          title: "Discover Mentors | Riwaq",
          description: "Discover peers and mentors who can help you learn new skills through direct knowledge exchange.",
        },

        points: {
          title: "Points Store | Riwaq",
          description: "Use your Riwaq points to access rewards and opportunities within the knowledge exchange community.",
        },

        chats: {
          title: "Active Chats | Riwaq",
          description: "View and manage your active knowledge exchange conversations on Riwaq.",
        },

        leaderboard: {
          title: "Leaderboard | Riwaq",
          description: "See the Riwaq community leaderboard and explore member contributions.",
        },
      },
    },
  },

  ar: {
    translation: {
      brand: "رِواق",

      nav: {
        feed: "الرئيسية",
        discover: "استكشف المرشدين",
        points: "متجر النقاط",
        chats: "المحادثات النشطة",
        leaderboard: "قائمة المتصدرين",
      },

      footer: {
        codeOfConduct: "قواعد السلوك",
        protocols: "بروتوكولات التحقق من المهارات",
      },

      actions: {
        switchLang: "EN",
        toggleTheme: "تبديل المظهر",
      },

      auth: {
        zeroPayProtocol: "بروتوكول التبادل دون مقابل مالي",
        decentralizedExchange: "تبادل مهارات لا مركزي",
        heroTitlePrefix: "طوّر مهاراتك من خلال",
        heroTitleHighlight: "التبادل المباشر بين الأقران",
        heroSubtitle: "شارك خبرتك في الهندسة والمنتجات والتصميم مقابل إرشاد فردي موثوق. تواصل حقيقي، وخبرات عملية، ودون أي معاملات مالية.",
        activeExchanges: "التبادلات النشطة",
        testimonialQuote: "“بادلت ثلاث ساعات من خبرتي في هندسة Next.js مقابل تصميم أنظمة عالية التحويل. قيمة حقيقية.”",
        realTimeMatches: "429 عملية مطابقة نشطة حاليًا",
        avgResponseTime: "متوسط زمن الاستجابة: 3.4 دقائق",
        fulfillmentRate: "99.4% معدل نجاح التبادل",

        tabs: {
          login: "تسجيل الدخول",
          signup: "إنشاء حساب",
        },

        titles: {
          login: "الوصول إلى شبكة الأقران",
          signup: "إنشاء حساب جديد",
        },

        subtitles: {
          login: "تحقق من بيانات اعتمادك للمتابعة في عمليات التبادل النشطة",
          signup: "انضم إلى آلاف الموجهين وابدأ في تبادل المهارات",
        },

        orContinueWith: "أو المتابعة باستخدام",

        labels: {
          email: "البريد الإلكتروني للعمل أو الدراسة",
          password: "كلمة المرور",
          fullName: "الاسم الكامل",
          keepSignedIn: "إبقائي مسجلًا على هذا الجهاز",
          agreeTerms: "أوافق على ميثاق تبادل المعرفة",
          forgotPassword: "هل نسيت كلمة المرور؟",
        },

        placeholders: {
          email: "peer@domain.com",
          password: "••••••••••••",
          registerPassword: "8 أحرف على الأقل",
          fullName: "تسنيم جرار",
        },

        accessibility: {
          showPassword: "إظهار كلمة المرور",
          hidePassword: "إخفاء كلمة المرور",
        },

        buttons: {
          loginSubmit: "المتابعة إلى إعداد الحساب",
          signupSubmit: "إنشاء الحساب",
        },

        charterText: "بتسجيل الدخول، فإنك توافق على",
        charterLink: "ميثاق تبادل المعرفة",

        badges: {
          zeroPay: "بروتوكول تبادل المهارات دون مقابل مالي",
          encrypted: "سجل مشفر",
        },

        footer: {
          status: "الشبكة تعمل بشكل طبيعي",
          privacy: "الخصوصية",
          protocol: "بروتوكول الأقران",
          audit: "سجل التدقيق",
        },
      },

      common: {
        close: "إغلاق",
        remove: "حذف",
      },

      onboarding: {
        algorithmBadge: "مطابقة معرفية مخصصة",
        heading: "أنشئ ملفك الخاص لتبادل المعرفة",
        subheading: "أخبرنا بالمهارات التي يمكنك تعليمها والمهارات التي ترغب في تعلمها لنساعدك على التواصل مع الأشخاص المناسبين.",

        pairingVelocity: {
          label: "المطابقة",
          value: "مخصصة",
        },

        learningMethod: {
          title: "كيف تريد أن تتعلم؟",
          description: "اختر طريقة التعلم المفضلة لديك أولًا. سيساعدنا ذلك على عرض المهارات التي تناسب أسلوب تعلمك.",
          loading: "جاري تحميل طرق التعلم...",
          error: "تعذر تحميل طرق التعلم. حاول مرة أخرى.",
          continue: "متابعة",
          saving: "جاري الحفظ...",
        },

        teach: {
          title: "المهارات التي يمكنني تعليمها",
          description: "أضف المهارات التي تمتلك فيها خبرة ويمكنك مشاركة معرفتك بها مع الأعضاء الآخرين.",
          selected: "{{count}} محددة",
          searchPlaceholder: "ابحث عن المهارات التي يمكنك تعليمها...",
          currentOfferings: "مهاراتك",
          availableSkills: "المهارات المتاحة",
        },

        learn: {
          title: "المهارات التي أريد تعلمها",
          description: "اختر المهارات التي ترغب في تطويرها من خلال تبادل المعرفة.",
          goals: "{{count}} أهداف",
          searchPlaceholder: "ابحث عن المهارات التي ترغب في تعلمها...",
          targetDisciplines: "أهدافك التعليمية",
          availableSkills: "المهارات المتاحة",
        },

        noSkillsFound: "لم يتم العثور على مهارات.",

        proficiency: {
          title: "حدد مستوى إتقانك",
          description: "اختر المستوى الذي يصف قدرتك الحالية في هذه المهارة بشكل أفضل.",
          confirm: "إضافة المهارة",

          levels: {
            beginner: "مبتدئ",
            intermediate: "متوسط",
            advanced: "متقدم",
            expert: "خبير",
          },

          descriptions: {
            beginner: "أعرف الأساسيات وما زلت أتعلم.",
            intermediate: "أستطيع استخدام هذه المهارة بشكل مستقل.",
            advanced: "أمتلك خبرة عملية قوية في هذه المهارة.",
            expert: "أمتلك خبرة متقدمة ويمكنني إرشاد الآخرين وتعليمهم.",
          },
        },

        weeklyCommitment: {
          title: "الالتزام الأسبوعي",
          recommended: "الموصى به: {{hours}} ساعات أسبوعيًا",
          hours: "{{hours}} ساعة",
        },

        skillVerification: {
          label: "التحقق من المهارات",
          description: "يساعد التحقق من المهارة على بناء الثقة بين الأقران.",
          tier: "متاح",
        },

        synergy: {
          title: "مطابقة المعرفة",
          badge: "مطابقة ذكية",
          description: "تساعدنا مهاراتك في {{skills}} على العثور على فرص مناسبة لتبادل المعرفة.",
        },

        actions: {
          skip: "تخطي الآن",
          karma: "+{{points}} كارما",
          complete: "المتابعة إلى رِواق",
        },
      },

      points: {
        status: "تمت مزامنة النقاط",
        exchangeRules: "قواعد التبادل",
        teachToEarn: "علّم لتربح",
        heading: "النقاط وطلبات الإرشاد",
        subheading: "حوّل النقاط التي تكسبها من التعليم إلى طلبات تواصل إضافية مع الموجهين.",

        balance: {
          label: "الرصيد المتاح",
          unit: "نقطة",
          earnHint: "اكسب +100 نقطة عن كل جلسة إرشاد مكتملة",
          quotaLabel: "الطلبات المستخدمة هذا الشهر",
          quotaValue: "تم استخدام {{used}} من أصل {{total}}",
          quotaReset: "يتجدد خلال {{days}} أيام",
        },

        stats: {
          lifetimeEarned: "إجمالي المكتسب",
          lifetimeGrowth: "+{{percent}}% هذا الشهر",
          pointsRedeemed: "النقاط المستبدلة",
          redeemedCount: "{{count}} طلبات",
          exchangeRatio: "النقاط لكل طلب",
          exchangeRatioValue: "{{points}} نقطة = طلب واحد",
        },

        howItWorks: {
          title: "كيف تعمل النقاط",
          step1Title: "علّم الأقران مهاراتك",
          step1Desc: "قدّم جلسة إرشاد موثقة مدتها 45 دقيقة",
          step2Title: "اكسب نقاطًا موثقة",
          step2Desc: "تُضاف 100+ نقطة إلى رصيدك",
          step3Title: "افتح طلبات إضافية",
          step3Desc: "تخطَّ قائمة الانتظار للموجهين المميزين",
          free: "مجاني دائمًا — بلا مدفوعات",
          learnMore: "اعرف المزيد",
        },

        exchange: {
          title: "بادل نقاطك",
          subtitle: "استخدم نقاطك فورًا لإضافة طلبات إضافية إلى حصتك الشهرية.",
          selectTier: "اختر باقة أدناه",
          recommended: "موصى به • وفّر {{points}} نقطة",

          tiers: {
            starter: {
              tag: "أساسي",
              name: "باقة البداية",
              description: "أضف طلبًا إضافيًا واحدًا إلى حصتك الشهرية فورًا.",
              requests: "طلب إضافي واحد",
              features: ["لا تنتهي صلاحيته", "راسل الموجهين مباشرة"],
              notIncluded: "بدون أولوية في المطابقة",
              cta: "بادل مقابل {{points}} نقطة",
            },

            momentum: {
              tag: "الأكثر رواجًا",
              name: "باقة التسارع",
              description: "الأكثر رواجًا بين المتعلمين الراغبين في التقدم بسرعة أكبر.",
              requests: "3 طلبات إضافية",
              features: [
                "تعمل مع جميع فئات الموجهين",
                "مطابقة خلال ساعاتك النشطة",
                "تشمل مطابقة واحدة مضمونة",
              ],
              cta: "بادل مقابل {{points}} نقطة",
            },

            mastery: {
              tag: "الأفضل قيمة • وفّر {{points}} نقطة",
              name: "باقة الاحتراف",
              description: "الأنسب للمتعلمين الجادين. يفتح أولوية المطابقة.",
              requests: "5 طلبات إضافية",
              features: [
                "أولوية في قائمة المطابقة",
                "يرد الموجهون خلال 24 ساعة",
                "الوصول إلى مجموعات دراسية حصرية",
              ],
              cta: "بادل مقابل {{points}} نقطة",
            },
          },
        },

        activity: {
          title: "النشاط الأخير",
          subtitle: "نقاطك المكتسبة والمصروفة مؤخرًا.",
          filters: {
            all: "الكل",
            earned: "مكتسب",
            spent: "مصروف",
          },
          showing: "عرض {{shown}} من {{total}}",
          download: "تنزيل سجل النشاط (CSV)",
        },

        earnMore: {
          title: "اكسب المزيد من النقاط",
          subtitle: "طلبات مفتوحة تطابق مهاراتك. ساعد واكسب نقاطًا فورًا.",
          accept: "قبول",
          trustScore: "درجة الثقة: {{percent}}%",
          trustSubtitle: "ضمن أفضل {{percent}}% من رضا المتعلمين",
        },
      },

      seo: {
        login: {
          title: "تسجيل الدخول | رِواق",
          description: "سجّل الدخول إلى رِواق واستمر في تبادل المهارات والمعرفة مع أقرانك.",
        },

        signup: {
          title: "إنشاء حساب | رِواق",
          description: "أنشئ حسابك في رِواق وابدأ بتبادل المهارات والمعرفة مع الأقران.",
        },

        onboarding: {
          title: "إنشاء ملفك الشخصي | رِواق",
          description: "أخبر رِواق بالمهارات التي يمكنك تعليمها والمهارات التي ترغب في تعلمها للعثور على فرص مناسبة لتبادل المعرفة.",
        },

        feed: {
          title: "الرئيسية | رِواق",
          description: "استكشف فرص تبادل المعرفة وتواصل مع الأقران عبر رِواق.",
        },

        discover: {
          title: "استكشف المرشدين | رِواق",
          description: "اكتشف الأقران والمرشدين الذين يمكنهم مساعدتك على تعلم مهارات جديدة من خلال تبادل المعرفة المباشر.",
        },

        points: {
          title: "متجر النقاط | رِواق",
          description: "استخدم نقاط رِواق للوصول إلى المكافآت والفرص داخل مجتمع تبادل المعرفة.",
        },

        chats: {
          title: "المحادثات النشطة | رِواق",
          description: "استعرض وأدر محادثات تبادل المعرفة النشطة الخاصة بك على رِواق.",
        },

        leaderboard: {
          title: "قائمة المتصدرين | رِواق",
          description: "استعرض قائمة المتصدرين في مجتمع رِواق واكتشف مساهمات الأعضاء.",
        },
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('app_language', lng);
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;