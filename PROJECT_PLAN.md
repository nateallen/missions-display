# Missions Display - Project Plan

## Overview

A multi-tenant SaaS platform for churches to display and manage missionary information on lobby touch-screen displays, with mobile access and comprehensive management tools.

---

## User Types

### 1. Church Attendees (Public Display Users)
**Platform**: Touch-screen TV displays in church lobbies + Mobile (via QR code)

**Capabilities**:
- Navigate missionaries by region on interactive world map
- Browse and filter missionary profiles
- View detailed missionary information:
  - Country/location details
  - Bio and ministry focus
  - Contact information
  - Family details and birthdays
  - Social media links
  - Recent newsletters (PDF viewer)
- Subscribe to newsletter updates (receive notifications when new newsletters posted)
- Mobile access via QR code scanning
- Download missionary contact info (vCard)
- Bookmark missionaries on mobile

### 2. Church/Ministry Administrators
**Platform**: Web dashboard

**Capabilities**:
- **Missionary Management**:
  - Search existing global and local missionaries
  - Add global missionaries to their supported list
  - Create and manage local missionary profiles
  - Update missionary information (bio, photos, contact, family, birthdays)
  - Upload and manage newsletters (PDFs)
  - Remove missionaries from their display

- **Account Management**:
  - Manage church/organization profile
  - Update contact information
  - Manage subscription tier
  - Update payment details
  - Manage team users and their permissions

- **User Roles** ✅ FINALIZED:
  - **Editor**: Can only manage newsletters, read-only access to missionaries
  - **Manager**: Full missionary CRUD + newsletter management, no org settings/billing/users
  - **Org Admin**: Full church access (missionaries, newsletters, billing, users)

### 3. Software Administrators
**Platform**: Admin dashboard

**Capabilities**:
- **Organization Management**:
  - Create and manage church accounts
  - View account metrics and usage
  - Manage subscription tiers and billing
  - Suspend/activate accounts

- **Global Missionary Management**:
  - Create and maintain global missionary profiles
  - Update global missionary information
  - Global updates automatically sync to all churches using that missionary

- **User Management**:
  - Manage users across all organizations
  - Assign permissions and roles
  - Monitor user activity

- **Platform Management**:
  - Configure subscription tiers and pricing
  - Manage feature flags
  - System monitoring and analytics

---

## Missionary Record Types

### Global/Managed Missionaries
- Created and maintained by software administrators
- Available for any church to add to their display
- Updates automatically sync to all churches using that missionary
- May be part of a premium subscription tier
- Reduces duplicate data entry across churches
- Ensures consistency of information

### Local Missionaries
- Created and maintained by individual churches
- Only visible to that specific church
- Full control by church administrators
- For missionaries specific to that congregation

### Adding Missionaries Workflow
1. Church admin searches existing missionaries (local + global)
2. Filter/search results (consider Elasticsearch for better search)
3. If global missionary found → Add to their supported list
4. If not found → Create new local missionary record

---

## Technical Architecture

### Frontend
- **Framework**: Next.js 15 (App Router) ✅
- **Language**: TypeScript ✅
- **Hosting**: Vercel ✅
- **State Management**: Zustand ✅
- **UI Components**: shadcn/ui ✅
- **Styling**: Tailwind CSS ✅
- **Maps**: react-simple-maps ✅
- **PDF Viewing**: react-pdf ✅
- **QR Codes**: qrcode.react ✅

### Backend - Phased Approach ✅ DECISION MADE

**Phase 2A: POC/MVP (Next.js API Routes)**
- ✅ Fastest time to market
- ✅ Single codebase deployment
- ✅ TypeScript throughout
- ✅ Zero infrastructure management
- ✅ Perfect for validation
- ⚠️ Will need migration if successful

**Phase 2B: Scale (NestJS Migration - When Needed)**
- Migrate when: 50+ customers, complex jobs, or team growth
- ✅ Enterprise-grade structure
- ✅ Better for large teams
- ✅ Built-in patterns for auth, permissions, queues
- ✅ Reuse Prisma models and database

