import { tabs } from "../data/userData";

function TabContainer({ activeTab, onTabChange }) {
  return (
    <ul className="etabs">
      {tabs.map((tab) => (
        <li key={tab.id} className={`tab ${activeTab === tab.id ? "active" : ""}`}>
          <a
            href={`#${tab.id}`}
            className={activeTab === tab.id ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              onTabChange(tab.id);
            }}
          >
            <img
              src={tab.icon}
              alt={tab.label}
              width="25"
              style={{ marginBottom: 0 }}
            />
            <span> {tab.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default TabContainer;
