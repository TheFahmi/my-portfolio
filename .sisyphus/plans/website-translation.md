# Work Plan: Complete Website Translation (i18n)

## Overview
**Project**: Portfolio Website i18n Implementation  
**Framework**: Next.js 16 + next-intl v4.8.1  
**Languages**: English (en) + Indonesian (id)  
**Status**: Partial (20-30% complete)  
**Goal**: Full bilingual support with proper architecture

---

## Phase 1: Infrastructure & Critical Fixes
**Priority**: CRITICAL - Blocks i18n functionality  
**Estimated Time**: 2-3 hours  
**Dependencies**: None

### Task 1.1: Fix Critical Missing Keys
**Status**: ⬜ Pending  
**Files**: `messages/id.json`

**Problem**: `id.json` missing entire `about` section - will crash when switching to Indonesian

**Actions**:
- [ ] Add missing `about.*` keys to `id.json`:
  - `about.title`: "Tentang Saya."
  - `about.subtitle`: "berdedikasi membangun aplikasi web yang scalable dan berperforma tinggi."
  - `about.paragraph1`: "Saya adalah Full Stack Developer yang berpengalaman..."
  - `about.paragraph2`: "Perjalanan saya dalam pengembangan web dimulai..."
  - `about.downloadResume`: "Unduh Resume"
  - `about.education`: "Pendidikan"
  - `about.skills`: "Keahlian"
- [ ] Fix duplicate `skills` key collision in `en.json`
- [ ] Verify no runtime errors when switching locales

**Verification**:
```bash
npm run dev
# Test switching between /en and /id
# Verify AboutSection renders correctly in both languages
```

---

### Task 1.2: Setup TypeScript Types for Translations
**Status**: ⬜ Pending  
**Files**: `package.json`, new type definitions

**Problem**: No type safety - risk of runtime errors from typos

**Actions**:
- [ ] Add type generation script to `package.json`:
  ```json
  "scripts": {
    "i18n:types": "next-intl types"
  }
  ```
- [ ] Run type generation: `npm run i18n:types`
- [ ] Create `src/i18n/types.ts` with generated types
- [ ] Update components to use typed translations

**Verification**:
```bash
npm run i18n:types
npm run typecheck
# Should have zero type errors
```

---

### Task 1.3: Implement Fallback Strategy
**Status**: ⬜ Pending  
**Files**: `i18n/request.ts`, `i18n/config.ts`

**Problem**: Missing keys show blank UI

**Actions**:
- [ ] Configure fallback locale in `i18n/request.ts`:
  ```typescript
  const fallbackLocale = 'en';
  ```
- [ ] Add error boundary for translation errors
- [ ] Add development warning for missing keys
- [ ] Test fallback behavior

**Verification**:
- [ ] Remove a key from `id.json`, verify it falls back to English
- [ ] Check console for missing key warnings

---

### Task 1.4: Split Translation Files by Feature
**Status**: ⬜ Pending  
**Files**: Restructure `messages/` directory

**Problem**: Monolithic JSON files will become unmaintainable (500+ lines)

**Actions**:
- [ ] Create new directory structure:
  ```
  messages/
  ├── en/
  │   ├── common.json
  │   ├── navigation.json
  │   ├── about.json
  │   ├── hero.json
  │   ├── skills.json
  │   ├── projects.json
  │   ├── experience.json
  │   ├── contact.json
  │   ├── footer.json
  │   └── metadata.json
  └── id/
      ├── common.json
      ├── navigation.json
      ├── about.json
      ├── hero.json
      ├── skills.json
      ├── projects.json
      ├── experience.json
      ├── contact.json
      ├── footer.json
      └── metadata.json
  ```
- [ ] Migrate existing keys from `en.json` and `id.json` to new structure
- [ ] Update `i18n/request.ts` to load multiple files
- [ ] Delete old `en.json` and `id.json`

**Verification**:
```bash
npm run dev
# Verify all existing translations still work
# Check both /en and /id routes
```

---

## Phase 2: Pilot Implementation (Hero Section)
**Priority**: HIGH - Proof of concept  
**Estimated Time**: 3-4 hours  
**Dependencies**: Phase 1 complete

### Task 2.1: Create Hero Translation Files
**Status**: ⬜ Pending  
**Files**: `messages/en/hero.json`, `messages/id/hero.json`

