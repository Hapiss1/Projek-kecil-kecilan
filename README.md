# Project Template & Agent Harness

Folder ini adalah **starter template** terstandarisasi untuk mengembangkan proyek baru bersama AI Agent (Antigravity / Gemini CLI).

Semua aturan rekayasa perangkat lunak, disiplin *anti terburu-buru*, pemanfaatan skill maksimal, dan standar desain *anti-slop* sudah dikonfigurasi secara otomatis.

---

## 📂 Struktur Template

```text
├── .agents/
│   ├── rules/
│   │   ├── deliberate-execution.md   # Protokol kerja deliberate, no-rush, eksplorasi sebelum edit
│   │   ├── clean-code-standards.md   # Standar clean code, SRP, validasi boundary, defensive programming
│   │   ├── skill-maximizer.md        # Kewajiban memanfaatkan skill & tools bawaan
│   │   └── anti-slop-design.md       # Standar human craft & anti-slop (Impeccable + Taste-Skill)
│   └── skills/
│       ├── impeccable/               # Skill desain & audit UI tingkat direktur desain
│       ├── taste-skill/              # Skill art direction & anti-slop dari riset 247 situs kurasi
│       └── skill-creator/            # Skill untuk membuat & mengoptimalkan skill baru
├── .impeccable/                      # Konfigurasi hook Impeccable
├── AGENTS.md                         # Rulebook utama yang selalu aktif
├── PLAN.md                           # Blueprint arsitektur jangka panjang (Single Source of Truth)
├── TASK.md                           # Sprint board & checklist dinamis yang diperbarui tiap turn
└── README.md                         # Panduan penggunaan template ini
```

---

## 🚀 Cara Menggunakan Template untuk Proyek Baru

1. **Salin Folder**: Duplikasi folder `template` ini ke direktori proyek baru Anda:
   ```bash
   cp -r template my-new-project
   ```
2. **Buka di Editor / Antigravity**:
   ```bash
   cd my-new-project
   ```
3. **Inisialisasi Project**:
   * Buka [`PLAN.md`](PLAN.md) dan isi bagian **1. Project Overview & Scope** serta **2. Technical Architecture**.
   * Buka [`TASK.md`](TASK.md) dan tentukan **Current Objective** serta checklist tugas awal Anda.
4. **Mulai Bekerja dengan Agent**:
   Agent akan secara otomatis:
   * Membaca [`PLAN.md`](PLAN.md) dan [`TASK.md`](TASK.md) di setiap awal sesi.
   * Melakukan investigasi mendalam sebelum menyentuh kode (tanpa terburu-buru).
   * Memanfaatkan skill [`impeccable`](.agents/skills/impeccable) dan [`taste-skill`](.agents/skills/taste-skill) untuk menghasilkan UI berstandar tinggi tanpa *AI slop*.
   * Memperbarui [`TASK.md`](TASK.md) sebelum menyelesaikan giliran.
