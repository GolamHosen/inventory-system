# Inventory & Stock Management System

React + Vite application that showcases a modern inventory workflow: role-based access, product CRUD, stock movement logging, barcode scanning, alerts, charts, and PDF invoice export.

## Tech Stack
- React 18 (Vite) + TypeScript
- Redux Toolkit + React Redux
- Material UI + Tailwind CSS
- Recharts, React Hot Toast
- html2canvas + jsPDF (invoice export)
- react-qr-barcode-scanner

## Getting Started
```bash
cd inventory-system
npm install
npm run dev
```
Visit the printed local URL. For production:
```bash
npm run build
npm run preview
```

## Demo Accounts
| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | `admin`  | `admin123`|
| Staff | `staff`  | `staff123`|

## Features
- **Role-based login** (Admin vs Staff capabilities)
- **Product management**: add, edit, delete, reorder levels
- **Stock in/out wizard** with validation and activity log
- **Low-stock alerts** and dismissible notifications
- **Dashboard** KPIs + charts (category stock, movement trend)
- **Barcode scanning** via camera or manual entry
- **Invoice builder** with PDF export
- **Global state** for products, users, transactions, alerts

## Project Structure
```
src/
 ├─ components/   # Reusable UI (sidebar, forms, cards, scanner, etc)
 ├─ pages/        # Dashboard, Products, Stock, Barcode, Reports, Login
 ├─ store/        # Redux slices (auth, products, transactions, notifications)
 ├─ data/         # Seed users, products, transactions
 ├─ hooks/        # Typed Redux hooks
 ├─ types/        # Shared TypeScript types + external declarations
 └─ utils/        # PDF helper
```

## Key Workflows
- **Login**: credentials pulled from `src/data/mockData.ts`. Redux `authSlice` stores current user.
- **Products**: `productSlice` manages CRUD + inventory adjustments; `ProductForm` handles add/edit.
- **Stock Movements**: `Stock` page dispatches `adjustStock` + `recordMovement`, keeping history in `transactionSlice`.
- **Alerts**: `Dashboard` derives low-stock products and updates `notificationSlice`.
- **Barcode**: `BarcodeScannerPanel` uses `react-qr-barcode-scanner` and manual input fallback.
- **Invoices**: `Reports` page composes line items, then `exportInvoiceToPdf` captures DOM to PDF.

## Environment Notes
- Tailwind configured via `tailwind.config.js`; global styles live in `src/index.css`.
- `tsconfig.json` enables React JSX (`react-jsx`) and strict settings.
- Build warnings about `"use client"` are emitted by upstream MUI packages and are safe to ignore.

## Future Enhancements (ideas)
- Persist data via API / local storage
- Per-role permissions for destructive actions
- Import/export CSV
- Unit tests for slices and critical UI flows

---
Enjoy managing inventory! Let me know if you need deployment instructions or further automation.

