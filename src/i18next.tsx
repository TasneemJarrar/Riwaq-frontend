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
          firstName: "First Name",
          lastName: "Last Name",
          keepSignedIn: "Keep me signed in on this device",
          agreeTerms: "I agree to the Knowledge Exchange Charter",
          forgotPassword: "Forgot?",
        },

        placeholders: {
          email: "peer@domain.com",
          password: "••••••••••••",
          registerPassword: "At least 8 characters",
          fullName: "Tasneem Jarrar",
          firstName: "First name",
          lastName: "Last name",
          loadingLearningDirections: "Loading learning directions…",
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

      "profile": {
        "unknownUser": "Unnamed user",
        "verified": "Verified",
        "edit": "Edit",
        "editLabel": "Profile",
        "editProfile": "Edit profile",
        "aboutTitle": "About",
        "noBio": "No bio added yet.",
        "university": "University",
        "points": "Points",
        "skillsCount": "Skills",
        "learningDirection": "Learning direction",
        "notSet": "Not set",

        "error": {
          "title": "Something went wrong",
          "description": "We couldn't load this profile. Please try again."
        },

        "tabs": {
          "skills": "Skills",
          "reviews": "Reviews",
          "content": "Content",
          "history": "History"
        },

        "comingSoon": {
          "reviews": "Reviews are coming soon.",
          "content": "Content is coming soon.",
          "history": "History is coming soon."
        },

        "skillsLabel": "Skills",
        "skillsTitle": "Skills & learning direction",
        "skillsDescription": "The skills you can teach and the direction you're learning.",
        "skillsHaveDescription": "Skills you already have on your profile.",
        "skillsIHave": "Skills I have",
        "skillIWantToLearn": "Skill I want to learn",
        "noSkills": "No skills added yet.",
        "noSkillsFound": "No skills found.",
        "noLearningDirection": "No learning direction selected yet.",
        "editSkills": "Edit skills",
        "searchSkills": "Search skills",
        "chooseDirectionFirst": "Choose a learning direction first.",
        "learningDirectionDescription": "Pick the direction you want to learn, then choose the skills you already have.",
        "selectLearningDirection": "Select a learning direction",
        "saving": "Saving…",
        "saveChanges": "Save changes",

        "form": {
          "firstName": "First name",
          "lastName": "Last name",
          "bio": "Bio",
          "university": "University"
        },

        "experiences": {
          "title": "Experience",
          "subtitle": "Roles and highlights on your profile",
          "untitled": "Untitled experience",
          "empty": "No experiences yet.",
          "loadError": "Failed to load experiences.",
          "add": "Add experience",
          "edit": "Edit",
          "delete": "Delete",
          "addTitle": "Add experience",
          "editTitle": "Edit experience",
          "deleteConfirm": "Delete this experience?",
          "form": {
            "title": "Title",
            "titlePlaceholder": "e.g. Frontend Intern at Company",
            "description": "Description",
            "descriptionPlaceholder": "What did you work on?"
          }
        },
        "progress": {
          "title": "Learning progress",
          "subtitle": "Directions you are actively learning",
          "fallbackDirection": "Learning direction",
          "started": "Started {{date}}",
          "inProgress": "In progress",
          "empty": "No progress records yet.",
          "loadError": "Failed to load progress."
        },
        "sessions": {
          "title": "Learning sessions",
          "subtitle": "Scheduled and active exchanges",
          "untitled": "Untitled session",
          "scheduled": "Scheduled",
          "openMeeting": "Open meeting link →",
          "empty": "No sessions yet.",
          "loadError": "Failed to load sessions."
        },
        "content": {
          "title": "Published content",
          "subtitle": "Guides and posts you have shared",
          "fallbackType": "Content",
          "untitled": "Untitled",
          "open": "Open →",
          "empty": "No published content yet.",
          "loadError": "Failed to load published content.",
          "add": "Add content",
          "edit": "Edit",
          "delete": "Delete",
          "addTitle": "Add content",
          "editTitle": "Edit content",
          "deleteConfirm": "Delete this content?",
          "form": {
            "title": "Title",
            "titlePlaceholder": "e.g. Intro to React hooks",
            "description": "Description",
            "descriptionPlaceholder": "What is this about?",
            "contentType": "Type",
            "contentTypePlaceholder": "Select a type",
            "contentUrl": "URL",
            "contentUrlPlaceholder": "https://..."
          },
          "types": {
            "Text": "Text",
            "Image": "Image",
            "Video": "Video",
            "File": "File",
            "ExternalLink": "External link"
          },
        },
        "reviews": {
          "label": "Reviews",
          "title": "Reviews received",
          "subtitle": "Feedback from peers after learning sessions",
          "empty": "No reviews yet.",
          "loadError": "Failed to load reviews."
        },
      },

      contentDetail: {
        back: "Back to feed",
        loadError: "Could not load this post.",
        like: "Like",
        save: "Save",
        repost: "Repost",
        share: "Share",
        comments: "Comments",
        commentPlaceholder: "Write a comment…",
        postComment: "Post",
        noComments: "No comments yet.",
        editPost: "Edit post",
        deletePost: "Delete",
        deletePostConfirm: "Delete this post permanently?",
        editComment: "Edit comment",
        deleteComment: "Delete comment",
        deleteCommentConfirm: "Delete this comment?",
      },

      feed: {
        composer: {
          placeholder: "Share a breakthrough, tutorial, or exchange request with your peer network...",
          codeSnippet: "Code Snippet",
          resourceLink: "Resource Link",
          tagSkill: "Tag Skill",
          publish: "Publish",
          publishing: "Publishing...",
        },
        filters: {
          curated: "Curated For You",
          swap: "Peer Swap Requests",
          sandboxes: "Interactive Sandboxes",
          trust: "High Trust Nodes",
        },
        empty: "No posts yet. Be the first to share something!",
        post: {
          untitled: "Untitled",
          fallbackType: "Post",
          like: "Like",
          comment: "Comment",
          repost: "Repost",
          save: "Save",
          share: "Share",
          recommended: "Recommended for you",
          recommendedTopic: "Recommended: {{topic}}",
          userFallback: "User {{id}}",
        },
        sidebar: {
          weeklyGoal: "Weekly Goal",
          resetsIn: "Resets in 2d 8h",
          sessionAway: "1 session away",
          sessionAwayDesc: "Complete your third 1-on-1 swap session to unlock +150 platform points.",
          suggestedSwaps: "Suggested Swaps",
          viewAll: "View All",
          noSuggestions: "No suggestions available yet.",
          requestSwap: "Request Swap",
          match: "{{percent}}% Match",
          activeNodes: "Active Exchange Nodes",
          live: "Live",
          activeSwaps: "{{count}} active swaps",
        },
        swap: {
          empty: "No peer swap requests right now.",
          wantsToConnect: "Wants to connect / swap skills with you.",
          accept: "Accept",
          decline: "Decline",
        },
      },

      discover: {
        badge: "AI Skill Match Engine",
        title: "Peer Directory & Mutual Exchange",
        subtitle:
          "Algorithmic bi-directional match matrix. Pair with peers seeking the capabilities you teach.",
        balance: "Points balance",
        refill: "Refill Quota",
        searchPlaceholder: "Search by skill (e.g. Python, Figma) or mentor name...",
        filters: {
          all: "All Mentors",
          shared: "Looking for My Skills",
          match: "Best AI Match",
        },
        teaches: "Teaches",
        seeks: "Seeks",
        match: "{{percent}}% AI Match",
        consumesRequest: "Uses 1 connection request",
        sendRequest: "Send Connection Request",
        requestSent: "Request sent",
        empty: "No mentors found. Try another search or filter.",
        footer:
          "Peer reciprocity: connect to teach and learn — no cash transactions.",
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
        profile: {
          title: "Profile | Riwaq",
          description:
            "View and manage your Riwaq profile, skills, content, and learning progress.",
        },

        contentDetail: {
          title: "Post | Riwaq",
          description:
            "Read this knowledge post, engage with likes and comments, and share with peers on Riwaq.",
        },

        notFound: {
          title: "Page not found | Riwaq",
          description: "The page you are looking for does not exist on Riwaq.",
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
          firstName: "الاسم الأول",
          lastName: "اسم العائلة",
          keepSignedIn: "إبقائي مسجلًا على هذا الجهاز",
          agreeTerms: "أوافق على ميثاق تبادل المعرفة",
          forgotPassword: "هل نسيت كلمة المرور؟",
        },

        placeholders: {
          email: "peer@domain.com",
          password: "••••••••••••",
          registerPassword: "8 أحرف على الأقل",
          fullName: "تسنيم جرار",
          firstName: "الاسم الأول",
          lastName: "اسم العائلة",
          loadingLearningDirections: "جاري تحميل مسارات التعلم…",
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

      "profile": {
        "unknownUser": "مستخدم بلا اسم",
        "verified": "موثّق",
        "edit": "تعديل",
        "editLabel": "الملف الشخصي",
        "editProfile": "تعديل الملف الشخصي",
        "aboutTitle": "نبذة",
        "noBio": "لا توجد نبذة مضافة بعد.",
        "university": "الجامعة",
        "points": "النقاط",
        "skillsCount": "المهارات",
        "learningDirection": "مسار التعلم",
        "notSet": "غير محدد",

        "error": {
          "title": "حدث خطأ ما",
          "description": "تعذّر تحميل هذا الملف الشخصي. حاول مرة أخرى."
        },

        "tabs": {
          "skills": "المهارات",
          "reviews": "التقييمات",
          "content": "المحتوى",
          "history": "السجل"
        },

        "comingSoon": {
          "reviews": "قسم التقييمات قادم قريبًا.",
          "content": "قسم المحتوى قادم قريبًا.",
          "history": "قسم السجل قادم قريبًا."
        },

        "skillsLabel": "المهارات",
        "skillsTitle": "المهارات ومسار التعلم",
        "skillsDescription": "المهارات التي يمكنك تعليمها والمسار الذي تتعلمه حاليًا.",
        "skillsHaveDescription": "المهارات المضافة بالفعل إلى ملفك الشخصي.",
        "skillsIHave": "مهاراتي",
        "skillIWantToLearn": "المهارة التي أريد تعلمها",
        "noSkills": "لا توجد مهارات مضافة بعد.",
        "noSkillsFound": "لم يتم العثور على مهارات.",
        "noLearningDirection": "لم يتم اختيار مسار تعلم بعد.",
        "editSkills": "تعديل المهارات",
        "searchSkills": "ابحث عن المهارات",
        "chooseDirectionFirst": "اختر مسار التعلم أولًا.",
        "learningDirectionDescription": "اختر المسار الذي تريد تعلمه، ثم حدد المهارات التي تمتلكها بالفعل.",
        "selectLearningDirection": "اختر مسار التعلم",
        "saving": "جاري الحفظ…",
        "saveChanges": "حفظ التغييرات",

        "form": {
          "firstName": "الاسم الأول",
          "lastName": "اسم العائلة",
          "bio": "نبذة",
          "university": "الجامعة"
        },

        "progress": {
          "title": "تقدم التعلم",
          "subtitle": "المسارات التي تتعلمها حالياً",
          "fallbackDirection": "مسار تعليمي",
          "started": "بدأ في {{date}}",
          "inProgress": "قيد التقدم",
          "empty": "لا توجد سجلات تقدم بعد.",
          "loadError": "تعذّر تحميل التقدم."
        },
        "sessions": {
          "title": "جلسات التعلم",
          "subtitle": "التبادلات المجدولة والنشطة",
          "untitled": "جلسة بدون عنوان",
          "scheduled": "مجدولة",
          "openMeeting": "فتح رابط الاجتماع ←",
          "empty": "لا توجد جلسات بعد.",
          "loadError": "تعذّر تحميل الجلسات."
        },
        "content": {
          "title": "المحتوى المنشور",
          "subtitle": "الأدلة والمنشورات التي شاركتها",
          "fallbackType": "محتوى",
          "untitled": "بدون عنوان",
          "open": "فتح ←",
          "empty": "لا يوجد محتوى منشور بعد.",
          "loadError": "تعذّر تحميل المحتوى المنشور.",
          "add": "إضافة محتوى",
          "edit": "تعديل",
          "delete": "حذف",
          "addTitle": "إضافة محتوى",
          "editTitle": "تعديل المحتوى",
          "deleteConfirm": "هل تريد حذف هذا المحتوى؟",
          "form": {
            "title": "العنوان",
            "titlePlaceholder": "مثال: مقدمة في React hooks",
            "description": "الوصف",
            "descriptionPlaceholder": "ما موضوع هذا المحتوى؟",
            "contentType": "النوع",
            "contentTypePlaceholder": "اختر النوع",
            "contentUrl": "الرابط",
            "contentUrlPlaceholder": "https://..."
          },
          "types": {
            "Text": "نص",
            "Image": "صورة",
            "Video": "فيديو",
            "File": "ملف",
            "ExternalLink": "رابط خارجي"
          },
        },
        "reviews": {
          "label": "التقييمات",
          "title": "التقييمات المستلمة",
          "subtitle": "ملاحظات الأقران بعد جلسات التعلم",
          "empty": "لا توجد تقييمات بعد.",
          "loadError": "تعذّر تحميل التقييمات."
        },
        "experiences": {
          "title": "الخبرة",
          "subtitle": "الأدوار والإنجازات في ملفك الشخصي",
          "untitled": "خبرة بدون عنوان",
          "empty": "لا توجد خبرات بعد.",
          "loadError": "تعذّر تحميل الخبرات.",
          "add": "إضافة خبرة",
          "edit": "تعديل",
          "delete": "حذف",
          "addTitle": "إضافة خبرة",
          "editTitle": "تعديل الخبرة",
          "deleteConfirm": "هل تريد حذف هذه الخبرة؟",
          "form": {
            "title": "العنوان",
            "titlePlaceholder": "مثال: متدرب واجهات أمامية",
            "description": "الوصف",
            "descriptionPlaceholder": "ماذا عملت؟"
          }
        },
      },

      contentDetail: {
        back: "العودة إلى الرئيسية",
        loadError: "تعذّر تحميل هذا المنشور.",
        like: "إعجاب",
        save: "حفظ",
        repost: "إعادة نشر",
        share: "مشاركة",
        comments: "التعليقات",
        commentPlaceholder: "اكتب تعليقاً…",
        postComment: "نشر",
        noComments: "لا توجد تعليقات بعد.",
        editPost: "تعديل المنشور",
        deletePost: "حذف",
        deletePostConfirm: "هل تريد حذف هذا المنشور نهائياً؟",
        editComment: "تعديل التعليق",
        deleteComment: "حذف التعليق",
        deleteCommentConfirm: "هل تريد حذف هذا التعليق؟",
      },

      feed: {
        composer: {
          placeholder: "شارك اكتشافًا أو درسًا أو طلب تبادل مع شبكتك...",
          codeSnippet: "مقطع كود",
          resourceLink: "رابط مورد",
          tagSkill: "وسم مهارة",
          publish: "نشر",
          publishing: "جاري النشر...",
        },
        filters: {
          curated: "مخصص لك",
          swap: "طلبات التبادل",
          sandboxes: "مساحات تفاعلية",
          trust: "عقد عالية الثقة",
        },
        empty: "لا توجد منشورات بعد. كن أول من يشارك!",
        post: {
          untitled: "بدون عنوان",
          fallbackType: "منشور",
          like: "إعجاب",
          comment: "تعليق",
          repost: "إعادة نشر",
          save: "حفظ",
          share: "مشاركة",
          recommended: "موصى به لك",
          recommendedTopic: "موصى به: {{topic}}",
          userFallback: "مستخدم {{id}}",
        },
        sidebar: {
          weeklyGoal: "هدف الأسبوع",
          resetsIn: "يُعاد خلال يومين و8 ساعات",
          sessionAway: "جلسة واحدة متبقية",
          sessionAwayDesc: "أكمل جلسة التبادل الثالثة لفتح +150 نقطة.",
          suggestedSwaps: "تبادلات مقترحة",
          viewAll: "عرض الكل",
          noSuggestions: "لا توجد اقتراحات بعد.",
          requestSwap: "طلب تبادل",
          match: "تطابق {{percent}}%",
          activeNodes: "عقد التبادل النشطة",
          live: "مباشر",
          activeSwaps: "{{count}} تبادل نشط",
        },
        swap: {
          empty: "لا توجد طلبات تبادل حالياً.",
          wantsToConnect: "يريد التواصل / تبادل المهارات معك.",
          accept: "قبول",
          decline: "رفض",
        },
      },

      discover: {
        badge: "محرك مطابقة المهارات",
        title: "دليل الأقران والتبادل المتبادل",
        subtitle:
          "مصفوفة مطابقة ثنائية الاتجاه. تواصل مع أقران يبحثون عن ما تستطيع تعليمه.",
        balance: "رصيد النقاط",
        refill: "تعبئة الحصة",
        searchPlaceholder: "ابحث بالمهارة أو اسم المرشد...",
        filters: {
          all: "كل المرشدين",
          shared: "يبحثون عن مهاراتي",
          match: "أفضل مطابقة",
        },
        teaches: "يعلّم",
        seeks: "يبحث عن",
        match: "مطابقة {{percent}}%",
        consumesRequest: "يستخدم طلب تواصل واحد",
        sendRequest: "إرسال طلب تواصل",
        requestSent: "تم إرسال الطلب",
        empty: "لا يوجد مرشدون. جرّب بحثاً أو فلترًا آخر.",
        footer: "تبادل متكافئ: علّم وتعلّم — بدون معاملات نقدية.",
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
        profile: {
          title: "الملف الشخصي | رِواق",
          description:
            "اعرض وأدر ملفك الشخصي على رِواق، بما في ذلك المهارات والمحتوى وتقدم التعلم.",
        },

        contentDetail: {
          title: "منشور | رِواق",
          description:
            "اقرأ هذا المنشور المعرفي، تفاعل بالإعجابات والتعليقات، وشاركه مع الأقران على رِواق.",
        },

        notFound: {
          title: "الصفحة غير موجودة | رِواق",
          description: "الصفحة التي تبحث عنها غير موجودة على رِواق.",
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