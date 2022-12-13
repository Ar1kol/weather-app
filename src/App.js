import CurrentWeather from "./components/CurrentWeather";
import Search from "./components/Search";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };

  return (
    <div className="app-container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather />
    </div>
  );
}

export default App;
