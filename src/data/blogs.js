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
    image: '/tareeqktow.webp',
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
  {
    id: 2,
    slug: 'car-breakdown-in-dubai-what-to-do-and-who-to-call',
    image: '/blog/car-breakdown-dubai-desert.webp',
    date: '2026-09-10',
    mins: 4,
    translations: {
      en: {
        title: 'Car Breakdown in Dubai: What to Do and Who to Call',
        description:
          'What to do if your car breaks down in Dubai — how to stay safe, what to check, and when to call Tareeqk for fast roadside assistance.',
        section: 'Safety Tips',
        howToSteps: [
          {
            name: 'Move your car to a safe place',
            text: 'Slow down carefully and pull over in a parking area, roadside shoulder, or quiet side street rather than stopping in traffic. Turn on your hazard lights immediately, and place warning triangles if it is safe to do so.',
          },
          {
            name: 'Look for the obvious problem',
            text: 'If it is safe, check for common causes such as a flat tyre, dead battery, overheating, or an empty fuel tank. If you see smoke, smell burning, or notice a fluid leak, stop driving and wait for help instead.',
          },
          {
            name: 'Call for roadside assistance early',
            text: 'A battery issue may only need a jump start, a tyre issue may need repair or replacement, and a car that will not move needs towing or recovery. Calling early prevents further damage and reduces repair costs.',
          },
          {
            name: 'Stay safe while waiting for help',
            text: 'On a busy road, stay inside the car with your seatbelt on until help arrives. If you must exit, move away from traffic and wait in a secure area, keeping children and passengers close.',
          },
        ],
        html: `
          <h2>Car breakdowns happen without warning</h2>
          <p>A car breakdown in Dubai can happen at any time, especially in heavy traffic or extreme heat. When your vehicle stops working suddenly, the most important thing is to stay calm, move to safety, and call for professional help as soon as possible.</p>
          <p>Dubai's roads are busy, fast-moving, and often exposed to high temperatures. That means even a small issue, such as a dead battery, flat tyre, overheating engine, or fuel problem, can quickly turn into a stressful situation. Knowing what to do after a breakdown can help protect you, your passengers, and your vehicle.</p>

          <h2>Move your car to a safe place</h2>
          <p>If your car starts losing power or behaving strangely, slow down carefully and try to pull over in a safe location. A parking area, roadside shoulder, or quiet side street is much safer than stopping in traffic.</p>
          <p>Once you stop, turn on your hazard lights immediately. This alerts other drivers that your car is disabled and helps reduce the risk of an accident. If you have warning triangles and it is safe to place them, they can also help improve visibility.</p>

          <h2>Look for the obvious problem</h2>
          <p>If it is safe, check for any obvious signs of trouble. Common causes of a car breakdown in Dubai include a flat tire, dead battery, overheating, or an empty fuel tank.</p>
          <p>If you see smoke, smell burning, or notice fluid leaking from under the car, do not keep driving. In these situations, the best option is to wait for <a href="/en/roadside-assistance-dubai/">roadside assistance in Dubai</a> or a <a href="/en/car-recovery-dubai/">car recovery service</a>.</p>

          <h2>Call for roadside assistance early</h2>
          <p>Some problems can be fixed quickly on the spot, while others need professional support. A battery issue may only need a jump start, while a tyre issue may need repair or replacement. If your car will not move, then towing or recovery is the safest solution.</p>
          <p>Calling for help early can prevent further damage and reduce repair costs. Trying to drive a damaged vehicle can make the problem worse and may leave you stranded in a more dangerous location.</p>

          <h2>Stay safe while waiting for help</h2>
          <p>If you are on a busy road, it is often safer to stay inside the car until help arrives. Keep your seatbelt on if traffic is moving fast or visibility is low.</p>
          <p>If you need to exit the vehicle, move away from traffic and wait in a secure area. Keep children and passengers close, and avoid standing near the back or side of the car on active roads.</p>

          <h2>Why car breakdowns happen in Dubai</h2>
          <p>There are several reasons why drivers experience a vehicle breakdown in Dubai. The city's heat, traffic conditions, and long driving distances put extra pressure on cars.</p>
          <p>Batteries can weaken faster in extreme temperatures, tyres can wear out more quickly, and cooling systems can struggle if regular maintenance is delayed. That is why routine vehicle checks are so important, especially before long trips or daily commuting.</p>

          <h2>How Tareeqk can help</h2>
          <p>At Tareeqk, we provide fast and reliable support for drivers who need help on the road. Our services include car recovery, <a href="/en/battery-service-dubai/">battery jump start</a>, <a href="/en/flat-tyre-repair-dubai/">tyre assistance</a>, and <a href="/en/towing-service-dubai/">towing service</a> Dubai drivers can rely on.</p>
          <p>If your car breaks down in Dubai, you do not need to deal with it alone. Tareeqk is ready to help you get back on the road safely and quickly with professional roadside support.</p>
          <p>Need urgent help? Contact Tareeqk now for fast roadside assistance and car recovery in Dubai.</p>
        `,
      },
      ar: {
        title: 'عطل السيارة في دبي: ماذا تفعل ومن تتصل به',
        description:
          'ماذا تفعل إذا تعطلت سيارتك في دبي — كيف تحافظ على سلامتك، وما الذي يجب فحصه، ومتى تتصل بطريقك للحصول على مساعدة سريعة على الطريق.',
        section: 'نصائح السلامة',
        howToSteps: [
          {
            name: 'انقل سيارتك إلى مكان آمن',
            text: 'قلل من سرعتك بحذر وتوقف في منطقة انتظار سيارات، أو كتف الطريق، أو شارع جانبي هادئ بدلاً من التوقف وسط حركة المرور. شغّل أضواء التحذير فورًا، وضع المثلثات التحذيرية إذا كان ذلك آمنًا.',
          },
          {
            name: 'ابحث عن المشكلة الواضحة',
            text: 'إذا كان الأمر آمنًا، تحقق من الأسباب الشائعة مثل إطار مثقوب، أو بطارية فارغة، أو ارتفاع حرارة المحرك، أو نفاد الوقود. إذا رأيت دخانًا أو شممت رائحة احتراق أو لاحظت تسرب سوائل، توقف عن القيادة وانتظر المساعدة.',
          },
          {
            name: 'اطلب المساعدة على الطريق مبكرًا',
            text: 'قد تحتاج مشكلة البطارية فقط إلى شحن سريع، وقد يحتاج الإطار إلى إصلاح أو استبدال، أما السيارة التي لا تتحرك فتحتاج إلى سحب أو إنقاذ. الاتصال مبكرًا يمنع تفاقم الضرر ويقلل تكاليف الإصلاح.',
          },
          {
            name: 'حافظ على سلامتك أثناء انتظار المساعدة',
            text: 'على طريق مزدحم، ابقَ داخل السيارة مع ربط حزام الأمان حتى تصل المساعدة. إذا اضطررت للخروج، ابتعد عن حركة المرور وانتظر في مكان آمن مع إبقاء الأطفال والركاب بالقرب منك.',
          },
        ],
        html: `
          <h2>أعطال السيارات تحدث دون سابق إنذار</h2>
          <p>قد يحدث عطل في سيارتك في دبي في أي وقت، خاصة في حالات الازدحام المروري الشديد أو درجات الحرارة المرتفعة. عندما تتوقف سيارتك فجأة عن العمل، فإن أهم شيء هو أن تحافظ على هدوئك، وتنتقل إلى مكان آمن، وتطلب المساعدة المتخصصة في أسرع وقت ممكن.</p>
          <p>طرق دبي مزدحمة وسريعة الحركة، وغالبًا ما تكون معرضة لدرجات حرارة مرتفعة. هذا يعني أن مشكلة بسيطة، مثل بطارية فارغة، أو إطار مثقوب، أو محرك ساخن، أو نفاد الوقود، يمكن أن تتحول بسرعة إلى موقف مرهق. معرفة ما يجب فعله بعد العطل يمكن أن يساعد في حمايتك أنت وركابك وسيارتك.</p>

          <h2>انقل سيارتك إلى مكان آمن</h2>
          <p>إذا بدأت سيارتك تفقد قوتها أو تتصرف بشكل غير طبيعي، قلل من سرعتك بحذر وحاول التوقف في مكان آمن. تُعد منطقة انتظار السيارات، أو كتف الطريق، أو شارع جانبي هادئ أكثر أمانًا بكثير من التوقف وسط حركة المرور.</p>
          <p>بمجرد التوقف، شغّل أضواء التحذير (الفلاشر) فورًا. فهذا ينبه السائقين الآخرين إلى أن سيارتك متعطلة ويساعد على تقليل خطر وقوع حادث. وإذا كان لديك مثلثات تحذيرية ومن الآمن وضعها، فهي تساعد أيضًا على تحسين الرؤية.</p>

          <h2>ابحث عن المشكلة الواضحة</h2>
          <p>إذا كان الأمر آمنًا، تحقق من وجود أي علامات واضحة للمشكلة. من الأسباب الشائعة لعطل السيارات في دبي الإطار المثقوب، أو البطارية الفارغة، أو ارتفاع حرارة المحرك، أو نفاد الوقود.</p>
          <p>إذا رأيت دخانًا، أو شممت رائحة احتراق، أو لاحظت تسرب سوائل من أسفل السيارة، فلا تستمر في القيادة. في مثل هذه الحالات، الخيار الأفضل هو انتظار <a href="/ar/roadside-assistance-dubai/">خدمة المساعدة على الطريق في دبي</a> أو <a href="/ar/car-recovery-dubai/">خدمة سحب السيارات</a>.</p>

          <h2>اطلب المساعدة على الطريق مبكرًا</h2>
          <p>بعض المشاكل يمكن إصلاحها بسرعة في الموقع، بينما تحتاج مشاكل أخرى إلى دعم متخصص. قد تحتاج مشكلة البطارية فقط إلى شحن سريع، بينما قد يحتاج الإطار إلى إصلاح أو استبدال. أما إذا كانت سيارتك لا تتحرك، فإن السحب أو الإنقاذ هو الحل الأكثر أمانًا.</p>
          <p>طلب المساعدة مبكرًا يمكن أن يمنع تفاقم الضرر ويقلل من تكاليف الإصلاح. محاولة قيادة سيارة تالفة قد تزيد المشكلة سوءًا وقد تتركك عالقًا في مكان أكثر خطورة.</p>

          <h2>حافظ على سلامتك أثناء انتظار المساعدة</h2>
          <p>إذا كنت على طريق مزدحم، فغالبًا ما يكون البقاء داخل السيارة أكثر أمانًا حتى تصل المساعدة. حافظ على ربط حزام الأمان إذا كانت حركة المرور سريعة أو كانت الرؤية ضعيفة.</p>
          <p>إذا احتجت إلى الخروج من السيارة، ابتعد عن حركة المرور وانتظر في مكان آمن. حافظ على قرب الأطفال والركاب منك، وتجنب الوقوف بالقرب من الجزء الخلفي أو الجانبي للسيارة على الطرق النشطة.</p>

          <h2>لماذا تحدث أعطال السيارات في دبي؟</h2>
          <p>هناك عدة أسباب تجعل السائقين يواجهون أعطال المركبات في دبي. فحرارة المدينة، وظروف حركة المرور، والمسافات الطويلة تضع ضغطًا إضافيًا على السيارات.</p>
          <p>يمكن أن تضعف البطاريات بشكل أسرع في درجات الحرارة المرتفعة، ويمكن أن تتآكل الإطارات بسرعة أكبر، وقد تعاني أنظمة التبريد إذا تأخرت الصيانة الدورية. لهذا السبب تُعد الفحوصات الدورية للمركبة مهمة جدًا، خاصة قبل الرحلات الطويلة أو التنقل اليومي.</p>

          <h2>كيف يمكن لطريقك مساعدتك؟</h2>
          <p>في طريقك (Tareeqk)، نقدم دعمًا سريعًا وموثوقًا للسائقين الذين يحتاجون إلى مساعدة على الطريق. تشمل خدماتنا سحب السيارات، و<a href="/ar/battery-service-dubai/">شحن البطارية</a>، و<a href="/ar/flat-tyre-repair-dubai/">المساعدة في الإطارات</a>، و<a href="/ar/towing-service-dubai/">خدمة السحب في دبي</a> التي يمكن للسائقين الاعتماد عليها.</p>
          <p>إذا تعطلت سيارتك في دبي، فلست بحاجة إلى التعامل مع الأمر بمفردك. طريقك جاهز لمساعدتك على العودة إلى الطريق بأمان وسرعة من خلال دعم احترافي على الطريق.</p>
          <p>هل تحتاج إلى مساعدة عاجلة؟ تواصل مع طريقك الآن للحصول على مساعدة سريعة على الطريق وخدمة سحب السيارات في دبي.</p>
        `,
      },
      ur: {
        title: 'دبئی میں گاڑی خراب ہونا: کیا کریں اور کسے کال کریں',
        description:
          'اگر دبئی میں آپ کی گاڑی خراب ہو جائے تو کیا کریں — کیسے محفوظ رہیں، کیا چیک کریں، اور فوری روڈ سائیڈ مدد کے لیے طریقک کو کب کال کریں۔',
        section: 'حفاظتی تجاویز',
        howToSteps: [
          {
            name: 'اپنی گاڑی کو محفوظ جگہ پر لے جائیں',
            text: 'احتیاط سے رفتار کم کریں اور ٹریفک میں رکنے کے بجائے پارکنگ ایریا، سڑک کے کنارے، یا خاموش سائیڈ روڈ پر گاڑی روکیں۔ فوراً ہزارڈ لائٹس آن کریں، اور اگر محفوظ ہو تو وارننگ ٹرائی اینگلز رکھیں۔',
          },
          {
            name: 'واضح مسئلے کو تلاش کریں',
            text: 'اگر محفوظ ہو تو ٹائر پنکچر، بیٹری ختم ہونا، انجن کا زیادہ گرم ہونا، یا فیول ختم ہونے جیسی عام وجوہات چیک کریں۔ اگر دھواں، جلنے کی بو، یا مائع رستا نظر آئے تو گاڑی چلانا بند کریں اور مدد کا انتظار کریں۔',
          },
          {
            name: 'جلدی روڈ سائیڈ اسسٹنس کے لیے کال کریں',
            text: 'بیٹری کے مسئلے کے لیے شاید صرف جمپ اسٹارٹ درکار ہو، ٹائر کے لیے مرمت یا تبدیلی، اور نہ چلنے والی گاڑی کے لیے ٹوئنگ یا ریکوری۔ جلدی کال کرنا نقصان کو روکتا ہے اور اخراجات کم کرتا ہے۔',
          },
          {
            name: 'مدد کا انتظار کرتے ہوئے محفوظ رہیں',
            text: 'مصروف سڑک پر، مدد آنے تک سیٹ بیلٹ کے ساتھ گاڑی کے اندر رہیں۔ اگر باہر نکلنا پڑے تو ٹریفک سے دور ہو کر محفوظ جگہ پر انتظار کریں اور بچوں اور مسافروں کو قریب رکھیں۔',
          },
        ],
        html: `
          <h2>گاڑی کسی بھی وقت بغیر اطلاع کے خراب ہو سکتی ہے</h2>
          <p>دبئی میں گاڑی کسی بھی وقت خراب ہو سکتی ہے، خاص طور پر شدید ٹریفک یا سخت گرمی میں۔ جب آپ کی گاڑی اچانک کام کرنا بند کر دے، تو سب سے اہم بات یہ ہے کہ پرسکون رہیں، محفوظ جگہ کی طرف جائیں، اور جتنی جلدی ممکن ہو پیشہ ور مدد کے لیے کال کریں۔</p>
          <p>دبئی کی سڑکیں مصروف، تیز رفتار، اور اکثر شدید گرمی کا شکار ہوتی ہیں۔ اس کا مطلب ہے کہ ایک چھوٹا سا مسئلہ، جیسے بیٹری کا ختم ہونا، ٹائر پنکچر، انجن کا زیادہ گرم ہونا، یا فیول ختم ہونا، تیزی سے ایک پریشان کن صورتحال بن سکتا ہے۔ گاڑی خراب ہونے کے بعد کیا کرنا ہے یہ جاننا آپ کو، آپ کے ساتھیوں کو، اور آپ کی گاڑی کو محفوظ رکھنے میں مدد دے سکتا ہے۔</p>

          <h2>اپنی گاڑی کو محفوظ جگہ پر لے جائیں</h2>
          <p>اگر آپ کی گاڑی طاقت کھونے لگے یا عجیب انداز میں چلنے لگے، تو احتیاط سے رفتار کم کریں اور کسی محفوظ جگہ پر گاڑی روکنے کی کوشش کریں۔ پارکنگ ایریا، سڑک کا کنارہ، یا کوئی خاموش سائیڈ روڈ ٹریفک میں رکنے کی نسبت کہیں زیادہ محفوظ ہے۔</p>
          <p>رکنے کے بعد فوراً اپنی ہزارڈ لائٹس آن کر دیں۔ اس سے دوسرے ڈرائیورز کو پتا چلتا ہے کہ آپ کی گاڑی خراب ہے اور حادثے کا خطرہ کم ہو جاتا ہے۔ اگر آپ کے پاس وارننگ ٹرائی اینگلز ہیں اور انہیں رکھنا محفوظ ہو، تو یہ بھی نمایاں ہونے میں مدد دیتے ہیں۔</p>

          <h2>واضح مسئلے کو تلاش کریں</h2>
          <p>اگر محفوظ ہو تو خرابی کی واضح نشانیاں چیک کریں۔ دبئی میں گاڑی خراب ہونے کی عام وجوہات میں ٹائر پنکچر، بیٹری ختم ہونا، انجن کا زیادہ گرم ہونا، یا فیول ختم ہونا شامل ہیں۔</p>
          <p>اگر آپ کو دھواں نظر آئے، جلنے کی بو محسوس ہو، یا گاڑی کے نیچے سے کوئی مائع رستا دکھائی دے، تو گاڑی چلاتے نہ رہیں۔ ایسی صورتحال میں بہترین آپشن یہ ہے کہ دبئی میں <a href="/ur/roadside-assistance-dubai/">روڈ سائیڈ اسسٹنس</a> یا <a href="/ur/car-recovery-dubai/">کار ریکوری سروس</a> کا انتظار کریں۔</p>

          <h2>جلدی روڈ سائیڈ اسسٹنس کے لیے کال کریں</h2>
          <p>کچھ مسائل موقع پر ہی جلدی ٹھیک کیے جا سکتے ہیں، جبکہ کچھ کو پیشہ ور مدد کی ضرورت ہوتی ہے۔ بیٹری کے مسئلے کے لیے شاید صرف جمپ اسٹارٹ کی ضرورت ہو، جبکہ ٹائر کے مسئلے کے لیے مرمت یا تبدیلی درکار ہو سکتی ہے۔ اگر آپ کی گاڑی بالکل نہیں چل رہی، تو ٹوئنگ یا ریکوری ہی سب سے محفوظ حل ہے۔</p>
          <p>جلدی مدد کے لیے کال کرنا مزید نقصان کو روک سکتا ہے اور مرمت کے اخراجات کم کر سکتا ہے۔ خراب گاڑی کو چلانے کی کوشش مسئلے کو مزید بگاڑ سکتی ہے اور آپ کو کسی زیادہ خطرناک جگہ پر پھنسا سکتی ہے۔</p>

          <h2>مدد کا انتظار کرتے ہوئے محفوظ رہیں</h2>
          <p>اگر آپ مصروف سڑک پر ہیں، تو اکثر مدد آنے تک گاڑی کے اندر ہی رہنا زیادہ محفوظ ہوتا ہے۔ اگر ٹریفک تیز رفتار سے چل رہا ہو یا مرئیت کم ہو تو اپنی سیٹ بیلٹ باندھے رکھیں۔</p>
          <p>اگر آپ کو گاڑی سے باہر نکلنا پڑے، تو ٹریفک سے دور ہو جائیں اور کسی محفوظ جگہ پر انتظار کریں۔ بچوں اور مسافروں کو اپنے قریب رکھیں، اور مصروف سڑکوں پر گاڑی کے پیچھے یا سائیڈ کے قریب کھڑے ہونے سے گریز کریں۔</p>

          <h2>دبئی میں گاڑیاں کیوں خراب ہوتی ہیں؟</h2>
          <p>دبئی میں ڈرائیورز کو گاڑی خراب ہونے کے کئی اسباب پیش آتے ہیں۔ شہر کی گرمی، ٹریفک کی صورتحال، اور لمبی مسافتیں گاڑیوں پر اضافی دباؤ ڈالتی ہیں۔</p>
          <p>بیٹریاں شدید درجہ حرارت میں زیادہ تیزی سے کمزور ہو سکتی ہیں، ٹائر جلدی گھس سکتے ہیں، اور اگر باقاعدہ دیکھ بھال میں تاخیر ہو تو کولنگ سسٹم متاثر ہو سکتا ہے۔ اسی لیے، خاص طور پر لمبے سفر یا روزانہ آمدورفت سے پہلے، گاڑی کی باقاعدہ چیکنگ بہت ضروری ہے۔</p>

          <h2>طریقک کیسے مدد کر سکتا ہے</h2>
          <p>طریقک (Tareeqk) میں، ہم ان ڈرائیورز کے لیے تیز اور قابلِ اعتماد مدد فراہم کرتے ہیں جنہیں سڑک پر مدد کی ضرورت ہوتی ہے۔ ہماری خدمات میں کار ریکوری، <a href="/ur/battery-service-dubai/">بیٹری جمپ اسٹارٹ</a>، <a href="/ur/flat-tyre-repair-dubai/">ٹائر اسسٹنس</a>، اور دبئی کے ڈرائیورز کے لیے قابلِ اعتماد <a href="/ur/towing-service-dubai/">ٹوئنگ سروس</a> شامل ہیں۔</p>
          <p>اگر دبئی میں آپ کی گاڑی خراب ہو جائے، تو آپ کو اکیلے اس سے نمٹنے کی ضرورت نہیں۔ طریقک پیشہ ور روڈ سائیڈ سپورٹ کے ذریعے آپ کو محفوظ اور تیزی سے واپس سڑک پر لانے کے لیے تیار ہے۔</p>
          <p>فوری مدد درکار ہے؟ دبئی میں تیز رفتار روڈ سائیڈ اسسٹنس اور کار ریکوری کے لیے ابھی طریقک سے رابطہ کریں۔</p>
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
