import { redirect } from 'next/navigation';

export default function Home() {
  // For now, always redirect to onboarding
  // In a real app, we'd check if the user has completed onboarding
  redirect('/onboarding');
}
