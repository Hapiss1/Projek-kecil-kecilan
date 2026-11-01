export const portfolioData = {
  personal: {
    name: "Muhammad Hafizh Farsya Syahputra",
    shortName: "Hafizh Farsya",
    title: {
      id: "Siswa Rekayasa Perangkat Lunak (RPL) & Calon Praktik Kerja Lapangan",
      en: "Software Engineering Student & Prospective Industry Intern"
    },
    heroTagline: {
      id: "Membangun solusi perangkat lunak web dan mobile dengan kode yang terstruktur.",
      en: "Crafting structured web and mobile software with engineered precision."
    },
    school: "SMK Telkom Banjarbaru",
    major: {
      id: "Rekayasa Perangkat Lunak (RPL)",
      en: "Software Engineering"
    },
    period: "2023 — Sekarang",
    location: "Kota Banjarbaru, Kalimantan Selatan, Indonesia",
    phone: "+62811-5003-018",
    phoneClean: "628115003018",
    email: "hafizhfarsya@gmail.com",
    availability: {
      id: "Tersedia untuk Praktik Kerja Lapangan (PKL) / Magang",
      en: "Available for Vocational Internship (PKL)"
    },
    bio: {
      id: "Saya adalah siswa jurusan Rekayasa Perangkat Lunak (RPL) di SMK Telkom Banjarbaru dengan minat mendalam pada rekayasa perangkat lunak dan teknologi digital. Terbiasa membangun aplikasi web dan mobile menggunakan ekosistem Flutter, Laravel, PHP, MySQL, serta Firestore. Berpengalaman mengerjakan proyek individu maupun kolaborasi tim, dan bertekad memberikan kontribusi nyata serta menimba pengalaman berharga melalui Praktik Kerja Lapangan (PKL) di industri.",
      en: "Software Engineering student at SMK Telkom Banjarbaru with deep passion in software development and digital technologies. Experienced in constructing web and mobile applications using Flutter, Laravel, PHP, MySQL, and Firestore. Practiced in both individual projects and agile teamwork, eager to deliver tangible value and gain professional industry experience through vocational internship (PKL)."
    }
  },

  metrics: [
    {
      value: "3+",
      label: { id: "Proyek Utama Selesai", en: "Core Projects Shipped" },
      sub: { id: "E-Commerce, Web Prestasi, Portofolio", en: "E-Commerce, Achievement Portal, App" }
    },
    {
      value: "5+",
      label: { id: "Teknologi Dikuasai", en: "Tech Stacks Mastered" },
      sub: { id: "Flutter, Laravel, PHP, MySQL, Firestore", en: "Flutter, Laravel, PHP, MySQL, Firestore" }
    },
    {
      value: "2023",
      label: { id: "Tahun Mulai di SMK Telkom", en: "Enrolled at SMK Telkom" },
      sub: { id: "Fokus Rekayasa Perangkat Lunak", en: "Software Engineering Track" }
    },
    {
      value: "100%",
      label: { id: "Kesiapan PKL Industri", en: "Internship Readiness" },
      sub: { id: "Banjarbaru / Remote / On-Site", en: "Banjarbaru / Hybrid / On-Site" }
    }
  ],

  projects: [
    {
      id: "ecommerce-platform",
      title: {
        id: "Website E-Commerce Multi-Kategori",
        en: "Multi-Category E-Commerce Platform"
      },
      tag: "Fullstack Web Application",
      category: "E-Commerce & Retail",
      headline: {
        id: "Toko digital terpadu untuk buku, perangkat komputer, dan sepatu.",
        en: "Integrated digital storefront for books, computer hardware, and footwear."
      },
      description: {
        id: "Platform web e-commerce berbasis PHP & Laravel yang dirancang untuk memfasilitasi transaksi dan pengelolaan produk beragam komoditas (buku, peralatan komputer, dan sepatu). Mengintegrasikan arsitektur MVC, database relasional MySQL, filter kategori real-time, dan alur checkout keranjang yang intuitif.",
        en: "PHP & Laravel powered e-commerce web platform designed to facilitate transactions and inventory tracking across distinct commodities (books, computer peripherals, and shoes). Integrates clean MVC architecture, relational MySQL schemas, real-time category filtering, and an intuitive cart checkout workflow."
      },
      stack: ["PHP", "Laravel", "MySQL", "JavaScript", "CSS3", "HTML5"],
      architecture: "Model-View-Controller (MVC) dengan Eloquent ORM",
      highlights: [
        {
          id: "Manajemen katalog dinamis dengan filter instan antar kategori buku, komputer, dan sepatu.",
          en: "Dynamic catalog management with instant filtering across books, tech gear, and footwear."
        },
        {
          id: "Kalkulasi keranjang belanja reaktif dengan kalkulasi kuantitas barang dan simulasi checkout.",
          en: "Reactive shopping cart computation with dynamic item quantity and simulated checkout."
        },
        {
          id: "Struktur basis data ternormalisasi untuk tabel user, kategori, produk, dan detail pesanan.",
          en: "Normalized database schema across users, categories, products, and order line items."
        }
      ],
      interactiveSimulator: {
        type: "ecommerce",
        demoProducts: [
          {
            id: 1,
            name: "Buku Pemrograman Web Modern",
            category: "Buku",
            price: 125000,
            stock: 18,
            tag: "Bestseller",
            badge: "Edu"
          },
          {
            id: 2,
            name: "Mechanical Keyboard TKL Brown Switch",
            category: "Peralatan Komputer",
            price: 480000,
            stock: 9,
            tag: "Hardware",
            badge: "Tech"
          },
          {
            id: 3,
            name: "Sneakers Canvas Daily Walk",
            category: "Sepatu",
            price: 320000,
            stock: 14,
            tag: "Apparel",
            badge: "Style"
          },
          {
            id: 4,
            name: "Buku Algoritma & Struktur Data",
            category: "Buku",
            price: 140000,
            stock: 12,
            tag: "Edu",
            badge: "Edu"
          },
          {
            id: 5,
            name: "Precision Optical Gaming Mouse",
            category: "Peralatan Komputer",
            price: 275000,
            stock: 22,
            tag: "Hardware",
            badge: "Tech"
          },
          {
            id: 6,
            name: "Sepatu Running Ultra-Light",
            category: "Sepatu",
            price: 450000,
            stock: 8,
            tag: "Apparel",
            badge: "Style"
          }
        ]
      }
    },
    {
      id: "prestasi-siswa",
      title: {
        id: "Website Dokumentasi Prestasi Siswa",
        en: "Student Achievement Documentation Portal"
      },
      tag: "School Information System",
      category: "Education Technology",
      headline: {
        id: "Pencatatan dan repositori resmi rekam jejak juara siswa SMK Telkom Banjarbaru.",
        en: "Official documentation repository for student championships at SMK Telkom."
      },
      description: {
        id: "Aplikasi web dokumentasi prestasi yang dibangun untuk mendata, memvalidasi, dan mempublikasikan torehan prestasi akademik maupun non-akademik siswa/siswi. Dilengkapi sistem klasifikasi tingkatan lomba (Kota, Provinsi, Nasional), pencarian cepat berindeks, dan showcase penghargaan.",
        en: "Achievement documentation web application developed to record, validate, and showcase academic and non-academic accolades earned by students. Features tiered competition classifications (Municipal, Provincial, National), indexed search, and award credential showcases."
      },
      stack: ["Laravel", "PHP", "MySQL", "Blade Templates", "RESTful Routing"],
      architecture: "Relational Data Portal dengan Role-based Data Flow",
      highlights: [
        {
          id: "Kategorisasi tingkatan kompetisi dari Kota, Provinsi hingga Nasional dengan filter cepat.",
          en: "Categorization of competition tiers from Municipal, Provincial to National with fast filters."
        },
        {
          id: "Pencarian instan nama siswa, cabang kejuaraan, atau jurusan dengan query teroptimasi.",
          en: "Instant lookup for student names, competition categories, or departments via optimized queries."
        },
        {
          id: "Tampilan profil peraih prestasi yang mencakup bukti kejuaraan dan ringkasan pencapaian.",
          en: "Verified achievement profile cards highlighting winner names, ranks, and event details."
        }
      ],
      interactiveSimulator: {
        type: "portal",
        records: [
          {
            id: "PREST-01",
            student: "Tim RPL SMK Telkom",
            competition: "LKS Web Technologies Provinsi Kalsel",
            tier: "Provinsi",
            rank: "Juara 1 (Medali Emas)",
            year: "2024",
            field: "Rekayasa Perangkat Lunak"
          },
          {
            id: "PREST-02",
            student: "Delegasi Siswa Banjarbaru",
            competition: "Olimpiade IT & Jaringan Nasional",
            tier: "Nasional",
            rank: "Juara 2 (Medali Perak)",
            year: "2024",
            field: "Teknik Jaringan & Komputer"
          },
          {
            id: "PREST-03",
            student: "Ksatria Coding Telkom",
            competition: "Hackathon Solusi Digital Pelajar",
            tier: "Regional",
            rank: "Juara 1 (Best Innovation)",
            year: "2023",
            field: "Rekayasa Perangkat Lunak"
          },
          {
            id: "PREST-04",
            student: "Tim Desain Antarmuka",
            competition: "Lomba UI/UX Design Kreatif Remaja",
            tier: "Kota",
            rank: "Juara Harapan 1",
            year: "2024",
            field: "UI/UX & Desain Grafis"
          }
        ]
      }
    },
    {
      id: "mobile-portfolio",
      title: {
        id: "Aplikasi Portofolio Digital Mobile",
        en: "Mobile Developer Portfolio Application"
      },
      tag: "Cross-Platform Mobile App",
      category: "Mobile Software",
      headline: {
        id: "Showcase profil, proyek, dan keahlian teknis dalam antarmuka mobile native.",
        en: "Mobile application showcasing developer profiles, projects, and technical skills."
      },
      description: {
        id: "Aplikasi portofolio mobile cross-platform berbasis Flutter dan Firebase Firestore. Didesain untuk memudahkan para pengembang software menampilkan profil profesional, riwayat pekerjaan, dan keahlian teknis kepada klien atau perusahaan dalam satu genggaman.",
        en: "Cross-platform mobile portfolio application powered by Flutter and Firebase Firestore. Crafted to empower software engineers in demonstrating professional credentials, project history, and technical competencies seamlessly on mobile devices."
      },
      stack: ["Flutter", "Dart", "Firebase Firestore", "Figma UI/UX", "Mobile CI"],
      architecture: "Stateful Widget Hierarchy dengan Firestore Stream Provider",
      highlights: [
        {
          id: "Sinkronisasi data portofolio secara real-time via Cloud Firestore NoSQL.",
          en: "Real-time portfolio data synchronization via Cloud Firestore NoSQL collections."
        },
        {
          id: "Antarmuka responsif dan mulus 60 FPS pada perangkat Android dan iOS.",
          en: "Fluid, 60 FPS responsive user interface tested across Android and iOS form factors."
        },
        {
          id: "Penyusunan komponen UI kustom yang diimplementasikan dari wireframe Figma.",
          en: "Custom component implementation translated accurately from Figma design systems."
        }
      ],
      interactiveSimulator: {
        type: "mobile",
        screens: [
          {
            name: "Profil",
            badge: "Home",
            title: "Profil & Quick Stats",
            summary: "Menampilkan bio singkat, pendidikan di SMK Telkom, dan status kesiapan PKL.",
            stats: "Status: Aktif Mencari PKL · Lokasi: Banjarbaru"
          },
          {
            name: "Karya",
            badge: "Projects",
            title: "Galeri Proyek Terkurasi",
            summary: "Koleksi proyek e-commerce, web prestasi siswa, dan aplikasi mobile Flutter.",
            stats: "3 Proyek Unggulan · Laravel + Flutter"
          },
          {
            name: "Keahlian",
            badge: "Skills",
            title: "Matriks Teknologi",
            summary: "Daftar penguasaan Flutter, Dart, PHP, Laravel, MySQL, dan Cloud Firestore.",
            stats: "Bahasa: PHP, Dart, JS · DB: MySQL & Firestore"
          },
          {
            name: "Kontak",
            badge: "Contact",
            title: "Hubungi Langsung",
            summary: "Akses cepat tombol WhatsApp (+62811-5003-018) dan pengiriman email.",
            stats: "Respon Cepat · Terbuka Kerja Sama"
          }
        ]
      }
    }
  ],

  skillCategories: [
    {
      domain: { id: "Pengembangan Web", en: "Web Development" },
      icon: "Globe",
      description: {
        id: "Membangun antarmuka web semantik dan arsitektur backend berkinerja tinggi.",
        en: "Building semantic web interfaces and high-performance backend architectures."
      },
      skills: [
        { name: "PHP", level: "Mahir", badge: "Core Language", detail: "OOP, script processing, API integration" },
        { name: "Laravel", level: "Kompeten", badge: "MVC Framework", detail: "Routing, Eloquent ORM, Blade, Migrations" },
        { name: "HTML5 & CSS3", level: "Mahir", badge: "Markup & Style", detail: "Semantic layout, Flexbox, CSS Grid, Responsive" },
        { name: "JavaScript / React", level: "Kompeten", badge: "Interactive UI", detail: "DOM, State management, Components" }
      ]
    },
    {
      domain: { id: "Pengembangan Mobile", en: "Mobile Engineering" },
      icon: "Smartphone",
      description: {
        id: "Mengembangkan aplikasi mobile cross-platform yang mulus dan responsif.",
        en: "Developing smooth, responsive cross-platform applications."
      },
      skills: [
        { name: "Flutter", level: "Kompeten", badge: "Mobile Framework", detail: "Widget lifecycle, responsive UI, navigation" },
        { name: "Dart", level: "Kompeten", badge: "OOP Language", detail: "Asynchronous programming, type safety" },
        { name: "Firebase Integration", level: "Kompeten", badge: "Backend-as-a-Service", detail: "Auth, Realtime database, Firestore setup" }
      ]
    },
    {
      domain: { id: "Basis Data & Cloud", en: "Database & Cloud" },
      icon: "Database",
      description: {
        id: "Perancangan skema data terstruktur dan penyimpanan cloud real-time.",
        en: "Structured data schema design and real-time cloud data stores."
      },
      skills: [
        { name: "MySQL", level: "Kompeten", badge: "Relational RDBMS", detail: "Schema design, JOIN queries, indexing" },
        { name: "Cloud Firestore", level: "Kompeten", badge: "NoSQL Cloud", detail: "Document collections, real-time listeners" }
      ]
    },
    {
      domain: { id: "Desain & Prototyping", en: "Design & Prototyping" },
      icon: "Figma",
      description: {
        id: "Penyusunan wireframe, mockup visual, dan alur pengalaman pengguna.",
        en: "Wireframing, visual mockups, and intuitive user journey mapping."
      },
      skills: [
        { name: "Figma", level: "Kompeten", badge: "UI/UX Prototyping", detail: "Wireframing, auto-layout, design tokens" },
        { name: "Canva", level: "Mahir", badge: "Visual Assets", detail: "Brand collateral, visual presentation" }
      ]
    }
  ],

  softSkills: [
    {
      name: { id: "Kerja Tim (Team Collaboration)", en: "Team Collaboration" },
      desc: {
        id: "Terbiasa berkolaborasi dalam proyek kelompok di SMK Telkom, membagi modul kerja secara adil, dan menyelaraskan integrasi kode.",
        en: "Adept at collaborative team projects at SMK Telkom, delegating module ownership, and coordinating code integration."
      }
    },
    {
      name: { id: "Komunikasi Proaktif", en: "Proactive Communication" },
      desc: {
        id: "Menyampaikan ide teknis dan hambatan secara jelas, siap menerima masukan, serta aktif berdiskusi dalam proses rekayasa perangkat lunak.",
        en: "Articulating technical ideas and bottlenecks clearly, receptive to feedback, and actively participating in engineering discussions."
      }
    },
    {
      name: { id: "Kemauan Belajar Tinggi", en: "Rapid Learning & Adaptability" },
      desc: {
        id: "Antusias mempelajari bahasa, framework, dan metodologi baru yang dibutuhkan oleh standar industri saat ini.",
        en: "Enthusiastic about learning new languages, frameworks, and workflows required by evolving industry standards."
      }
    }
  ],

  languages: [
    {
      language: { id: "Bahasa Indonesia", en: "Indonesian" },
      proficiency: { id: "Bahasa Ibu / Fasih (Native)", en: "Native Speaker" },
      badge: "ID"
    },
    {
      language: { id: "Bahasa Inggris", en: "English" },
      proficiency: { id: "Pemahaman Teknis & Percakapan (Working Proficiency)", en: "Working & Technical Proficiency" },
      badge: "EN"
    }
  ],

  education: {
    institution: "SMK Telkom Banjarbaru",
    period: "2023 — Sekarang",
    status: { id: "Siswa Aktif — Rekayasa Perangkat Lunak", en: "Active Student — Software Engineering" },
    location: "Banjarbaru, Kalimantan Selatan",
    summary: {
      id: "Menempuh pendidikan vokasi kejuruan dengan konsentrasi Rekayasa Perangkat Lunak (RPL). Mempelajari pemrograman berorientasi objek, perancangan web dan mobile, arsitektur basis data, serta standar pengembangan perangkat lunak modern.",
      en: "Undergoing vocational software engineering studies at SMK Telkom Banjarbaru. Focusing on object-oriented programming, modern web and mobile architecture, database design, and collaborative software lifecycles."
    },
    competencies: [
      "Algoritma & Pemrograman Berorientasi Objek (OOP)",
      "Web Development (HTML5, CSS3, PHP, Laravel)",
      "Mobile App Engineering (Flutter & Dart)",
      "Manajemen Basis Data Relasional (MySQL) & NoSQL (Firestore)",
      "UI/UX Design Workflow (Figma)",
      "Standar Disiplin Industri & Budaya Kerja Telkom Schools"
    ]
  }
};