**Migration Strategy**:
1. Write clean service layers from day 1
2. Keep all database logic in service files
3. Use middleware patterns for auth
4. When ready, lift-and-shift services to NestJS
5. Database schema stays the same

### Database
- **Primary**: AWS RDS (PostgreSQL recommended)
  - Relational data fits the domain model well
  - JSONB support for flexible fields
  - Strong ACID guarantees for billing/subscriptions

### Authentication
- **Provider**: Auth0
  - Multi-tenant support
  - Role-based access control (RBAC)
  - Organizations feature for church accounts
  - Social login support

### Payment Processing
**Options**:
- **Stripe** (Recommended)
  - Best developer experience
  - Subscription management built-in
  - Multiple pricing tiers support
  - Excellent documentation
  - Usage-based billing capabilities

- **Alternatives**: Paddle (for global markets), Chargebee

### Search
- **Phase 1**: PostgreSQL full-text search
- **Phase 2+**: Elasticsearch or Algolia if needed
  - Better relevance ranking
  - Typo tolerance
  - Faceted search
  - Real-time indexing

### File Storage
- **AWS S3**
  - Missionary photos
  - Newsletter PDFs
  - CloudFront CDN for delivery

### Email/Notifications
- **Options**:
  - AWS SES (cost-effective)
  - SendGrid (better analytics)
  - Resend (modern DX)

---

## Development Phases

### ✅ Phase 1: TV Display with Mock Data (COMPLETED)
**Status**: Deployed to Vercel (staging + production)

**Features Completed**:
- Interactive world map with region-based navigation
- Missionary cards and detail views
- Touch-optimized interface for large displays
- PDF newsletter viewing
- Mobile contact page via QR code
- vCard download for contacts
- Filtering and search (client-side)
- Compact UI optimizations
- Church branding (Lighthouse Baptist Church)

---

### 🔄 Phase 2A: POC Backend with Next.js API Routes (CURRENT)
**Goal**: Build MVP backend for validation
**Timeline**: 6-8 weeks
**Approach**: Next.js API Routes + Prisma + PostgreSQL

**Tech Stack for POC**:
- Backend: Next.js API Routes (same codebase as frontend)
- Database: Vercel Postgres (or AWS RDS for production)
- ORM: Prisma (can reuse with NestJS later)
- Auth: Auth0 (or Clerk for faster setup)
- File Storage: Vercel Blob (or AWS S3)
- Deployment: Vercel (zero config)

**Tasks**:
1. **Week 1-2: Database & Auth**
   - [ ] Set up Vercel Postgres or AWS RDS
   - [ ] Design and implement Prisma schema
   - [ ] Configure Auth0/Clerk
   - [ ] Create auth middleware for API routes
   - [ ] Define user roles (Super Admin, Org Admin, Manager, Editor)
   - [ ] Implement organization identification (subdomain/custom domain routing)
   - [ ] Create organization API endpoint to load org data (name, logo, etc.)

2. **Week 3-4: Core APIs with Service Layer Pattern**
   - [ ] Create service files (keep logic separate from routes)
   - [ ] Organizations CRUD service + API routes
   - [ ] Users CRUD service + API routes
   - [ ] Missionaries CRUD service + API routes
   - [ ] Implement proper error handling
   - [ ] Add request validation (Zod)

3. **Week 5-6: File Upload & Advanced Features**
   - [ ] File upload to Vercel Blob or S3
   - [ ] Newsletter PDF upload and storage
   - [ ] Image optimization
   - [ ] Missionary search endpoint
   - [ ] Global vs local missionary logic

