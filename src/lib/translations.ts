/**
 * UI translations keyed by the exact English source string (English is the source of truth).
 * Missing keys fall back to English. Brand/finish names, contact details and URLs stay unchanged.
 */
type Entry = { sq: string; mk: string };

export const STRINGS: Record<string, Entry> = {
  // Finish Advisor
  "Finish Advisor": { sq: "Këshilltari i materialeve", mk: "Советник за материјали" },
  "Try the Finish Advisor": { sq: "Provoni këshilltarin e materialeve", mk: "Испробајте го советникот за материјали" },
  "Show us your space.": { sq: "Na tregoni hapësirën tuaj.", mk: "Покажете ни го вашиот простор." },
  "We'll suggest the finish.": { sq: "Ne ju sugjerojmë materialin.", mk: "Ќе ви предложиме соодветен материјал." },
  "Upload a photo of your room and describe it. Our AI-powered advisor suggests suitable finishes and next steps — a starting point for a conversation with our studio.": { sq: "Ngarkoni një foto të dhomës dhe përshkruani hapësirën. Këshilltari ynë me AI sugjeron materiale të përshtatshme dhe hapat e ardhshëm — si pikënisje për një bisedë me studion tonë.", mk: "Прикачете фотографија од вашата просторија и опишете го просторот. Нашиот советник со вештачка интелигенција предлага соодветни материјали и следни чекори — како почетна точка за разговор со нашето студио." },
  "Room photo (optional)": { sq: "Foto e dhomës (opsionale)", mk: "Фотографија од просторијата (опционално)" },
  "Choose a photo": { sq: "Zgjidhni një foto", mk: "Изберете фотографија" },
  "Remove photo": { sq: "Hiqni foton", mk: "Отстранете ја фотографијата" },
  "Your uploaded room": { sq: "Fotoja e dhomës suaj", mk: "Фотографија од вашата просторија" },
  "Describe your space": { sq: "Përshkruani hapësirën tuaj", mk: "Опишете го вашиот простор" },
  "e.g. A bright living room with oak floors. We'd like a warm, calm feature wall behind the sofa.": { sq: "p.sh. Një dhomë ndenjeje e ndritshme me dysheme lisi. Duam një mur të ngrohtë dhe të qetë pas divanit.", mk: "пр. Светла дневна соба со даб паркет. Сакаме топол, смирен ѕид зад каучот." },
  "Get Recommendations": { sq: "Merrni rekomandime", mk: "Добијте препораки" },
  "Preparing suggestions…": { sq: "Po përgatiten sugjerimet…", mk: "Се подготвуваат предлози…" },
  "Looking at your space…": { sq: "Po shqyrtojmë hapësirën tuaj…", mk: "Го разгледуваме вашиот простор…" },
  "Your suggestions will appear here.": { sq: "Sugjerimet do të shfaqen këtu.", mk: "Предлозите ќе се појават тука." },
  "Suggestions are AI-generated and indicative. Our team confirms the right finish on site.": { sq: "Sugjerimet krijohen nga AI dhe janë orientuese. Ekipi ynë e konfirmon materialin e duhur pas verifikimit në objekt.", mk: "Предлозите се создадени со вештачка интелигенција и служат како насока. Нашиот тим го потврдува соодветниот материјал по проверка на објектот." },
  "Please choose a JPG, PNG or WebP photo under 20 MB.": { sq: "Zgjidhni një foto JPG, PNG ose WebP nën 20 MB.", mk: "Изберете JPG, PNG или WebP фотографија под 20 MB." },
  "This photo couldn't be read. Please try another one.": { sq: "Kjo foto nuk u lexua. Provoni një tjetër.", mk: "Фотографијата не може да се прочита. Пробајте друга." },
  "We couldn't prepare a recommendation. Please try again.": { sq: "Nuk mundëm të përgatisnim rekomandim. Provoni përsëri.", mk: "Не можевме да подготвиме препорака. Обидете се повторно." },

  // Navigation
  Home: { sq: "Kreu", mk: "Почетна" },
  Finishes: { sq: "Materialet", mk: "Обработки" },
  Projects: { sq: "Projektet", mk: "Проекти" },
  Services: { sq: "Shërbimet", mk: "Услуги" },
  About: { sq: "Rreth nesh", mk: "За нас" },
  Contact: { sq: "Kontakti", mk: "Контакт" },
  "Open menu": { sq: "Hapni menynë", mk: "Отвори мени" },
  "Close menu": { sq: "Mbyllni menynë", mk: "Затвори мени" },
  Language: { sq: "Gjuha", mk: "Јазик" },

  // Footer
  "Italian decorative finishes · supplied & applied": {
    sq: "Materiale dekorative italiane · të furnizuara dhe të aplikuara",
    mk: "Италијански декоративни обработки · набавени и нанесени",
  },
  "North Macedonia": { sq: "Maqedonia e Veriut", mk: "Северна Македонија" },
  Phone: { sq: "Telefoni", mk: "Телефон" },
  Email: { sq: "Email", mk: "Е-пошта" },
  Social: { sq: "Rrjetet sociale", mk: "Социјални мрежи" },
  "Studio login": { sq: "Hyrja e studios", mk: "Најава за студиото" },

  // Cookies
  "Cookie preferences": { sq: "Preferencat e skedarëve cookie", mk: "Поставки за колачиња" },
  Cookies: { sq: "Skedarët cookie", mk: "Колачиња" },
  "We use cookies to understand how visitors use this site and to improve it. Choose what you are comfortable with.": {
    sq: "Përdorim skedarë cookie për të kuptuar se si vizitorët e përdorin faqen dhe për ta përmirësuar atë. Zgjidhni opsionin që ju përshtatet.",
    mk: "Користиме колачиња за да разбереме како посетителите ја користат страницата и за да ја подобриме. Изберете што ви одговара.",
  },
  "Accept all": { sq: "Pranoni të gjitha", mk: "Прифати ги сите" },
  "Essential only": { sq: "Vetëm të domosdoshmet", mk: "Само неопходни" },

  // WhatsApp
  "Message Casa D'Arte on WhatsApp": { sq: "Shkruajini Casa D'Arte në WhatsApp", mk: "Пишете му на Casa D'Arte на WhatsApp" },
  "Hello Casa D'Arte, I would like to discuss a project involving your decorative finishes.": {
    sq: "Përshëndetje Casa D'Arte, dëshiroj të diskutoj një projekt me materialet tuaja dekorative.",
    mk: "Здраво Casa D'Arte, би сакал/а да разговараме за проект со вашите декоративни обработки.",
  },

  // 404 / error
  "Page not found": { sq: "Faqja nuk u gjet", mk: "Страницата не е пронајдена" },
  "The page you're looking for has been moved or no longer exists.": {
    sq: "Faqja që kërkoni është zhvendosur ose nuk ekziston më.",
    mk: "Страницата што ја барате е преместена или повеќе не постои.",
  },
  "Return home": { sq: "Kthehuni në faqen kryesore", mk: "Назад на почетна" },
  "This page didn't load": { sq: "Kjo faqe nuk u ngarkua", mk: "Оваа страница не се вчита" },
  "Something went wrong on our end. Please try again.": {
    sq: "Diçka shkoi keq nga ana jonë. Ju lutemi provoni përsëri.",
    mk: "Нешто тргна наопаку кај нас. Ве молиме обидете се повторно.",
  },
  "Try again": { sq: "Provoni përsëri", mk: "Обиди се повторно" },
  "Go home": { sq: "Kthehuni në faqen kryesore", mk: "Оди на почетна" },

  // Home
  "Turn Every Wall Into Art.": { sq: "Ktheni çdo mur në art.", mk: "Претворете го секој ѕид во уметност." },
  "Turn Every Wall": { sq: "Ktheni çdo mur", mk: "Претворете го секој ѕид" },
  "Into Art.": { sq: "në art.", mk: "во уметност." },
  "Premium decorative finishes, professionally applied by our team.": {
    sq: "Materiale dekorative premium, të aplikuara në mënyrë profesionale nga ekipi ynë.",
    mk: "Премиум декоративни обработки, професионално нанесени од нашиот тим.",
  },
  "Explore Our Finishes": { sq: "Zbuloni materialet tona", mk: "Истражете ги нашите обработки" },
  "Casa D'Arte home": { sq: "Casa D'Arte – faqja kryesore", mk: "Casa D'Arte – почетна" },
  "Get in Touch": { sq: "Na kontaktoni", mk: "Контактирајте нè" },
  "Casa D'Arte cover: Turn Every Wall Into Art. Premium decorative finishes, professionally applied by our team.": {
    sq: "Kopertina e Casa D'Arte: Ktheni çdo mur në art. Materiale dekorative premium, të aplikuara në mënyrë profesionale nga ekipi ynë.",
    mk: "Насловна на Casa D'Arte: Претворете го секој ѕид во уметност. Премиум декоративни обработки, професионално нанесени од нашиот тим.",
  },
  "Warm living room with a textured Travertino wall, sofa and window view": {
    sq: "Dhomë ndenjeje e ngrohtë me mur me teksturë Travertino, divan dhe pamje nga dritarja",
    mk: "Топла дневна соба со текстуриран ѕид во Travertino, софа и поглед низ прозорецот",
  },
  "Warm interior with a softly textured decorative wall, stone bench and natural light": {
    sq: "Ambient i ngrohtë me mur dekorativ me teksturë të butë, stol guri dhe dritë natyrale",
    mk: "Топол ентериер со нежно текстуриран декоративен ѕид, камена клупа и природна светлина",
  },
  "The Finishes": { sq: "Materialet", mk: "Обработките" },
  "Six finishes. Supplied and applied by our team.": {
    sq: "Gjashtë materiale. Të furnizuara dhe të aplikuara nga ekipi ynë.",
    mk: "Шест обработки. Набавени и нанесени од нашиот тим.",
  },
  "All finishes": { sq: "Të gjitha materialet", mk: "Сите обработки" },
  "{name} decorative finish": { sq: "Material dekorativ {name}", mk: "Декоративна обработка {name}" },
  "View Finish": { sq: "Shikoni materialin", mk: "Погледни ја обработката" },
  "Our Process": { sq: "Procesi ynë", mk: "Нашиот процес" },
  "Decorative finish applied by hand with a steel trowel": {
    sq: "Material dekorativ i aplikuar me dorë me mistri çeliku",
    mk: "Декоративна обработка нанесена рачно со челична глетарица",
  },
  "Concept & Consultation": { sq: "Koncepti dhe konsultimi", mk: "Концепт и консултација" },
  "Understand the space, design direction and project requirements.": {
    sq: "Kuptojmë hapësirën, drejtimin e dizajnit dhe kërkesat e projektit.",
    mk: "Го разбираме просторот, дизајнерската насока и барањата на проектот.",
  },
  "Finish Selection": { sq: "Zgjedhja e materialit", mk: "Избор на обработка" },
  "Choose the finish, texture and color.": {
    sq: "Zgjidhni materialin, teksturën dhe ngjyrën.",
    mk: "Изберете ја обработката, текстурата и бојата.",
  },
  "Quotation & Planning": { sq: "Oferta dhe planifikimi", mk: "Понуда и планирање" },
  "Materials and professional application are planned together.": {
    sq: "Materialet dhe aplikimi profesional planifikohen së bashku.",
    mk: "Материјалите и професионалното нанесување се планираат заедно.",
  },
  "Professional Application": { sq: "Aplikimi profesional", mk: "Професионално нанесување" },
  "Our team prepares and applies the decorative finish.": {
    sq: "Ekipi ynë përgatit sipërfaqen dhe aplikon materialin dekorativ.",
    mk: "Нашиот тим ја подготвува и ја нанесува декоративната обработка.",
  },
  "Final Inspection": { sq: "Inspektimi përfundimtar", mk: "Завршна проверка" },
  "The completed surface is checked before handover.": {
    sq: "Sipërfaqja e përfunduar kontrollohet para dorëzimit.",
    mk: "Завршената површина се проверува пред предавањето.",
  },
  "Realized Projects": { sq: "Projekte të realizuara", mk: "Реализирани проекти" },
  "View all projects": { sq: "Shikoni të gjitha projektet", mk: "Погледни ги сите проекти" },
  "Have a project in mind?": { sq: "Keni një projekt në mendje?", mk: "Имате проект на ум?" },
  "Tell us about your space and we’ll help you choose the right finish.": {
    sq: "Na tregoni për hapësirën tuaj dhe do t’ju ndihmojmë të zgjidhni materialin e duhur.",
    mk: "Кажете ни за вашиот простор и ќе ви помогнеме да ја изберете вистинската обработка.",
  },
  "Discuss Your Project": { sq: "Diskutoni projektin tuaj", mk: "Разговарајте за вашиот проект" },
  "Message Us": { sq: "Na shkruani", mk: "Пишете ни" },
  "For Architects & Designers": { sq: "Për arkitektë dhe dizajnerë", mk: "За архитекти и дизајнери" },

  // Projects
  Bedroom: { sq: "Dhomë gjumi", mk: "Спална соба" },
  "Hotel Facade": { sq: "Fasadë hoteli", mk: "Фасада на хотел" },
  "House Facade": { sq: "Fasadë shtëpie", mk: "Фасада на куќа" },
  "Living Room": { sq: "Dhomë ndenjeje", mk: "Дневна соба" },
  Office: { sq: "Zyrë", mk: "Канцеларија" },
  Store: { sq: "Dyqan", mk: "Продавница" },
  All: { sq: "Të gjitha", mk: "Сите" },
  "Living Rooms": { sq: "Dhoma ndenjeje", mk: "Дневни соби" },
  Bedrooms: { sq: "Dhoma gjumi", mk: "Спални соби" },
  Hotels: { sq: "Hotele", mk: "Хотели" },
  Offices: { sq: "Zyra", mk: "Канцеларии" },
  Stores: { sq: "Dyqane", mk: "Продавници" },
  Facades: { sq: "Fasada", mk: "Фасади" },
  "Surfaces in place.": { sq: "Projektet e realizuara.", mk: "Површини на своето место." },
  "A selection of Casa D'Arte surfaces in residential, hospitality, workplace and retail interiors. Each project is presented only by its space and finish.": {
    sq: "Një përzgjedhje projektesh të realizuara nga Casa D'Arte në ambiente banimi, hotele, zyra dhe dyqane. Çdo projekt paraqitet vetëm me hapësirën dhe materialin e përdorur.",
    mk: "Избор на површини на Casa D'Arte во станбени, угостителски, деловни и трговски ентериери. Секој проект е претставен само со својот простор и обработка.",
  },
  "Discuss a Similar Project": { sq: "Diskutoni një projekt të ngjashëm", mk: "Разговарајте за сличен проект" },
  "Approved project photography to follow.": {
    sq: "",
    mk: "Одобрените фотографии од проектот следуваат.",
  },
  "Planning a residence, a hotel or a development? We can prepare samples in your tones and a quotation for material and application together.": {
    sq: "Po planifikoni një banesë, një hotel apo një projekt ndërtimi? Mund t’ju përgatisim mostra në tonet tuaja dhe një ofertë të përbashkët për materialin dhe aplikimin.",
    mk: "Планирате резиденција, хотел или градежен проект? Можеме да подготвиме мостри во вашите тонови и заедничка понуда за материјал и нанесување.",
  },
  "Request a Quote": { sq: "Kërkoni ofertë", mk: "Побарајте понуда" },
  "Request a Sample": { sq: "Kërkoni mostër", mk: "Побарајте мостра" },
  Close: { sq: "Mbyllni", mk: "Затвори" },
  "Previous project": { sq: "Projekti i mëparshëm", mk: "Претходен проект" },
  "Next project": { sq: "Projekti tjetër", mk: "Следен проект" },

  // Finishes pages
  "Six finishes.": { sq: "Gjashtë materiale.", mk: "Шест обработки." },
  "One standard of execution.": { sq: "I njëjti standard cilësie në çdo projekt.", mk: "Еден стандард на изведба." },
  "Explore six decorative finishes, supplied and professionally applied by our own team.": {
    sq: "Zbuloni gjashtë materiale dekorative, të furnizuara dhe të aplikuara në mënyrë profesionale nga ekipi ynë.",
    mk: "Истражете шест декоративни обработки, набавени и професионално нанесени од нашиот тим.",
  },
  "{name} decorative wall finish": { sq: "Material dekorativ për mure {name}", mk: "Декоративна ѕидна обработка {name}" },
  "Approved material photography to follow.": {
    sq: "",
    mk: "Одобрените фотографии од материјалот следуваат.",
  },
  "Explore {name}": { sq: "Zbuloni {name}", mk: "Истражете {name}" },
  "Request a quote": { sq: "Kërkoni ofertë", mk: "Побарајте понуда" },
  "Not sure which finish?": { sq: "Nuk jeni të sigurt cilin material të zgjidhni?", mk: "Не сте сигурни која обработка?" },
  "Tell us about the space and we will prepare samples in tones and textures suited to it — before anything is quoted.": {
    sq: "Na tregoni për hapësirën dhe do të përgatisim mostra në tone dhe tekstura që i përshtaten — para çdo oferte.",
    mk: "Кажете ни за просторот и ќе подготвиме мостри во тонови и текстури што му одговараат — пред да се изготви каква било понуда.",
  },
  "← All finishes": { sq: "← Të gjitha materialet", mk: "← Сите обработки" },
  "{name} decorative finish surface": { sq: "Sipërfaqe me material dekorativ {name}", mk: "Површина со декоративна обработка {name}" },
  "{name} is supplied by Casa D'Arte and professionally applied by our own team.": {
    sq: "{name} furnizohet nga Casa D'Arte dhe aplikohet në mënyrë profesionale nga ekipi ynë.",
    mk: "{name} го набавува Casa D'Arte, а професионално го нанесува нашиот тим.",
  },
  "Other finishes": { sq: "Materiale të tjera", mk: "Други обработки" },
  "Continue exploring.": { sq: "Vazhdoni të zbuloni.", mk: "Продолжете да истражувате." },
  "Photography to follow.": { sq: "", mk: "Фотографиите следуваат." },

  // Services
  "Decorative wall finishes": { sq: "Materiale dekorative për mure", mk: "Декоративни ѕидни обработки" },
  "Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement and Beton Look — decorative finishes supplied for the project. Each finish is chosen for the space, the substrate and the intended visual character.": {
    sq: "Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement dhe Beton Look — materiale dekorative të furnizuara për projektin. Çdo material zgjidhet sipas hapësirës, bazës dhe karakterit vizual të synuar.",
    mk: "Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement и Beton Look — декоративни обработки набавени за проектот. Секоја обработка се избира според просторот, подлогата и посакуваниот визуелен карактер.",
  },
  "The finishes": { sq: "Materialet", mk: "Обработките" },
  "Professional application": { sq: "Aplikimi profesional", mk: "Професионално нанесување" },
  "The finish is applied by our own team: substrate assessment and preparation, priming, layering, polishing and sealing. We coordinate with your architect, contractor and other trades so the surface is delivered as specified.": {
    sq: "Materiali aplikohet nga ekipi ynë: vlerësimi dhe përgatitja e bazës, aplikimi i astarit, shtresat dekorative, lustrimi dhe shtresa mbrojtëse. Koordinohemi me arkitektin, kontraktorin dhe profesionistët e tjerë, në mënyrë që sipërfaqja të dorëzohet sipas specifikimit.",
    mk: "Обработката ја нанесува нашиот тим: проценка и подготовка на подлогата, прајмирање, нанесување слоеви, полирање и заштита. Се координираме со вашиот архитект, изведувач и другите мајстори за површината да биде предадена според спецификацијата.",
  },
  "Colour consultation": { sq: "Konsultim për ngjyrat", mk: "Консултација за бои" },
  "Tone development in the studio or on site, judged in the light of the actual space against joinery, stone, fabrics and existing architecture. Approved on physical samples before anything is quoted.": {
    sq: "Zhvillimi i toneve në studio ose në objekt, të vlerësuara në dritën e hapësirës reale, në harmoni me elementet prej druri, gurin, tekstilet dhe arkitekturën ekzistuese. Tonet miratohen përmes mostrave fizike para përgatitjes së ofertës.",
    mk: "Развој на тонови во студиото или на лице место, проценети во светлината на вистинскиот простор наспроти столаријата, каменот, ткаенините и постојната архитектура. Се одобрува на физички мостри пред да се изготви понуда.",
  },
  "Custom textures": { sq: "Tekstura të personalizuara", mk: "Прилагодени текстури" },
  "Bespoke texture and sheen development for signature walls and spaces — from the smoothest polished surface to more tactile, mineral finishes — with samples refined until the intent is met.": {
    sq: "Zhvillim i personalizuar i teksturës dhe shkëlqimit për mure dhe hapësira karakteristike — nga sipërfaqja më e lëmuar dhe e lustruar deri te materialet minerale me teksturë më të theksuar — me mostra që përsosen deri sa të arrihet rezultati i synuar.",
    mk: "Развој на текстура и сјај по мерка за карактеристични ѕидови и простори — од најмазната полирана површина до потактилни минерални обработки — со мостри што се дотеруваат додека не се постигне замислата.",
  },
  "Commercial & hospitality projects": { sq: "Projekte për biznese dhe hoteleri", mk: "Комерцијални и угостителски проекти" },
  "Hotels, restaurants, retail, offices and developments. Consistent finishes across many surfaces, quotations you can plan around, and scheduling coordinated with opening dates and operating constraints.": {
    sq: "Hotele, restorante, dyqane, zyra dhe projekte ndërtimi. Materiale të njëtrajtshme në shumë sipërfaqe, oferta të qarta dhe afate pune të koordinuara me datat e hapjes dhe kërkesat e funksionimit.",
    mk: "Хотели, ресторани, продавници, канцеларии и градежни проекти. Доследни обработки на многу површини, понуди според кои можете да планирате и распоред усогласен со датумите на отворање и оперативните ограничувања.",
  },
  "Residential projects": { sq: "Projekte banimi", mk: "Станбени проекти" },
  "Private homes, apartments and villas, approached with discretion. From a single feature wall to complete interiors and facades, guided from the first sample to handover.": {
    sq: "Shtëpi private, apartamente dhe vila, të trajtuara me diskrecion. Nga një mur i vetëm theksues deri te interiere dhe fasada të plota, të udhëhequra nga mostra e parë deri në dorëzim.",
    mk: "Приватни куќи, станови и вили, со дискретен пристап. Од еден акцентен ѕид до целосни ентериери и фасади, водени од првата мостра до предавањето.",
  },
  "From sample to": { sq: "Nga mostra te", mk: "Од мостра до" },
  "sealed wall.": { sq: "muri i përfunduar.", mk: "заштитен ѕид." },
  "Casa D'Arte does not only supply decorative materials. We take a project from finish selection and samples through quotation to professional application by our own team.": {
    sq: "Casa D'Arte nuk furnizon vetëm materiale dekorative. E shoqërojmë projektin nga zgjedhja e materialit dhe përgatitja e mostrave, përmes ofertës, deri te aplikimi profesional nga ekipi ynë.",
    mk: "Casa D'Arte не набавува само декоративни материјали. Го водиме проектот од изборот на обработка и мострите, преку понудата, до професионалното нанесување од нашиот тим.",
  },
  "From concept to completion": { sq: "Nga koncepti te përfundimi", mk: "Од концепт до завршување" },
  "Next step": { sq: "Hapi i radhës", mk: "Следен чекор" },
  "Discuss the project, or start with a": { sq: "Diskutoni projektin ose filloni me një", mk: "Разговарајте за проектот или започнете со" },
  "sample.": { sq: "mostër.", mk: "мостра." },

  // About
  "Material and execution, together": { sq: "Materiali dhe zbatimi, së bashku", mk: "Материјал и изведба, заедно" },
  "We chose early on not to be a shop that sells buckets, nor a crew that applies whatever arrives on site. Casa D'Arte supplies the finish and applies it — so one team is accountable for the surface.": {
    sq: "Kompania jonë furnizon materiale dekorative dhe kujdeset edhe për aplikimin e tyre profesional përmes ekipit të vet — nga mostra dhe përzgjedhja deri te sipërfaqja e përfunduar.",
    mk: "Уште на почетокот одлучивме да не бидеме ниту продавница што продава кофи, ниту екипа што нанесува што и да стигне на градилиштето. Casa D'Arte ја набавува обработката и ја нанесува — така еден тим е одговорен за површината.",
  },
  "Decisions on the real material": { sq: "Vendime mbi materialin real", mk: "Одлуки врз вистинскиот материјал" },
  "Every finish is approved on physical samples prepared for the project. Tone, texture and sheen are judged in the light of the space, not on a screen.": {
    sq: "Çdo material miratohet përmes mostrave fizike të përgatitura për projektin. Toni, tekstura dhe shkëlqimi vlerësohen në dritën e hapësirës, jo në ekran.",
    mk: "Секоја обработка се одобрува на физички мостри подготвени за проектот. Тонот, текстурата и сјајот се проценуваат во светлината на просторот, а не на екран.",
  },
  "Respect for the technique": { sq: "Respekt për teknikën", mk: "Почит кон техниката" },
  "Italian decorative finishes are layered systems. Preparation, timing and the hand that applies them matter as much as the material. We do not skip steps.": {
    sq: "Materialet dekorative italiane aplikohen në disa shtresa. Përgatitja, koha dhe mjeshtëria e aplikimit kanë po aq rëndësi sa vetë materiali. Nuk anashkalojmë asnjë hap.",
    mk: "Италијанските декоративни обработки се повеќеслојни системи. Подготовката, времето и раката што ги нанесува се важни колку и материјалот. Не прескокнуваме чекори.",
  },
  Restraint: { sq: "Përmbajtje", mk: "Умереност" },
  "The finish should serve the architecture. Our role is to make a surface feel inevitable in its space — not to decorate for its own sake.": {
    sq: "Materiali duhet t’i shërbejë arkitekturës. Roli ynë është të krijojmë një sipërfaqe që duket e natyrshme në hapësirë — jo të dekorojmë thjesht për efekt.",
    mk: "Обработката треба да ѝ служи на архитектурата. Нашата улога е површината да делува неизбежно во својот простор — а не да украсуваме само заради украсот.",
  },
  "The Studio · Over a decade of experience": { sq: "Studioja · Mbi një dekadë përvojë", mk: "Студиото · Повеќе од една декада искуство" },
  "A studio for Italian finishes —": { sq: "Një studio për materiale italiane —", mk: "Студио за италијански обработки —" },
  "supplied and applied.": { sq: "të furnizuara dhe të aplikuara.", mk: "набавени и нанесени." },
  "Casa D'Arte brings more than a decade of experience to a simple conviction: a wall deserves the same care as the architecture around it — and the people who choose the material should be the people who put it on the wall.": {
    sq: "Kompania jonë ka më shumë se një dekadë përvojë dhe mbështetet në një bindje të thjeshtë: një mur meriton të njëjtin kujdes si arkitektura përreth tij — dhe ekipi që zgjedh materialin duhet të jetë edhe ai që e aplikon në mur.",
    mk: "Casa D'Arte носи повеќе од една декада искуство врз едноставно уверување: ѕидот заслужува иста грижа како и архитектурата околу него — а луѓето што го избираат материјалот треба да бидат тие што го нанесуваат на ѕидот.",
  },
  "Hand-applied Italian decorative plaster surface": {
    sq: "Sipërfaqe me suva dekorative italiane e aplikuar me dorë",
    mk: "Рачно нанесена италијанска декоративна малтерска површина",
  },
  "Decorative finish being applied by hand with a steel trowel": {
    sq: "Material dekorativ që aplikohet me dorë me mistri çeliku",
    mk: "Декоративна обработка што рачно се нанесува со челична глетарица",
  },
  "What we do": { sq: "Çfarë bëjmë", mk: "Што работиме" },
  "From the first sample to the finished surface.": {
    sq: "Nga mostra e parë te sipërfaqja e përfunduar.",
    mk: "Од првата мостра до завршената површина.",
  },
  "We work with Italian decorative finishes — Travertino, Marmorino, Stucco Veneziano, Sahara and Microcement — and we do two things with them. We supply the material, specified for the project. And we apply it, with our own team, from surface preparation through the finished surface.": {
    sq: "Punojmë me materiale dekorative italiane — Travertino, Marmorino, Stucco Veneziano, Sahara, Microcement dhe Beton Look. I furnizojmë sipas kërkesave të projektit dhe i aplikojmë me ekipin tonë, nga përgatitja e bazës deri te sipërfaqja e përfunduar.",
    mk: "Работиме со италијански декоративни обработки — Travertino, Marmorino, Stucco Veneziano, Sahara и Microcement — и со нив правиме две работи. Го набавуваме материјалот, специфициран за проектот. И го нанесуваме, со нашиот тим, од подготовката на површината до завршената површина.",
  },
  "Most of our work is with architects, interior designers, developers and hospitality or commercial clients, alongside private residences where the owners care about how a wall feels as much as how it looks. In every case the path is the same: consultation, samples, quotation, application, handover.": {
    sq: "Punojmë kryesisht me arkitektë, dizajnerë interieri, investitorë, biznese dhe hoteleri, si edhe me klientë privatë që i kushtojnë rëndësi si pamjes, ashtu edhe ndjesisë së sipërfaqes. Procesi mbetet i njëjtë: konsultim, mostra, ofertë, aplikim dhe dorëzim.",
    mk: "Најголемиот дел од нашата работа е со архитекти, дизајнери на ентериер, инвеститори и угостителски или комерцијални клиенти, како и со приватни резиденции чии сопственици се грижат за тоа какво е чувството на ѕидот исто колку и за неговиот изглед. Во секој случај патот е ист: консултација, мостри, понуда, нанесување, предавање.",
  },
  "It is a deliberately narrow way of working. It means we can stand behind the surface, because we chose the material and we put it there.": {
    sq: "Kjo mënyrë e përqendruar pune na lejon të mbajmë përgjegjësi për sipërfaqen, sepse zgjedhja dhe aplikimi i materialit kryhen nga i njëjti ekip.",
    mk: "Тоа е намерно фокусиран начин на работа. Значи можеме да застанеме зад површината, бидејќи ние го избравме материјалот и ние го поставивме таму.",
  },
  "Our Services": { sq: "Shërbimet tona", mk: "Нашите услуги" },
  "How we think": { sq: "Si mendojmë", mk: "Како размислуваме" },
  "Four principles that shape every project.": {
    sq: "Katër parime që formësojnë çdo projekt.",
    mk: "Четири принципи што го обликуваат секој проект.",
  },
  "Six finishes, each supplied and applied by the studio.": {
    sq: "Gjashtë materiale, secili i furnizuar dhe i aplikuar nga studioja.",
    mk: "Шест обработки, секоја набавена и нанесена од студиото.",
  },
  "Start a conversation": { sq: "Filloni një bisedë", mk: "Започнете разговор" },
  "Tell us about your space.": { sq: "Na tregoni për hapësirën tuaj.", mk: "Кажете ни за вашиот простор." },
  "Whether you are specifying a finish, planning a development or renovating a home, the next step is a conversation and a sample.": {
    sq: "Pavarësisht nëse po specifikoni një material, po planifikoni një projekt ndërtimi apo po rinovoni një shtëpi, hapi i radhës është një bisedë dhe një mostër.",
    mk: "Без разлика дали специфицирате обработка, планирате градежен проект или реновирате дом, следниот чекор е разговор и мостра.",
  },

  // Architects
  "Sample boxes": { sq: "Kutitë me mostra", mk: "Кутии со мостри" },
  "A curated case of our finishes for the studio, so material conversations start with the real surface rather than a swatch on screen.": {
    sq: "Një kuti e përzgjedhur me materialet tona për studio, në mënyrë që bisedat për materialin të nisin nga sipërfaqja reale dhe jo nga një imazh në ekran.",
    mk: "Одбрана кутија со нашите обработки за студиото, за разговорите за материјалот да почнуваат со вистинската површина, а не со примерок на екран.",
  },
  "Custom samples and textures": { sq: "Mostra dhe tekstura të personalizuara", mk: "Мостри и текстури по мерка" },
  "Project-specific samples in your tones, textures and sheen — refined until the finish matches the intent, before anything is quoted.": {
    sq: "Mostra të posaçme për projektin, në tonet, teksturat dhe shkëlqimin e zgjedhur — të përpunuara deri sa materiali të përputhet me synimin, para përgatitjes së ofertës.",
    mk: "Мостри за конкретниот проект во вашите тонови, текстури и сјај — дотерани додека обработката не одговара на замислата, пред да се изготви понуда.",
  },
  "Finish and material specification": { sq: "Specifikimi i materialit", mk: "Спецификација на обработка и материјал" },
  "Guidance on which finish suits the space, substrate and use, with the information you need for drawings, schedules and tender.": {
    sq: "Udhëzim për materialin që i përshtatet hapësirës, bazës dhe përdorimit, së bashku me informacionin e nevojshëm për vizatimet, planifikimin dhe tenderin.",
    mk: "Насоки за тоа која обработка одговара на просторот, подлогата и намената, со информациите потребни за цртежи, распореди и тендер.",
  },
  "Technical consultation": { sq: "Konsultim teknik", mk: "Техничка консултација" },
  "Substrate assessment, preparation requirements, junctions and detailing — reviewed in the studio or on site with your team.": {
    sq: "Vlerësimi i bazës, kërkesat e përgatitjes, bashkimet dhe detajet — të shqyrtuara në studio ose në vend me ekipin tuaj.",
    mk: "Проценка на подлогата, барања за подготовка, спојови и детали — разгледани во студиото или на лице место со вашиот тим.",
  },
  Quotation: { sq: "Oferta", mk: "Понуда" },
  "Material and application quoted together, itemised by surface, so your client can approve the finish and the budget in one step.": {
    sq: "Materiali dhe aplikimi paraqiten në një ofertë të vetme, të detajuar sipas sipërfaqeve, në mënyrë që klienti juaj të miratojë materialin dhe buxhetin në një hap.",
    mk: "Материјалот и нанесувањето во заедничка понуда, разложена по површини, за вашиот клиент да ги одобри обработката и буџетот во еден чекор.",
  },
  "Professional execution": { sq: "Zbatim profesional", mk: "Професионална изведба" },
  "The finish is applied by our own team, coordinated with your programme and other trades, and handed over as specified.": {
    sq: "Materiali aplikohet nga ekipi ynë, në koordinim me planin tuaj të punës dhe profesionistët e tjerë, dhe dorëzohet sipas specifikimit.",
    mk: "Обработката ја нанесува нашиот тим, усогласено со вашата програма и другите мајстори, и се предава според спецификацијата.",
  },
  "Flexible partnership": { sq: "Partneritet fleksibël", mk: "Флексибилно партнерство" },
  "From a single feature wall to a multi-unit development or hospitality rollout — a way of working that fits the project and the practice.": {
    sq: "Nga një mur i vetëm theksues deri te një projekt ndërtimi me shumë njësi ose një projekt hotelerie — një mënyrë pune që i përshtatet projektit dhe praktikës suaj.",
    mk: "Од еден акцентен ѕид до повеќестанбен проект или угостителски објекти — начин на работа што одговара на проектот и на вашата пракса.",
  },
  "Architects & interior designers": { sq: "Arkitektë dhe dizajnerë interieri", mk: "Архитекти и дизајнери на ентериер" },
  "One partner for the decorative surface: samples, specification, quotation and execution — so the finish on site is the finish you drew.": {
    sq: "Një partner për sipërfaqen dekorative: mostra, specifikim, ofertë dhe zbatim — në mënyrë që materiali në objekt të jetë ai që keni projektuar.",
    mk: "Еден партнер за декоративната површина: мостри, спецификација, понуда и изведба — за обработката на градилиштето да биде онаа што ја нацртавте.",
  },
  "Request a Sample Box": { sq: "Kërkoni një kuti me mostra", mk: "Побарајте кутија со мостри" },
  "Developers & investors": { sq: "Investitorë dhe zhvillues projektesh", mk: "Инвеститори и градители" },
  "Consistent finishes across units, lobbies and common areas, with quotations you can plan around and scheduling coordinated with your contractor.": {
    sq: "Materiale të njëtrajtshme në njësi, holle dhe hapësira të përbashkëta, me oferta të qarta dhe afate pune të koordinuara me kontraktorin tuaj.",
    mk: "Доследни обработки во станови, лобија и заеднички простори, со понуди според кои можете да планирате и распоред усогласен со вашиот изведувач.",
  },
  "Hospitality & commercial": { sq: "Hoteleri dhe biznese", mk: "Угостителство и комерцијала" },
  "Hotels, restaurants, retail and offices: durable, characterful surfaces delivered around opening dates and operating constraints.": {
    sq: "Hotele, restorante, dyqane dhe zyra: sipërfaqe të qëndrueshme e me karakter, të dorëzuara sipas datave të hapjes dhe kufizimeve operative.",
    mk: "Хотели, ресторани, продавници и канцеларии: издржливи површини со карактер, изведени според датумите на отворање и оперативните ограничувања.",
  },
  "Architects · Designers · Developers": { sq: "Arkitektë · Dizajnerë · Investitorë", mk: "Архитекти · Дизајнери · Инвеститори" },
  "Specify with confidence.": { sq: "Specifikoni me besim.", mk: "Специфицирајте со доверба." },
  "We take it from there.": { sq: "Për pjesën tjetër kujdesemi ne.", mk: "Ние продолжуваме оттаму." },
  "Casa D'Arte works alongside architects, interior designers, developers and hospitality operators as the party responsible for the decorative surface — from sample box and specification to quotation and execution on site. Material and application are handled by one team.": {
    sq: "Casa D'Arte bashkëpunon me arkitektë, dizajnerë interieri, investitorë dhe operatorë hotelerie, duke marrë përgjegjësinë për sipërfaqen dekorative — nga kutia me mostra dhe specifikimi deri te oferta dhe zbatimi në objekt. Materiali dhe aplikimi menaxhohen nga një ekip i vetëm.",
    mk: "Casa D'Arte работи заедно со архитекти, дизајнери на ентериер, инвеститори и угостители како страна одговорна за декоративната површина — од кутијата со мостри и спецификацијата до понудата и изведбата на градилиштето. Материјалот и нанесувањето ги води еден тим.",
  },
  "Become a Partner": { sq: "Bëhuni partner", mk: "Станете партнер" },
  "Finish samples and drawings laid out for specification": {
    sq: "Mostra materialesh dhe vizatime të përgatitura për specifikim",
    mk: "Мостри од обработки и цртежи подготвени за спецификација",
  },
  "Sample cases and project samples are prepared for each collaboration.": {
    sq: "Për çdo bashkëpunim përgatiten kuti me mostra dhe mostra projekti.",
    mk: "За секоја соработка се подготвуваат кутии со мостри и мостри за проектот.",
  },
  "What we provide": { sq: "Çfarë ofrojmë", mk: "Што нудиме" },
  "Support from the first sample to the last coat.": {
    sq: "Mbështetje nga mostra e parë te shtresa e fundit.",
    mk: "Поддршка од првата мостра до последниот слој.",
  },
  "Five Italian systems, each pigmented and textured to project specification. Full details, applications and galleries on each finish page.": {
    sq: "Gjashtë materiale italiane, secili me ngjyrë dhe teksturë sipas specifikimit të projektit. Detajet, përdorimet dhe galeritë gjenden në faqen e secilit material.",
    mk: "Пет италијански системи, секој пигментиран и текстуриран според спецификацијата на проектот. Целосни детали, примени и галерии на страницата на секоја обработка.",
  },
  "All finishes →": { sq: "Të gjitha materialet →", mk: "Сите обработки →" },
  Overview: { sq: "Përmbledhje", mk: "Преглед" },
  "Who we work with": { sq: "Me kë punojmë", mk: "Со кого работиме" },
  "One responsibility, whatever the scale of the project.": {
    sq: "Një përgjegjësi, pavarësisht shkallës së projektit.",
    mk: "Една одговорност, без оглед на големината на проектот.",
  },
  "How a collaboration runs": { sq: "Si zhvillohet një bashkëpunim", mk: "Како тече соработката" },
  "Clear steps, so your client always knows what happens next.": {
    sq: "Hapa të qartë, që klienti juaj të dijë gjithmonë çfarë vjen më pas.",
    mk: "Јасни чекори, за вашиот клиент секогаш да знае што следува.",
  },
  "Concept & consultation": { sq: "Koncepti dhe konsultimi", mk: "Концепт и консултација" },
  "We review the space and intent with you — in the studio or on site.": {
    sq: "Shqyrtojmë me ju hapësirën dhe qëllimin — në studio ose në vend.",
    mk: "Ги разгледуваме просторот и замислата со вас — во студиото или на лице место.",
  },
  "Sample & finish selection": { sq: "Mostrat dhe zgjedhja e materialit", mk: "Мостри и избор на обработка" },
  "Project samples in your tones and textures, approved on the real material.": {
    sq: "Mostra projekti në tonet dhe teksturat tuaja, të miratuara mbi materialin real.",
    mk: "Мостри за проектот во вашите тонови и текстури, одобрени на вистинскиот материјал.",
  },
  "Quotation & planning": { sq: "Oferta dhe planifikimi", mk: "Понуда и планирање" },
  "Material and application quoted together; preparation and programme agreed.": {
    sq: "Materiali dhe aplikimi në një ofertë të përbashkët; përgatitja dhe programi dakordësohen.",
    mk: "Материјалот и нанесувањето во заедничка понуда; подготовката и програмата се договараат.",
  },
  "Our own team prepares the substrate and applies the finish.": {
    sq: "Ekipi ynë përgatit bazën dhe aplikon materialin.",
    mk: "Нашиот тим ја подготвува подлогата и ја нанесува обработката.",
  },
  "Finished project": { sq: "Projekti i përfunduar", mk: "Завршен проект" },
  "Sealed, inspected and handed over as specified.": {
    sq: "I mbrojtur, i inspektuar dhe i dorëzuar sipas specifikimit.",
    mk: "Заштитен, проверен и предаден според спецификацијата.",
  },
  "Introduce your studio or company.": { sq: "Prezantoni studion ose kompaninë tuaj.", mk: "Претставете го вашето студио или компанија." },
  "Tell us about your practice or portfolio and the projects you have in view. We will come back to arrange a conversation and, where useful, a sample box.": {
    sq: "Na tregoni për studion ose portofolin tuaj dhe projektet që keni në plan. Do t’ju kontaktojmë për të caktuar një bisedë dhe, kur është e dobishme, për të përgatitur një kuti me mostra.",
    mk: "Кажете ни за вашата пракса или портфолио и проектите што ги планирате. Ќе ви се јавиме за да договориме разговор и, кога е корисно, кутија со мостри.",
  },
  "Start the conversation": { sq: "Filloni bisedën", mk: "Започнете го разговорот" },

  // Contact
  "Discuss your project": { sq: "Diskutoni projektin tuaj", mk: "Разговарајте за вашиот проект" },
  "Tell us about the project.": { sq: "Na tregoni për projektin.", mk: "Кажете ни за проектот." },
  "Send inquiry": { sq: "Dërgoni kërkesën", mk: "Испрати барање" },
  "Request a sample": { sq: "Kërkoni mostër", mk: "Побарајте мостра" },
  "Which finishes would you like to see?": { sq: "Cilat materiale dëshironi të shihni?", mk: "Кои обработки би сакале да ги видите?" },
  "I would like to receive samples of: ": { sq: "Dëshiroj të marr mostra të: ", mk: "Би сакал/а да добијам мостри од: " },
  "Request samples": { sq: "Kërkoni mostra", mk: "Побарајте мостри" },
  "Let us price the work.": { sq: "Kërkoni një preventiv për punimet.", mk: "Дозволете ни да ја процениме работата." },
  "Surface area (approx.), location, condition of the walls, preferred finish: ": {
    sq: "Sipërfaqja (përafërsisht), vendndodhja, gjendja e mureve, materiali i preferuar: ",
    mk: "Површина (приближно), локација, состојба на ѕидовите, посакувана обработка: ",
  },
  Partnership: { sq: "Partneritet", mk: "Партнерство" },
  "Let's begin with a": { sq: "Le të fillojmë me një", mk: "Да започнеме со" },
  "conversation.": { sq: "bisedë.", mk: "разговор." },
  "Reach the studio by form or phone. Whether you are specifying a finish, planning a development or renovating a home, we will guide you from sample to finished surface.": {
    sq: "Kontaktoni studion përmes formularit ose telefonit. Pavarësisht nëse po specifikoni një material, po planifikoni një projekt ndërtimi apo po rinovoni një shtëpi, do t’ju udhëheqim nga mostra deri te sipërfaqja e përfunduar.",
    mk: "Контактирајте го студиото преку формуларот или по телефон. Без разлика дали специфицирате обработка, планирате градежен проект или реновирате дом, ќе ве водиме од мострата до завршената површина.",
  },
  Studio: { sq: "Studioja", mk: "Студио" },
  Direct: { sq: "Direkt", mk: "Директно" },

  // Form
  Name: { sq: "Emri", mk: "Име" },
  City: { sq: "Qyteti", mk: "Град" },
  "Finish / Service of interest": { sq: "Materiali / shërbimi që ju intereson", mk: "Обработка / услуга од интерес" },
  Select: { sq: "Zgjidhni", mk: "Изберете" },
  "Not sure yet — advice needed": { sq: "Ende nuk jam i sigurt — më nevojitet këshillë", mk: "Сè уште не сум сигурен/на — потребен ми е совет" },
  Message: { sq: "Mesazhi", mk: "Порака" },
  "Sending…": { sq: "Po dërgohet…", mk: "Се испраќа…" },
  "Your details are used only to respond to this inquiry.": {
    sq: "Të dhënat tuaja përdoren vetëm për t’iu përgjigjur kësaj kërkese.",
    mk: "Вашите податоци се користат само за одговор на ова барање.",
  },
  "Thank you — your inquiry has been received. We will be in touch shortly.": {
    sq: "Faleminderit — kërkesa juaj u pranua. Do t’ju kontaktojmë së shpejti.",
    mk: "Ви благодариме — вашето барање е примено. Наскоро ќе ве контактираме.",
  },
  "Something went wrong. Please try again or email us instead.": {
    sq: "Diçka shkoi keq. Ju lutemi provoni përsëri ose na shkruani me email.",
    mk: "Нешто тргна наопаку. Ве молиме обидете се повторно или пишете ни по е-пошта.",
  },
  Received: { sq: "U pranua", mk: "Примено" },
  "Thank you.": { sq: "Faleminderit.", mk: "Ви благодариме." },
  "Your inquiry has reached the studio. We will review it and come back to you to arrange the next step — a conversation, samples, or a site visit.": {
    sq: "Kërkesa juaj ka mbërritur në studio. Do ta shqyrtojmë dhe do t’ju kontaktojmë për të caktuar hapin e radhës — një bisedë, mostra ose një vizitë në objekt.",
    mk: "Вашето барање стигна до студиото. Ќе го разгледаме и ќе ви се јавиме за да го договориме следниот чекор — разговор, мостри или посета на лице место.",
  },
  "Send another inquiry": { sq: "Dërgoni një kërkesë tjetër", mk: "Испратете друго барање" },

  // Journal
  "The Journal": { sq: "Revista", mk: "Дневникот" },
  "Notes from the": { sq: "Shënime nga", mk: "Белешки од" },
  "studio.": { sq: "studioja.", mk: "студиото." },
  "On Italian craft, colour, material and the architecture of the interior.": {
    sq: "Për zanatin italian, ngjyrën, materialin dhe arkitekturën e interierit.",
    mk: "За италијанскиот занает, бојата, материјалот и архитектурата на ентериерот.",
  },
  Read: { sq: "Lexoni", mk: "Прочитај" },
  "← The Journal": { sq: "← Revista", mk: "← Дневникот" },
  "Considering one of these finishes for a project? We prepare samples in your tones before anything is quoted.": {
    sq: "Po mendoni të përdorni një nga këto materiale në projektin tuaj? Përgatisim mostra në tonet tuaja para hartimit të ofertës.",
    mk: "Размислувате за некоја од овие обработки за проект? Подготвуваме мостри во вашите тонови пред да се изготви понуда.",
  },
  "Continue reading": { sq: "Vazhdoni të lexoni", mk: "Продолжете со читање" },
};

