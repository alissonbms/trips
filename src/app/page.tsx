import QuickSearch from "./components/QuickSearch";
import TripSearch from "./components/TripsSearch";

export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSearch />
    </div>
  );
}
