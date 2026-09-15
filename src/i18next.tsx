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
          signup: "Sign Up"
        },
        titles: {
          login: "Access Peer Network",
          signup: "Create Peer Account"
        },
        subtitles: {
          login: "Authenticate your credentials to continue active exchanges",
          signup: "Join thousands of peer mentors and start swapping skills"
        },
        orContinueWith: "Or continue with",
        labels: {
          email: "Work or Academic Email",
          password: "Password",
          fullName: "Full Name",
          keepSignedIn: "Keep me signed in on this device",
          agreeTerms: "I agree to the Knowledge Exchange Charter",
          forgotPassword: "Forgot?"
        },
        placeholders: {
          email: "peer@domain.com",
          password: "••••••••••••",
          registerPassword: "At least 8 characters",
          fullName: "Tasneem Jarrar"
        },
        accessibility: {
          showPassword: "Show password",
          hidePassword: "Hide password",
        },
        buttons: {
          loginSubmit: "Continue to Setup",
          signupSubmit: "Create Account"
        },
        charterText: "By authenticating, you accept our",
        charterLink: "Knowledge Exchange Charter",
        badges: {
          zeroPay: "ZERO-PAY PEER PROTOCOL",
          encrypted: "ENCRYPTED LEDGER"
        },
        footer: {
          status: "Network Operational · Global Mesh v2.4",
          privacy: "Privacy",
          protocol: "Peer Protocol",
          audit: "Audit Ledger"
        }
      }
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
        zeroPayProtocol: "بروتوكول بدون مقابل مالي",
        decentralizedExchange: "تبادل مهارات لا مركزي",
        heroTitlePrefix: "أتقن المهارات من خلال",
        heroTitleHighlight: "التبادل المباشر بين الأقران",
        heroSubtitle: "بادل خبرتك في الهندسة والمنتجات والتصميم مقابل إرشاد فردي موثوق. تفاعل حقيقي، خبرات واقعية، ودون أي معاملات مالية.",
        activeExchanges: "التبادلات النشطة",
        testimonialQuote: "“بادلت 3 ساعات من هيكلة Next.js مقابل تصميم أنظمة عالية التحويل. قيمة حقيقية.”",
        realTimeMatches: "429 تطابق نشط حالياً",
        avgResponseTime: "متوسط زمن الاستجابة: 3.4 دقائق",
        fulfillmentRate: "99.4% نسبة التبادل الناجح",
        tabs: {
          login: "تسجيل الدخول",
          signup: "إنشاء حساب"
        },
        titles: {
          login: "الدخول لشبكة الأقران",
          signup: "إنشاء حساب جديد"
        },
        subtitles: {
          login: "قم بالتحقق من بياناتك لمتابعة عمليات التبادل النشطة",
          signup: "انضم إلى آلاف الموجهين وابدأ في تبادل المهارات"
        },
        orContinueWith: "أو المتابعة بواسطة",
        labels: {
          email: "البريد الإلكتروني للعمل أو الأكاديمي",
          password: "كلمة المرور",
          fullName: "الاسم الكامل",
          keepSignedIn: "إبقائي قيد تسجيل الدخول على هذا الجهاز",
          agreeTerms: "أوافق على ميثاق تبادل المعرفة",
          forgotPassword: "نسيت؟"
        },
        placeholders: {
          email: "peer@domain.com",
          password: "••••••••••••",
          registerPassword: "8 أحرف على الأقل",
          fullName: "تسنيم جرار"
        },
        accessibility: {
          showPassword: "إظهار كلمة المرور",
          hidePassword: "إخفاء كلمة المرور",
        },
        buttons: {
          loginSubmit: "المتابعة لإعداد الحساب",
          signupSubmit: "إنشاء حساب جديد"
        },
        charterText: "بتسجيل دخولك، فإنك توافق على",
        charterLink: "ميثاق تبادل المعرفة",
        badges: {
          zeroPay: "بروتوكول التبادل المجاني",
          encrypted: "سجل مشفر"
        },
        footer: {
          status: "الشبكة تعمل · الشبكة العالمية v2.4",
          privacy: "الخصوصية",
          protocol: "بروتوكول الأقران",
          audit: "سجل التدقيق"
        }
      }
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