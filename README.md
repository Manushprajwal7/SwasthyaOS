# SwasthyaOS - Healthcare Intelligence Platform

An AI-native healthcare operating system designed for doctors, frontline health workers, and public health intelligence in India. Built with modern web technologies to deliver clinical situational awareness and decision support at scale.

## 🏥 Overview

SwasthyaOS is a comprehensive healthcare platform that transforms how medical professionals interact with patient data, clinical workflows, and population health intelligence. The system provides:

- **Clinical Decision Support**: AI-powered recommendations for diagnosis and treatment
- **Population Health Monitoring**: Real-time health signal detection and outbreak prediction
- **Frontline Worker Tools**: Voice-first interfaces for rural healthcare delivery
- **Audit & Compliance**: Transparent AI decision logging and governance
- **Multi-role Access**: Role-based interfaces for doctors, frontline workers, and administrators

## 🚀 Key Features

### Core Modules

| Module                      | Description                                           | Target Users               |
| --------------------------- | ----------------------------------------------------- | -------------------------- |
| **Dashboard**               | Clinical situational overview with KPIs and alerts    | All users                  |
| **Clinician Workspace**     | Unified clinical documentation with SOAP note builder | Doctors, Frontline workers |
| **Rural Decision Support**  | Voice-first clinical guidance for AarogyaPath program | Frontline workers          |
| **Population Health Radar** | Regional health signal monitoring and mapping         | Doctors, Administrators    |
| **Patient Management**      | Comprehensive patient records and timeline views      | Doctors, Frontline workers |
| **Appointment Scheduling**  | Calendar-based appointment management                 | All users                  |
| **Inventory Management**    | Medication and supply tracking with low-stock alerts  | Doctors, Administrators    |
| **Alert System**            | AI-generated health alerts and notifications          | All users                  |
| **Secure Chat**             | HIPAA-compliant messaging for care coordination       | All users                  |
| **Reporting**               | Clinical, epidemiological, and compliance reports     | Doctors, Administrators    |
| **Audit & Compliance**      | AI decision logs and override history                 | Administrators             |
| **Settings**                | User preferences, security, and system configuration  | All users                  |

### Technical Capabilities

- **Real-time Health Signal Detection**: Monitors population health trends and outbreak patterns
- **AI Confidence Scoring**: Transparent trust metrics for all AI-generated recommendations
- **Voice Capture**: Hands-free data entry for frontline workers
- **Data Anonymization**: Privacy-preserving analytics and reporting
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 16.0.10** - React-based framework with App Router
- **React 19.2.0** - Component library
- **TypeScript** - Type-safe development

### UI Components

- **shadcn/ui** - Reusable component library (New York style)
- **Radix UI** - Accessible UI primitives
- **Tailwind CSS 4.1.9** - Utility-first styling
- **Lucide React** - Icon library

### Data Visualization

- **Recharts 2.15.4** - Charting and data visualization
- **Embla Carousel** - Touch-enabled carousels

### Form Handling

- **React Hook Form** - Performant form management
- **Zod 3.25.76** - Schema validation
- **@hookform/resolvers** - Validation resolvers

### Utilities

- **date-fns 4.1.0** - Date manipulation
- **clsx** - Conditional class handling
- **tailwind-merge** - Class merging utility
- **next-themes** - Dark/light theme support

### Analytics

- **Vercel Analytics** - Performance monitoring

## 📁 Project Structure