**Actions**:
- [ ] Create `messages/en/hero.json`:
  ```json
  {
    "hero": {
      "badge": "Available for work",
      "titlePrefix": "Hi, I'm",
      "titleHighlight": "M Fahmi Hassan",
      "subtitle": "Full Stack Engineer & Team Lead",
      "description": "I architect accessible, pixel-perfect, and performant web experiences...",
      "ctaPrimary": "Start a Project",
      "ctaSecondary": "View Projects",
      "stats": {
        "yearsExperience": "Years Experience",
        "platforms": "Major Platforms",
        "commitment": "Commitment",
        "totalProjects": "Total Projects"
      },
      "currentStack": "Current Stack"
    }
  }
  ```
- [ ] Create `messages/id/hero.json` with Indonesian translations
- [ ] Verify JSON validity

---

### Task 2.2: Refactor HeroSection for i18n
**Status**: ⬜ Pending  
**Files**: `src/components/sections/HeroSection.tsx`

**Problem**: All text hardcoded or from siteConfig

**Actions**:
- [ ] Import `useTranslations` from 'next-intl'
- [ ] Add `const t = useTranslations('hero')`
- [ ] Replace hardcoded strings:
  - Line 49: `{hero.badge}` → `{t('badge')}`
  - Line 108: "Start a Project" → `{t('ctaPrimary')}`
  - Line 114: "View Projects" → `{t('ctaSecondary')}`
  - Line 135: "Total Projects" → `{t('stats.totalProjects')}`
  - Line 159: "Current Stack" → `{t('currentStack')}`