type Localized = { sq: string; mk: string };

/** Finish taglines and summaries, by slug. */
export const PRODUCT_TR: Record<string, { tagline: Localized; summary: Localized }> = {
  travertino: {
    tagline: { sq: "Arkitektonike dhe e papërpunuar", mk: "Архитектонски и сурово" },
    summary: {
      sq: "Thellësia poroze, si prej guri, e travertinës romake — për interiere dhe fasada.",
      mk: "Порозната длабочина налик на камен на римскиот травертин — за ентериери и фасади.",
    },
  },
  marmorino: {
    tagline: { sq: "Elegancë klasike", mk: "Класична префинетост" },
    summary: {
      sq: "Një material i lëmuar me bazë gëlqereje, me shkëlqim të butë dhe thellësi të qetë — fryma e murit klasik venecian.",
      mk: "Мазна варовна обработка со нежен сјај и тивка длабочина — класичниот венецијански ѕид.",
    },
  },
  sahara: {
    tagline: { sq: "Teksturë ranore me shkëlqim metalik", mk: "Текстура со метално зрно" },
    summary: {
      sq: "Kokërr e imët minerale me pigmente metalike — një sipërfaqe që ndryshon me dritën.",
      mk: "Фино минерално зрно со метални пигменти — површина што се менува со светлината.",
    },
  },
  "stucco-veneziano": {
    tagline: { sq: "Shkëlqim si pasqyrë", mk: "Сјај како огледало" },
    summary: {
      sq: "Shtresa të tejdukshme gëlqereje dhe mermeri, të lustruara si pasqyrë, me thellësi si të mermerit.",
      mk: "Проѕирни слоеви од вар и мермер, полирани до огледален сјај со длабочина налик на мермер.",
    },
  },
  microcement: {
    tagline: { sq: "Sipërfaqe moderne pa fuga", mk: "Беспрекорно и современо" },
    summary: {
      sq: "Sipërfaqe çimentoje të vazhdueshme, pa fuga, për mure, dysheme dhe zona me lagështi.",
      mk: "Континуирани цементни површини без фуги, за ѕидови, подови и влажни простории.",
    },
  },
  "beton-look": {
    tagline: { sq: "Karakter arkitektonik betoni", mk: "Архитектонски карактер на бетон" },
    summary: {
      sq: "Një material dekorativ me pamjen e qetë minerale të betonit të ekspozuar.",
      mk: "Декоративна обработка со смирен минерален изглед на видлив бетон.",
    },
  },
};

