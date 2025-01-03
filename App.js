import AdminModule from './components/AdminModule';
import UserModule from './components/UserModule';
import CalendarView from './components/CalendarView';
import NotificationSection from './components/NotificationSection';


const App = () => {
  return (
    <div>
      <h1>Calendar Application for Communication Tracking</h1>
      <AdminModule />
      <UserModule />
      <CalendarView />
    </div>
  );
};

export default App;
