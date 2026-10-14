import { ArticlesSection } from './components/section/ArticlesSection';
import { HeroSection } from './components/section/HeroSection';
import { ProfileSection } from './components/section/ProfileSection';
import { SignSection } from './components/section/SignSection';
import { StacksSection } from './components/section/StacksSecrion';
import { WorksSection } from './components/section/WorksSection';

function App() {

  return (
    <>
      <h1>Hello World !</h1>
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
