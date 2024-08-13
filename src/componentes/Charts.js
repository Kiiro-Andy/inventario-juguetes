import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './chart.css';

const Charts = () => {
  const [data, setData] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [productStocks, setProductStocks] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const juguetesCollection = collection(db, 'juguetes');
      const juguetesSnapshot = await getDocs(juguetesCollection);
      const juguetesData = juguetesSnapshot.docs.map(doc => doc.data());
      
      setData(juguetesData);

      const counts = juguetesData.reduce((acc, juguete) => {
        const category = juguete.categoria || 'Sin categoría';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      setCategoryCounts(counts);

      const stockData = juguetesData.map(juguete => ({
        nombre: juguete.name,
        cantidad: juguete.cantidad
      }));
      setProductStocks(stockData);
    };

    fetchData();
  }, []);

  const categoryData = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      label: 'Cantidad de productos por categoría',
      data: Object.values(categoryCounts),
      backgroundColor: 'rgba(75, 192, 292, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  const categoryPieData = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      label: 'Porcentaje de productos por categoría',
      data: Object.values(categoryCounts),
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)'
      ],
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
    }]
  };

  const productStockData = {
    labels: productStocks.map(stock => stock.nombre),
    datasets: [{
      label: 'Cantidad en stock por producto',
      data: productStocks.map(stock => stock.cantidad),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }]
  };

  return (
    <div className='chart-container mt-5'>
      <h2>Gráficas de Inventario</h2>
      <div className='chart-content' style={{ height: '400px' }}>
        <Bar data={categoryData} />
      </div>
      <div className='chart-content mt-5 small-chart'>
        <h3>Distribución por Categoría</h3>
        <Pie data={categoryPieData} />
      </div>
      <div className='chart-content mt-5'>
        <h3>Stock por Producto</h3>
        <Bar data={productStockData} />
      </div>
    </div>
  );
}

export default Charts;