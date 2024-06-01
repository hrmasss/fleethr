# FleetHR

FleetHR is a cost-effective and flexible Human Resources Management (HRM) Software as a Service (SaaS) targeted at Small to Medium-sized Enterprises (SMEs). It aims to streamline HR processes, making it easier for SMEs to manage their human resources efficiently.

## Technologies Used

FleetHR is built using a modern tech stack to ensure performance, scalability, and ease of use. Key technologies include:

- **Next.js**: React framework for building server-side rendered applications.
- **TypeScript**: For type-safe JavaScript.
- **Prisma**: ORM for database management.
- **tRPC**: Type-safe APIs.
- **NextAuth**: Authentication for Next.js.
- **TailwindCSS**: Utility-first CSS framework.
- **Mantine**: Component library.
- **Zod**: Schema validation.
- **UploadThing**: File uploading service.
- **Resend**: Email service.

## Getting Started

Follow these steps to get started with FleetHR:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hrmasss/fleethr.git
   cd fleethr
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   - Copy and rename `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Populate the variables in the `.env` file.

4. **Ensure PostgreSQL server is running:**
   - Make sure the PostgreSQL server mentioned in your `.env` file is up and running.

5. **Push the database schema:**
   ```bash
   npm run db:push
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

## Deployment

FleetHR is deployed on Vercel and can be accessed at [https://fleethr.vercel.app](https://fleethr.vercel.app).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
