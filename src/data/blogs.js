// Local, static blog content — no CMS/API involved. The site previously
// fetched blog posts from https://order.tareeqk.ae, but that backend's
// /blogs list endpoint returns a real HTTP 404 and individual /pages
// slugs come back as "Page not found", so there was never any live blog
// content to show. This file is the source of truth now; add new posts
// here directly.
//
// Each post carries its own title/description/section/html per language
// under `translations`. Urdu isn't translated yet for any post — callers
// fall back to English via `localizeBlog` until real ur copy exists,
// matching how the rest of the site's i18n gaps already fall back.

export const BLOGS = [
  {
    id: 1,
    slug: 'how-to-choose-a-trusted-car-recovery-service-in-dubai',
    image: '/tareeqktow.jpg',
    date: '2026-07-11',
    mins: 6,
    translations: {
      en: {
        title: 'How to Choose a Trusted Car Recovery Service in Dubai',
        description:
          'Why choosing the right recovery service matters, what to look for in a provider, and why Tareeqk is built for it.',
        section: 'Guides',
        html: `
          <h2>Why choosing the right recovery service matters</h2>
          <p>A car breakdown can happen without warning, whether you are on a busy highway, in the city, or parked somewhere far from help. In those moments, the quality of the recovery service matters because it affects your safety, your time, and your peace of mind. A trusted provider should respond quickly, handle your vehicle carefully, and make the process simple from the start.</p>
          <p>In Dubai, drivers also expect convenience. That is why modern recovery services are moving toward digital booking and real-time support. With Tareeqk, you get a smarter way to request help without unnecessary delays.</p>

          <h2>What to look for in a trusted service</h2>
          <p>A reliable car recovery service should offer more than just a tow truck. Before choosing a provider, check for the following:</p>
          <ul>
            <li>Fast response time so you are not left waiting for long.</li>
            <li>Dubai-wide coverage so help can reach you wherever you are.</li>
            <li>Simple booking process that works well during emergencies.</li>
            <li>Clear communication so you know what to expect.</li>
            <li>Safe vehicle handling by a professional recovery team.</li>
          </ul>

          <h2>Why Tareeqk is a better choice</h2>
          <p>Tareeqk is designed for drivers who want a modern and dependable recovery experience. Instead of relying on slow phone calls or unclear support, customers can book help through the app in a faster and more organized way. This makes the entire process easier when time matters most.</p>
          <p>The app also helps reduce confusion during emergencies. You can share your location, request assistance, and move through the process with less back-and-forth. For Dubai drivers, that means less stress and a quicker path to recovery.</p>

          <h2>App benefits of Tareeqk</h2>
          <ul>
            <li>Faster booking, so you can request help in just a few steps.</li>
            <li>Convenient mobile access, which is useful when you are stranded or in a rush.</li>
            <li>Better location accuracy, helping the recovery team find you more easily.</li>
            <li>Less communication delay, since your request is already captured in the app.</li>
            <li>A smoother customer experience, especially during urgent roadside situations.</li>
            <li>Modern service approach, designed for today's drivers in Dubai.</li>
          </ul>
          <p>These benefits matter because breakdowns are stressful enough on their own. Tareeqk helps remove extra friction from the process so drivers can focus on getting safe, quick support.</p>

          <h2>Conclusion</h2>
          <p>Choosing a trusted car recovery service in Dubai is about finding a provider that is fast, professional, and easy to use. Tareeqk brings those qualities together through its app-based platform, helping drivers get support with less stress and more confidence.</p>
        `,
      },
      ar: {
        title: 'كيفية اختيار خدمة موثوقة لسحب المركبات في دبي',
        description:
          'لماذا يُعد اختيار خدمة السحب المناسبة أمرًا مهمًا، وما الذي يجب البحث عنه في مزود الخدمة، ولماذا صُمم طريقك ليكون الخيار الأمثل.',
        section: 'أدلة',
        html: `
          <h2>لماذا يُعد اختيار خدمة السحب المناسبة أمرًا مهمًا؟</h2>
          <p>قد يتعطل سيارتك دون سابق إنذار، سواء كنت على طريق سريع مزدحم، أو داخل المدينة، أو متوقفًا في مكان بعيد عن المساعدة. في مثل هذه المواقف، تلعب جودة خدمة سحب المركبات دورًا مهمًا لأنها تؤثر على سلامتك، ووقتك، وراحة بالك. يجب أن تستجيب الخدمة الموثوقة بسرعة، وأن تتعامل مع مركبتك بعناية، وأن تجعل عملية طلب المساعدة سهلة منذ البداية.</p>
          <p>في دبي، يتوقع السائقون أيضًا مستوى عالٍ من الراحة والسهولة. ولهذا السبب تتجه خدمات سحب المركبات الحديثة إلى الحجز الرقمي والدعم الفوري. مع طريقك (Tareeqk)، يمكنك طلب المساعدة بطريقة أكثر ذكاءً وسرعة دون أي تأخير غير ضروري.</p>

          <h2>ما الذي يجب البحث عنه في خدمة سحب موثوقة؟</h2>
          <p>يجب أن تقدم خدمة سحب المركبات الموثوقة أكثر من مجرد شاحنة سحب. قبل اختيار مزود الخدمة، تأكد من توفر ما يلي:</p>
          <ul>
            <li>سرعة الاستجابة حتى لا تضطر إلى الانتظار لفترة طويلة.</li>
            <li>تغطية شاملة في جميع أنحاء دبي لتصلك المساعدة أينما كنت.</li>
            <li>عملية حجز سهلة وسريعة تعمل بكفاءة في حالات الطوارئ.</li>
            <li>تواصل واضح وشفاف لتعرف ما يمكن توقعه.</li>
            <li>التعامل الآمن مع المركبة بواسطة فريق متخصص ومحترف.</li>
          </ul>

          <h2>لماذا يُعد طريقك الخيار الأفضل؟</h2>
          <p>تم تصميم طريقك (Tareeqk) للسائقين الذين يبحثون عن تجربة حديثة وموثوقة في خدمات سحب المركبات. بدلاً من الاعتماد على المكالمات الهاتفية البطيئة أو إجراءات الدعم غير الواضحة، يمكن للعملاء طلب الخدمة مباشرة عبر التطبيق بطريقة أسرع وأكثر تنظيمًا، مما يجعل العملية بأكملها أكثر سهولة عندما يكون الوقت عاملًا مهمًا.</p>
          <p>كما يساعد التطبيق على تقليل الارتباك في حالات الطوارئ، حيث يمكنك مشاركة موقعك، وطلب المساعدة، وإتمام العملية بسهولة ودون الحاجة إلى اتصالات متكررة. بالنسبة لسائقي دبي، يعني ذلك ضغطًا أقل ووصولًا أسرع إلى المساعدة.</p>

          <h2>مزايا تطبيق طريقك</h2>
          <ul>
            <li>حجز أسرع بحيث يمكنك طلب المساعدة خلال خطوات بسيطة.</li>
            <li>سهولة الوصول عبر الهاتف المحمول، وهو أمر مهم عندما تكون متوقفًا على الطريق أو في عجلة من أمرك.</li>
            <li>دقة أعلى في تحديد الموقع، مما يساعد فريق السحب على الوصول إليك بسرعة.</li>
            <li>تقليل التأخير في التواصل لأن جميع تفاصيل الطلب يتم إرسالها مباشرة عبر التطبيق.</li>
            <li>تجربة استخدام أكثر سلاسة خاصة في حالات الطوارئ على الطريق.</li>
            <li>خدمة حديثة ومتطورة مصممة لتلبية احتياجات السائقين في دبي.</li>
          </ul>
          <p>تكتسب هذه المزايا أهمية كبيرة لأن تعطل المركبة بحد ذاته يُسبب التوتر. ويساعدك طريقك على تقليل التعقيدات، حتى تتمكن من الحصول على المساعدة بسرعة وأمان وبأقل قدر من الإجهاد.</p>

          <h2>الخلاصة</h2>
          <p>يعتمد اختيار خدمة موثوقة لسحب المركبات في دبي على العثور على مزود خدمة يتميز بالسرعة، والاحترافية، وسهولة الاستخدام. ويجمع طريقك (Tareeqk) بين هذه المزايا من خلال منصته الذكية المعتمدة على التطبيق، مما يساعد السائقين على الحصول على المساعدة بسرعة، وبثقة أكبر، وبأقل قدر من التوتر.</p>
        `,
      },
      ur: {
        title: 'دبئی میں قابلِ اعتماد کار ریکوری سروس کا انتخاب کیسے کریں',
        description:
          'صحیح ریکوری سروس کا انتخاب کیوں اہم ہے، سروس فراہم کنندہ میں کیا دیکھنا چاہیے، اور طریقک اس مقصد کے لیے کیوں بہترین ہے۔',
        section: 'گائیڈز',
        html: `
          <h2>صحیح کار ریکوری سروس کا انتخاب کیوں اہم ہے؟</h2>
          <p>گاڑی کسی بھی وقت بغیر کسی پیشگی اطلاع کے خراب ہو سکتی ہے، چاہے آپ کسی مصروف ہائی وے پر ہوں، شہر کے اندر سفر کر رہے ہوں، یا کسی ایسی جگہ کھڑے ہوں جہاں مدد فوری دستیاب نہ ہو۔ ایسے حالات میں ریکوری سروس کا معیار بہت اہم ہوتا ہے کیونکہ یہ آپ کی حفاظت، آپ کے وقت، اور ذہنی سکون پر براہِ راست اثر انداز ہوتا ہے۔ ایک قابلِ اعتماد سروس فراہم کنندہ کو فوری طور پر مدد فراہم کرنی چاہیے، آپ کی گاڑی کو احتیاط سے سنبھالنا چاہیے، اور شروع سے آخر تک پورا عمل آسان بنانا چاہیے۔</p>
          <p>دبئی میں ڈرائیورز سہولت اور تیز رفتار سروس کی بھی توقع رکھتے ہیں۔ اسی لیے جدید کار ریکوری سروسز اب ڈیجیٹل بکنگ اور ریئل ٹائم سپورٹ کی طرف بڑھ رہی ہیں۔ طریقک (Tareeqk) کے ذریعے آپ بغیر کسی غیر ضروری تاخیر کے زیادہ آسان اور جدید طریقے سے مدد حاصل کر سکتے ہیں۔</p>

          <h2>قابلِ اعتماد ریکوری سروس میں کن باتوں کا خیال رکھیں؟</h2>
          <p>ایک اچھی کار ریکوری سروس صرف ٹو ٹرک فراہم کرنے تک محدود نہیں ہونی چاہیے۔ سروس منتخب کرنے سے پہلے درج ذیل چیزیں ضرور دیکھیں:</p>
          <ul>
            <li>فوری رسپانس ٹائم تاکہ آپ کو زیادہ دیر انتظار نہ کرنا پڑے۔</li>
            <li>پورے دبئی میں سروس کی دستیابی تاکہ آپ جہاں بھی ہوں، مدد آپ تک پہنچ سکے۔</li>
            <li>آسان اور تیز بکنگ کا عمل جو ہنگامی حالات میں مؤثر طریقے سے کام کرے۔</li>
            <li>واضح اور مؤثر رابطہ تاکہ آپ کو ہر مرحلے کی معلومات حاصل رہیں۔</li>
            <li>پیشہ ور ٹیم کے ذریعے گاڑی کو محفوظ طریقے سے سنبھالنا۔</li>
          </ul>

          <h2>طریقک بہتر انتخاب کیوں ہے؟</h2>
          <p>طریقک اُن ڈرائیورز کے لیے بنایا گیا ہے جو جدید، تیز رفتار، اور قابلِ اعتماد کار ریکوری سروس چاہتے ہیں۔ سست فون کالز یا غیر واضح سپورٹ پر انحصار کرنے کے بجائے، صارفین ایپ کے ذریعے چند آسان مراحل میں ریکوری سروس بُک کر سکتے ہیں، جس سے پورا عمل زیادہ منظم اور تیز ہو جاتا ہے، خاص طور پر ایسے وقت میں جب ہر لمحہ اہم ہوتا ہے۔</p>
          <p>یہ ایپ ہنگامی حالات میں الجھن بھی کم کرتی ہے۔ آپ اپنا موجودہ مقام شیئر کر سکتے ہیں، فوری مدد طلب کر سکتے ہیں، اور بار بار رابطہ کیے بغیر پورا عمل مکمل کر سکتے ہیں۔ دبئی کے ڈرائیورز کے لیے اس کا مطلب ہے کم پریشانی اور زیادہ تیزی سے مدد حاصل کرنا۔</p>

          <h2>طریقک ایپ کے فوائد</h2>
          <ul>
            <li>تیز تر بکنگ تاکہ آپ چند آسان مراحل میں مدد حاصل کر سکیں۔</li>
            <li>موبائل کے ذریعے آسان رسائی، خاص طور پر جب آپ سڑک پر پھنس جائیں یا جلدی میں ہوں۔</li>
            <li>زیادہ درست لوکیشن شیئرنگ تاکہ ریکوری ٹیم آپ تک جلد پہنچ سکے۔</li>
            <li>رابطے میں کم تاخیر کیونکہ آپ کی درخواست پہلے ہی ایپ میں محفوظ ہو جاتی ہے۔</li>
            <li>بہتر صارف تجربہ، خاص طور پر ہنگامی سڑک کنارے کی صورتحال میں۔</li>
            <li>جدید اور اسمارٹ سروس جو آج کے دبئی کے ڈرائیورز کی ضروریات کے مطابق تیار کی گئی ہے۔</li>
          </ul>
          <p>یہ تمام فوائد اس لیے اہم ہیں کیونکہ گاڑی کا خراب ہونا خود ہی ایک پریشان کن صورتحال ہوتی ہے۔ طریقک اس عمل کو آسان بناتا ہے تاکہ ڈرائیور محفوظ، تیز، اور مؤثر مدد حاصل کر سکیں۔</p>

          <h2>نتیجہ</h2>
          <p>دبئی میں قابلِ اعتماد کار ریکوری سروس کا انتخاب کرتے وقت ایسی کمپنی کا انتخاب کریں جو تیز، پیشہ ور، اور استعمال میں آسان ہو۔ طریقک اپنی ایپ پر مبنی جدید سروس کے ذریعے یہ تمام خصوصیات فراہم کرتا ہے، جس سے ڈرائیور کم پریشانی کے ساتھ زیادہ اعتماد کے ساتھ فوری مدد حاصل کر سکتے ہیں۔</p>
        `,
      },
    },
  },
]

// Merges a post's shared fields (id, slug, image, date, mins) with the
// requested language's translation, falling back to English for any
// language that doesn't have a translation yet.
function localizeBlog(blog, lang) {
  const tr = blog.translations[lang] || blog.translations.en
  const { translations, ...shared } = blog
  return { ...shared, ...tr }
}

// Newest-first, by date — so the listing page's featured slot and grid
// order stay correct as posts are appended to BLOGS in any order.
export function getLocalizedBlogs(lang = 'en') {
  return BLOGS
    .map((b) => localizeBlog(b, lang))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getBlogBySlugOrId(slugOrId, lang = 'en') {
  const needle = String(slugOrId).replace(/^blog-/, '')
  const blog = BLOGS.find((b) => b.slug === slugOrId || String(b.id) === needle)
  return blog ? localizeBlog(blog, lang) : null
}