4. **Week 7-8: Admin Dashboard UIs**

   **Church Admin Dashboard** (Org Admins, Managers, Editors):
   - [ ] Organization settings page (name, logo, contact info)
   - [ ] Missionary management UI:
     - [ ] Search/browse existing missionaries (global + local)
     - [ ] Add global missionaries to supported list
     - [ ] Create/edit local missionary profiles
     - [ ] Upload missionary photos (profile photo + cover photo representing country/region)
     - [ ] Manage family members and birthdays
     - [ ] Remove missionaries from display
   - [ ] Newsletter management UI:
     - [ ] Upload PDF newsletters
     - [ ] Associate with missionaries
     - [ ] Edit/delete newsletters
     - [ ] Newsletter preview
   - [ ] User management (Org Admin only):
     - [ ] Invite team members
     - [ ] Assign roles (Manager, Editor)
     - [ ] Remove users
   - [ ] Subscription/billing view (Org Admin only)

   **Super Admin Dashboard**:
   - [ ] Organization management:
     - [ ] Create new organizations
     - [ ] View all organizations list
     - [ ] Edit organization details
     - [ ] Suspend/activate accounts
   - [ ] User management across all orgs:
     - [ ] View all users
     - [ ] Reset passwords
     - [ ] Change user emails
     - [ ] Update user roles
     - [ ] Delete users
   - [ ] Global missionary management:
     - [ ] Create/edit global missionaries
     - [ ] Track which orgs use each missionary
     - [ ] Bulk update capabilities
   - [ ] Platform metrics and analytics

   **Testing**:
   - [ ] Integration testing
   - [ ] Role-based access testing

**Best Practices for Easy Migration**:
```typescript
// ✅ Do this - separate service layer
// services/missionary.service.ts
export const missionaryService = {
  async getAll(orgId: string) {
    return prisma.missionary.findMany({ where: { organizationId: orgId } });
  },
  async create(data: CreateMissionaryDto) {
    return prisma.missionary.create({ data });
  },
};

// app/api/missionaries/route.ts
import { missionaryService } from '@/services/missionary.service';
export async function GET(req: Request) {
  const orgId = await getOrgIdFromAuth(req);
  const missionaries = await missionaryService.getAll(orgId);
  return Response.json(missionaries);
}
```

---

### Phase 2B: Optional NestJS Migration (When Needed)
**Triggers for Migration**:
- 50+ church customers
- Complex background jobs (email queues, etc.)
- Team grows beyond solo developer
- API response times become an issue

**Migration Process**:
1. Create new NestJS project
2. Copy Prisma schema (no changes needed)
3. Lift service layer code to NestJS services
4. Implement NestJS controllers (similar to API routes)
5. Add Guards for auth (replace middleware)
6. Deploy NestJS to EC2/ECS/Railway
7. Update frontend to point to new API
8. Keep database the same (zero downtime)

**Estimated Migration Time**: 2-3 weeks

---

### Phase 3: Church Dashboard - Missionary Management
**Goal**: Allow churches to manage their missionary data

**Tasks**:
1. **Missionary CRUD**
   - [ ] Search existing missionaries (global + local)
   - [ ] Add global missionaries to church's list
   - [ ] Create new local missionaries
   - [ ] Edit missionary profiles (bio, photos, contact, family)
   - [ ] Remove missionaries from display

2. **Newsletter Management**
   - [ ] Upload newsletter PDFs to S3
   - [ ] Associate newsletters with missionaries
   - [ ] Edit/delete newsletters
   - [ ] Newsletter preview

3. **Data Validation**
   - [ ] Form validation
   - [ ] Image upload restrictions
   - [ ] PDF upload restrictions

4. **File Upload**
   - [ ] Implement S3 upload for images
   - [ ] Implement S3 upload for PDFs
   - [ ] Image optimization pipeline
   - [ ] Generate thumbnails

**Questions**:
- Should we support bulk upload of missionaries (CSV import)?
- Maximum file sizes for images and PDFs?

---

### Phase 4: Subscription & Billing
**Goal**: Implement subscription tiers and payment processing

**Tasks**:
1. **Stripe Integration**
   - [ ] Set up Stripe account
   - [ ] Create subscription products and pricing
   - [ ] Implement Stripe Checkout
   - [ ] Handle webhooks (subscription events)
   - [ ] Customer portal for managing subscriptions