```
SwasthyaOS/
├── app/                    # Next.js app router pages
│   ├── alerts/            # Alert management
│   ├── appointments/      # Appointment scheduling
│   ├── audit/             # Audit and compliance
│   ├── chat/              # Secure messaging
│   ├── clinician/         # Clinician workspace
│   ├── inventory/         # Inventory management
│   ├── patients/          # Patient records
│   ├── population/        # Population health radar
│   ├── referrals/         # Referral management
│   ├── reports/           # Reporting module
│   ├── rural/             # Rural decision support
│   ├── settings/          # System settings
│   └── layout.tsx         # Root layout
├── components/             # React components
│   ├── alerts/            # Alert-related components
│   ├── appointments/      # Appointment components
│   ├── audit/             # Audit components
│   ├── chat/              # Chat components
│   ├── clinician/         # Clinician workspace components
│   ├── dashboard/         # Dashboard components
│   ├── inventory/         # Inventory components
│   ├── layout/            # Layout components (sidebar, topbar)
│   ├── patients/          # Patient components
│   ├── population/        # Population health components
│   ├── referrals/         # Referral components
│   ├── reports/           # Report components
│   ├── rural/             # Rural decision support components
│   ├── settings/          # Settings components
│   ├── ui/                # shadcn/ui base components
│   └── theme-provider.tsx # Theme context provider
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── styles/                 # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or pnpm
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd SwasthyaOS
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

### Development

Start the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
# or
npm run build
```

Start the production server:

```bash
pnpm start
# or
npm start
```

### Linting

```bash
pnpm lint
# or
npm run lint
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# API endpoints (if applicable)
NEXT_PUBLIC_API_URL=your_api_url
```

### Customization

- **Theme**: Modify `app/globals.css` for color schemes
- **Components**: Extend shadcn/ui components in `components/ui/`
- **Routes**: Add new pages in `app/` directory following Next.js App Router conventions

## 🎨 UI Components

The project uses shadcn/ui components which are built on Radix UI primitives. Key component categories include:

- **Layout**: Cards, accordions, tabs, drawers
- **Forms**: Inputs, selects, checkboxes, radio groups
- **Navigation**: Menus, breadcrumbs, pagination
- **Feedback**: Alerts, toasts, tooltips, popovers
- **Data Display**: Tables, charts, badges, avatars

All components are fully typed with TypeScript and support dark mode.

## 📊 System Architecture

### Role-Based Access Control

Three primary user roles:

- **Doctor**: Full clinical access with advanced decision support
- **Frontline Worker**: Simplified interface optimized for field work
- **Administrator**: System management and compliance oversight

### Data Flow

1. **Data Collection**: Patient vitals, symptoms, and clinical notes
2. **AI Processing**: Real-time analysis and recommendation generation
3. **Decision Support**: Confidence-scored recommendations with explanations
4. **Documentation**: Automated SOAP note generation
5. **Monitoring**: Population health signal detection
6. **Audit Trail**: Immutable logs of all AI interactions

### Security Features

- Role-based access control
- HIPAA-compliant data handling
- End-to-end encryption for communications
- Audit logging for all system interactions
- Data anonymization for analytics

## 🌐 Deployment (AWS Native)

SwasthyaOS is built to leverage scalable AWS infrastructure to meet healthcare compliance and data sovereignty requirements.

### AWS Amplify (Frontend Deployment)

1. Push code to GitHub/AWS CodeCommit
2. Connect repository to AWS Amplify Console
3. Configure build settings for Next.js 14+
4. Deploy automatically on push with global CDN via CloudFront

### Backend Architecture

- **Compute**: AWS Lambda (serverless API endpoints), Amazon ECS (Fargate for background jobs), Amazon EC2 (Legacy integration and heavy ML)
- **API**: Amazon API Gateway (REST + WebSockets)
- **Database**: Amazon DynamoDB (Session & Events), AWS HealthLake (FHIR R4 Records), Amazon S3 (Document store)
- **AI/ML Engine**: Amazon Bedrock (Claude 3 for clinical reasoning), Amazon Transcribe Medical, Amazon Comprehend Medical
- **Spec-driven Workflow**: Kiro integrated into CI/CD for healthcare spec verification.

### Docker (Local/ECS Development)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent component structure
- Write meaningful commit messages
- Test components thoroughly
- Document new features

## 📄 License

This project is proprietary software developed for healthcare applications in India.

## 📞 Support

For technical support or questions, please contact the development team.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Deployed on [Vercel](https://vercel.com/)

---

_SwasthyaOS - Empowering healthcare through intelligent technology_
