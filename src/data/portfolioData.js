export const portfolioData = {
  personal: {
    name: "Muhammad Hafizh Farsya Syahputra",
    shortName: "Hafizh Farsya",
    title: {
      id: "Mahasiswa S1 Sistem Informasi (Telkom University) & Software Engineer",
      en: "Information Systems Student (Telkom University) & Software Engineer"
    },
    heroTagline: {
      id: "Membangun sistem web, mobile, dan solusi enterprise dengan rekayasa kode yang terstruktur.",
      en: "Crafting structured web, mobile, and enterprise digital solutions with engineered precision."
    },
    university: {
      name: "Telkom University",
      major: {
        id: "S1 Sistem Informasi (Information Systems)",
        en: "B.Sc. in Information Systems"
      },
      period: "2026 — Sekarang"
    },
    school: {
      name: "SMK Telkom Banjarbaru",
      major: {
        id: "Rekayasa Perangkat Lunak (RPL)",
        en: "Software Engineering"
      },
      period: "2023 — 2026",
      status: {
        id: "Alumni",
        en: "Alumnus"
      }
    },
    location: "Bandung, Jawa Barat, Indonesia",
    phone: "+62811-5003-018",
    phoneClean: "628115003018",
    email: "hapissf3001@gmail.com",
    photoUrl: "/hapiss.jpg",
    availability: {
      id: "Tersedia untuk Peluang Profesional / Magang",
      en: "Available for Projects & Internships"
    },
    bio: {
      id: "Mahasiswa Sistem Informasi di Telkom University dan alumni SMK Telkom Banjarbaru (RPL). Berfokus pada perancangan aplikasi web, mobile, dan sistem enterprise menggunakan Laravel, Flutter, Python, dan arsitektur database modern.",
      en: "Information Systems undergraduate at Telkom University and Software Engineering (RPL) alumnus of SMK Telkom Banjarbaru. Focused on developing structured web, mobile, and enterprise systems using Laravel, Flutter, Python, and modern relational databases."
    }
  },

  metrics: [
    {
      value: "4+",
      label: { id: "Proyek Utama Selesai", en: "Core Projects Shipped" },
      sub: { id: "E-Commerce, Web Prestasi, Mobile, Python", en: "E-Commerce, Portal, Mobile, Python" }
    },
    {
      value: "8+",
      label: { id: "Teknologi & Framework", en: "Tech Stacks Mastered" },
      sub: { id: "Laravel, Flutter, Python, Flask, CI4, MySQL", en: "Laravel, Flutter, Python, Flask, CI4, MySQL" }
    },
    {
      value: "Tel-U",
      label: { id: "Telkom University & SMK Telkom", en: "Telkom University & SMK Telkom" },
      sub: { id: "Sistem Informasi & RPL", en: "Information Systems & RPL" }
    },
    {
      value: "100%",
      label: { id: "Kesiapan Industri / Magang", en: "Industry Readiness" },
      sub: { id: "Bandung / Hybrid / Remote", en: "Bandung / Hybrid / Remote" }
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
            summary: "Menampilkan bio ringkas, pendidikan di Telkom University & SMK Telkom, dan status ketersediaan kerja sama.",
            stats: "Status: Mahasiswa Aktif · Domisili: Bandung"
          },
          {
            name: "Karya",
            badge: "Projects",
            title: "Galeri Proyek Terkurasi",
            summary: "Koleksi proyek e-commerce, web prestasi siswa, Python logic, dan aplikasi Flutter.",
            stats: "4 Proyek Unggulan · Laravel, Flutter & Python"
          },
          {
            name: "Keahlian",
            badge: "Skills",
            title: "Matriks Teknologi",
            summary: "Penguasaan Flutter, Dart, Python, Flask, Laravel, CodeIgniter 4, MySQL, dan Firestore.",
            stats: "Web, Mobile, Backend & BPM/ERP"
          },
          {
            name: "Kontak",
            badge: "Contact",
            title: "Hubungi Langsung",
            summary: "Akses cepat tombol WhatsApp (+62811-5003-018) dan email (hapissf3001@gmail.com).",
            stats: "Respon Cepat · Terbuka Kerja Sama"
          }
        ]
      }
    },
    {
      id: "python-logic",
      title: {
        id: "Logika Pemrograman & Algoritma Python",
        en: "Python Algorithms & Logic Implementation"
      },
      tag: "Algorithmic Engineering & Backend",
      category: "Software Logic & Scripting",
      headline: {
        id: "Implementasi algoritma, struktur data, dan automasi pemrosesan logika backend.",
        en: "Algorithmic implementations, data structures, and backend logic automation."
      },
      description: {
        id: "Koleksi implementasi logika pemrograman dan pemecahan masalah algoritma menggunakan Python. Dibangun untuk memproses manipulasi data terstruktur, efisiensi pencarian, dan integrasi backend API ringan.",
        en: "Collection of programming logic implementations and algorithmic problem-solving using Python. Developed for structured data manipulation, search efficiency, and lightweight backend API integration."
      },
      stack: ["Python", "Flask", "Data Structures", "Algorithms", "Automation"],
      architecture: "Modular Python Scripting & Clean Function Pipelines",
      highlights: [
        {
          id: "Implementasi logika pemrosesan data, sorting, dan algoritma rekursif efisien.",
          en: "Efficient data transformation, sorting logic, and recursive algorithm pipelines."
        },
        {
          id: "Penyusunan fungsi komputasi modular dengan dokumentasi kode yang rapi.",
          en: "Modular computational function pipelines with structured code documentation."
        },
        {
          id: "Integrasi microservice backend sederhana menggunakan framework Python Flask.",
          en: "Lightweight microservice and API route integration powered by Python Flask."
        }
      ],
      interactiveSimulator: {
        type: "python",
        snippets: [
          { title: "Binary Search & Sorting", complexity: "O(log n)", lines: 18 },
          { title: "Recursive Tree Traversal", complexity: "O(n)", lines: 24 },
          { title: "Flask REST Endpoint", complexity: "HTTP / JSON", lines: 28 }
        ]
      }
    }
  ],

  skillCategories: [
    {
      domain: { id: "Pengembangan Web & Backend", en: "Web & Backend Engineering" },
      icon: "Globe",
      description: {
        id: "Membangun arsitektur backend berkinerja tinggi dan antarmuka web modern.",
        en: "Constructing high-performance backend architectures and modern web interfaces."
      },
      skills: [
        { name: "PHP", level: "Mahir", badge: "Core Language", detail: "OOP, MVC, API integrations" },
        { name: "Laravel", level: "Mahir", badge: "MVC Framework", detail: "Eloquent ORM, Routing, Blade, REST API" },
        { name: "CodeIgniter 4", level: "Kompeten", badge: "PHP Framework", detail: "Lightweight MVC architecture & controllers" },
        { name: "Python", level: "Mahir", badge: "Core Language", detail: "Algoritma, scripting, data handling" },
        { name: "Flask", level: "Kompeten", badge: "Microframework", detail: "Lightweight API endpoints & services" },
        { name: "JavaScript", level: "Kompeten", badge: "Dynamic Web", detail: "ES6+, DOM reactivity, async/await" },
        { name: "HTML & CSS", level: "Mahir", badge: "Markup & Styling", detail: "Semantic layout, Flexbox, responsive grid" }
      ]
    },
    {
      domain: { id: "Aplikasi Mobile & Cloud", en: "Mobile & Cloud Engineering" },
      icon: "Smartphone",
      description: {
        id: "Mengembangkan aplikasi mobile cross-platform yang responsif dan terintegrasi cloud.",
        en: "Developing responsive cross-platform mobile apps with real-time cloud data."
      },
      skills: [
        { name: "Flutter", level: "Mahir", badge: "Mobile Framework", detail: "Widget tree hierarchy, responsive layout, state management" },
        { name: "Dart", level: "Mahir", badge: "Language", detail: "Type-safe OOP, asynchronous streams" },
        { name: "Firebase", level: "Kompeten", badge: "Cloud Platform", detail: "Cloud Firestore NoSQL, Auth, cloud services" },
        { name: "MySQL", level: "Mahir", badge: "Relational RDBMS", detail: "Relational schema design, complex JOINs, indexing" }
      ]
    },
    {
      domain: { id: "Sistem Enterprise & Proses Bisnis", en: "Enterprise Systems & BPM" },
      icon: "Layers",
      description: {
        id: "Pemahaman proses bisnis perusahaan dan arsitektur enterprise.",
        en: "Business process workflows and enterprise software architecture."
      },
      skills: [
        { name: "Business Process Management (BPM)", level: "Memahami", badge: "Business Systems", detail: "Pemetaan workflow, optimasi proses bisnis, business logic" },
        { name: "Enterprise Resource Planning (ERP)", level: "Memahami", badge: "Enterprise Arch", detail: "Arsitektur sistem modular terintegrasi dan alokasi sumber daya" }
      ]
    },
    {
      domain: { id: "Desain UI/UX & Tooling", en: "UI/UX Design & Tooling" },
      icon: "Figma",
      description: {
        id: "Perancangan pengalaman antarmuka visual dan kontrol versi perangkat lunak.",
        en: "Visual UI/UX wireframing, component design, and collaborative version control."
      },
      skills: [
        { name: "Figma", level: "Kompeten", badge: "UI/UX Prototyping", detail: "Wireframing, design tokens, responsive layouts" },
        { name: "Canva", level: "Mahir", badge: "Visual Media", detail: "Visual presentation, branding assets" },
        { name: "Git & GitHub", level: "Kompeten", badge: "Version Control", detail: "Branching workflows, commits, collaborative repo sync" }
      ]
    }
  ],

  softSkills: [
    {
      name: { id: "Kerja Tim & Kolaborasi", en: "Team Collaboration" },
      desc: {
        id: "Terbiasa bekerja sama dalam proyek tim akademik maupun teknis, menyelaraskan pembagian tugas dan integrasi kode.",
        en: "Experienced in collaborative teamwork, delegating module ownership, and coordinating code integration."
      }
    },
    {
      name: { id: "Komunikasi Proaktif", en: "Proactive Communication" },
      desc: {
        id: "Menyampaikan ide teknis dan arsitektur solusi secara lugas dan terbuka dalam diskusi tim.",
        en: "Articulating technical concepts and architectural solutions clearly and constructively."
      }
    },
    {
      name: { id: "Analisis Logika & Problem Solving", en: "Analytical Problem Solving" },
      desc: {
        id: "Disiplin dalam memecahkan masalah pemrograman struktural, debugging, dan merancang alur logika yang efisien.",
        en: "Disciplined in breaking down structural programming challenges, debugging runtime issues, and optimizing logic flows."
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
      proficiency: { id: "Pemahaman Teknis & Profesional (Working Proficiency)", en: "Working & Technical Proficiency" },
      badge: "EN"
    }
  ],

  educationHistory: [
    {
      institution: "Telkom University",
      period: "2026 — Sekarang",
      status: { id: "Mahasiswa Aktif", en: "Active Undergraduate" },
      location: "Bandung, Jawa Barat, Indonesia",
      major: {
        id: "S1 Sistem Informasi (Information Systems)",
        en: "B.Sc. in Information Systems"
      },
      summary: {
        id: "Fokus pada rekayasa sistem informasi enterprise, Business Process Management (BPM), arsitektur Enterprise Resource Planning (ERP), serta pengembangan perangkat lunak berbasis data.",
        en: "Focusing on enterprise information systems, Business Process Management (BPM), Enterprise Resource Planning (ERP) architecture, and data-driven software engineering."
      },
      highlights: [
        "Business Process Management (BPM) & Workflow Modeling",
        "Arsitektur Enterprise Resource Planning (ERP)",
        "Pengembangan Logika Pemrograman Lanjutan (Python & Flask)"
      ]
    },
    {
      institution: "SMK Telkom Banjarbaru",
      period: "2023 — 2026",
      status: { id: "Alumni", en: "Alumnus" },
      location: "Kota Banjarbaru, Kalimantan Selatan, Indonesia",
      major: {
        id: "Rekayasa Perangkat Lunak (RPL)",
        en: "Software Engineering"
      },
      summary: {
        id: "Menyelesaikan pendidikan kejuruan vokasi bidang Rekayasa Perangkat Lunak. Menguasai fundamental pemrograman web (PHP, Laravel, MySQL), aplikasi mobile (Flutter & Firebase), dan budaya disiplin industri Telkom.",
        en: "Graduated with vocational software engineering credentials. Mastered fullstack web fundamentals (PHP, Laravel, MySQL), mobile app development (Flutter & Firebase), and Telkom industrial engineering standards."
      },
      highlights: [
        "Pembangunan Aplikasi E-Commerce Multi-Kategori (Laravel + MySQL)",
        "Pengembangan Portal Dokumentasi Prestasi Siswa",
        "Aplikasi Portofolio Mobile Native (Flutter & Firestore)",
        "Standar Disiplin Kerja & Budaya Kejuruan Telkom"
      ]
    }
  ]
};
