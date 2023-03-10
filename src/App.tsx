import Calender from './components/Calendar';
import Header from './components/Header';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Header />
      <div className="mt-24">
        <Calender />
      </div>
    </Layout>
  );
}

export default App;
