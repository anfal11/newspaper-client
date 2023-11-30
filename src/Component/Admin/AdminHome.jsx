import useAuth from '../../Hooks/useAuth';
import { Puff } from 'react-loader-spinner';
import DynamicPieChartComponent from './DynamicPieChartComponent';
import { Chart } from 'react-google-charts';

const AdminHome = () => {
  const { user } = useAuth();

  return (
    <div className="px-36 mt-20">
      <h1 className="text-3xl font-bold">Hi, Welcome</h1>

      {user?.displayName ? (
        <p className="text-xl font-semibold">{user?.displayName} Back!</p>
      ) : (
        <Puff color="#00BFFF" height={100} width={100} />
      )}

      {/* Dynamic Pie Chart */}
      <DynamicPieChartComponent />

      {/* Static Bar Chart */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Static Bar Chart</h2>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Category', 'Value'],
            ['Category A', 50],
            ['Category B', 30],
            ['Category C', 20],
          ]}
          options={{
            title: 'Bar Chart Example',
          }}
        />
      </div>

      {/* Static Line Chart */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Static Line Chart</h2>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['X', 'Y'],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
          ]}
          options={{
            title: 'Line Chart Example',
          }}
        />
      </div>
    </div>
  );
};

export default AdminHome;