- [ ] Move hero data from `siteConfig.ts` to translation files
- [ ] Update stats labels to use translations
- [ ] Keep `hero.techStack` in siteConfig (tech names don't translate)

**Verification**:
```bash
npm run typecheck
npm run build
# Should have zero errors
```

---

### Task 2.3: Test Hero Section Bilingual
**Status**: ⬜ Pending  
**Files**: Browser testing

**Actions**:
- [ ] Start dev server: `npm run dev`
- [ ] Visit `http://localhost:3000/en` - verify English displays correctly
- [ ] Visit `http://localhost:3000/id` - verify Indonesian displays correctly
- [ ] Test language switcher - verify smooth transition
- [ ] Check for any layout breaks (text length differences)
- [ ] Verify all interactive elements work in both languages

**Acceptance Criteria**:
- [ ] No console errors
- [ ] All text displays in correct language
- [ ] Language switcher works smoothly
- [ ] Layout remains intact

---

## Phase 3: Scale to All Sections
**Priority**: HIGH - Complete coverage  
**Estimated Time**: 8-10 hours  
**Dependencies**: Phase 2 complete & validated

### Task 3.1: Contact Section i18n
**Status**: ⬜ Pending  
**Files**: `messages/en/contact.json`, `messages/id/contact.json`, `src/components/sections/ContactSection.tsx`

**Actions**:
- [ ] Create `messages/en/contact.json` with all contact strings:
  - Section labels ("Contact", "Let's work together")
  - Form labels ("NAME", "EMAIL", "SUBJECT", "MESSAGE")
  - Placeholders ("John Doe", "john@example.com", etc.)
  - Button states ("Send Message", "Sending...")
  - Success/error messages
- [ ] Create `messages/id/contact.json` with Indonesian translations
- [ ] Refactor `ContactSection.tsx`:
  - Replace all hardcoded form labels
  - Replace placeholders with translated versions
  - Replace button text
  - Replace success/error messages
- [ ] Test form submission in both languages

---

### Task 3.2: Skills Section i18n
**Status**: ⬜ Pending  
**Files**: `messages/en/skills.json`, `messages/id/skills.json`, `src/components/sections/SkillsSection.tsx`

**Actions**:
- [ ] Create translation files:
  - Section title ("Technical Arsenal")
  - Category titles ("Frontend Development", etc.)
  - Level labels ("Expert", "Advanced", "Intermediate", "Beginner")
  - UI labels ("Flip for details", "Proficiency")
- [ ] Refactor `SkillsSection.tsx`:
  - Replace `getLevelLabel()` function with translation keys
  - Replace hardcoded UI strings
  - Keep skill names in English (React, JavaScript, etc.)
- [ ] Handle skill descriptions (move from siteConfig to translations)

---

### Task 3.3: Projects Section i18n
**Status**: ⬜ Pending  
**Files**: `messages/en/projects.json`, `messages/id/projects.json`, `src/components/sections/ProjectsSection.tsx`

**Actions**:
- [ ] Create translation files:
  - Section title ("Selected Works")
  - Filter labels ("All", categories)
  - Modal labels ("About the Project", "Technologies")
  - Button labels ("View Code", "Live Demo")
  - "Featured" badge
  - "View more on GitHub"
- [ ] Refactor `ProjectsSection.tsx`:
  - Replace all hardcoded strings
  - Handle dynamic category filters
- [ ] Handle project data (titles, descriptions) - see Phase 4

---

### Task 3.4: Experience Section i18n
**Status**: ⬜ Pending  
**Files**: `messages/en/experience.json`, `messages/id/experience.json`, `src/components/sections/ExperienceSection.tsx`

**Actions**:
- [ ] Create translation files:
  - Section title ("Career Journey")
  - Section description
  - Timeline labels
- [ ] Refactor `ExperienceSection.tsx`:
  - Replace hardcoded section header
  - Handle experience data (see Phase 4)

---

### Task 3.5: Footer i18n
**Status**: ⬜ Pending  
**Files**: `messages/en/footer.json`, `messages/id/footer.json`, `src/components/layout/Footer.client.tsx`

**Actions**:
- [ ] Create translation files:
  - Brand description
  - "Available for new projects" status
  - Navigation labels
  - "Drop me a line"
  - Copyright text
  - Timezone label ("WIB")
- [ ] Refactor `Footer.client.tsx`:
  - Replace all hardcoded strings
  - Fix date/time locale (use current locale instead of 'en-US')
  - Add `const locale = useLocale()` from next-intl

---

### Task 3.6: Navbar & Common i18n
**Status**: ⬜ Pending  
**Files**: `messages/en/navigation.json`, `messages/id/navigation.json`, `src/components/layout/Navbar.client.tsx`

**Actions**:
- [ ] Add missing navigation keys:
  - Brand name ("MFAH.ME")
  - Menu title ("Menu")
  - Copyright in mobile menu
- [ ] Refactor `Navbar.client.tsx`:
  - Replace hardcoded strings
  - Use existing navigation translations for nav links

---

## Phase 4: Data Internationalization (siteConfig.ts)
**Priority**: MEDIUM - Content translation  
**Estimated Time**: 6-8 hours  
**Dependencies**: Phase 3 complete

### Task 4.1: Strategy Decision
**Status**: ⬜ Pending  
**Decision Needed**: Choose approach for siteConfig data

**Options**:
1. **Option A**: Move all translatable data to message files
2. **Option B**: Keep structure in siteConfig, add translation references
3. **Option C**: Create locale-specific config files

**Recommendation**: Option A - Move to message files for better maintainability

---

### Task 4.2: Migrate Projects Data
**Status**: ⬜ Pending  
**Files**: `messages/en/projects.json`, `messages/id/projects.json`, `src/config/siteConfig.ts`

**Actions**:
- [ ] Move project titles and descriptions to translation files:
  ```json
  {
    "projects": {
      "items": {
        "1": {
          "title": "SMEs AI Hackathon Platform",
          "description": "Multi-Tenant SaaS for UMKM Indonesia..."
        },
        "2": { ... },
        "3": { ... }
      }
    }
  }
  ```
- [ ] Update `ProjectsSection.tsx` to use translation keys:
  ```typescript
  const t = useTranslations('projects');
  // project.title → t(`items.${project.id}.title`)
  ```
- [ ] Keep non-translatable data in siteConfig (technologies, images, URLs)

---

### Task 4.3: Migrate Skills Data
**Status**: ⬜ Pending  
**Files**: `messages/en/skills.json`, `messages/id/skills.json`, `src/config/siteConfig.ts`

**Actions**:
- [ ] Move skill categories and descriptions to translation files
- [ ] Keep skill names in English (React, JavaScript, etc.)
- [ ] Update `SkillsSection.tsx` to reference translations

---

### Task 4.4: Migrate Experience Data
**Status**: ⬜ Pending  
**Files**: `messages/en/experience.json`, `messages/id/experience.json`, `src/config/siteConfig.ts`

**Actions**:
- [ ] Move experience titles and descriptions to translation files
- [ ] Handle date formatting (consider locale-aware formatting)
- [ ] Update `ExperienceSection.tsx` to use translations

---

### Task 4.5: Migrate Personal Info
**Status**: ⬜ Pending  
**Files**: `messages/en/personal.json`, `messages/id/personal.json`, `src/config/siteConfig.ts`

**Actions**:
- [ ] Move translatable personal info:
  - Role ("Full Stack Engineer & Team Lead")
  - About paragraphs
  - Location display
- [ ] Keep non-translatable data:
  - Name
  - Email
  - Phone
  - URLs

---

## Phase 5: Polish & Optimization
**Priority**: MEDIUM - Quality improvements  
**Estimated Time**: 4-5 hours  
**Dependencies**: Phase 4 complete

### Task 5.1: Metadata Translation
**Status**: ⬜ Pending  
**Files**: `src/app/[locale]/layout.tsx`, `messages/en/metadata.json`, `messages/id/metadata.json`

**Actions**:
- [ ] Create metadata translation files:
  ```json
  {
    "metadata": {
      "title": "M Fahmi Hassan | Full Stack Engineer",
      "description": "Portfolio of M Fahmi Hassan..."
    }
  }
  ```
- [ ] Implement `generateMetadata` function:
  ```typescript
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });
    return {
      title: t('title'),
      description: t('description'),
    };
  }
  ```
- [ ] Add hreflang alternate links for SEO

---

### Task 5.2: Date & Number Formatting
**Status**: ⬜ Pending  
**Files**: All components with dates/numbers

**Actions**:
- [ ] Fix Footer date formatting to use current locale
- [ ] Add locale-aware date formatting for experience dates
- [ ] Consider using `next-intl` formatting utilities

---

### Task 5.3: Accessibility Labels
**Status**: ⬜ Pending  
**Files**: `messages/en/a11y.json`, `messages/id/a11y.json`

**Actions**:
- [ ] Create accessibility translation keys:
  - `a11y.closeModal`: "Close dialog"
  - `a11y.openMenu`: "Open navigation menu"
  - `a11y.switchToEnglish`: "Switch to English"
  - `a11y.switchToIndonesian`: "Switch to Indonesian"
- [ ] Update LanguageSwitcher with aria-label translations
- [ ] Update other interactive components

---

### Task 5.4: Loading Screen i18n
**Status**: ⬜ Pending  
**Files**: `src/components/ui/LoadingScreen.tsx`, `messages/en/loading.json`, `messages/id/loading.json`

**Actions**:
- [ ] Create loading translation keys:
  - `loading.role`: "Full Stack Engineer"
  - `loading.assetsLabel`: "Loading Assets"
- [ ] Refactor `LoadingScreen.tsx` to use translations

---

### Task 5.5: Blog Pages i18n
**Status**: ⬜ Pending  
**Files**: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`

**Actions**:
- [ ] Create blog translation keys:
  - `blog.title`: "Blog"
  - `blog.comingSoon`: "Coming soon..."
- [ ] Refactor blog pages to use translations

---

### Task 5.6: Validation & Testing
**Status**: ⬜ Pending  
**Files**: All components

**Actions**:
- [ ] Run full test suite: `npm test`
- [ ] Run type check: `npm run typecheck`
- [ ] Run build: `npm run build`
- [ ] Manual testing:
  - [ ] Test all routes in both languages
  - [ ] Test language switching
  - [ ] Test form submissions
  - [ ] Test all interactive elements
  - [ ] Check for console errors
  - [ ] Verify SEO metadata
- [ ] Add translation validation script to CI/CD

---

## Summary

### Total Tasks: 25
### Estimated Total Time: 25-30 hours
### Critical Path: Phase 1 → Phase 2 → Phase 3 → Phase 5

### Key Decisions Made (Metis + Momus):
1. ✅ Split translation files by feature (not monolithic)
2. ✅ Server-first architecture (minimize useTranslations)
3. ✅ Pilot approach (Hero section first)
4. ✅ Type safety with generated types
5. ✅ Fallback strategy for missing keys

### Risk Mitigation:
- Runtime errors prevented by Phase 1 critical fixes
- Type safety prevents typos and missing keys
- Pilot section validates approach before mass refactoring
- Fallback strategy ensures no blank UI

---

## Next Steps

1. **Review this plan** - Ensure all requirements covered
2. **Prioritize** - Decide if all phases needed or subset
3. **Execute** - Run `/start-work` to begin implementation
4. **Track** - Monitor progress via todo list

**Ready to start?** Run `/start-work` with this plan!