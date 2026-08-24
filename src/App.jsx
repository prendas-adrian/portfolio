import ParticlesBackground from "./components/ParticlesBackground";
import TabContainer from "./components/TabContainer";
import About from "./components/pages/About";
import ITSolutions from "./components/pages/ITSolutions";
import Contact from "./components/pages/Contact";
import { useTabTransition } from "./hooks/useTabTransition";
import { solutions, projects, skills } from "./data/data";

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