export type PostTr = { title: string; excerpt: string; date: string; readTime: string; category: string; body: string[] };

/** Journal articles, by slug. */
export const POST_TR: Record<string, { sq: PostTr; mk: PostTr }> = {
  "art-of-venetian-plaster": {
    sq: {
      title: "Arti i Stucco Veneziano",
      excerpt:
        "Si një teknikë italiane shekullore u bë shenja dalluese e interiereve luksoze bashkëkohore — dhe pse dora që e aplikon ka po aq rëndësi sa materiali.",
      date: "Mars 2026",
      readTime: "6 min lexim",
      category: "Zanati",
      body: [
        "Suvaja veneciane, ose Stucco Veneziano, e ka origjinën në pallatet e Venecias së Rilindjes — një qytet ku ajri i lagësht detar kërkonte materiale që të ishin njëkohësisht të bukura dhe të përshkueshme nga ajri. E aplikuar në shtresa të tejdukshme gëlqereje të shuar dhe mermeri të bluar imët, kjo teknikë krijon një mur me thellësi të dallueshme.",
        "Arkitektët që punojnë në interiere të rafinuara i janë rikthyer Stucco Veneziano pikërisht për arsyen që e çmonin ndërtuesit venecianë: asnjë bojë industriale nuk e riprodhon butësinë vizuale të gëlqeres së punuar me mistri, apo mënyrën si ndryshon kur drita lëviz nëpër dhomë.",
        "Është gjithashtu një teknikë ku materiali dhe aplikimi nuk mund të ndahen. I njëjti produkt, në duar të ndryshme, krijon një mur tjetër. Numri i shtresave, presioni i mistrisë, koha mes shtresave dhe lustrimi përfundimtar vendosin nëse sipërfaqja duket si mermer apo si bojë.",
        "Prandaj Casa D'Arte e furnizon materialin dhe e aplikon me ekipin e vet. Një sipërfaqe Stucco Veneziano realizohet sipas specifikimit kur i njëjti ekip kujdeset për materialin dhe aplikimin — shtresë pas shtrese, deri sa sipërfaqja të bëhet pjesë e natyrshme e arkitekturës.",
      ],
    },
    mk: {
      title: "Уметноста на Stucco Veneziano",
      excerpt:
        "Како една вековна италијанска техника стана белег на современите луксузни ентериери — и зошто раката што ја нанесува е важна колку и материјалот.",
      date: "Март 2026",
      readTime: "6 мин. читање",
      category: "Занает",
      body: [
        "Венецијанскиот малтер, или Stucco Veneziano, потекнува од палатите на ренесансна Венеција — град чиј влажен морски воздух бараше обработки што се истовремено убави и дишат. Нанесена во проѕирни слоеви од гасена вар и фино мелен мермер, техниката создава ѕид што се чини дека има сопствена длабочина.",
        "Архитектите што работат на префинети ентериери повторно се вратија на Stucco Veneziano токму поради причината поради која го ценеа венецијанските градители: ниту една индустриска боја не ја повторува визуелната мекост на рачно глетуваната вар, ниту начинот на кој се менува додека светлината се движи низ просторијата.",
        "Тоа е и техника во која материјалот и нанесувањето не можат да се одвојат. Истиот производ, во различни раце, дава различен ѕид. Бројот на слоеви, притисокот на глетарицата, времето меѓу слоевите и завршното полирање одлучуваат дали површината ќе делува како мермер или како боја.",
        "Затоа Casa D'Arte ја набавува обработката и ја нанесува со својот тим. Специфициран Stucco Veneziano се остварува само кога луѓето што го избрале материјалот се истите што го носат на ѕидот — слој по слој, додека површината не ѝ припадне на архитектурата наместо само да лежи врз неа.",
      ],
    },
  },
  "choosing-finish-for-your-space": {
    sq: {
      title: "Si të zgjidhni materialin e duhur për hapësirën tuaj",
      excerpt:
        "Travertino, Marmorino, Stucco Veneziano, Sahara, Microcement apo Beton Look — një udhëzues për zgjedhjen e materialit që i përshtatet arkitekturës suaj.",
      date: "Shkurt 2026",
      readTime: "8 min lexim",
      category: "Udhëzues",
      body: [
        "Secili nga gjashtë materialet me të cilat punojmë ka karakter të veçantë arkitektonik. Të përcaktoni se cili i përshtatet një hapësire — dhe mënyrës se si do të përdoret ajo — është vendimi i parë në çdo projekt, që merret më mirë duke parë një mostër fizike.",
        "Marmorino ka një karakter të qetë. Përshtatet aty ku kërkohet thellësi pa teprime: në dhoma gjumi, dhoma ngrënieje dhe zyra me estetikë të përmbajtur. Krijon një sipërfaqe të butë, të ndritshme dhe me lëvizje delikate.",
        "Stucco Veneziano ka karakter shprehës. Përshtatet në hapësira ku drita luan rol të rëndësishëm — suita me dritare të larta dhe restorante ku ndriçimi i mbrëmjes thekson sipërfaqen. I lustruar deri në shkëlqim pasqyre, krijon pamjen e mermerit me damarë.",
        "Travertino ka karakter tektonik. Poroziteti i jep peshë vizuale. Përshtatet me vila, fasada dhe mure që kërkojnë një prani të fortë arkitektonike.",
        "Sahara ka karakter bashkëkohor. Tekstura e imët ranore me shkëlqim metalik gjallërohet në dritën e mbrëmjes, ndaj përshtatet me bare, dyqane butik dhe tualete për mysafirë.",
        "Microcement krijon sipërfaqe moderne pa fuga. Ky material i hollë me bazë çimentoje përdoret në mure, dysheme dhe zona me lagështi, duke iu përshtatur banjove bashkëkohore, kuzhinave dhe ambienteve tregtare ku fugat dhe pllakat do ta ndërprisnin vazhdimësinë e hapësirës.",
        "Pavarësisht drejtimit të projektit, rekomandojmë që vendimi të merret duke parë në hapësirën reale mostra të përgatitura në tonin dhe teksturën e synuar. Materiali i duhur është ai që harmonizohet natyrshëm me hapësirën.",
      ],
    },
    mk: {
      title: "Како да ја изберете вистинската обработка за вашиот простор",
      excerpt:
        "Travertino, Marmorino, Stucco Veneziano, Sahara или Microcement — дизајнерски водич за избор на обработката што одговара на вашата архитектура.",
      date: "Февруари 2026",
      readTime: "8 мин. читање",
      category: "Водич",
      body: [
        "Секоја од шесте обработки со кои работиме има свој архитектонски карактер. Разбирањето која одговара на даден простор — и како ќе се користи тој простор — е првата одлука во секој проект, и онаа што најдобро ја решава физичката мостра.",
        "Marmorino е тивок. Одговара таму каде што сакате длабочина без драма: спални, трпезарии, канцеларии за луѓе што ценат умереност. Мека, светлечка површина со суптилно движење.",
        "Stucco Veneziano е театрален. Припаѓа на простори каде светлината е важна — апартмани со високи прозорци, ресторани каде навечер работата ја врши светлината од свеќите. Полиран до огледален сјај, делува како жилест мермер.",
        "Travertino е тектонски. Неговата порозност му дава тежина. Одговара на вили, фасади и секој ѕид што треба да делува вкоренет во земјата, а не само нанесен врз неа.",
        "Sahara е современа. Финото минерално зрно со метален пигмент ја оживува во вечерната светлина, па затоа одговара на барови, бутик-продавници и тоалети за гости.",
        "Microcement е беспрекорен. Тенка, континуирана цементна површина за ѕидови, подови и влажни простории, погодна за современи бањи, кујни и комерцијални ентериери каде фугите и плочките би го прекинувале просторот.",
        "Каква и да е насоката на проектот, препорачуваме одлуката да се донесе врз мостри подготвени во посакуваниот тон и текстура, разгледани во вистинскиот простор. Вистинската обработка е онаа што таму изгледа неизбежно.",
      ],
    },
  },
  "microcement-seamless-surfaces": {
    sq: {
      title: "Microcement: sipërfaqe pa fuga, të realizuara siç duhet",
      excerpt:
        "Pse Microcement është bërë një zgjidhje bashkëkohore për banja, dysheme dhe ambiente me sipërfaqe të vazhdueshme — dhe pse përgatitja përcakton rezultatin.",
      date: "Janar 2026",
      readTime: "5 min lexim",
      category: "Udhëzues",
      body: [
        "Microcement është një shtresë e hollë me bazë çimentoje, që aplikohet me disa milimetra mbi një bazë ekzistuese. Tërheqja e tij është vazhdimësia që sjell: muret, dyshemetë, dushet dhe mobiliet mund të ndajnë një sipërfaqe të pandërprerë, pa fuga e pa buzë pllakash.",
        "Kjo vazhdimësi kërkon edhe disiplinë në aplikim. Meqë shtresa është kaq e hollë, ajo zbulon bazën poshtë saj. Plasaritjet, lëvizjet dhe lagështia që një sistem më i trashë mund t’i fshihte, dalin në pah përmes Microcement. Një rezultat i mirë varet më pak nga shtresa përfundimtare sesa nga vlerësimi, aplikimi i astarit dhe përgatitja paraprake.",
        "Për zonat me lagështi, sistemi i mbylljes dhe detajet e tij te sifonët, bashkimet dhe qoshet janë ato që e bëjnë sipërfaqen të qëndrueshme. Këtu furnizuesi që e aplikon edhe vetë materialin e fiton vendin e vet: sistemi specifikohet, përgatitet, aplikohet dhe mbyllet nga një ekip i vetëm, dhe përgjegjësia për sipërfaqen e përfunduar është e qartë.",
        "Microcement është pjesë e materialeve tona, krahas sistemeve italiane me bazë gëlqereje. Kur një projekt kërkon një sipërfaqe bashkëkohore pa fuga — në banjë, kuzhinë apo dyshemenë e një dyqani — përgatisim mostra në tonin dhe teksturën e synuar dhe paraqesim një ofertë të përbashkët për materialin dhe aplikimin.",
      ],
    },
    mk: {
      title: "Microcement: беспрекорни површини, правилно изведени",
      excerpt:
        "Зошто микроцементот стана современиот одговор за бањи, подови и континуирани ентериери — и зошто подготовката го одредува резултатот.",
      date: "Јануари 2026",
      readTime: "5 мин. читање",
      category: "Водич",
      body: [
        "Микроцементот е тенок премаз на цементна основа што се нанесува во неколку милиметри врз постојна подлога. Неговата привлечност е континуитетот: ѕидовите, подовите, тушевите и мебелот можат да делат една непрекината површина, без фуги и рабови од плочки.",
        "Тој континуитет е и негова дисциплина. Бидејќи премазот е толку тенок, ја открива подлогата под него. Пукнатините, движењата и влагата што подебел систем би ги скрил, ќе се видат низ микроцементот. Добриот резултат зависи помалку од завршниот слој, а повеќе од проценката, прајмирањето и подготовката пред него.",
        "Кај влажните простории, системот за заштита и неговата изведба кај сливниците, спојовите и аглите се она што ја прави површината издржлива. Тука добавувачот што и сам го нанесува материјалот го заслужува своето место: системот го специфицира, подготвува, нанесува и заштитува еден тим, а одговорноста за завршената површина е јасна.",
        "Микроцементот сега е дел од нашите обработки, покрај италијанските системи на варовна основа. Кога проектот бара беспрекорна, современа површина — бања, кујна, под во продавница — подготвуваме мостри во посакуваниот тон и текстура и даваме заедничка понуда за материјалот и нанесувањето.",
      ],
    },
  },
  "green-in-italian-design": {
    sq: {
      title: "Pse jeshilja u rikthye në dizajnin italian",
      excerpt:
        "Nga pallatet e Rilindjes te interieret bashkëkohore milaneze — një ngjyrë rizbulon autoritetin e saj arkitektonik.",
      date: "Dhjetor 2025",
      readTime: "5 min lexim",
      category: "Ngjyra",
      body: [
        "Për shekuj me radhë, jeshilja e thellë ishte ngjyrë e fisnikërisë italiane — në muret e pallateve të Rilindjes dhe të dhomave veneciane, e përftuar nga pigmente me bazë bakri dhe e stabilizuar në gëlqere, ku plakej me dinjitet ndërsa jeshilet më të lira bëheshin të turbullta.",
        "Vitet e fundit, arkitektët e interierit e kanë rikthyer. Muri jeshil i errët — i thellë, mat, pa zbukurime — është bërë shenjë vetëbesimi në interieret bashkëkohore.",
        "Është një ngjyrë që kërkon materialin e duhur. Në një sipërfaqe të lyer, mund të duket e rrafshët. Në Stucco Veneziano ose Marmorino, pigmenti mineral qëndron brenda shtresave të tejdukshme të gëlqeres dhe mermerit, duke i dhënë jeshiles thellësi: më pak si një shtresë ngjyre dhe më shumë si një material më vete.",
      ],
    },
    mk: {
      title: "Зошто зелената се врати во италијанскиот дизајн",
      excerpt:
        "Од ренесансните палати до современите милански ентериери — една боја повторно го открива својот архитектонски авторитет.",
      date: "Декември 2025",
      readTime: "5 мин. читање",
      category: "Боја",
      body: [
        "Со векови, темнозелената беше боја на италијанското благородништво — на ѕидовите на ренесансните палати и венецијанските простории, добиена од пигменти на бакарна основа и стабилизирана во вар, каде старееше достоинствено додека поевтините зелени бои стануваа матни.",
        "Во последниве години, архитектите на ентериер ја вратија. Темнозелениот ѕид — длабок, мат, без украси — стана знак на самодоверба во современите ентериери.",
        "Тоа е боја што бара вистинска обработка. Како боја, таа станува рамна. Во Stucco Veneziano или Marmorino, минералниот пигмент лежи во проѕирните слоеви од вар и мермер, а зелената ја добива длабочината што ја имаше во палатите: помалку слој боја, а повеќе материјал сам по себе.",
      ],
    },
  },
};