2. **Subscription Tiers** ✅ FINALIZED

   **Starter** ($49/mo)
   - Up to 25 missionaries (local only)
   - Manual data entry
   - Up to 3 users
   - Community support (email/docs)
   - Standard features (map, newsletters, QR codes, subscriptions)

   **Professional** ($99/mo)
   - Up to 100 missionaries (local + global)
   - **Access to global missionary database** (managed by platform admin)
   - **Automatic updates** when global missionaries are updated
   - 50 AI extractions/month
   - Up to 10 users
   - Email support (48hr response)
   - All Starter features

   **Enterprise** ($199/mo)
   - Unlimited missionaries (local + global)
   - **Priority for global missionary updates** (processed first)
   - Unlimited AI extractions
   - Unlimited users
   - Custom domain (white-label - e.g., missions.yourchurch.org)
   - Priority support (24hr response)
   - Advanced analytics dashboard
   - API access (future)
   - All Professional features

   **Key Differentiators**:
   - **Global Missionaries**: Platform admin maintains master profiles for major mission organizations, pushes updates to all churches automatically
   - **AI Extractions**: Use AI to extract missionary data from prayer cards and newsletters (saves 15-30 min per missionary)
   - **White-label**: Remove platform branding, use custom domain

   **Trial Period**: 14-day free trial (all Enterprise features)

3. **Account Management**
   - [ ] Subscription tier display
   - [ ] Usage metrics (missionaries count, users count)
   - [ ] Upgrade/downgrade flows
   - [ ] Billing history
   - [ ] Payment method management

4. **Limits Enforcement**
   - [ ] Missionary count limits (25 for Starter, 100 for Pro, unlimited for Enterprise)
   - [ ] User count limits (3 for Starter, 10 for Pro, unlimited for Enterprise)
   - [ ] Feature gating:
     - [ ] Global missionaries (Pro+ only)
     - [ ] AI extractions (Pro: 50/mo, Enterprise: unlimited)
     - [ ] Custom domain (Enterprise only)
     - [ ] Advanced analytics (Enterprise only)
   - [ ] AI extraction quota tracking and reset monthly

**Implementation Notes**:
- Use Stripe's metered billing for AI extractions overage (if needed)
- Consider annual pricing: 20% discount (e.g., $470/yr for Starter vs $588/yr monthly)
- Grace period: 7 days past limit before enforcement (soft limit)

---

### Phase 5: Admin Dashboard - Global Missionary Management
**Goal**: Software admin tools for managing platform and global missionaries

**Tasks**:
1. **Admin Dashboard**
   - [ ] Organization list and details
   - [ ] User management across orgs
   - [ ] Platform metrics and analytics

2. **Global Missionary Management**
   - [ ] Create global missionaries
   - [ ] Edit global missionary profiles
   - [ ] Track which orgs use each global missionary
   - [ ] Bulk update capabilities

3. **Platform Management**
   - [ ] Feature flags
   - [ ] System health monitoring
   - [ ] Audit logs

---

### Phase 6: Newsletter Subscriptions & Notifications
**Goal**: Allow users to subscribe to missionary updates

**Tasks**:
1. **Subscription System**
   - [ ] Email subscription forms
   - [ ] Subscriber database
   - [ ] Unsubscribe management
   - [ ] GDPR/privacy compliance

2. **Email Notifications**
   - [ ] Email templates
   - [ ] Newsletter notification emails
   - [ ] Email delivery service integration (SES/SendGrid)
   - [ ] Tracking opens/clicks (optional)

3. **Notification Settings**
   - [ ] User preferences for notifications
   - [ ] Frequency settings
   - [ ] Digest options

---

### Phase 7: Enhanced Search & Discovery
**Goal**: Better search and discovery of missionaries

**Tasks**:
1. **Advanced Search**
   - [ ] Full-text search
   - [ ] Filtering by multiple criteria
   - [ ] Search relevance ranking
   - [ ] Search suggestions/autocomplete

