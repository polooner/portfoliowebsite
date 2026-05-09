import { Metadata } from 'next';
import { HomeFeed } from './_components/home-feed';

export const metadata: Metadata = {
  title: 'Filip Wojda',
  description: 'artist, engineer, etc',
};

export default function Home() {
  return <HomeFeed />;
}
