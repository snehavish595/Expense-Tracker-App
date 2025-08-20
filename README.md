# Expense Tracker App

A simple and effective Expense Tracker App built to help users manage their personal finances. This application allows users to record expenses, categorize them, and visualize spending habits over time.

## Features

- **Add Expenses**: Easily add new expenses with details such as amount, category, and date.
- **Expense Categories**: Organize your expenses into customizable categories.
- **Expense History**: View a log of all your expenses and filter by category or date.
- **Visualizations**: See charts and graphs for monthly or yearly spending habits.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **Frontend**: Next.js (React), Chart.js for charts, Tailwind CSS for utility-first styling.
- **Backend**: Django (Python).
- **Database**: SQLite.
- **Styling**: Tailwind CSS and custom fonts (Geist, Inter).

## Getting Started

### Prerequisites

- Node.js and npm installed
- Python and pip installed
- (Recommended) Yarn, pnpm, or bun for frontend dev server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/snehavish595/Expense-Tracker-App.git
   cd Expense-Tracker-App
   ```
2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```
3. **Start the frontend application**
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:3000` by default.

4. **Install backend dependencies**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```
5. **Run backend server**
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
   The backend server will run at `http://localhost:8000` by default.

## Usage

- **Add new expenses** through the form.
- **Categorize and filter** your expenses to better understand your spending.
- **View analytics** to track your financial habits.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please reach out to [snehavish595](https://github.com/snehavish595).