2. **Consider Elasticsearch/Algolia**
   - [ ] Evaluate if PostgreSQL search is sufficient
   - [ ] Implement if needed for scale

---

### Phase 8: Marketing Website
**Goal**: Public-facing website to showcase the platform

**Tasks**:
1. **Website Content**
   - [ ] Homepage
   - [ ] Features page
   - [ ] Pricing page
   - [ ] About/Contact
   - [ ] Documentation/Help center
   - [ ] Blog (optional)

2. **Conversions**
   - [ ] Sign-up flow
   - [ ] Demo/trial request
   - [ ] Contact forms
   - [ ] Testimonials/case studies

3. **SEO**
   - [ ] Meta tags
   - [ ] Sitemap
   - [ ] Schema markup
   - [ ] Analytics

**Questions**:
- Same Next.js app or separate marketing site?
- What CMS for blog content? (Contentful, Sanity, MDX?)

---

### Future Enhancements

#### 🤖 AI-Powered Data Extraction (HIGH VALUE - Differentiator)
**Goal**: Dramatically reduce manual data entry by using AI to extract missionary information from newsletters and prayer cards

**Use Cases**:
1. **Newsletter Upload → Auto-Populate Bio/Updates**
   - Upload PDF newsletter
   - AI extracts key highlights, ministry updates, achievements
   - Suggests bio updates or auto-generates summary text
   - Admin reviews and approves changes
   - Track which newsletter each update came from

2. **Prayer Card Import → Quick Profile Creation**
   - Upload prayer card images (JPG/PNG/PDF)
   - OCR + AI extracts structured data:
     - Name, location, country, ministry focus
     - Family members (names, relationships)
     - Contact information
     - Photo (crop and extract from card)
   - Pre-fills missionary profile form
   - Admin reviews, edits, and saves

3. **Bulk Import**
   - Upload multiple prayer cards or PDFs
   - AI processes batch in background
   - Creates draft profiles for each missionary
   - Admin reviews queue and publishes

4. **Smart Bio Generation**
   - Analyze multiple newsletters over time
   - Generate comprehensive bio from all updates
   - Highlight key ministry achievements
   - Maintain consistent tone and style

**Technical Implementation**:
```typescript
// services/ai-extraction.service.ts
export const aiExtractionService = {
  async extractFromPDF(fileUrl: string) {
    // 1. Extract text from PDF
    const text = await pdfToText(fileUrl);

    // 2. Send to Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      messages: [{
        role: "user",
        content: `Extract missionary information from this newsletter text.
        Return JSON with: name, location, ministry_focus, bio_highlights,
        family_members (array), recent_updates (array).

        Text: ${text}`
      }]
    });

    // 3. Parse AI response
    return JSON.parse(response.content[0].text);
  },

  async extractFromImage(imageUrl: string) {
    // 1. OCR with Tesseract or AWS Textract
    const text = await performOCR(imageUrl);

    // 2. Send to Claude API with vision
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "url", url: imageUrl }
          },
          {
            type: "text",
            text: "Extract all missionary information from this prayer card..."
          }
        ]
      }]
    });

    return JSON.parse(response.content[0].text);
  }
};
```

**UI Flow**:
```
1. Admin clicks "Import from Newsletter/Prayer Card"
2. Upload file (drag-and-drop or file picker)
3. AI processing indicator (30-60 seconds)
4. Show extracted data in review modal:
   - Side-by-side: Original document | Extracted data
   - Editable fields with AI suggestions highlighted
   - Confidence scores for each field
5. Admin edits/approves
6. Save to database
```

**Database Schema Additions**:
```sql
-- Track AI extractions for audit and improvement
ai_extractions
  - id (uuid)
  - source_file_url (string)
  - source_type (enum: newsletter_pdf, prayer_card_image)
  - extracted_data (jsonb)
  - missionary_id (uuid, nullable - if matched to existing)
  - status (enum: pending, approved, rejected)
  - reviewed_by_user_id (uuid)
  - created_at (timestamp)
```

