import { ArticlesSection } from './components/section/ArticlesSection';
import { HeroSection } from './components/section/HeroSection';
import { ProfileSection } from './components/section/ProfileSection';
import { SignSection } from './components/section/SignSection';
import { StacksSection } from './components/section/StacksSection';
import { WorksSection } from './components/section/WorksSection';

function App() {

  return (
    <>
      <HeroSection />
      <SignSection />
      <WorksSection />
      <ArticlesSection />
      <StacksSection />
      <ProfileSection />
    </>
  )
}

export default App
