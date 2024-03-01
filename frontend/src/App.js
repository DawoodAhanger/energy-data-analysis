import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [endYear, setEndYear] = useState('');
  const [topics, setTopics] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [pests, setPests] = useState([]);
  const [sources, setSources] = useState([]);
  const [swots, setSwots] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleEndYearChange = (event) => {
    const year = event.target.value;
    setEndYear(year);

    if (year === '') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.year <= parseInt(year)));
    }
  };

  const handleTopicsChange = (event) => {
    const selectedTopics = Array.from(event.target.selectedOptions, option => option.value);
    setTopics(selectedTopics);

    if (selectedTopics.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => selectedTopics.some(topic => item.topics.includes(topic))));
    }
  };

  const handleSectorsChange = (event) => {
    const selectedSectors = Array.from(event.target.selectedOptions, option => option.value);
    setSectors(selectedSectors);

    if (selectedSectors.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => selectedSectors.some(sector => item.sector === sector)));
    }
  };

  const handleRegionsChange = (event) => {
    const selectedRegions = Array.from(event.target.selectedOptions, option => option.value);
    setRegions(selectedRegions);

    if (selectedRegions.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => selectedRegions.some(region => item.region === region)));
    }
  };

  const handleCitiesChange = (event) => {
    const selectedCities = Array.from(event.target.selectedOptions, option => option.value);
    setCities(selectedCities);

    if (selectedCities.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => selectedCities.some(city => item.city === city)));
    }
  };

  const handlePestsChange = (event) => {
    const selectedPests = Array.from(event.target.selectedOptions, option => option.value);
    setPests(selectedPests);

    if (selectedPests.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => selectedPests.some(pest => item.pest.includes(pest))));
    }
  };

  const handleSourcesChange = (event) => {
    const selectedSources = Array.from(event.target.selectedOptions, option => option.value);
    setSources(selectedSources);

    if (selectedSources.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => selectedSources.some(source => item.source === source)));
    }
  };

  const handleSwotsChange = (event) => {
    const selectedSwots = Array.from(event.target.selectedOptions, option => option.value);
    setSwots(selectedSwots);

    if (selectedSwots.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => selectedSwots.some(swot => item.swot.includes(swot))));
    }
  };

  const chartData = {
    labels: filteredData.map(item => item.year),
    datasets: [
      {
        label: 'Intensity',
        data: filteredData.map(item => item.intensity),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Likelihood',
        data: filteredData.map(item => item.likelihood),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Relevance',
        data: filteredData.map(item => item.relevance),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
    ]
  };

  const pieData = {
    labels: filteredData.map(item => item.topics[0]),
    datasets: [
      {
        label: 'Topic Distribution',
        data: filteredData.map(item => 1),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>

      <div>
        <h3>End Year:</h3>
        <select onChange={handleEndYearChange}>
          <option value="">All</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        <h3>Topics:</h3>
        <select onChange={handleTopicsChange} multiple>
          <option value="Topic 1">Topic 1</option>
          <option value="Topic 2">Topic 2</option>
          <option value="Topic 3">Topic 3</option>
          <option value="Topic 4">Topic 4</option>
          <option value="Topic 5">Topic 5</option>
        </select>

        <h3>Sectors:</h3>
        <select onChange={handleSectorsChange} multiple>
          <option value="Sector 1">Sector 1</option>
          <option value="Sector 2">Sector 2</option>
          <option value="Sector 3">Sector 3</option>
          <option value="Sector 4">Sector 4</option>
        </select>

        <h3>Regions:</h3>
        <select onChange={handleRegionsChange} multiple>
          <option value="Region 1">Region 1</option>
          <option value="Region 2">Region 2</option>
          <option value="Region 3">Region 3</option>
          <option value="Region 4">Region 4</option>
        </select>

        <h3>Cities:</h3>
        <select onChange={handleCitiesChange} multiple>
          <option value="City 1">City 1</option>
          <option value="City 2">City 2</option>
          <option value="City 3">City 3</option>
          <option value="City 4">City 4</option>
        </select>

        <h3>PEST:</h3>
        <select onChange={handlePestsChange} multiple>
          <option value="PEST 1">PEST 1</option>
          <option value="PEST 2">PEST 2</option>
          <option value="PEST 3">PEST 3</option>
          <option value="PEST 4">PEST 4</option>
        </select>

        <h3>Sources:</h3>
        <select onChange={handleSourcesChange} multiple>
          <option value="Source 1">Source 1</option>
          <option value="Source 2">Source 2</option>
          <option value="Source 3">Source 3</option>
          <option value="Source 4">Source 4</option>
        </select>

        <h3>SWOT:</h3>
        <select onChange={handleSwotsChange} multiple>
          <option value="SWOT 1">SWOT 1</option>
          <option value="SWOT 2">SWOT 2</option>
          <option value="SWOT 3">SWOT 3</option>
          <option value="SWOT 4">SWOT 4</option>
        </select>
      </div>

      <div>
        <h2>Data Over Time</h2>
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      <div>
        <h2>Topic Distribution</h2>
        <Pie data={pieData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default App;