**Cost Considerations**:
- Claude API: ~$0.01-0.05 per extraction (3-15 pages)
- OCR (Tesseract): Free (self-hosted) or AWS Textract: $0.0015/page
- Estimated: $0.02-0.10 per missionary profile import
- ROI: Saves 15-30 minutes of manual data entry per missionary

**Potential Premium Feature**:
- Basic tier: Manual data entry only
- Pro tier: 50 AI extractions/month
- Enterprise tier: Unlimited AI extractions

**Implementation Priority**: Phase 9 or 10 (after core features stable and validated)

---

#### Other Future Enhancements
- [ ] Mobile app (React Native?)
- [ ] Missionary prayer requests
- [ ] Donation/giving integration
- [ ] Events calendar
- [ ] Photo galleries
- [ ] Video testimonials
- [ ] Multi-language support
- [ ] Custom branding per church
- [ ] Embeddable widgets for church websites
- [ ] API for third-party integrations
- [ ] Reporting and analytics dashboard
- [ ] Automated reminder emails for birthday/anniversaries
- [ ] Missionary field reports and updates timeline
- [ ] Integration with church management systems (Planning Center, CCB)
- [ ] Automated social media posting for missionary updates

---

## Database Schema (Draft)

### Core Tables

```sql
-- Organizations (Churches)
organizations
  - id (uuid, primary key)
  - name (string)
  - slug (string, unique)
  - email (string)
  - phone (string)
  - address (jsonb)
  - logo_url (string)
  - subscription_tier (enum)
  - subscription_status (enum)
  - stripe_customer_id (string)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Users
users
  - id (uuid, primary key)
  - auth0_id (string, unique)
  - email (string, unique)
  - first_name (string)
  - last_name (string)
  - role (enum: SUPER_ADMIN, ORG_ADMIN, MANAGER, EDITOR)
  - organization_id (uuid, foreign key, nullable - only NULL for SUPER_ADMIN)
  - created_at (timestamp)
  - updated_at (timestamp)

-- User Roles:
-- SUPER_ADMIN: Platform-level, NOT linked to organization (organization_id = NULL)
-- ORG_ADMIN: Full church access (missionaries, newsletters, billing, users)
-- MANAGER: Missionary CRUD + newsletters (no org settings/billing/users)
-- EDITOR: Newsletters only, read-only on missionaries

-- Missionaries (both global and local)
missionaries
  - id (uuid, primary key)
  - type (enum: global, local)
  - first_name (string)
  - last_name (string)
  - full_name (string)
  - profile_photo_url (string) -- Missionary family photo
  - cover_photo_url (string) -- Country/region background image representing ministry area
  - bio (text)
  - email (string)
  - phone (string)
  - country (string)
  - region (string)
  - city (string)
  - latitude (decimal)
  - longitude (decimal)
  - ministry_focus (string)
  - organization (string)
  - years_of_service (integer)
  - tags (jsonb)
  - social_media (jsonb)
  - start_date (date)
  - created_by_organization_id (uuid, foreign key, nullable for global)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Organization-Missionary relationship (which missionaries each church displays)
organization_missionaries
  - id (uuid, primary key)
  - organization_id (uuid, foreign key)
  - missionary_id (uuid, foreign key)
  - display_order (integer)
  - created_at (timestamp)

-- Family Members
family_members
  - id (uuid, primary key)
  - missionary_id (uuid, foreign key)
  - name (string)
  - relationship (enum: spouse, child, other)
  - birthday (date)
  - photo_url (string)
  - created_at (timestamp)

-- Newsletters
newsletters
  - id (uuid, primary key)
  - missionary_id (uuid, foreign key)
  - title (string)
  - pdf_url (string)
  - published_date (date)
  - created_by_user_id (uuid, foreign key)
  - created_at (timestamp)
  - updated_at (timestamp)

-- Newsletter Subscribers
newsletter_subscribers
  - id (uuid, primary key)
  - email (string)
  - missionary_id (uuid, foreign key, nullable for all missionaries)
  - organization_id (uuid, foreign key)
  - subscribed_at (timestamp)
  - unsubscribed_at (timestamp, nullable)

-- Subscriptions (billing)
subscriptions
  - id (uuid, primary key)
  - organization_id (uuid, foreign key)
  - stripe_subscription_id (string)
  - tier (enum)
  - status (enum: active, past_due, canceled, trialing)
  - current_period_start (timestamp)
  - current_period_end (timestamp)
  - trial_end (timestamp, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)
```

