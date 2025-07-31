# AgriLink Fiji - Agricultural Marketplace

A modern, responsive agricultural marketplace connecting farmers, buyers, and suppliers across the beautiful islands of Fiji.

## ✨ Features

### 🎨 Professional UI/UX
- **Beautiful Splash Screen**: Professional loading screen with animated elements
- **Fiji-Themed Design**: Custom color palette inspired by Fiji's natural beauty
- **Responsive Layout**: Works perfectly on all devices (mobile, tablet, desktop)
- **Modern Animations**: Smooth transitions and micro-interactions
- **Accessible Design**: Keyboard navigation and screen reader support

### 🔐 Authentication System
- **Email/Phone Login**: Dual authentication methods
- **Secure Signup**: Email verification and phone verification support
- **Protected Routes**: Secure access to authenticated areas
- **Session Management**: Persistent login state across browser sessions
- **Form Validation**: Client-side validation with helpful error messages

### 🏠 Marketplace Features
- **Product Listings**: Browse agricultural products by category
- **Category Filtering**: Filter products by vegetables, fruits, grains, etc.
- **Farmer Profiles**: View seller information and contact details
- **Location-Based Search**: Find products by location across Fiji
- **Real-time Updates**: Live product availability updates

### 📱 User Experience
- **Toast Notifications**: Non-intrusive success/error messages
- **Loading States**: Clear feedback during async operations
- **Error Handling**: Graceful error boundaries and recovery
- **Offline Support**: Basic functionality when internet is limited

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/agrilink-app.git
   cd agrilink-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env file with your Supabase credentials
   # VITE_SUPABASE_URL=your_supabase_project_url
   # VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   **⚠️ Security Note**: 
   - Never commit your `.env` file to version control
   - The `.env` file is already included in `.gitignore`
   - Only share environment variables through secure channels

4. **Configure Supabase**
   - Create a new Supabase project
   - Set up authentication providers (email/phone)
   - Create the required database tables (see Database Schema below)

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🗄️ Database Schema

### Users Table (handled by Supabase Auth)
- Authentication via Supabase Auth
- User metadata includes: full_name, user_type

### Products Table
```sql
create table public.products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  description text,
  price decimal(10,2) not null,
  quantity integer not null,
  category text not null,
  location text not null,
  farmer_name text,
  available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## 🛠️ Technology Stack

### Frontend
- **React 19**: Latest React version with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Vite**: Fast development and build tool

### Backend
- **Supabase**: Backend-as-a-Service
  - Authentication
  - Real-time database
  - Row Level Security (RLS)
  - Storage (for future image uploads)

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes
- **Cypress**: End-to-end testing

## 📱 Mobile Support

The application is fully responsive and provides an excellent mobile experience:

- Touch-friendly interface
- Optimized for mobile browsers
- Ready for PWA conversion
- Capacitor integration for native app deployment

## 🎨 Design System

### Color Palette
- **Primary Green**: Fiji's lush vegetation (#15803d)
- **Accent Yellow**: Tropical sunshine (#facc15)
- **Supporting Blues**: Ocean-inspired blues
- **Neutral Grays**: Clean, modern neutrals

### Typography
- **Headings**: Poppins (bold, modern)
- **Body Text**: Inter (readable, accessible)
- **Font Sizes**: Responsive scale from mobile to desktop

### Components
- Reusable UI components
- Consistent spacing and sizing
- Accessible form controls
- Interactive feedback states

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **Authentication Tokens**: Secure JWT handling
- **Input Validation**: Client and server-side validation
- **HTTPS**: Secure data transmission
- **CORS Configuration**: Proper cross-origin setup

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🧪 Testing

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test.e2e
```

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: Optimized for fast loading
- **Code Splitting**: Lazy loading for better performance
- **Image Optimization**: WebP format with fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Fiji's agricultural community for inspiration
- Supabase team for excellent backend services
- Tailwind CSS for the utility-first approach
- React team for the amazing framework

## 📞 Support

For support, email support@agrilink.fj or join our Slack channel.

---

Made with ❤️ for the farmers of Fiji 🇫🇯
