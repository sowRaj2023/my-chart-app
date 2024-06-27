import { useEffect, useState } from 'react'

import Chart from './components/Chart'

import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [period, setPeriod] = useState("daily");

  const fetchData = async () => {
    setError(false);
    setFetching(true);
    const apiUrl = `https://time-series-data-node-backend.onrender.com/api/time-series-data?period=${period}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(response.ok) {
      setData(data);
    } else {
      setError(true);
    }
    setFetching(false);
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  const updatePeriod = (event) => setPeriod(event.target.value);

  return (
    <>
      {data && <Chart data={data} callback={updatePeriod} period={period} />}
      {fetching && <h1>Loading ... </h1>}
      {error && <h1>Opps... Try reload.</h1>}
    </>
  )
}

export default App