---

## Open Questions & Decisions Needed

### Technical
1. **Backend Framework**: Next.js API Routes, NestJS, or Java/Micronaut?
   - Recommendation: Start with Next.js API Routes

2. **ORM**: Prisma, TypeORM, or raw SQL?
   - Recommendation: Prisma (TypeScript-native, great DX)

3. **Search**: PostgreSQL full-text search or Elasticsearch/Algolia?
   - Recommendation: Start with PostgreSQL, add Elasticsearch if needed

4. **Email Service**: AWS SES, SendGrid, or Resend?
   - Recommendation: Resend (modern DX) or SES (cost-effective)

5. **File Upload**: Direct to S3 or through backend?
   - Recommendation: Presigned URLs for direct client upload

### Business
1. **Pricing Model**: What should the subscription tiers be?
   - Need to define limits and pricing

2. **Global Missionaries**: Premium feature or available to all?
   - Recommendation: Premium feature to drive upgrades

3. **Trial Period**: How long should the free trial be?
   - Recommendation: 14 or 30 days

4. **User Roles**: What granular permissions are needed?
   - Proposed: Super Admin, Org Admin, Missionary Manager, Newsletter Editor

5. **Limits**: How many missionaries/users per tier?
   - Need to define based on market research

### Product
1. **MVP Features**: What's the minimum to launch?
   - Recommendation: Phases 1-4 (Display, Backend, Management, Billing)

2. **Launch Timeline**: What's the target launch date?
   - Need to determine based on resources

3. **Target Market**: Which churches first? Size? Location?
   - Need to define ideal customer profile

---

## Next Steps

### Immediate (Phase 2)
1. **Decision**: Choose backend framework
2. **Decision**: Choose ORM
3. **Decision**: Define subscription tiers and pricing
4. **Decision**: Define user roles and permissions
5. **Setup**: Create AWS RDS database
6. **Setup**: Configure Auth0
7. **Design**: Finalize database schema
8. **Implement**: Basic API endpoints
9. **Implement**: Authentication flows

### Short Term (Phase 3-4)
1. Church dashboard development
2. Stripe integration
3. Subscription management
4. File upload to S3

### Medium Term (Phase 5-6)
1. Admin dashboard
2. Global missionary management
3. Newsletter subscription system
4. Email notifications

### Long Term (Phase 7-8)
1. Enhanced search
2. Marketing website
3. Additional features based on user feedback

---

## Success Metrics

### User Metrics
- Number of organizations signed up
- Number of active users
- Missionaries per organization (average)
- Newsletter subscribers per missionary
- Mobile QR code scans

### Business Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Churn rate
- Conversion rate (trial to paid)

### Technical Metrics
- API response times
- Uptime/availability
- Error rates
- Database query performance

---

## Risk Assessment

### Technical Risks
- **Scale**: Database/API performance at scale
  - Mitigation: Start with PostgreSQL, add caching, consider Elasticsearch

- **File Storage Costs**: S3 costs for large files
  - Mitigation: Implement file size limits, compress images

- **Email Deliverability**: Notification emails marked as spam
  - Mitigation: Use reputable ESP, implement SPF/DKIM/DMARC

### Business Risks
- **Market Fit**: Churches may not want to pay for this
  - Mitigation: Validate pricing with potential customers early

- **Competition**: Other missionary management tools
  - Mitigation: Focus on the TV display + mobile experience differentiator

- **Support Load**: Managing global missionaries at scale
  - Mitigation: Clear guidelines, potentially charge for global missionary management

---

*Last Updated: 2026-02-01*
