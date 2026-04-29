# Voucher Management System

This is a minimal, simple React application built with Tailwind CSS v4 and Redux Toolkit. It implements a role-based Voucher Management System based on the provided specifications.

## Core Features & Functionality

1. **Authentication (Login)**
   - The application has a simulated login system managed by Redux (`authSlice.js`).
   - Hardcoded credentials are provided for testing:
     - **Admin**: `admin` / `admin123`
     - **Staff**: `staff` / `staff123`
   - Unauthorized users trying to access any page will be redirected to the `/login` route.

2. **Role-Based Access Control (RBAC)**
   - **Admin Role**: Has full access. An admin can view the list of vouchers, create new vouchers, edit existing vouchers, and delete vouchers.
   - **Staff Role**: Has limited access. A staff member can only view the list of vouchers and create new ones. The Edit and Delete buttons are completely hidden from the UI for staff members.

3. **Voucher Management (CRUD)**
   - State is managed globally via Redux (`voucherSlice.js`).
   - **Create**: Users can create a voucher with fields for Date, Voucher No, Type (Journal, Payment, Receipt, Contra), Account, Amount, and Narration.
   - **Read**: Vouchers are displayed in a clean, minimal table format.
   - **Update & Delete**: Available only for Admin users.

## Project Logic & Architecture

- **Minimal UI Component Design**: Following the requirement to "keep styling minimal" and not extend the project with unrequested features, the app uses raw Tailwind CSS utility classes on plain HTML elements (tables, divs, basic inputs) rather than relying on heavy UI libraries or overly stylized modern "glass" effects.
- **Redux State Management**:
  - `src/store/store.js`: Configures the main Redux store.
  - `src/store/authSlice.js`: Manages the current logged-in user object (`{ username, role }`). 
  - `src/store/voucherSlice.js`: Manages the array of vouchers.
- **Routing (`react-router-dom`)**:
  - Unauthenticated routes: `/login`
  - Protected routes: `/` (Voucher List), `/create` (Create Voucher form)
  - Admin-only routes: `/edit/:id` (Edit Voucher form)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local server URL provided by Vite. Use the demo credentials to log in!
