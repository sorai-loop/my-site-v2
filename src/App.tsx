import { ArticleSection } from './components/section/ArticleSection';
import { HeroSection } from './components/section/HeroSection';
import { ProfileSection } from './components/section/ProfileSection';
import { StacksSection } from './components/section/StacksSecrion';
import { TOCSection } from './components/section/TOCSection';
import { WorksSection } from './components/section/WorksSection';

function App() {

  return (
    <>
      <h1>Hello World !</h1>
      <HeroSection />
      <TOCSection />
      <WorksSection />
      <ArticleSection />
      <StacksSection />
      <ProfileSection />
    </>
  )
}

export default App
