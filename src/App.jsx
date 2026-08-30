import ParticlesBackground from "./components/ParticlesBackground";
import TabContainer from "./components/TabContainer";
import About from "./components/pages/About";
import ITSolutions from "./components/pages/ITSolutions";
import BlogPage from "./components/pages/BlogPage";
import Contact from "./components/pages/Contact";
import { useTabTransition } from "./hooks/useTabTransition";
import { solutions, projects, skills } from "./data/data";
import blogs from "./data/blogData";

function App() {
  const { activeTab, displayedTab, closing, changeTab } = useTabTransition("about");

  const renderContent = () => {
    switch (displayedTab) {
      case "about":
        return <About onNavigate={changeTab} />;
      case "itsolutions":
        return (
          <ITSolutions solutions={solutions} projects={projects} skills={skills} />
        );
      case "blog":
        return <BlogPage blogs={blogs} />;
      case "contact":
        return <Contact />;
      default:
        return <About onNavigate={changeTab} />;
    }
  };

  return (
    <>
      <ParticlesBackground />
      <div id="overlay">
        <div id="tab-container" className="tab-container">
          <TabContainer activeTab={activeTab} onTabChange={changeTab} />
          <div id="tab-data-wrap" className={closing ? "tab-closing" : ""}>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
