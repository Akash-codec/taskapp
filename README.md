# Voucher Management System

This is a minimal, simple React application built with Tailwind CSS v4 and Redux Toolkit. It implements a role-based Voucher Management System based on the provided specifications.

## Core Features & Functionality

1. **Authentication (Login & Mock JWT)**
   - The application uses a simulated login system managed by Redux (`authSlice.js`), verifying credentials against a predefined `USERS` array.
   - Hardcoded credentials are provided for testing:
     - **Admin**: `admin` / `admin123`
     - **Staff**: `staff` / `staff123`
   - **Mock JWT System**: Upon successful login, a base64-encoded mock JSON Web Token (JWT) is generated. This token contains user details and a 7-day expiration timestamp (`exp`).
   - **Session Persistence**: The generated token is stored in the browser's `localStorage`. On application load, Redux decodes the token, verifies the 7-day expiration, and automatically restores the user session if the token is still valid.
   - Unauthorized users or those with expired tokens attempting to access any protected page are redirected to the `/login` route.

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

## Interview Questions

Here are some potential interview questions based on the architecture and features of this Voucher Management System:

**React & Routing**
1. **How do you implement protected routes in a React application?** 
   *Focus on how you prevent unauthenticated users from accessing protected pages and redirect them to the login screen.*
2. **How is Role-Based Access Control (RBAC) implemented on the frontend?**
   *Discuss how you conditionally render UI elements (like hiding the Edit and Delete buttons for Staff) and restrict route access based on the user's role.*

**State Management (Redux Toolkit)**
3. **Why did you choose Redux Toolkit over the Context API for this project?**
   *Explain the benefits of Redux Toolkit for managing complex, global states like authentication and voucher data.*
4. **How do you handle state persistence across page reloads?**
   *Discuss strategies for keeping the user logged in and maintaining voucher data when the browser is refreshed (e.g., using `localStorage` or `sessionStorage`).*
5. **What is the purpose of a Redux "Slice"?**
   *Explain how `createSlice` simplifies Redux by combining reducers and action creators into a single file.*

**General Architecture**
6. **How would you secure the authentication process in a real-world scenario compared to this mock setup?**
   *Discuss JWTs, HTTP-only cookies, password hashing, and communicating with a real backend API.*
7. **What are the benefits of using a utility-first CSS framework like Tailwind CSS?**
   *Discuss rapid prototyping, smaller CSS bundle sizes, and the ease of applying minimal UI designs directly in the component markup.*
