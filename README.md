# Power Zone - Gym Management System

Power Zone is a web application I built to help gym organizations manage their day-to-day operations more efficiently. It handles everything from member registrations to class scheduling, making life easier for both gym staff and members.

## What This Project Does

This system is currently being used by a local fitness center to streamline their operations. Members can sign up for classes, update their profiles, and track their activities, while staff can manage schedules, monitor payments, and coordinate with trainers.

Since this application handles real member data and personal information, it's kept in a private repository with restricted access.

## Key Features

**Member Management**
The system allows new members to register and create profiles, while existing members can update their information and track their membership status. This eliminates the need for paper forms and makes information easily accessible.

**Class Scheduling and Booking**
Members can view available classes and book their spots in real-time. The system handles capacity limits automatically and maintains waiting lists when classes fill up. This prevents overbooking and reduces administrative overhead.

**Trainer Coordination**
Trainers have their own profiles where they can view their assigned classes, manage their schedules, and update their availability. This helps the gym coordinate staff more effectively.

**Payment Tracking**
The application keeps track of membership fees, payment history, and transaction records. This gives both members and staff visibility into account status and payment schedules.

**Mobile-Friendly Design**
Since many gym interactions happen on mobile devices, the entire system is designed to work seamlessly on phones and tablets, while still providing full functionality on desktop computers.

## Technology Stack

The application is built using SvelteKit for the frontend framework, which provides fast performance and a smooth user experience. Tailwind CSS handles the styling, making the interface clean and responsive across all devices.

For data storage and real-time updates, I used Firebase and Firestore, which allows multiple users to see changes instantly. Firebase also handles user authentication securely. The application is hosted on Vercel for reliable performance and automatic deployments.

## Setting Up the Development Environment

If you have access to the repository, here's how to get it running locally:

```bash
# Clone the repository
git clone [repository-url]
cd power-zone

# Install all dependencies
npm install

# Set up your environment variables
cp .env.example .env.local
# Add your Firebase configuration details

# Start the development server
npm run dev
```

You'll need to configure these environment variables with your Firebase project details:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## How It Works

The system has different interfaces depending on who's using it. Gym administrators can log in to manage members, create class schedules, and assign trainers. Members access their own portal to book classes and update their profiles. Trainers can view their schedules and manage their class assignments.

## Privacy and Access

Because this system contains sensitive member information like personal details and payment data, the code repository is private. If you're interested in seeing a demo or discussing potential collaboration, please reach out directly.

## Challenges I Solved

One of the biggest technical challenges was ensuring that class bookings work properly when multiple people try to book the same class simultaneously. I implemented proper conflict resolution so the system doesn't accidentally overbook classes.

Making the interface work well on mobile devices while maintaining full functionality on desktop required careful consideration of layout and user flow. Since gym staff often need to access the system quickly on tablets or phones, every interaction needed to be intuitive and fast.

Protecting member privacy was another important consideration. I implemented proper security measures to ensure personal information stays secure while still allowing authorized staff to access what they need for their jobs.

## Future Plans

I'm planning several improvements based on feedback from the gym staff. These include adding an analytics dashboard to help track gym performance, integrating with fitness devices, and setting up automated reminders for class bookings.

There's also interest in developing a dedicated mobile app and adding support for gym chains with multiple locations. Payment automation is another feature that would reduce administrative work.

## Technical Details

This is proprietary software developed specifically for gym management. The codebase isn't open source due to the sensitive nature of the data it handles.

## Getting in Touch

If you're interested in learning more about this project, seeing a demo, or discussing similar development work, feel free to reach out.

I'm always happy to discuss the technical aspects of the project or explore how similar solutions might work for other organizations.