/** Static page metadata by pathname (English stays in each route's head()). */
export const META_TR: Record<string, { sq: { title: string; description: string }; mk: { title: string; description: string } }> = {
  "/": {
    sq: {
      title: "Casa D'Arte | Materiale dekorative italiane dhe aplikim",
      description:
        "Materiale dekorative premium — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement dhe Beton Look — të aplikuara në mënyrë profesionale nga Casa D'Arte në Maqedoninë e Veriut.",
    },
    mk: {
      title: "Casa D'Arte | Италијански декоративни обработки и нанесување",
      description:
        "Премиум декоративни обработки — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement и Beton Look — професионално нанесени од Casa D'Arte во Северна Македонија.",
    },
  },
  "/products": {
    sq: {
      title: "Materialet — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement, Beton Look",
      description:
        "Gjashtë materiale dekorative premium — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement dhe Beton Look — të furnizuara dhe të aplikuara në mënyrë profesionale nga Casa D'Arte.",
    },
    mk: {
      title: "Обработки — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement, Beton Look",
      description:
        "Шест премиум декоративни обработки — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement и Beton Look — набавени и професионално нанесени од Casa D'Arte.",
    },
  },
  "/portfolio": {
    sq: {
      title: "Projektet e realizuara | Casa D'Arte",
      description:
        "Projekte të realizuara nga Casa D'Arte në ambiente banimi, hotele, zyra dhe dyqane në Maqedoninë e Veriut, të paraqitura me hapësirën dhe materialin e përdorur.",
    },
    mk: {
      title: "Проекти — Декоративните обработки на Casa D'Arte на своето место",
      description:
        "Одбрани станбени, угостителски и комерцијални проекти во Северна Македонија — италијански декоративни обработки набавени и нанесени од тимот на Casa D'Arte.",
    },
  },
  "/services": {
    sq: {
      title: "Shërbimet — Furnizim, aplikim dhe konsultim | Casa D'Arte",
      description:
        "Materiale dekorative italiane të furnizuara dhe të aplikuara në mënyrë profesionale: konsultim, mostra, zhvillim ngjyrash dhe teksturash, ofertë dhe zbatim për projekte banimi, biznese dhe hoteleri në Maqedoninë e Veriut.",
    },
    mk: {
      title: "Услуги — Набавка, нанесување и консултации | Casa D'Arte",
      description:
        "Италијански декоративни обработки, набавени и професионално нанесени: консултации, мостри, развој на бои и текстури, понуда и изведба за станбени, комерцијални и угостителски проекти во Северна Македонија.",
    },
  },
  "/about": {
    sq: {
      title: "Studioja — Casa D'Arte, mbi një dekadë përvojë",
      description:
        "Kompania jonë ka më shumë se një dekadë përvojë në furnizimin dhe aplikimin profesional të materialeve dekorative italiane në të gjithë Maqedoninë e Veriut.",
    },
    mk: {
      title: "Студиото — Casa D'Arte, италијански обработки",
      description:
        "Casa D'Arte: студио со повеќе од една декада искуство што набавува премиум италијански декоративни обработки и ги нанесува со сопствен тим низ цела Северна Македонија.",
    },
  },
  "/architects": {
    sq: {
      title: "Arkitektë dhe dizajnerë — Partneritet me Casa D'Arte",
      description:
        "Kuti me mostra, mostra të personalizuara, mbështetje për specifikim, konsultim teknik, ofertë dhe aplikim profesional — Casa D'Arte punon me arkitektë, dizajnerë, investitorë dhe projekte hotelerie në Maqedoninë e Veriut.",
    },
    mk: {
      title: "Архитекти и дизајнери — Партнерство со Casa D'Arte",
      description:
        "Кутии со мостри, мостри по мерка, поддршка при спецификација, техничка консултација, понуда и професионално нанесување — Casa D'Arte работи со архитекти, дизајнери, инвеститори и угостителски проекти во Северна Македонија.",
    },
  },
  "/contact": {
    sq: {
      title: "Kontaktoni Casa D'Arte — Diskutoni një projekt, kërkoni mostër ose preventiv",
      description:
        "Diskutoni projektin tuaj me Casa D'Arte në Maqedoninë e Veriut. Kërkoni preventiv ose konsultim për materiale dekorative italiane, të furnizuara dhe të aplikuara në mënyrë profesionale.",
    },
    mk: {
      title: "Контактирајте ја Casa D'Arte — Разговарајте за проект, побарајте мостра или понуда",
      description:
        "Разговарајте за вашиот проект со Casa D'Arte во Северна Македонија. Побарајте понуда или консултација за италијански декоративни обработки, набавени и професионално нанесени.",
    },
  },
  "/finish-advisor": {
    sq: {
      title: "Këshilltari i materialeve — Casa D'Arte",
      description:
        "Ngarkoni një foto të dhomës, përshkruani hapësirën dhe merrni sugjerime për materialet dekorative të Casa D'Arte dhe hapat e ardhshëm.",
    },
    mk: {
      title: "Советник за материјали — Casa D'Arte",
      description:
        "Прикачете фотографија од просторијата, опишете го просторот и добијте предлози за декоративните материјали на Casa D'Arte и следните чекори.",
    },
  },
  "/blog": {
    sq: {
      title: "Revista — Casa D'Arte për materialet dekorative italiane",
      description:
        "Shënime dhe udhëzues për materialet dekorative — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement dhe Beton Look — ngjyrat dhe sipërfaqet e ambienteve, nga Casa D'Arte.",
    },
    mk: {
      title: "Дневник — Casa D'Arte за италијанските декоративни обработки",
      description:
        "Белешки и водичи за декоративни обработки — Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement и Beton Look — бои и ентериерни површини, од Casa D'Arte.",
    },
  },
};
