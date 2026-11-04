import { ArticlesSection } from './components/section/ArticlesSection';
import { HeroSection } from './components/section/HeroSection';
import { ProfileSection } from './components/section/ProfileSection';
import { SignSection } from './components/section/SignSection';
import { StacksSection } from './components/section/StacksSection';
import { WorksSection } from './components/section/WorksSection';
import { NoiseGraphic } from './components/ui/NoiseGraphic';
import { StainGraphic } from './components/ui/StainGraphic';

function App() {
  return (
    <>
      <StainGraphic aria-hidden="true" />
      <NoiseGraphic aria-hidden="true" />
      <HeroSection />
      <SignSection />
      <WorksSection />
      <ArticlesSection />
      <StacksSection />
      <ProfileSection />
    </>
  );
}

export default App;
