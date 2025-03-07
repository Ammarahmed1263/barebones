# Pet Profile App - React Native Coding Test

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install 
   #or yarn install
   ```
3. Create a Supabase account and project at https://supabase.com
4. Copy your Supabase project credentials
5. Create a `.env` file with your Supabase credentials:
   ```
   SUPABASE_URL=your_project_url
   SUPABASE_ANON_KEY=your_anon_key
   ```
6. Start the development server:
   ```bash
   npx expo start
   #or yarn start
   ```

## Decisions
- Decided to create .gitignore file to untrack node_modules and yarn.lock files to avoid committing them to repository.
- Added a .env file to store Supabase credentials.
- Added subaseClient file for centralized Supabase initialization
- Created AppButton component for unified button styling.
- Modified table foreign key to support cascading deletion.
- Not to use @react-native-community/datetimepicker because it have active issue with current version of expo.

## Extra Dependecies
- @supabase/supabase-js
- @dietime/react-native-date-picker
- expo-linear-gradient "dependencie for the latter one"

## Repository
- https://github.com/Ammarahmed1263/barebones

## Contact Info
- Whatsapp: +20 1010868954
- Email: ammarahmed1263@gmail.com
- LinkedIn: https://www.linkedin.com/in/ammar126/